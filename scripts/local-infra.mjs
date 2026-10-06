// Alternativa de desarrollo sin Docker. Nunca se utiliza en producción.
import EmbeddedPostgres from 'embedded-postgres';
import { SMTPServer } from 'smtp-server';
import { simpleParser } from 'mailparser';
import { createServer } from 'node:http';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { randomUUID } from 'node:crypto';

const databaseDir = resolve('.local/postgres');
const port = Number(process.env.LOCAL_PG_PORT || 55432);
let postgresOutput = '';
const postgres = new EmbeddedPostgres({ databaseDir, user: 'rankstudy', password: 'rankstudy_local', port, persistent: true, createPostgresUser: false, authMethod: 'scram-sha-256', postgresFlags: ['-h', '127.0.0.1'], onLog: (message) => { postgresOutput = (postgresOutput + String(message)).slice(-2000); }, onError: (message) => console.error(String(message)) });
const messages = [];
const smtp = new SMTPServer({ disabledCommands: ['AUTH', 'STARTTLS'], authOptional: true,
  onData(stream, _session, callback) {
    simpleParser(stream).then(mail => {
      const to = (Array.isArray(mail.to) ? mail.to.flatMap(t => t.value) : mail.to?.value || []).map(t => ({ Address: t.address }));
      messages.unshift({ ID: randomUUID(), Subject: mail.subject, To: to, Text: mail.text || '' });
      messages.splice(100);
      callback();
    }).catch(callback);
  },
});
const outbox = createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  if (req.url === '/' || req.url === '/api/v1/messages') {
    res.end(JSON.stringify({ service: 'Buzón SMTP de desarrollo RankStudy', messages }, null, 2)); return;
  }
  const id = req.url?.match(/^\/api\/v1\/message\/([a-f0-9-]+)$/)?.[1];
  const message = messages.find(m => m.ID === id);
  if (message) { res.end(JSON.stringify(message)); return; }
  res.statusCode = 404; res.end(JSON.stringify({ message: 'Mensaje no encontrado.' }));
});
let shuttingDown = false;
async function stop() {
  if (shuttingDown) return; shuttingDown = true;
  outbox.close(); smtp.close(); await postgres.stop();
}
process.on('SIGINT', () => stop().finally(() => process.exit()));
process.on('SIGTERM', () => stop().finally(() => process.exit()));
try {
  if (!existsSync(resolve(databaseDir, 'PG_VERSION'))) await postgres.initialise();
  await postgres.start();
  const client = postgres.getPgClient(); await client.connect();
  for (const name of ['rankstudy', 'rankstudy_test']) {
    const result = await client.query('SELECT 1 FROM pg_database WHERE datname=$1', [name]);
    if (!result.rowCount) await client.query(`CREATE DATABASE ${name}`); // nombres constantes, sin entrada del usuario
  }
  await client.end();
  await new Promise((resolve, reject) => { smtp.once('error', reject); smtp.listen(1025, '127.0.0.1', resolve); });
  await new Promise((resolve, reject) => { outbox.once('error', reject); outbox.listen(8025, '127.0.0.1', resolve); });
  console.log(`PostgreSQL local: 127.0.0.1:${port}. Buzón de pruebas JSON: http://localhost:8025. Mantén esta terminal abierta.`);
} catch (error) {
  console.error('No se pudo iniciar la infraestructura local. Verifica puertos y permisos.', error?.message || 'Error al ejecutar PostgreSQL portable.');
  if (postgresOutput) console.error(postgresOutput);
  await stop().catch(() => {}); process.exitCode = 1;
}
