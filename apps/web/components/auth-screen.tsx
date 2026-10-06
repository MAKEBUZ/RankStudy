'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Check, Eye, EyeOff, LoaderCircle, Mail, ShieldCheck } from 'lucide-react';
import { api, ApiError, type User } from '../lib/api';
import { Shell } from './shell';

const inputStyle = 'w-full rounded-xl border border-ink/15 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-ink focus:ring-2 focus:ring-brand/60';
const buttonStyle = 'flex w-full items-center justify-center gap-2 rounded-xl bg-ink px-5 py-4 text-sm font-semibold text-white transition hover:bg-ink/90';
export function AuthScreen() {
  const [mode, setMode] = useState<'register' | 'login'>('register');
  const [user, setUser] = useState<User | null>(null), [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false), [show, setShow] = useState(false);
  const [error, setError] = useState(''), [notice, setNotice] = useState('');
  const [fields, setFields] = useState<Record<string, string[]>>({});
  const [cooldown, setCooldown] = useState(0);
  const pending = useRef(false);
  useEffect(() => { api<User>('/auth/me').then(setUser).catch((e: ApiError) => { if (e.status !== 401) setError(e.message); }).finally(() => setReady(true)); }, []);
  useEffect(() => { if (!cooldown) return; const timer = setTimeout(() => setCooldown(cooldown - 1), 1000); return () => clearTimeout(timer); }, [cooldown]);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (pending.current) return; pending.current = true; setBusy(true); setError(''); setFields({}); setNotice('');
    const data = new FormData(event.currentTarget);
    try {
      const result = await api<{ user: User; emailSent?: boolean; resendAfter?: number }>(`/auth/${mode}`, { ...(mode === 'register' ? { name: data.get('name') } : {}), email: data.get('email'), password: data.get('password') });
      setUser(result.user);
      if (mode === 'register') { setCooldown(result.resendAfter || 60); setNotice(result.emailSent ? 'Te enviamos el enlace de verificación.' : 'Tu cuenta se creó, pero no pudimos enviar el correo. Puedes solicitar otro enlace.'); }
    } catch (e) { const err = e as ApiError; setError(err.message); setFields(err.fields || {}); }
    finally { setBusy(false); pending.current = false; }
  }
  async function action(kind: 'resend' | 'refresh' | 'logout' | 'pvp') {
    if (pending.current) return; pending.current = true; setBusy(true); setError(''); setNotice('');
    try {
      if (kind === 'resend') { const r = await api<{ emailSent: boolean; resendAfter: number }>('/auth/resend', {}); setCooldown(r.resendAfter); setNotice(r.emailSent ? 'Nuevo enlace enviado. Revisa tu bandeja de entrada.' : 'No se pudo enviar el correo. Espera el tiempo indicado y vuelve a intentarlo.'); }
      if (kind === 'refresh') { const u = await api<User>('/auth/me'); setUser(u); if (!u.verified) setNotice('Tu correo todavía está pendiente de verificación.'); }
      if (kind === 'logout') { await api('/auth/logout', {}); setUser(null); setMode('login'); }
      if (kind === 'pvp') { const r = await api<{ message: string }>('/pvp/access'); setNotice(r.message); }
    } catch (e) { const err = e as ApiError; setError(err.message); if (err.retryAfter) setCooldown(err.retryAfter); if (err.status === 401) setUser(null); }
    finally { setBusy(false); pending.current = false; }
  }
  return <Shell>{!ready ? <p role="status" className="text-muted">Preparando tu espacio…</p> : <>
    {user ? <><span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/40 text-ink">{user.verified ? <ShieldCheck size={28} /> : <Mail size={28} />}</span><p className="mt-7 text-xs font-semibold tracking-[.18em] text-muted">{user.verified ? 'TODO LISTO' : 'UN PASO MÁS'}</p><h2 className="mt-3 text-4xl font-semibold tracking-tight">{user.verified ? `Bienvenido, ${user.name.split(' ')[0]}.` : 'Revisa tu correo.'}</h2><p className="mt-4 text-sm leading-7 text-muted">{user.verified ? 'Tu cuenta está verificada. Pronto podrás elegir tus materias y empezar a competir.' : <>Enviamos un enlace a <strong className="break-all text-ink">{user.email}</strong>. Ábrelo y confirma tu cuenta para continuar.</>}</p>
      <div className="mt-8 space-y-3">{user.verified ? <button className={buttonStyle} disabled={busy} onClick={() => action('pvp')}>Comprobar acceso a duelos <ArrowRight size={17} /></button> : <><button className={buttonStyle} disabled={busy} onClick={() => action('refresh')}>Ya verifiqué mi correo <Check size={17} /></button><button className="w-full rounded-xl border border-ink/20 px-5 py-3 text-sm font-semibold" disabled={busy || cooldown > 0} onClick={() => action('resend')}>{cooldown ? `Reenviar en ${cooldown} s` : 'Reenviar enlace'}</button></>}<button disabled={busy} className="mt-2 w-full p-2 text-sm text-muted underline underline-offset-4" onClick={() => action('logout')}>Cerrar sesión</button></div>
    </> : <><p className="text-xs font-semibold tracking-[.18em] text-muted">TU NUEVO PUNTO DE PARTIDA</p><h2 className="mt-3 text-4xl font-semibold tracking-[-.04em]">{mode === 'register' ? 'Crea tu cuenta.' : 'Qué bueno verte.'}</h2><p className="mt-3 text-sm leading-6 text-muted">{mode === 'register' ? 'El primer paso para superar tu mejor versión.' : 'Inicia sesión para continuar con tu aprendizaje.'}</p>
      <div className="mt-7 flex rounded-xl bg-ink/5 p-1" aria-label="Acceso">{(['register', 'login'] as const).map(value => <button key={value} type="button" aria-pressed={mode === value} disabled={busy} onClick={() => { setMode(value); setError(''); setFields({}); }} className={`flex-1 rounded-lg py-2.5 text-sm font-semibold ${mode === value ? 'bg-white text-ink shadow-sm' : 'text-muted'}`}>{value === 'register' ? 'Crear cuenta' : 'Iniciar sesión'}</button>)}</div>
      <form onSubmit={submit} className="mt-7 space-y-5">
        {mode === 'register' && <div><label htmlFor="name" className="mb-2 block text-sm font-semibold">Tu nombre</label><input id="name" name="name" placeholder="¿Cómo te llamas?" autoComplete="name" minLength={2} maxLength={80} required className={inputStyle} aria-invalid={!!fields.name} aria-describedby={fields.name ? 'name-error' : undefined} />{fields.name && <p id="name-error" className="mt-2 text-xs text-red-700">{fields.name[0]}</p>}</div>}
        <div><label htmlFor="email" className="mb-2 block text-sm font-semibold">Correo electrónico</label><input id="email" name="email" type="email" placeholder="tu@correo.com" autoComplete="email" maxLength={254} required className={inputStyle} aria-invalid={!!fields.email} aria-describedby={fields.email ? 'email-error' : undefined} />{fields.email && <p id="email-error" className="mt-2 text-xs text-red-700">{fields.email[0]}</p>}</div>
        <div><label htmlFor="password" className="mb-2 block text-sm font-semibold">Contraseña</label><div className="relative"><input id="password" name="password" type={show ? 'text' : 'password'} placeholder={mode === 'register' ? 'Al menos 12 caracteres' : 'Tu contraseña'} autoComplete={mode === 'register' ? 'new-password' : 'current-password'} minLength={mode === 'register' ? 12 : 1} maxLength={128} required className={`${inputStyle} pr-12`} aria-invalid={!!fields.password} aria-describedby="password-help" /><button type="button" aria-label={show ? 'Ocultar contraseña' : 'Mostrar contraseña'} aria-pressed={show} className="absolute inset-y-0 right-0 px-4 text-muted" onClick={() => setShow(!show)}>{show ? <EyeOff size={18} /> : <Eye size={18} />}</button></div><p id="password-help" className={`mt-2 text-xs ${fields.password ? 'text-red-700' : 'text-muted'}`}>{fields.password?.[0] || (mode === 'register' ? 'Una frase larga es una buena forma de empezar.' : 'Usa la contraseña con la que creaste tu cuenta.')}</p></div>
        <button disabled={busy} className={buttonStyle}>{busy ? <><LoaderCircle size={18} className="animate-spin" /> Un momento…</> : <>{mode === 'register' ? 'Crear mi cuenta' : 'Entrar a mi cuenta'} <ArrowRight size={17} /></>}</button>
      </form><p className="mt-5 flex items-center justify-center gap-2 text-xs text-muted"><ShieldCheck size={15} /> Tu contraseña se guarda de forma segura.</p>
    </>}
    {error && <p role="alert" className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-800">{error}</p>}{notice && <p role="status" className="mt-5 rounded-xl border border-ink/10 bg-white p-4 text-sm leading-6">{notice}</p>}
  </>}</Shell>;
}
