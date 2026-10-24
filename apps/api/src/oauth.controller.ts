import { Body, Controller, Get, Inject, Param, Post, Query, Req, Res } from '@nestjs/common';
import type { Request,Response } from 'express';
import { config } from './config';
import { OAuthService } from './oauth.service';
const oauthCookie=(provider:string)=>({httpOnly:true,secure:config.WEB_ORIGIN.startsWith('https://'),sameSite:provider==='apple'?'none' as const:'lax' as const,path:'/api/auth/oauth',maxAge:600000});
@Controller('auth/oauth')
export class OAuthController{
 constructor(@Inject(OAuthService) private oauth:OAuthService){}
 @Get('providers') providers(){return this.oauth.available();}
 @Post(':provider/start') async start(@Param('provider') provider:string,@Req() req:Request,@Res({passthrough:true}) res:Response,@Body() body:{link?:boolean}){
  const result=await this.oauth.start(provider,req.cookies?.rs_session,body?.link===true);res.cookie('rs_oauth',result.browser,oauthCookie(result.provider));if(body?.link===true&&provider==='apple')res.cookie('rs_oauth_link',req.cookies.rs_session,oauthCookie('apple'));return{url:result.url};
 }
 private async finish(provider:string,data:unknown,req:Request,res:Response){
  try{const session=await this.oauth.callback(provider,data,req.cookies?.rs_oauth,req.cookies?.rs_session||(provider==='apple'?req.cookies?.rs_oauth_link:undefined));res.cookie('rs_session',session,{httpOnly:true,sameSite:'lax',secure:config.NODE_ENV==='production',path:'/',maxAge:config.SESSION_TTL_DAYS*86400000});res.clearCookie('rs_oauth',oauthCookie(provider));res.clearCookie('rs_oauth_link',oauthCookie('apple'));res.redirect(303,config.WEB_ORIGIN+'/?oauth=success');}
  catch(error){res.clearCookie('rs_oauth',oauthCookie(provider));res.clearCookie('rs_oauth_link',oauthCookie('apple'));const conflict=(error as {status?:number}).status===409;res.redirect(303,config.WEB_ORIGIN+'/?oauth='+(conflict?'link-required':'failed'));}
 }
 @Get(':provider/callback') getCallback(@Param('provider') p:string,@Query() q:unknown,@Req() r:Request,@Res() s:Response){return this.finish(p,q,r,s);}
 @Post('apple/callback') apple(@Body() b:unknown,@Req() r:Request,@Res() s:Response){return this.finish('apple',b,r,s);}
}
