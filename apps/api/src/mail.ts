import { Injectable } from '@nestjs/common';
import nodemailer from 'nodemailer';
import { config } from './config';

@Injectable()
export class Mailer {
  private readonly transport = nodemailer.createTransport({
    host: config.SMTP_HOST, port: config.SMTP_PORT, secure: config.SMTP_SECURE === 'true',
    auth: config.SMTP_USER ? { user: config.SMTP_USER, pass: config.SMTP_PASS } : undefined,
    connectionTimeout: 5000, socketTimeout: 5000,
  });
  async verification(email: string, token: string): Promise<boolean> {
    const link = new URL('/verificar', config.WEB_ORIGIN);
    // El fragmento no se envía al servidor ni aparece en logs HTTP de acceso.
    link.hash = new URLSearchParams({ token }).toString();
    try {
      await this.transport.sendMail({ from: config.MAIL_FROM, to: email,
        subject: 'Verifica tu correo en RankStudy',
        text: `Confirma tu cuenta de RankStudy abriendo este enlace:\n${link}\n\nVence en ${config.VERIFICATION_TTL_MINUTES} minutos. Si no solicitaste esta cuenta, ignora el mensaje.`,
      });
      return true;
    } catch {
      // No registrar el error SMTP: podría contener datos privados o el enlace.
      return false;
    }
  }
}
