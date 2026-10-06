import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { Database } from './db';

async function migrate() {
  const db = new Database();
  try {
    // Ejecutar desde el workspace apps/api; el script npm fija ese directorio.
    const sql = await readFile(resolve('migrations/001_auth.sql'), 'utf8');
    await db.transaction(async (client) => { await client.query(sql); });
    console.log('Migración 001_auth aplicada.');
  } finally { await db.onModuleDestroy(); }
}
migrate().catch(() => { console.error('No se pudo migrar. Revisa DATABASE_URL y PostgreSQL.'); process.exitCode = 1; });
