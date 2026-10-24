import 'reflect-metadata';
import {describe,it,expect,beforeAll} from 'vitest';
import {createLocalJWKSet,exportJWK,generateKeyPair,SignJWT} from 'jose';
import {verifyIdentity} from './oauth.service';
describe('Validación criptográfica de identidad OAuth',()=>{
 let privateKey:CryptoKey,key:ReturnType<typeof createLocalJWKSet>;
 beforeAll(async()=>{const pair=await generateKeyPair('RS256');privateKey=pair.privateKey;key=createLocalJWKSet({keys:[{...await exportJWK(pair.publicKey),kid:'test-key',alg:'RS256',use:'sig'}]});});
 async function token(overrides:Record<string,unknown>={}){return new SignJWT({nonce:'expected',...overrides}).setProtectedHeader({alg:'RS256',kid:'test-key'}).setSubject('person-1').setIssuer('https://accounts.google.com').setAudience('client-id').setIssuedAt().setExpirationTime('5m').sign(privateKey);}
 it('acepta firma, emisor, destinatario y nonce correctos',async()=>{expect((await verifyIdentity(await token(),'google','client-id','expected',key)).sub).toBe('person-1');});
 it('valida también un token Apple firmado con su emisor y Services ID',async()=>{const apple=await new SignJWT({nonce:'expected'}).setProtectedHeader({alg:'RS256',kid:'test-key'}).setSubject('apple-person').setIssuer('https://appleid.apple.com').setAudience('services-id').setIssuedAt().setExpirationTime('5m').sign(privateKey);expect((await verifyIdentity(apple,'apple','services-id','expected',key)).sub).toBe('apple-person');});
 it('rechaza nonce de otro intento',async()=>{await expect(verifyIdentity(await token({nonce:'other'}),'google','client-id','expected',key)).rejects.toBeDefined();});
 it('rechaza destinatario y emisor incorrectos',async()=>{await expect(verifyIdentity(await token(),'google','other-client','expected',key)).rejects.toBeDefined();await expect(verifyIdentity(await token(),'apple','client-id','expected',key)).rejects.toBeDefined();});
 it('rechaza firma alterada y token vencido',async()=>{const good=await token();const parts=good.split('.');parts[2]='bad'+parts[2].slice(3);await expect(verifyIdentity(parts.join('.'),'google','client-id','expected',key)).rejects.toBeDefined();const expired=await new SignJWT({nonce:'expected'}).setProtectedHeader({alg:'RS256',kid:'test-key'}).setSubject('x').setIssuer('https://accounts.google.com').setAudience('client-id').setIssuedAt(Math.floor(Date.now()/1000)-600).setExpirationTime(Math.floor(Date.now()/1000)-60).sign(privateKey);await expect(verifyIdentity(expired,'google','client-id','expected',key)).rejects.toBeDefined();});
});
