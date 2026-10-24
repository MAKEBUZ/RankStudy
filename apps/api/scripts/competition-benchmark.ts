import 'reflect-metadata';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {resolve} from 'node:path';
import {performance} from 'node:perf_hooks';
import {randomBytes,randomUUID} from 'node:crypto';
import {Pool} from 'pg';
import {Database} from '../src/db';
import {AuthService,digest} from '../src/auth.service';
import {Mailer} from '../src/mail';
import {LearningService} from '../src/learning.service';
import {CompetitionService} from '../src/competition.service';
import {CommunityService} from '../src/community.service';
import {pilotQuestions,avatars} from '../src/catalog';

async function run(){
 const target=process.env.TEST_DATABASE_URL;if(!target)throw Error('Indica TEST_DATABASE_URL con una base local rankstudy_load_test.');const url=new URL(target);if(!['localhost','127.0.0.1'].includes(url.hostname)||url.pathname!=='/rankstudy_load_test')throw Error('Esta prueba solo usa la base local dedicada rankstudy_load_test.');
 const db=Object.create(Database.prototype) as Database;Object.defineProperty(db,'pool',{value:new Pool({connectionString:target,max:10,query_timeout:30000})});
 try{
  for(const f of ['001_auth.sql','002_learning.sql','003_competition.sql'])await db.pool.query(await readFile(resolve('migrations',f),'utf8'));
  await db.pool.query('TRUNCATE users CASCADE');
  await db.pool.query("INSERT INTO education_levels VALUES('secundaria','Secundaria') ON CONFLICT DO NOTHING");await db.pool.query("INSERT INTO subjects(id,name,active) VALUES('matematicas','Matemáticas',true) ON CONFLICT(id) DO UPDATE SET active=true");await db.pool.query("INSERT INTO level_subjects VALUES('secundaria','matematicas') ON CONFLICT DO NOTHING");for(const a of avatars)await db.pool.query('INSERT INTO avatars VALUES($1,$2,$3) ON CONFLICT DO NOTHING',[a.id,a.name,a.asset]);
  const volume=10000,concurrency=64;
  await db.pool.query("INSERT INTO users(id,name,email,email_verified_at) SELECT gen_random_uuid(),'Participante '||n,'load-'||n||'@example.test',now() FROM generate_series(1,$1) n",[volume]);
  await db.pool.query("INSERT INTO profiles(user_id,level_id,avatar_id,preferences_version,country) SELECT id,'secundaria','avatar-2',1,'CO' FROM users");await db.pool.query("INSERT INTO user_subjects SELECT id,'matematicas' FROM users");await db.pool.query("INSERT INTO calibrations(id,user_id,subject_id,questions,status,elo,finished_at) SELECT id,id,'matematicas','[]'::jsonb,'skipped',1000,now() FROM users");await db.pool.query("INSERT INTO subject_ratings SELECT id,'matematicas',1000,id FROM users");
  const ids=(await db.pool.query('SELECT id FROM users ORDER BY id LIMIT $1',[concurrency])).rows.map(r=>r.id as string);const sessions:string[]=[];
  for(const id of ids){const session=randomBytes(32).toString('hex');sessions.push(session);await db.pool.query('INSERT INTO sessions VALUES($1,$2,$3)',[digest(session),id,new Date(Date.now()+3600000)]);}
  for(const q of pilotQuestions.filter(q=>q.subjectId==='matematicas'))await db.pool.query("INSERT INTO questions(id,subject_id,topic,difficulty,prompt,options,correct_index,explanation,source,license,status) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,'approved')",[randomUUID(),q.subjectId,q.topic,q.difficulty,q.prompt,JSON.stringify(q.options),q.correctIndex,q.explanation,'Fixture sintética de carga',q.license]);
  const gid=randomUUID();await db.pool.query('INSERT INTO social_groups VALUES($1,$2,$3,$4,now())',[gid,'Grupo de carga',ids[0],digest('LOADCODE')]);await db.pool.query('INSERT INTO group_members(group_id,user_id) SELECT $1,id FROM users LIMIT 500',[gid]);await db.pool.query('INSERT INTO group_members(group_id,user_id) VALUES($1,$2) ON CONFLICT DO NOTHING',[gid,ids[0]]);await db.pool.query('ANALYZE');
  const auth=new AuthService(db,{} as Mailer),learning=new LearningService(db,auth),game=new CompetitionService(db,learning),community=new CommunityService(game);
  const timings:number[]=[];for(let i=0;i<60;i++){const begin=performance.now();const result=await community.ranking(sessions[0],{subjectId:'matematicas',scope:i%3===0?'group':i%3===1?'country':'global',...(i%3===0?{groupId:gid}:i%3===1?{country:'CO'}:{})});if(result.rows.length!==25)throw Error('Ranking incompleto.');timings.push(performance.now()-begin);}
  const started=performance.now(),requests=await Promise.allSettled(sessions.map(s=>game.joinQueue(s,{subjectId:'matematicas'})));await game.tick();const errors=requests.filter(r=>r.status==='rejected').length;
  const matches=+(await db.pool.query('SELECT count(*) FROM duels')).rows[0].count,active=+(await db.pool.query('SELECT count(*) FROM duel_players WHERE active=true')).rows[0].count;
  const duplicates=(await db.pool.query('SELECT user_id FROM duel_players WHERE active=true GROUP BY user_id HAVING count(*)>1')).rowCount||0;
  const sorted=[...timings].sort((a,b)=>a-b),p95=sorted[Math.ceil(sorted.length*.95)-1],queueMs=performance.now()-started;
  const report={measuredAt:new Date().toISOString(),environment:'PostgreSQL 17 local; servicios directos, sin carga HTTP/WebSocket ni red real',syntheticUsers:volume,rankingSamples:timings.length,rankingP50Ms:sorted[Math.floor(sorted.length*.5)],rankingP95Ms:p95,rankingMaxMs:sorted.at(-1),queueConcurrency:concurrency,queueDurationMs:queueMs,matches,activePlayers:active,errors,duplicatePlayers:duplicates,provisionalTargets:{rankingP95Ms:500,queueDurationMs:15000},passed:p95<500&&queueMs<15000&&errors===0&&duplicates===0&&matches===concurrency/2&&active===concurrency};
  await mkdir(resolve('../../.local'),{recursive:true});await writeFile(resolve('../../.local/sprint2-load.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));if(!report.passed)process.exitCode=1;
 }finally{await db.onModuleDestroy();}
}
run().catch(e=>{console.error(e.message);process.exitCode=1;});
