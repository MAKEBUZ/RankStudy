import { BadRequestException, ConflictException, ForbiddenException, Inject, Injectable, UnauthorizedException, HttpException } from '@nestjs/common';
import { createHash, randomBytes, randomUUID } from 'node:crypto';
import * as argon2 from 'argon2';
import { z } from 'zod';
import { Database } from './db';
import { Mailer } from './mail';
import { config } from './config';

export const digest = (token: string) => createHash('sha256').update(token).digest('hex');
const emailSchema = z.string().trim().toLowerCase().max(254).email('Introduce un correo válido.');
const registerSchema = z.object({
  name: z.string().trim().min(2, 'Escribe al menos 2 caracteres.').max(80, 'Máximo 80 caracteres.'),
  email: emailSchema,
  password: z.string().min(12, 'Usa al menos 12 caracteres.').max(128, 'Máximo 128 caracteres.'),
}).strict();
const loginSchema = z.object({ email: emailSchema, password: z.string().min(1).max(128) }).strict();
type User = { id: string; name: string; email: string; email_verified_at: Date | null };
export const publicUser = (u: User) => ({ id: u.id, name: u.name, email: u.email, verified: !!u.email_verified_at });

@Injectable()
export class AuthService {
  constructor(@Inject(Database) private readonly db: Database, @Inject(Mailer) private readonly mail: Mailer) {}
  async register(body: unknown) {
    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) throw new BadRequestException({ message: 'Revisa los campos.', fields: z.flattenError(parsed.error).fieldErrors });
    const { name, email, password } = parsed.data;
    const passwordHash = await argon2.hash(password, { type: argon2.argon2id, memoryCost: 65536, timeCost: 3, parallelism: 1 });
    const id = randomUUID(), verification = randomBytes(32).toString('hex'), session = randomBytes(32).toString('hex');
    try {
      await this.db.transaction(async (client) => {
        await client.query('INSERT INTO users(id,name,email) VALUES($1,$2,$3)', [id, name, email]);
        await client.query('INSERT INTO credentials(user_id,password_hash) VALUES($1,$2)', [id, passwordHash]);
        await client.query('INSERT INTO email_verifications(user_id,token_hash,expires_at) VALUES($1,$2,$3)', [id, digest(verification), new Date(Date.now() + config.VERIFICATION_TTL_MINUTES * 60000)]);
        await client.query('INSERT INTO sessions(token_hash,user_id,expires_at) VALUES($1,$2,$3)', [digest(session), id, this.sessionExpiry()]);
      });
    } catch (error) {
      if ((error as { code?: string }).code === '23505') throw new ConflictException({ message: 'Este correo ya tiene una cuenta. Inicia sesión para continuar.', fields: { email: ['El correo ya está registrado.'] } });
      throw error;
    }
    const emailSent = await this.mail.verification(email, verification);
    return { session, user: { id, name, email, verified: false }, emailSent, resendAfter: config.RESEND_COOLDOWN_SECONDS };
  }
  sessionExpiry() { return new Date(Date.now() + config.SESSION_TTL_DAYS * 86400000); }
  async login(body: unknown) {
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) throw new BadRequestException('Introduce un correo y contraseña válidos.');
    const { rows } = await this.db.pool.query('SELECT u.*,c.password_hash FROM users u JOIN credentials c ON u.id=c.user_id WHERE email=$1', [parsed.data.email]);
    const user = rows[0];
    // Ejecutar un hash también cuando no existe usuario para reducir diferencias de tiempo.
    const valid = user ? await argon2.verify(user.password_hash, parsed.data.password) : (await argon2.hash(parsed.data.password), false);
    if (!valid) throw new UnauthorizedException('Correo o contraseña incorrectos.');
    const session = randomBytes(32).toString('hex');
    await this.db.pool.query('INSERT INTO sessions(token_hash,user_id,expires_at) VALUES($1,$2,$3)', [digest(session), user.id, this.sessionExpiry()]);
    return { session, user: publicUser(user) };
  }
  async current(session?: string): Promise<User> {
    if (!session || !/^[a-f0-9]{64}$/.test(session)) throw new UnauthorizedException('Inicia sesión para continuar.');
    const { rows } = await this.db.pool.query('SELECT u.* FROM users u JOIN sessions s ON s.user_id=u.id WHERE s.token_hash=$1 AND s.expires_at > $2', [digest(session), new Date()]);
    if (!rows[0]) throw new UnauthorizedException('Tu sesión venció. Inicia sesión otra vez.');
    return rows[0];
  }
  async verify(body: unknown) {
    const parsed = z.object({ token: z.string().regex(/^[a-f0-9]{64}$/) }).strict().safeParse(body);
    if (!parsed.success) throw new BadRequestException('El enlace no es válido. Solicita uno nuevo.');
    await this.db.transaction(async (client) => {
      const candidate = await client.query('SELECT user_id FROM email_verifications WHERE token_hash=$1', [digest(parsed.data.token)]);
      if (!candidate.rows[0]) throw new BadRequestException('El enlace venció o ya fue utilizado. Solicita uno nuevo.');
      // Mismo orden de bloqueo que el reenvío: usuario primero, token después.
      await client.query('SELECT id FROM users WHERE id=$1 FOR UPDATE', [candidate.rows[0].user_id]);
      // Consumir con DELETE RETURNING hace que solo una solicitud pueda usar el token.
      const { rows } = await client.query('DELETE FROM email_verifications WHERE token_hash=$1 AND expires_at > $2 RETURNING user_id', [digest(parsed.data.token), new Date()]);
      if (!rows[0]) throw new BadRequestException('El enlace venció o ya fue utilizado. Solicita uno nuevo.');
      await client.query('UPDATE users SET email_verified_at=$1 WHERE id=$2', [new Date(), rows[0].user_id]);
    });
    return { message: 'Correo verificado. Tu cuenta está lista.' };
  }
  async resend(session?: string) {
    const user = await this.current(session);
    const token = randomBytes(32).toString('hex');
    await this.db.transaction(async (client) => {
      const { rows } = await client.query('SELECT * FROM users WHERE id=$1 FOR UPDATE', [user.id]);
      const fresh = rows[0];
      if (fresh.email_verified_at) throw new ConflictException('Tu correo ya está verificado.');
      const wait = Math.ceil((new Date(fresh.verification_sent_at).getTime() + config.RESEND_COOLDOWN_SECONDS * 1000 - Date.now()) / 1000);
      if (wait > 0) throw new HttpException({ message: `Espera ${wait} segundos antes de reenviar.`, retryAfter: wait }, 429);
      await client.query('DELETE FROM email_verifications WHERE user_id=$1', [user.id]);
      await client.query('INSERT INTO email_verifications(user_id,token_hash,expires_at) VALUES($1,$2,$3)', [user.id, digest(token), new Date(Date.now() + config.VERIFICATION_TTL_MINUTES * 60000)]);
      await client.query('UPDATE users SET verification_sent_at=$1 WHERE id=$2', [new Date(), user.id]);
    });
    return { emailSent: await this.mail.verification(user.email, token), resendAfter: config.RESEND_COOLDOWN_SECONDS };
  }
  async logout(session?: string) {
    if (session) await this.db.pool.query('DELETE FROM sessions WHERE token_hash=$1', [digest(session)]);
    return { message: 'Sesión cerrada.' };
  }
  async pvp(session?: string) {
    const user = await this.current(session);
    if (!user.email_verified_at) throw new ForbiddenException('Verifica tu correo antes de acceder a los duelos.');
    return { allowed: true, message: 'Cuenta verificada. El modo de duelos estará disponible en un próximo sprint.' };
  }
}
