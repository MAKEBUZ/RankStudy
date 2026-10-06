import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'RankStudy · Aprende. Compite. Avanza.', description: 'Tu siguiente nivel empieza con lo que aprendes hoy.' };
export default function Layout({ children }: { children: React.ReactNode }) { return <html lang="es"><body className="min-h-screen antialiased">{children}</body></html>; }
