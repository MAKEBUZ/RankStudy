import {BadRequestException,ConflictException,ForbiddenException,Inject,Injectable,NotFoundException} from '@nestjs/common';
import {randomBytes,randomUUID} from 'node:crypto';
import type {PoolClient} from 'pg';
import {z} from 'zod';
import {Database} from './db';
import {LearningService} from './learning.service';
import {digest} from './auth.service';
import {answerPoints,competitionSettings,eloAfter,rankFor,ranks,searchRange} from './competition.rules';
import {config} from './config';
type Snapshot={id:string;version:number;prompt:string;topic:string;options:string[];correct_index:number;explanation:string;difficulty:number};
type Duel={id:string;subject_id:string;level_id:string;status:string;questions:Snapshot[];round_index:number;round_started_at:Date;round_deadline:Date;winner_id:string|null;finish_reason:string|null};
export function validate<T>(schema:z.ZodType<T>,body:unknown):T{const p=schema.safeParse(body);if(!p.success)throw new BadRequestException({message:'Revisa los campos.',fields:z.flattenError(p.error).fieldErrors});return p.data;}
const subjectSchema=z.object({subjectId:z.string().min(1).max(50)}).strict();

@Injectable()
export class CompetitionService{
 readonly settings={...competitionSettings,initialRange:config.MATCH_INITIAL_RANGE};
 constructor(@Inject(Database) readonly db:Database,@Inject(LearningService) readonly learning:LearningService){}
 async transaction<T>(fn:(c:PoolClient)=>Promise<T>){return this.db.transaction(async c=>{await c.query('SELECT pg_advisory_xact_lock(20261020)');return fn(c);});}
 async actor(session?:string){return this.learning.user(session);}
 async eligibility(c:PoolClient,userId:string,subject:string){
  const r=await c.query('SELECT p.level_id,p.preferences_version,r.elo,u.name,COALESCE(a.asset,$3) AS avatar FROM users u JOIN profiles p ON p.user_id=u.id JOIN user_subjects s ON s.user_id=u.id AND s.subject_id=$2 JOIN subjects cat ON cat.id=s.subject_id AND cat.active=true JOIN subject_ratings r ON r.user_id=u.id AND r.subject_id=$2 LEFT JOIN avatars a ON a.id=p.avatar_id WHERE u.id=$1 AND u.email_verified_at IS NOT NULL',[userId,subject,'/avatars/avatar-1.svg']);
  if(!r.rows[0])throw new ConflictException('Guarda tu perfil y completa u omite la calibración de esta materia antes de jugar.');return r.rows[0];
 }
 async active(c:PoolClient,user:string){return(await c.query('SELECT duel_id FROM duel_players WHERE user_id=$1 AND active=true',[user])).rows[0]?.duel_id as string|undefined;}
 async bank(c:PoolClient,subject:string){const q=await c.query("SELECT id,version,prompt,topic,options,correct_index,explanation,difficulty FROM questions WHERE subject_id=$1 AND status='approved' ORDER BY random() LIMIT $2",[subject,this.settings.rounds]);if(q.rows.length<this.settings.rounds)throw new ConflictException(`Esta materia necesita ${this.settings.rounds} preguntas aprobadas para un duelo.`);return q.rows as Snapshot[];}
 async createDuel(c:PoolClient,a:string,b:string,subject:string){
  if(a===b)throw new BadRequestException('Necesitas otro participante.');
  if(await this.active(c,a)||await this.active(c,b))throw new ConflictException('Uno de los jugadores ya tiene un duelo activo.');
  const first=await this.eligibility(c,a,subject),second=await this.eligibility(c,b,subject);if(first.level_id!==second.level_id)throw new ConflictException('Los jugadores deben compartir nivel y materia.');
  const questions=await this.bank(c,subject),id=randomUUID(),now=new Date();
  await c.query('INSERT INTO duels(id,subject_id,level_id,questions,round_started_at,round_deadline) VALUES($1,$2,$3,$4,$5,$6)',[id,subject,first.level_id,JSON.stringify(questions),now,new Date(+now+this.settings.roundMs)]);
  for(const [user,p]of [[a,first],[b,second]] as const)await c.query('INSERT INTO duel_players(duel_id,user_id,elo_before,name_snapshot,avatar_snapshot) VALUES($1,$2,$3,$4,$5)',[id,user,p.elo,p.name,p.avatar]);
  await c.query("UPDATE matchmaking_queue SET state='matched',duel_id=$1 WHERE user_id=$2 OR user_id=$3",[id,a,b]);return id;
 }
 async joinQueue(session:string|undefined,body:unknown){const user=await this.actor(session),d=validate(subjectSchema,body);await this.transaction(async c=>{
  if(await this.active(c,user.id))throw new ConflictException('Ya tienes un duelo activo.');const p=await this.eligibility(c,user.id,d.subjectId);await this.bank(c,d.subjectId);
  const old=(await c.query('SELECT * FROM matchmaking_queue WHERE user_id=$1',[user.id])).rows[0];if(old?.state==='waiting'&&+new Date(old.expires_at)>Date.now()){if(old.subject_id!==d.subjectId)throw new ConflictException('Cancela la búsqueda actual antes de cambiar de materia.');return;}
  const now=new Date();await c.query("INSERT INTO matchmaking_queue(user_id,subject_id,level_id,elo,preferences_version,state,created_at,expires_at,last_seen_at) VALUES($1,$2,$3,$4,$5,'waiting',$6,$7,$6) ON CONFLICT(user_id) DO UPDATE SET subject_id=$2,level_id=$3,elo=$4,preferences_version=$5,state='waiting',duel_id=NULL,created_at=$6,expires_at=$7,last_seen_at=$6",[user.id,d.subjectId,p.level_id,p.elo,p.preferences_version,now,new Date(+now+this.settings.queueMs)]);await this.match(c);
 });return this.stateFor(user.id);}
 async cancelQueue(session?:string){const u=await this.actor(session);await this.transaction(async c=>{await c.query("UPDATE matchmaking_queue SET state='cancelled' WHERE user_id=$1 AND state='waiting'",[u.id]);});return this.stateFor(u.id);}
 async match(c:PoolClient){
  const now=Date.now();await c.query("UPDATE matchmaking_queue SET state='timed_out' WHERE state='waiting' AND expires_at<=$1",[new Date(now)]);
  // Una preferencia cambiada cancela la búsqueda previa; nunca cambia una partida en curso.
  await c.query("UPDATE matchmaking_queue q SET state='cancelled' FROM profiles p WHERE q.user_id=p.user_id AND q.state='waiting' AND q.preferences_version<>p.preferences_version");
  const waiting=(await c.query("SELECT * FROM matchmaking_queue WHERE state='waiting' AND last_seen_at>$1 ORDER BY created_at,user_id",[new Date(now-6000)])).rows;const taken=new Set<string>();
  for(const a of waiting){if(taken.has(a.user_id))continue;const b=waiting.find(b=>b.user_id!==a.user_id&&!taken.has(b.user_id)&&a.subject_id===b.subject_id&&a.level_id===b.level_id&&Math.abs(a.elo-b.elo)<=Math.max(searchRange(now-+new Date(a.created_at),this.settings.initialRange),searchRange(now-+new Date(b.created_at),this.settings.initialRange)));if(!b)continue;
   // Revalidar permite invalidar colas si se desactiva la materia o cambia la identidad.
   try{await c.query('SAVEPOINT pairing');await this.createDuel(c,a.user_id,b.user_id,a.subject_id);await c.query('RELEASE SAVEPOINT pairing');taken.add(a.user_id);taken.add(b.user_id);}catch(e){await c.query('ROLLBACK TO SAVEPOINT pairing');if(e instanceof ConflictException){await c.query("UPDATE matchmaking_queue SET state='cancelled' WHERE user_id=$1 OR user_id=$2",[a.user_id,b.user_id]);}else throw e;}
  }
 }
 async tick(){await this.transaction(async c=>{await this.match(c);const duels=(await c.query("SELECT * FROM duels WHERE status='playing' ORDER BY id FOR UPDATE")).rows as Duel[];for(const d of duels)await this.advance(c,d);});}
 async advance(c:PoolClient,d:Duel){
  if(d.status!=='playing')return;const players=(await c.query('SELECT * FROM duel_players WHERE duel_id=$1 ORDER BY user_id',[d.id])).rows;
  const gone=players.filter(p=>Date.now()-+new Date(p.last_seen_at)>this.settings.reconnectMs);
  if(gone.length){await this.finish(c,d,gone.length===2?null:players.find(p=>p.user_id!==gone[0].user_id).user_id,'disconnect');return;}
  const count=+(await c.query('SELECT count(*) FROM duel_answers WHERE duel_id=$1 AND round_index=$2',[d.id,d.round_index])).rows[0].count;
  if(count<2&&Date.now()<+new Date(d.round_deadline))return;
  if(d.round_index+1>=d.questions.length){const sorted=[...players].sort((a,b)=>b.score-a.score);await this.finish(c,d,sorted[0].score===sorted[1].score?null:sorted[0].user_id,'completed');}
  else{const now=new Date();await c.query('UPDATE duels SET round_index=round_index+1,round_started_at=$1,round_deadline=$2 WHERE id=$3',[now,new Date(+now+this.settings.roundMs),d.id]);}
 }
 async finish(c:PoolClient,d:Duel,winner:string|null,reason:string){
  if(d.status!=='playing')return;
  const players=(await c.query('SELECT * FROM duel_players WHERE duel_id=$1 ORDER BY user_id FOR UPDATE',[d.id])).rows;
  await c.query("UPDATE duels SET status='finished',winner_id=$1,finish_reason=$2,finished_at=now() WHERE id=$3",[winner,reason,d.id]);
  for(const p of players){const opponent=players.find(x=>x.user_id!==p.user_id);const result=winner===null?0.5:winner===p.user_id?1:0;
   // Si ambos desaparecen no se concede ELO por inactividad; el historial conserva delta cero.
   const after=reason==='disconnect'&&winner===null?p.elo_before:eloAfter(p.elo_before,opponent.elo_before,result);
   await c.query('UPDATE duel_players SET active=false,elo_after=$1 WHERE duel_id=$2 AND user_id=$3',[after,d.id,p.user_id]);
   await c.query('UPDATE subject_ratings SET elo=$1 WHERE user_id=$2 AND subject_id=$3',[after,p.user_id,d.subject_id]);
   await c.query('INSERT INTO elo_history(duel_id,user_id,subject_id,before,after) VALUES($1,$2,$3,$4,$5) ON CONFLICT DO NOTHING',[d.id,p.user_id,d.subject_id,p.elo_before,after]);
   if(rankFor(p.elo_before).id!==rankFor(after).id)await this.notify(c,p.user_id,'rank',`${after>p.elo_before?'Subiste':'Bajaste'} al rango ${rankFor(after).name} en ${d.subject_id}.`,d.id);
  }
 }
 async notify(c:PoolClient,user:string,kind:string,message:string,id:string){await c.query('INSERT INTO competition_notifications(id,user_id,kind,message,reference_id) VALUES($1,$2,$3,$4,$5) ON CONFLICT DO NOTHING',[randomUUID(),user,kind,message,id]);}
 async heartbeat(userId:string){await this.db.pool.query('UPDATE duel_players SET last_seen_at=$1 WHERE user_id=$2 AND active=true',[new Date(),userId]);await this.db.pool.query("UPDATE matchmaking_queue SET last_seen_at=$1 WHERE user_id=$2 AND state='waiting'",[new Date(),userId]);}
 async state(session?:string){const user=await this.actor(session);await this.heartbeat(user.id);return this.stateFor(user.id);}
 async stateFor(userId:string){
  const active=(await this.db.pool.query('SELECT duel_id FROM duel_players WHERE user_id=$1 ORDER BY active DESC,last_seen_at DESC LIMIT 1',[userId])).rows[0];
  const q=(await this.db.pool.query('SELECT state,subject_id,created_at,expires_at,duel_id FROM matchmaking_queue WHERE user_id=$1',[userId])).rows[0];
  const duel=active?await this.view(userId,active.duel_id):null;
  return{serverTime:Date.now(),queue:q?{...q,range:searchRange(Date.now()-+new Date(q.created_at),this.settings.initialRange)}:null,duel,ranks,settings:this.settings};
 }
 async view(userId:string,id:string){
  const member=await this.db.pool.query('SELECT * FROM duel_players WHERE duel_id=$1 AND user_id=$2',[id,userId]);if(!member.rowCount)throw new NotFoundException('Duelo no encontrado.');
  const d=(await this.db.pool.query('SELECT * FROM duels WHERE id=$1',[id])).rows[0] as Duel;const q=d.questions[d.round_index];
  const players=(await this.db.pool.query('SELECT user_id,name_snapshot,avatar_snapshot,score,elo_before,elo_after,last_seen_at FROM duel_players WHERE duel_id=$1 ORDER BY user_id',[id])).rows;
  const mine=(await this.db.pool.query('SELECT option_index FROM duel_answers WHERE duel_id=$1 AND user_id=$2 AND round_index=$3',[id,userId,d.round_index])).rows[0];
  return{id:d.id,subjectId:d.subject_id,status:d.status,roundIndex:d.round_index,total:d.questions.length,deadline:d.round_deadline,winnerId:d.winner_id,finishReason:d.finish_reason,players:players.map(p=>({id:p.user_id,name:p.name_snapshot,avatar:p.avatar_snapshot,score:p.score,eloBefore:p.elo_before,eloAfter:p.elo_after,rank:rankFor(p.elo_after??p.elo_before),connected:Date.now()-+new Date(p.last_seen_at)<6000})),yourAnswer:mine?.option_index??null,question:d.status==='playing'?{id:q.id,version:q.version,prompt:q.prompt,options:q.options}:null};
 }
 async answer(session:string|undefined,id:string,body:unknown){const user=await this.actor(session),data=validate(z.object({roundIndex:z.number().int().min(0),optionIndex:z.number().int().min(0).max(3)}).strict(),body);const received=Date.now();
  await this.transaction(async c=>{const d=(await c.query('SELECT * FROM duels WHERE id=$1 FOR UPDATE',[id])).rows[0] as Duel|undefined;if(!d||!(await c.query('SELECT user_id FROM duel_players WHERE duel_id=$1 AND user_id=$2',[id,user.id])).rowCount)throw new NotFoundException('Duelo no encontrado.');
   if(d.status!=='playing'||d.round_index!==data.roundIndex)throw new ConflictException('La ronda ya cambió.');if(received<+new Date(d.round_started_at))throw new ConflictException('La ronda aún no había comenzado.');if(received>=+new Date(d.round_deadline)||Date.now()>=+new Date(d.round_deadline))throw new ConflictException('Se agotó el tiempo.');
   const q=d.questions[d.round_index],elapsed=Math.max(0,received-+new Date(d.round_started_at)),correct=q.correct_index===data.optionIndex,points=answerPoints(correct,elapsed,this.settings.roundMs);
   const inserted=await c.query('INSERT INTO duel_answers(duel_id,user_id,round_index,option_index,correct,points,elapsed_ms) VALUES($1,$2,$3,$4,$5,$6,$7) ON CONFLICT DO NOTHING RETURNING user_id',[id,user.id,d.round_index,data.optionIndex,correct,points,elapsed]);if(!inserted.rowCount)throw new ConflictException('Ya respondiste esta pregunta.');
   await c.query('UPDATE duel_players SET score=score+$1,last_seen_at=now() WHERE duel_id=$2 AND user_id=$3',[points,id,user.id]);await this.advance(c,d);
  });return this.stateFor(user.id);
 }
 async abandon(session:string|undefined,id:string){const u=await this.actor(session);await this.transaction(async c=>{const d=(await c.query('SELECT * FROM duels WHERE id=$1 FOR UPDATE',[id])).rows[0] as Duel|undefined;const players=(await c.query('SELECT user_id FROM duel_players WHERE duel_id=$1',[id])).rows;if(!d||!players.some(p=>p.user_id===u.id))throw new NotFoundException();if(d.status==='playing')await this.finish(c,d,players.find(p=>p.user_id!==u.id).user_id,'abandon');});return this.stateFor(u.id);}
}
