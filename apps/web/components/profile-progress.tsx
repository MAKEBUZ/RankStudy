'use client';
import {useEffect,useState} from 'react';
import Link from 'next/link';
import {api} from '../lib/api';
import type {Stats} from '../lib/competition';

export function ProfileProgress({subjectIds}:{subjectIds:string[]}){
 const [subject,setSubject]=useState(subjectIds[0]||''),[stats,setStats]=useState<Stats|null>(null),[error,setError]=useState('');
 useEffect(()=>{if(!subjectIds.includes(subject))setSubject(subjectIds[0]||'');},[subjectIds,subject]);
 useEffect(()=>{if(!subject)return;let live=true;setStats(null);setError('');api<Stats>(`/competition/stats?subjectId=${encodeURIComponent(subject)}&days=30`).then(s=>live&&setStats(s)).catch(e=>live&&setError(e.message));return()=>{live=false;};},[subject]);
 const points=stats?.history.length?[stats.history[0].before,...stats.history.map(h=>h.after)]:[];
 const low=points.length?Math.min(...points)-40:400,high=points.length?Math.max(...points)+40:1600;
 return <section className="rounded-2xl border border-ink/10 bg-white p-6" aria-label="Progreso competitivo del perfil"><div className="flex flex-wrap items-center justify-between gap-4"><h2 className="text-lg font-semibold">Tu progreso competitivo</h2><Link href="/competir" className="text-sm underline underline-offset-4">Competir y ver estadísticas</Link></div><label className="mt-4 block text-sm">Materia del progreso<select className="mt-2 w-full rounded-xl border border-ink/20 bg-white px-4 py-3 text-sm" value={subject} onChange={e=>setSubject(e.target.value)}>{subjectIds.map(id=><option key={id} value={id}>{id==='matematicas'?'Matemáticas':id==='fisica'?'Física':id}</option>)}</select></label>
 {error?<p className="mt-4 text-sm text-red-800">{error}</p>:!stats?<p className="mt-4 text-sm text-muted">Cargando progreso…</p>:<><div className="mt-5 flex flex-wrap items-center gap-4"><strong className="text-2xl">{stats.elo??'—'} <span className="text-sm font-normal">ELO</span></strong>{stats.rank&&<span className="rounded-xl bg-paper px-4 py-2 text-sm font-semibold" style={{color:stats.rank.color}}>{stats.rank.badge} {stats.rank.name}</span>}</div>
 {points.length?<><svg className="mt-5 w-full" viewBox="0 0 640 190" role="img" aria-label={`Evolución competitiva del perfil: ${points.join(', ')} ELO`}><title>ELO de tus duelos en los últimos treinta días</title><text x="10" y="15" fontSize="12" fill="#65746c">{high} ELO</text><path d="M20 25V165H620" stroke="#d8dfd5" fill="none"/><polyline points={points.map((v,i)=>`${20+i*600/Math.max(1,points.length-1)},${160-(v-low)/(high-low)*125}`).join(' ')} stroke="#59882d" strokeWidth="3" fill="none"/>{points.map((v,i)=><circle key={i} cx={20+i*600/Math.max(1,points.length-1)} cy={160-(v-low)/(high-low)*125} r="4" fill="#142821"/>)}<text x="10" y="185" fontSize="12" fill="#65746c">{low} ELO</text></svg><details className="mt-3 text-sm"><summary className="cursor-pointer">Ver historial de ELO</summary><ul className="mt-3 space-y-2">{stats.history.map(h=><li key={h.duel_id}>{new Date(h.created_at).toLocaleDateString('es-CO')}: {h.before} → {h.after} ELO</li>)}</ul></details></>:<p className="mt-4 text-sm leading-6 text-muted">{stats.elo===null?'Completa u omite la calibración para obtener tu ELO inicial.':'Juega un duelo para empezar a ver tu evolución. Tu ELO inicial ya está guardado.'}</p>}</>}
 </section>;
}
