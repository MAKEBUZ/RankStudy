import { Body, Controller, Get, Inject, Module, Post, Req, Res } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import type { Request, Response } from 'express';
import { AuthService, publicUser } from './auth.service';
import { Database } from './db';
import { Mailer } from './mail';
import { config } from './config';

const cookieOptions = () => ({ httpOnly: true, sameSite: 'lax' as const, secure: config.NODE_ENV === 'production', path: '/', maxAge: config.SESSION_TTL_DAYS * 86400000 });
const session = (req: Request): string | undefined => req.cookies?.rs_session;

@Controller()
class AuthController {
  constructor(@Inject(AuthService) private readonly auth: AuthService) {}
  @Get('health') health() { return { status: 'ok' }; }
  @Post('auth/register') async register(@Body() body: unknown, @Res({ passthrough: true }) res: Response) {
    const result = await this.auth.register(body);
    res.cookie('rs_session', result.session, cookieOptions());
    return { user: result.user, emailSent: result.emailSent, resendAfter: result.resendAfter };
  }
  @Post('auth/login') async login(@Body() body: unknown, @Res({ passthrough: true }) res: Response) {
    const result = await this.auth.login(body);
    res.cookie('rs_session', result.session, cookieOptions());
    return { user: result.user };
  }
  @Get('auth/me') async me(@Req() req: Request) { return publicUser(await this.auth.current(session(req))); }
  @Post('auth/verify') verify(@Body() body: unknown) { return this.auth.verify(body); }
  @Post('auth/resend') resend(@Req() req: Request) { return this.auth.resend(session(req)); }
  @Post('auth/logout') async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const result = await this.auth.logout(session(req));
    res.clearCookie('rs_session', { ...cookieOptions(), maxAge: undefined });
    return result;
  }
  @Get('pvp/access') pvp(@Req() req: Request) { return this.auth.pvp(session(req)); }
}

@Module({ imports: [ThrottlerModule.forRoot([{ ttl: 60000, limit: 30 }])], controllers: [AuthController], providers: [AuthService, Database, Mailer, { provide: APP_GUARD, useClass: ThrottlerGuard }] })
export class AppModule {}
