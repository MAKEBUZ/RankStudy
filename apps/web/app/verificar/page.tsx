import { Suspense } from 'react';
import { VerificationScreen } from '../../components/verification-screen';
export default function VerifyPage() { return <Suspense fallback={<p className="p-10">Cargando verificación…</p>}><VerificationScreen /></Suspense>; }
