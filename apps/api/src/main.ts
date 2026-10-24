import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { AppModule } from './app';
import { config } from './config';
import { CompetitionRuntime } from './competition.runtime';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bodyParser: false });
  app.use(helmet());
  app.use(json({ limit: '16kb' }));
  app.use(urlencoded({extended:false,limit:'16kb'}));
  app.use(cookieParser());
  app.use((req: import('express').Request, res: import('express').Response, next: import('express').NextFunction) => {
    res.setHeader('Cache-Control', 'no-store');
    // Apple retorna form_post; esta ruta valida state y cookie de navegador de un solo uso.
    const appleCallback=req.method==='POST'&&req.path==='/api/auth/oauth/apple/callback';
    if (!appleCallback && !['GET', 'HEAD', 'OPTIONS'].includes(req.method) && req.headers.origin !== new URL(config.WEB_ORIGIN).origin) {
      res.status(403).json({ message: 'Origen de solicitud no permitido.' }); return;
    }
    next();
  });
  app.setGlobalPrefix('api');
  app.enableShutdownHooks();
  app.get(CompetitionRuntime).attach(app.getHttpServer());
  await app.listen(config.PORT, '127.0.0.1');
}
bootstrap().catch(() => { console.error('No se pudo iniciar la API. Revisa la configuración.'); process.exitCode = 1; });
