import {test,expect,type BrowserContext,type Page} from '@playwright/test';
import {Pool} from 'pg';
import {createHash,randomBytes,randomUUID} from 'node:crypto';
import {io} from 'socket.io-client';
const origin={Origin:'http://localhost:3000'};
const digest=(s:string)=>createHash('sha256').update(s).digest('hex');
type Actor={id:string;context:BrowserContext;page:Page};
let db:Pool,actors:Actor[],questionIds:string[];
test.beforeEach(async({browser})=>{
 const target=process.env.E2E_DATABASE_URL||'postgresql://rankstudy:rankstudy_local@localhost:55432/rankstudy';const url=new URL(target);if(!['localhost','127.0.0.1'].includes(url.hostname)||!url.pathname.startsWith('/rankstudy'))throw Error('Solo base local de desarrollo.');db=new Pool({connectionString:target});actors=[];questionIds=[];
 for(let i=0;i<3;i++){
  const id=randomUUID(),token=randomBytes(32).toString('hex'),context=await browser.newContext();const page=await context.newPage();
  await db.query('INSERT INTO users(id,name,email,email_verified_at) VALUES($1,$2,$3,now())',[id,`__E2E Competidor ${i+1}`,`${id}@example.test`]);await db.query('INSERT INTO sessions VALUES($1,$2,$3)',[digest(token),id,new Date(Date.now()+3600000)]);await context.addCookies([{name:'rs_session',value:token,url:'http://localhost:3000',httpOnly:true,sameSite:'Lax'}]);
  expect((await context.request.patch('http://localhost:3000/api/profile',{headers:origin,data:{levelId:'secundaria',subjectIds:['matematicas'],avatarId:`avatar-${i+1}`}})).ok()).toBe(true);expect((await context.request.post('http://localhost:3000/api/calibration',{headers:origin,data:{subjectId:'matematicas',skip:true}})).ok()).toBe(true);actors.push({id,context,page});
 }
 for(let i=0;i<5;i++){
  const id=randomUUID();questionIds.push(id);const q={id,version:1,subject_id:'matematicas',topic:'Aritmética E2E',difficulty:1,prompt:`E2E S2: ¿Cuánto es ${i+3} más dos?`,options:[String(i+5),String(i+4),String(i+3),String(i+2)],correct_index:0,explanation:`Al sumar dos a ${i+3} obtenemos ${i+5}.`,source:'Fixture aislada E2E Sprint 2',license:'CC0-1.0'};
  await db.query("INSERT INTO questions(id,subject_id,topic,difficulty,prompt,options,correct_index,explanation,source,license,status) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,'approved')",[id,q.subject_id,q.topic,q.difficulty,q.prompt,JSON.stringify(q.options),q.correct_index,q.explanation,q.source,q.license]);await db.query('INSERT INTO question_versions VALUES($1,1,$2,now())',[id,JSON.stringify(q)]);
 }
});
test.afterEach(async()=>{
 for(const actor of actors)await actor.context.close();
 const ids=actors.map(a=>a.id);
 try{await db.query('DELETE FROM challenges WHERE sender_id=ANY($1::uuid[]) OR recipient_id=ANY($1::uuid[])',[ids]);const duels=(await db.query('SELECT DISTINCT duel_id FROM duel_players WHERE user_id=ANY($1::uuid[])',[ids])).rows.map(x=>x.duel_id);await db.query('DELETE FROM matchmaking_queue WHERE user_id=ANY($1::uuid[])',[ids]);await db.query('DELETE FROM duels WHERE id=ANY($1::uuid[])',[duels]);await db.query('DELETE FROM subject_ratings WHERE user_id=ANY($1::uuid[])',[ids]);await db.query('DELETE FROM calibrations WHERE user_id=ANY($1::uuid[])',[ids]);await db.query('DELETE FROM question_versions WHERE question_id=ANY($1::uuid[])',[questionIds]);await db.query('DELETE FROM questions WHERE id=ANY($1::uuid[])',[questionIds]);await db.query('DELETE FROM users WHERE id=ANY($1::uuid[])',[ids]);}finally{await db.end();}
});

