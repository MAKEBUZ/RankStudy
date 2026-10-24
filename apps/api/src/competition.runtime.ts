import {HttpException,Inject,Injectable,type OnModuleDestroy} from '@nestjs/common';
import {Server as HttpServer} from 'node:http';
import {Server,Socket} from 'socket.io';
import {z} from 'zod';
import {CompetitionService,validate} from './competition.service';
import {config} from './config';
export const socketPath='/api/realtime/socket.io';
@Injectable()
export class CompetitionRuntime implements OnModuleDestroy{
 private io?:Server;private timer?:ReturnType<typeof setInterval>;private busy=false;private lastPush=0;private lastError=0;
 constructor(@Inject(CompetitionService) private game:CompetitionService){}
 attach(server:HttpServer){
  const io=this.io=new Server(server,{path:socketPath,addTrailingSlash:false,cors:{origin:new URL(config.WEB_ORIGIN).origin,credentials:true},allowRequest:(req,cb)=>cb(null,req.headers.origin===new URL(config.WEB_ORIGIN).origin||(!req.headers.origin&&req.headers['sec-fetch-site']==='same-origin')),maxHttpBufferSize:4096,pingInterval:5000,pingTimeout:10000});
  io.use(async(socket,next)=>{try{const session=socket.request.headers.cookie?.match(/(?:^|;\s*)rs_session=([a-f0-9]{64})(?:;|$)/)?.[1];const user=await this.game.actor(session);if([...io.sockets.sockets.values()].filter(s=>s.data.userId===user.id).length>=3||io.sockets.sockets.size>=200)throw Error('Límite de conexiones del piloto.');socket.data={session,userId:user.id};next();}catch{next(new Error('Inicia sesión con una cuenta verificada.'));}});
  io.on('connection',socket=>{
   let window=Date.now(),count=0;
   const handler=(name:string,fn:(data:unknown)=>Promise<unknown>)=>socket.on(name,async(data:unknown,ack:unknown)=>{if(Date.now()-window>5000){window=Date.now();count=0;}if(++count>20){if(typeof ack==='function')ack({ok:false,message:'Demasiadas solicitudes. Espera unos segundos.'});return;}
    try{const result=await fn(data);if(typeof ack==='function')ack({ok:true,data:result});}catch(e){let message='No se pudo completar la acción. Actualiza el estado e inténtalo otra vez.';if(e instanceof HttpException&&e.getStatus()<500){const response=e.getResponse();if(typeof response==='string')message=response;else if(typeof (response as {message?:unknown}).message==='string')message=(response as {message:string}).message;}if(typeof ack==='function')ack({ok:false,message});}
   });
   handler('sync',()=>this.game.state(socket.data.session));
   handler('queue:join',d=>this.game.joinQueue(socket.data.session,d));
   handler('queue:cancel',()=>this.game.cancelQueue(socket.data.session));
   handler('duel:answer',d=>{const v=validate(z.object({duelId:z.uuid(),roundIndex:z.number().int().min(0),optionIndex:z.number().int().min(0).max(3)}).strict(),d);return this.game.answer(socket.data.session,v.duelId,{roundIndex:v.roundIndex,optionIndex:v.optionIndex});});
   handler('duel:abandon',d=>this.game.abandon(socket.data.session,validate(z.object({duelId:z.uuid()}).strict(),d).duelId));
  });
  this.timer=setInterval(()=>void this.cycle(),250);this.timer.unref();
 }
 private async cycle(){if(this.busy)return;this.busy=true;try{
  await this.game.tick();if(Date.now()-this.lastPush<1000)return;this.lastPush=Date.now();
  const groups=new Map<string,Socket[]>();for(const socket of this.io?.sockets.sockets.values()||[]){const list=groups.get(socket.data.userId)||[];list.push(socket);groups.set(socket.data.userId,list);}
  for(const [userId,sockets]of groups){const valid:Socket[]=[];for(const s of sockets){try{await this.game.actor(s.data.session);valid.push(s);}catch{s.emit('session:expired');s.disconnect(true);}}if(!valid.length)continue;const state=await this.game.stateFor(userId);for(const socket of valid)socket.emit('competition:state',state);}
 }catch{if(Date.now()-this.lastError>30000){this.lastError=Date.now();console.error('No se pudo actualizar la competición. Verifica migraciones y PostgreSQL.');}}finally{this.busy=false;}}
 async onModuleDestroy(){if(this.timer)clearInterval(this.timer);if(this.io)await new Promise<void>(resolve=>this.io!.close(()=>resolve()));}
}
