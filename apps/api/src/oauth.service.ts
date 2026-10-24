import { BadRequestException, ConflictException, Inject, Injectable, ServiceUnavailableException, UnauthorizedException } from '@nestjs/common';
import { randomBytes, randomUUID, createHash } from 'node:crypto';
import { createRemoteJWKSet, importPKCS8, jwtVerify, SignJWT, type JWTVerifyGetKey } from 'jose';
import { z } from 'zod';
import { config } from './config';
import { Database } from './db';
import { AuthService, digest } from './auth.service';
export type Provider='google'|'apple';
const providerSchema=z.enum(['google','apple']);
const endpoints={google:{authorize:'https://accounts.google.com/o/oauth2/v2/auth',token:'https://oauth2.googleapis.com/token',jwks:'https://www.googleapis.com/oauth2/v3/certs',issuer:['https://accounts.google.com','accounts.google.com']},apple:{authorize:'https://appleid.apple.com/auth/authorize',token:'https://appleid.apple.com/auth/token',jwks:'https://appleid.apple.com/auth/keys',issuer:['https://appleid.apple.com']}};
const keys={google:createRemoteJWKSet(new URL(endpoints.google.jwks)),apple:createRemoteJWKSet(new URL(endpoints.apple.jwks))};
export async function verifyIdentity(token:string,provider:Provider,audience:string,nonce:string,key:JWTVerifyGetKey=keys[provider]){
 const {payload}=await jwtVerify(token,key,{issuer:endpoints[provider].issuer,audience,algorithms:['RS256'],requiredClaims:['exp','iat','sub','nonce'],clockTolerance:5,maxTokenAge:'10m'});
 if(payload.nonce!==nonce||!payload.sub||payload.sub.length>255)throw new UnauthorizedException('Identidad OAuth no válida.');
 return payload;
}
@Injectable()
export class OAuthTokens{
 async exchange(provider:Provider,code:string,verifier:string,nonce:string){
  const id=provider==='google'?config.GOOGLE_CLIENT_ID!:config.APPLE_CLIENT_ID!;
  let secret=config.GOOGLE_CLIENT_SECRET!;
  if(provider==='apple')secret=await new SignJWT({}).setProtectedHeader({alg:'ES256',kid:config.APPLE_KEY_ID!}).setIssuer(config.APPLE_TEAM_ID!).setSubject(id).setAudience('https://appleid.apple.com').setIssuedAt().setExpirationTime('5m').sign(await importPKCS8(config.APPLE_PRIVATE_KEY!.replaceAll('\\n','\n'),'ES256'));
  const params=new URLSearchParams({client_id:id,client_secret:secret,code,grant_type:'authorization_code',redirect_uri:`${config.WEB_ORIGIN}/api/auth/oauth/${provider}/callback`});
  if(provider==='google')params.set('code_verifier',verifier);
  const response=await fetch(endpoints[provider].token,{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:params,signal:AbortSignal.timeout(10000)});
  if(!response.ok)throw new UnauthorizedException('No se pudo validar el acceso con el proveedor.');
  const data=await response.json() as {id_token?:string};if(typeof data.id_token!=='string')throw new UnauthorizedException();
  return verifyIdentity(data.id_token,provider,id,nonce);
 }
}
@Injectable()
export class OAuthService{
 constructor(@Inject(Database) private db:Database,@Inject(AuthService) private auth:AuthService,@Inject(OAuthTokens) private tokens:OAuthTokens){}
 available(){return{google:!!(config.GOOGLE_CLIENT_ID&&config.GOOGLE_CLIENT_SECRET),apple:!!(config.APPLE_CLIENT_ID&&config.APPLE_TEAM_ID&&config.APPLE_KEY_ID&&config.APPLE_PRIVATE_KEY&&config.WEB_ORIGIN.startsWith('https://'))};}
 async start(providerInput:string,session?:string,link=false){
  const parsed=providerSchema.safeParse(providerInput);if(!parsed.success)throw new BadRequestException('Proveedor desconocido.');const provider=parsed.data;if(!this.available()[provider])throw new ServiceUnavailableException('Este proveedor aún no está configurado. Usa correo y contraseña.');
  let linkUser:string|null=null;if(link){const u=await this.auth.current(session);if(!u.email_verified_at)throw new UnauthorizedException('Verifica tu cuenta antes de vincularla.');linkUser=u.id;}
  const state=randomBytes(32).toString('hex'),browser=randomBytes(32).toString('hex'),nonce=randomBytes(32).toString('hex'),verifier=randomBytes(32).toString('base64url');
  await this.db.pool.query('DELETE FROM oauth_attempts WHERE expires_at < $1',[new Date()]);
  await this.db.pool.query('INSERT INTO oauth_attempts(state_hash,provider,browser_hash,nonce,verifier,link_user_id,expires_at) VALUES($1,$2,$3,$4,$5,$6,$7)',[digest(state),provider,digest(browser),nonce,verifier,linkUser,new Date(Date.now()+10*60000)]);
  const url=new URL(endpoints[provider].authorize);url.search=new URLSearchParams({client_id:provider==='google'?config.GOOGLE_CLIENT_ID!:config.APPLE_CLIENT_ID!,redirect_uri:`${config.WEB_ORIGIN}/api/auth/oauth/${provider}/callback`,response_type:'code',scope:provider==='google'?'openid email profile':'name email',state,nonce}).toString();
  if(provider==='google'){url.searchParams.set('code_challenge',createHash('sha256').update(verifier).digest('base64url'));url.searchParams.set('code_challenge_method','S256');}else url.searchParams.set('response_mode','form_post');
  return{url:url.toString(),browser,provider};
 }
 async callback(providerInput:string,body:unknown,browser?:string,session?:string){
  const parsed=providerSchema.safeParse(providerInput);if(!parsed.success)throw new BadRequestException();const provider=parsed.data;
  const data=z.object({state:z.string().regex(/^[a-f0-9]{64}$/),code:z.string().min(1).max(4096).optional(),error:z.string().max(200).optional()}).passthrough().safeParse(body);
  if(!data.success||!browser||!/^[a-f0-9]{64}$/.test(browser))throw new UnauthorizedException('Intento OAuth inválido.');
  const attempt=(await this.db.pool.query('DELETE FROM oauth_attempts WHERE state_hash=$1 AND browser_hash=$2 AND provider=$3 AND expires_at>$4 RETURNING *',[digest(data.data.state),digest(browser),provider,new Date()])).rows[0];
  if(!attempt)throw new UnauthorizedException('El acceso venció o ya fue utilizado.');if(data.data.error||!data.data.code)throw new BadRequestException('Consentimiento cancelado.');
  if(attempt.link_user_id){const u=await this.auth.current(session);if(u.id!==attempt.link_user_id||!u.email_verified_at)throw new UnauthorizedException('La sesión de vinculación cambió.');}
  const identity=await this.tokens.exchange(provider,data.data.code,attempt.verifier,attempt.nonce);
  const token=randomBytes(32).toString('hex');
  await this.db.transaction(async c=>{
   const existing=(await c.query('SELECT user_id FROM oauth_identities WHERE provider=$1 AND subject=$2',[provider,identity.sub])).rows[0];
   let userId=existing?.user_id;
   if(attempt.link_user_id&&userId&&userId!==attempt.link_user_id)throw new ConflictException('Esta identidad ya está vinculada a otra cuenta.');
   if(!userId){
    if(attempt.link_user_id)userId=attempt.link_user_id;
    else{
     const email=z.email().max(254).safeParse(identity.email);if(!email.success||![true,'true'].includes(identity.email_verified as boolean|string))throw new UnauthorizedException('El proveedor no confirmó el correo.');
     const normalized=email.data.trim().toLowerCase();
     if((await c.query('SELECT id FROM users WHERE email=$1',[normalized])).rowCount)throw new ConflictException('Inicia sesión con tu cuenta existente para vincular el proveedor.');
     userId=randomUUID();const name=typeof identity.name==='string'?identity.name.trim().slice(0,80):'Estudiante';
     await c.query('INSERT INTO users(id,name,email,email_verified_at) VALUES($1,$2,$3,$4)',[userId,name||'Estudiante',normalized,new Date()]);
    }
    try{await c.query('INSERT INTO oauth_identities(provider,subject,user_id) VALUES($1,$2,$3)',[provider,identity.sub,userId]);}catch(e){if((e as {code?:string}).code==='23505')throw new ConflictException('La identidad ya fue vinculada. Inicia sesión otra vez.');throw e;}
   }
   await c.query('INSERT INTO sessions(token_hash,user_id,expires_at) VALUES($1,$2,$3)',[digest(token),userId,this.auth.sessionExpiry()]);
  });return token;
 }
}
