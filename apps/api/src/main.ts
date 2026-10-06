import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { json } from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { AppModule } from './app';
import { config } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bodyParser: false });
  app.use(helmet());
  app.use(json({ limit: '16kb' }));
  app.use(cookieParser());
  app.use((req: import('express').Request, res: import('express').Response, next: import('express').NextFunction) => {
    res.setHeader('Cache-Control', 'no-store');
    if (!['GET', 'HEAD', 'OPTIONS'].includes(req.method) && req.headers.origin !== new URL(config.WEB_ORIGIN).origin) {
      res.status(403).json({ message: 'Origen de solicitud no permitido.' }); return;
    }
    next();
  });
  app.setGlobalPrefix('api');
  app.enableShutdownHooks();
  await app.listen(config.PORT, '127.0.0.1');
}
bootstrap().catch(() => { console.error('No se pudo iniciar la API. Revisa la configuración.'); process.exitCode = 1; });