test('duelo WebSocket entre dos navegadores, reconexión, ELO, progreso y repaso',async({},testInfo)=>{
 test.setTimeout(150000);const [a,b,c]=actors;const errors:string[]=[];for(const actor of [a,b])actor.page.on('pageerror',e=>errors.push(e.message));
 await Promise.all([a.page.goto('/competir'),b.page.goto('/competir')]);for(const actor of [a,b])await expect(actor.page.getByText('En vivo',{exact:true})).toBeVisible({timeout:30000});
 await a.page.getByRole('button',{name:'Buscar rival',exact:true}).click();await expect(a.page.getByText(/Buscando rival/)).toBeVisible();await b.page.getByRole('button',{name:'Buscar rival',exact:true}).click();for(const actor of [a,b])await expect(actor.page.getByText('Pregunta 1 de 5',{exact:true})).toBeVisible({timeout:15000});
 const duel=(await db.query("SELECT d.* FROM duels d JOIN duel_players p ON p.duel_id=d.id WHERE p.user_id=$1 AND p.active=true",[a.id])).rows[0];
 expect((await c.context.request.get(`http://localhost:3000/api/competition/duels/${duel.id}/review`)).status()).toBe(404);expect((await a.context.request.get(`http://localhost:3000/api/competition/duels/${duel.id}/review`)).status()).toBe(403);
 await a.page.screenshot({path:testInfo.outputPath('duelo-en-vivo.png'),fullPage:true});
 const latency=await b.context.newCDPSession(b.page);await latency.send('Network.enable');await latency.send('Network.emulateNetworkConditions',{offline:false,latency:250,downloadThroughput:1024*1024,uploadThroughput:1024*1024});
 for(let round=0;round<5;round++){
  const q=duel.questions[round];await a.page.getByRole('button',{name:new RegExp(`^${String.fromCharCode(65+q.correct_index)}\\s`)}).click();
  if(round===0){await b.context.setOffline(true);await b.page.goto('about:blank');await b.context.setOffline(false);await b.page.goto('/competir');await expect(b.page.getByText('En vivo',{exact:true})).toBeVisible({timeout:15000});await expect(b.page.getByText('Pregunta 1 de 5',{exact:true})).toBeVisible();}
  await b.page.getByRole('button',{name:new RegExp(`^${String.fromCharCode(65+(q.correct_index+1)%4)}\\s`)}).click();
  if(round<4)for(const actor of [a,b])await expect(actor.page.getByText(`Pregunta ${round+2} de 5`,{exact:true})).toBeVisible({timeout:15000});
 }
 await expect(a.page.getByRole('heading',{name:'¡Bien jugado, victoria!'})).toBeVisible({timeout:15000});await expect(b.page.getByRole('heading',{name:'Cada duelo te enseña.'})).toBeVisible();
 const before=(await db.query('SELECT * FROM elo_history WHERE duel_id=$1',[duel.id])).rows;expect(before).toHaveLength(2);expect(before.find(h=>h.user_id===a.id).after).toBe(1011);
 await a.page.getByRole('button',{name:'Revisar mis respuestas'}).click();await expect(a.page.getByRole('button',{name:'Guardar para repasar',exact:true})).toHaveCount(5);await a.page.getByRole('button',{name:'Guardar para repasar',exact:true}).first().click();await expect(a.page.getByRole('button',{name:'Quitar de guardadas',exact:true}).first()).toBeVisible();
 await a.page.getByRole('button',{name:'Mi progreso',exact:true}).click();await expect(a.page.getByRole('img',{name:/Evolución de ELO/})).toBeVisible();await expect(a.page.getByText('1011',{exact:true})).toBeVisible();
 await a.page.screenshot({path:testInfo.outputPath('progreso-escritorio.png'),fullPage:true});await a.page.setViewportSize({width:390,height:844});expect(await a.page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await a.page.screenshot({path:testInfo.outputPath('progreso-movil.png'),fullPage:true});await a.page.goto('/espacio');await expect(a.page.getByRole('heading',{name:'Tu progreso competitivo'})).toBeVisible();await expect(a.page.getByRole('img',{name:/Evolución competitiva del perfil/})).toBeVisible();await expect(a.page.getByText('◆◆ Plata',{exact:true})).toBeVisible();await a.page.setViewportSize({width:1280,height:960});await a.page.screenshot({path:testInfo.outputPath('perfil-rango-y-elo.png'),fullPage:true});expect(errors).toEqual([]);
});

test('grupos, privacidad del ranking, país y reto directo con notificación',async()=>{
 test.setTimeout(90000);const [a,b,c]=actors;await Promise.all([a.page.goto('/competir'),b.page.goto('/competir')]);await expect(a.page.getByText('En vivo',{exact:true})).toBeVisible({timeout:30000});
 await a.page.getByRole('button',{name:'Retos y grupos',exact:true}).click();await a.page.getByLabel('Nombre del grupo').fill('Grupo de prueba E2E');await a.page.getByRole('button',{name:'Crear grupo',exact:true}).click();await expect(a.page.getByText(/Código de invitación:/)).toBeVisible();const group=(await db.query('SELECT id FROM social_groups WHERE owner_id=$1',[a.id])).rows[0];const code=await a.page.locator('strong.font-mono').innerText();
 await b.page.getByRole('button',{name:'Retos y grupos',exact:true}).click();await b.page.getByLabel('Código de invitación',{exact:true}).fill(code);await b.page.getByRole('button',{name:'Unirme al grupo'}).click();await expect(b.page.getByRole('heading',{name:'Grupo de prueba E2E'})).toBeVisible();await b.page.getByRole('button',{name:'Ver ranking',exact:true}).click();await expect(b.page.getByRole('table')).toContainText('__E2E Competidor 1');
 expect((await c.context.request.get(`http://localhost:3000/api/competition/ranking?subjectId=matematicas&scope=group&groupId=${group.id}`)).status()).toBe(403);
 await a.page.getByRole('button',{name:'Crear enlace de reto'}).click();const link=await a.page.getByLabel('Enlace para compartir').inputValue();await b.page.goto(link);await b.page.getByRole('button',{name:'Aceptar reto',exact:true}).click();await expect(a.page.getByText('Pregunta 1 de 5',{exact:true})).toBeVisible({timeout:15000});await expect(b.page.getByText('Pregunta 1 de 5',{exact:true})).toBeVisible();
 const active=(await db.query('SELECT duel_id FROM duel_players WHERE user_id=$1 AND active=true',[a.id])).rows[0];expect((await a.context.request.post(`http://localhost:3000/api/competition/duels/${active.duel_id}/abandon`,{headers:origin,data:{}})).ok()).toBe(true);
 await b.page.getByRole('button',{name:'Retos y grupos',exact:true}).click();await b.page.getByRole('button',{name:'Salir del grupo'}).click();expect((await b.context.request.get(`http://localhost:3000/api/competition/ranking?subjectId=matematicas&scope=group&groupId=${group.id}`)).status()).toBe(403);
 const challenge=await a.context.request.post('http://localhost:3000/api/competition/challenges',{headers:origin,data:{subjectId:'matematicas',recipientId:b.id}});expect(challenge.ok()).toBe(true);await b.page.getByRole('button',{name:'Actualizar retos'}).click();await expect(b.page.getByText('__E2E Competidor 1 · Matemáticas',{exact:true})).toBeVisible();
 await a.page.getByRole('button',{name:'Mi progreso',exact:true}).click();await a.page.getByLabel('País declarado',{exact:false}).selectOption('CO');await a.page.getByRole('checkbox',{name:/Autorizo usar/}).check();await a.page.getByRole('button',{name:'Guardar país'}).click();await expect(a.page.getByRole('status').filter({hasText:'Preferencia de país actualizada'})).toBeVisible();
});

test('Socket.IO rechaza sesiones ausentes y orígenes ajenos',async()=>{
 const cookies=await actors[0].context.cookies();const token=cookies.find(c=>c.name==='rs_session')!.value;
 for(const headers of [{Origin:'http://localhost:3000'},{Origin:'https://otro.example',Cookie:`rs_session=${token}`}]){
  const result=await new Promise<string>((resolve,reject)=>{const s=io('http://localhost:3000',{path:'/api/realtime/socket.io',addTrailingSlash:false,transports:['websocket'],extraHeaders:headers,reconnection:false,timeout:5000});s.on('connect',()=>{s.disconnect();reject(Error('Se aceptó una conexión no autorizada.'));});s.on('connect_error',()=>{s.disconnect();resolve('rechazada');});});expect(result).toBe('rechazada');
 }
});
