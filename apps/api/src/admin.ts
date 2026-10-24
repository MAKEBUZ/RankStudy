import { Database } from './db';
async function run(){
 const email=process.argv[2]?.trim().toLowerCase();if(!email||!email.includes('@'))throw new Error('Indica el correo de una cuenta ya verificada.');
 const db=new Database();try{
  const r=await db.pool.query("UPDATE users SET role='admin' WHERE email=$1 AND email_verified_at IS NOT NULL RETURNING id",[email]);
  if(!r.rowCount)throw new Error('No existe una cuenta verificada con ese correo.');
  console.log('Cuenta administradora habilitada. Este comando solo debe ejecutarlo quien administra el servidor.');
 }finally{await db.onModuleDestroy();}
}
run().catch(e=>{console.error(e.message);process.exitCode=1;});
