import 'reflect-metadata';
import { readFileSync } from 'node:fs';
import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import { newDb, DataType } from 'pg-mem';
import { Pool } from 'pg';
import { AuthService, digest } from './auth.service';
import { Database } from './db';
import { Mailer } from './mail';

// TEST_DATABASE_URL habilita la misma suite con PostgreSQL real.
const real = !!process.env.TEST_DATABASE_URL;
let db: Database, auth: AuthService;
let mail: { verification: ReturnType<typeof vi.fn> };
let captured: string;
const valid = { name: 'Estudiante Demo', email: 'demo@example.com', password: 'Una frase segura de prueba 2026' };

beforeEach(async () => {
  if (real) {
    const target = new URL(process.env.TEST_DATABASE_URL!);
    if (!target.pathname.endsWith('_test')) throw new Error('TEST_DATABASE_URL debe terminar en _test para evitar borrar datos de la aplicación.');
    db = new Database();
    await db.pool.query(readFileSync('migrations/001_auth.sql', 'utf8'));
    // Usar EXCLUSIVAMENTE una base de pruebas dedicada.
    await db.pool.query('TRUNCATE users CASCADE');
  } else {
    const memory = newDb();
    memory.public.registerFunction({ name: 'trim', args: [DataType.text], returns: DataType.text, implementation: (value: string) => value.trim() });
    memory.public.none(readFileSync('migrations/001_auth.sql', 'utf8'));
    const adapter = memory.adapters.createPg();
    const pool = new adapter.Pool() as unknown as Pool;
    db = Object.create(Database.prototype) as Database;
    Object.defineProperty(db, 'pool', { value: pool });
    // pg-mem no implementa rollback: restaurar snapshot ante fallos para las pruebas de servicio.
    db.transaction = async (fn) => {
      const snapshot = memory.backup(); const client = await pool.connect();
      try { return await fn(client); } catch (error) { snapshot.restore(); throw error; } finally { client.release(); }
    };
  }
  mail = { verification: vi.fn(async (_email: string, token: string) => { captured = token; return true; }) };
  auth = new AuthService(db, mail as unknown as Mailer);
});
afterEach(async () => { vi.restoreAllMocks(); await db?.onModuleDestroy(); });

describe(`Registro y verificación (${real ? 'PostgreSQL' : 'pg-mem'})`, () => {
  it('normaliza correo, persiste hash y no devuelve secretos en el usuario público', async () => {
    const result = await auth.register({ ...valid, email: '  DEMO@EXAMPLE.COM ' });
    expect(result.user.email).toBe('demo@example.com');
    expect(Object.keys(result.user).sort()).toEqual(['email', 'id', 'name', 'verified']);
    const { rows } = await db.pool.query('SELECT password_hash FROM credentials');
    expect(rows[0].password_hash).toMatch(/^\$argon2id\$/);
    expect(rows[0].password_hash).not.toContain(valid.password);
    const tokens = await db.pool.query('SELECT token_hash FROM email_verifications');
    expect(tokens.rows[0].token_hash).toBe(digest(captured));
    expect(tokens.rows[0].token_hash).not.toBe(captured);
  });
  it('rechaza email duplicado sin crear cuentas o credenciales extra', async () => {
    await auth.register(valid);
    await expect(auth.register({ ...valid, email: ' DEMO@example.com ' })).rejects.toMatchObject({ status: 409 });
    expect((await db.pool.query('SELECT * FROM users')).rowCount).toBe(1);
    expect((await db.pool.query('SELECT * FROM credentials')).rowCount).toBe(1);
  });
  it('rechaza campos inválidos y contraseñas cortas antes de persistir', async () => {
    await expect(auth.register({ name: '', email: 'incorrecto', password: '123' })).rejects.toMatchObject({ status: 400 });
    expect((await db.pool.query('SELECT * FROM users')).rowCount).toBe(0);
  });
  it('revierte la cuenta si falla la creación de credenciales', async () => {
    await db.pool.query('DROP TABLE credentials');
    await expect(auth.register(valid)).rejects.toBeDefined();
    expect((await db.pool.query('SELECT * FROM users')).rowCount).toBe(0);
  });
  it('niega PvP antes de verificar, permite después y rechaza token reutilizado', async () => {
    const result = await auth.register(valid);
    await expect(auth.pvp(result.session)).rejects.toMatchObject({ status: 403 });
    await auth.verify({ token: captured });
    expect((await auth.pvp(result.session)).allowed).toBe(true);
    await expect(auth.verify({ token: captured })).rejects.toMatchObject({ status: 400 });
  });
  it('rechaza tokens alterados y vencidos', async () => {
    await auth.register(valid);
    await expect(auth.verify({ token: 'f'.repeat(64) })).rejects.toMatchObject({ status: 400 });
    await db.pool.query('UPDATE email_verifications SET expires_at=$1', [new Date(Date.now() - 1000)]);
    await expect(auth.verify({ token: captured })).rejects.toMatchObject({ status: 400 });
  });
  it('aplica cooldown e invalida el token anterior al reenviar', async () => {
    const r = await auth.register(valid); const oldToken = captured;
    await expect(auth.resend(r.session)).rejects.toMatchObject({ status: 429 });
    await db.pool.query('UPDATE users SET verification_sent_at=$1', [new Date(Date.now() - 61000)]);
    expect((await auth.resend(r.session)).emailSent).toBe(true);
    await expect(auth.verify({ token: oldToken })).rejects.toMatchObject({ status: 400 });
    await expect(auth.verify({ token: captured })).resolves.toBeDefined();
  });
  it('login requiere contraseña correcta y logout invalida sesión', async () => {
    await auth.register(valid);
    await expect(auth.login({ email: valid.email, password: 'incorrecta' })).rejects.toMatchObject({ status: 401 });
    const result = await auth.login({ email: valid.email, password: valid.password });
    expect((await auth.current(result.session)).email).toBe(valid.email);
    await auth.logout(result.session);
    await expect(auth.current(result.session)).rejects.toMatchObject({ status: 401 });
  });
  it('rechaza sesiones vencidas y cookies inventadas', async () => {
    const result = await auth.register(valid);
    await db.pool.query('UPDATE sessions SET expires_at=$1', [new Date(Date.now() - 1000)]);
    await expect(auth.current(result.session)).rejects.toMatchObject({ status: 401 });
    await expect(auth.current('f'.repeat(64))).rejects.toMatchObject({ status: 401 });
  });
  it('conserva cuenta y permite informar fallo de correo sin filtrar el token', async () => {
    mail.verification.mockResolvedValue(false);
    const result = await auth.register(valid);
    expect(result.emailSent).toBe(false);
    expect((await auth.current(result.session)).email).toBe(valid.email);
    expect(result.user).not.toHaveProperty('token');
  });
  it.runIf(real)('solo una verificación concurrente consume el token', async () => {
    await auth.register(valid);
    const token = captured;
    const outcomes = await Promise.allSettled([auth.verify({ token }), auth.verify({ token })]);
    expect(outcomes.filter(r => r.status === 'fulfilled')).toHaveLength(1);
    expect((await db.pool.query('SELECT * FROM email_verifications')).rowCount).toBe(0);
  });
  it.runIf(real)('registros concurrentes conservan una sola cuenta', async () => {
    const outcomes = await Promise.allSettled([auth.register(valid), auth.register(valid)]);
    expect(outcomes.filter(r => r.status === 'fulfilled')).toHaveLength(1);
    expect((await db.pool.query('SELECT * FROM users')).rowCount).toBe(1);
    expect((await db.pool.query('SELECT * FROM credentials')).rowCount).toBe(1);
  });
});
