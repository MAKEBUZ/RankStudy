import { randomUUID } from 'node:crypto';
import { Database } from './db';
import { levels, subjects, avatars, compatible, pilotQuestions } from './catalog';

async function seed() {
 const db=new Database();
 try {
  await db.transaction(async c=>{
   for(const x of levels)await c.query('INSERT INTO education_levels(id,name) VALUES($1,$2) ON CONFLICT(id) DO NOTHING',[x.id,x.name]);
   for(const x of subjects)await c.query('INSERT INTO subjects(id,name) VALUES($1,$2) ON CONFLICT(id) DO NOTHING',[x.id,x.name]);
   for(const l of levels)for(const s of subjects)if(compatible(l.id,s.id))await c.query('INSERT INTO level_subjects VALUES($1,$2) ON CONFLICT DO NOTHING',[l.id,s.id]);
   for(const x of avatars)await c.query('INSERT INTO avatars(id,name,asset) VALUES($1,$2,$3) ON CONFLICT(id) DO NOTHING',[x.id,x.name,x.asset]);
   for(const q of pilotQuestions){
    const exists=await c.query('SELECT id FROM questions WHERE source=$1 AND prompt=$2',[q.source,q.prompt]);if(exists.rowCount)continue;
    const id=randomUUID();
    await c.query('INSERT INTO questions(id,subject_id,topic,difficulty,prompt,options,correct_index,explanation,source,license) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)',[id,q.subjectId,q.topic,q.difficulty,q.prompt,JSON.stringify(q.options),q.correctIndex,q.explanation,q.source,q.license]);
    await c.query('INSERT INTO question_versions(question_id,version,snapshot) VALUES($1,1,$2)',[id,JSON.stringify(q)]);
   }
  });
  console.log('Catálogos y 24 preguntas piloto cargados. Las preguntas requieren aprobación en Moderación.');
 }finally{await db.onModuleDestroy();}
}
seed().catch(()=>{console.error('No se pudo cargar el catálogo. Ejecuta primero las migraciones.');process.exitCode=1;});
