'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { CheckCircle2, MailCheck } from 'lucide-react';
import { api, ApiError } from '../lib/api';
import { Shell } from './shell';
export function VerificationScreen() {
  const [token, setToken] = useState<string | null>(null), [loaded, setLoaded] = useState(false);
  const readFragment = useRef(false);
  useEffect(() => {
    if (readFragment.current) return;
    readFragment.current = true;
    setToken(new URLSearchParams(window.location.hash.slice(1)).get('token'));
    window.history.replaceState({}, '', '/verificar');
    setLoaded(true);
  }, []);
  const [busy, setBusy] = useState(false), [done, setDone] = useState(false), [error, setError] = useState('');
  const pending = useRef(false);
  async function verify() {
    if (pending.current) return; pending.current = true; setBusy(true); setError('');
    try { await api('/auth/verify', { token }); setDone(true); window.history.replaceState({}, '', '/verificar'); }
    catch (e) { setError((e as ApiError).message); }
    finally { setBusy(false); pending.current = false; }
  }
  return <Shell><div className="mb-7 inline-flex rounded-2xl bg-brand/40 p-4">{done ? <CheckCircle2 size={30} /> : <MailCheck size={30} />}</div><h2 className="text-4xl font-semibold tracking-tight">{done ? 'Ya eres parte.' : 'Confirma tu correo.'}</h2><p className="mt-4 text-sm leading-7 text-muted">{done ? 'Tu cuenta está verificada. Vuelve a tu espacio para continuar.' : 'Confirma que este correo te pertenece. El enlace se utiliza una sola vez.'}</p>{!done && token && <button disabled={busy} onClick={verify} className="mt-8 w-full rounded-xl bg-ink p-4 font-semibold text-white">{busy ? 'Verificando…' : 'Verificar mi correo'}</button>}{!done && loaded && !token && <p role="alert" className="mt-5 text-red-700">Falta el enlace de verificación. Solicita otro desde tu cuenta.</p>}{error && <p role="alert" className="mt-5 rounded-xl bg-red-50 p-4 text-sm text-red-800">{error}</p>}<Link href="/" className="mt-6 inline-block text-sm font-semibold underline underline-offset-4">{done ? 'Continuar a mi cuenta' : 'Volver a mi cuenta'}</Link></Shell>;
}
