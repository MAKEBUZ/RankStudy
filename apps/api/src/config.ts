import 'dotenv/config';
import { z } from 'zod';

export const config = z.object({
  PORT: z.coerce.number().int().min(1).max(65535).default(3001),
  DATABASE_URL: z.string().min(1),
  WEB_ORIGIN: z.url().default('http://localhost:3000'),
  SMTP_HOST: z.string().default('localhost'),
  SMTP_PORT: z.coerce.number().int().default(1025),
  SMTP_SECURE: z.enum(['true', 'false']).default('false'),
  SMTP_USER: z.string().optional(), SMTP_PASS: z.string().optional(),
  MAIL_FROM: z.string().default('RankStudy <no-reply@rankstudy.local>'),
  VERIFICATION_TTL_MINUTES: z.coerce.number().int().positive().default(30),
  RESEND_COOLDOWN_SECONDS: z.coerce.number().int().positive().default(60),
  SESSION_TTL_DAYS: z.coerce.number().int().positive().default(7),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
}).parse(process.env);
if (config.NODE_ENV === 'production' && !config.WEB_ORIGIN.startsWith('https://')) {
  throw new Error('WEB_ORIGIN debe usar HTTPS en producción.');
}
