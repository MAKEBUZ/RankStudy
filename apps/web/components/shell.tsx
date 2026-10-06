import Link from 'next/link';
import { ArrowUpRight, BookOpen, Sparkles, Swords, Trophy } from 'lucide-react';

export function Shell({ children }: { children: React.ReactNode }) {
  return <main className="mx-auto min-h-screen max-w-[1600px] p-5 md:p-9 lg:p-12">
    <header className="mb-8 flex items-center justify-between lg:mb-12"><Link href="/" className="flex items-center gap-2.5 text-2xl font-bold tracking-tight" aria-label="RankStudy inicio"><span className="rounded-xl bg-ink p-2 text-brand"><BookOpen size={23} strokeWidth={2.4} /></span>Rank<span className="-ml-2 text-muted">Study</span><span className="ml-1 rounded-md border border-ink/15 px-2 py-1 text-[10px] tracking-widest text-muted">BETA</span></Link><span className="hidden text-sm text-muted sm:block">Un poco mejor, cada día <ArrowUpRight className="ml-1 inline" size={15} /></span></header>
    <div className="grid gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
      <section className="relative overflow-hidden rounded-[2rem] bg-ink px-7 py-10 text-white sm:px-12 lg:min-h-[680px] lg:py-14">
        <div className="absolute -right-16 -top-20 h-80 w-80 rounded-full border border-white/10" aria-hidden="true" /><div className="absolute -right-6 -top-10 h-60 w-60 rounded-full border border-white/10" aria-hidden="true" />
        <span className="relative inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-2 text-xs text-white/80"><span className="h-1.5 w-1.5 rounded-full bg-brand" /> EL CONOCIMIENTO TE LLEVA MÁS LEJOS</span>
        <h1 className="relative mt-10 max-w-lg text-5xl leading-[1.08] font-semibold tracking-[-0.05em] sm:text-6xl xl:text-7xl">Tu próximo nivel<br />empieza <span className="text-brand">aquí.</span></h1>
        <p className="mt-6 max-w-sm text-base leading-7 text-white/65">Convierte lo que estudias en progreso. Pon a prueba tus conocimientos y descubre de lo que eres capaz.</p>
        <div className="relative mt-10 rounded-2xl border border-white/15 bg-white/5 p-5 sm:p-6">
          <div className="flex items-center justify-between"><span className="text-xs tracking-widest text-white/50">ASÍ SERÁ TU RECORRIDO</span><Sparkles size={19} className="text-brand" /></div>
          <div className="mt-6 grid grid-cols-3 gap-3">{[{ icon: BookOpen, title: 'Aprende', text: 'Elige tus materias' }, { icon: Swords, title: 'Compite', text: 'Desafía tu conocimiento' }, { icon: Trophy, title: 'Avanza', text: 'Supera tu mejor nivel' }].map(({ icon: Icon, title, text }, i) => <div key={title}><div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${i === 0 ? 'bg-brand text-ink' : 'bg-white/10 text-white/70'}`}><Icon size={20} /></div><h2 className="font-semibold">{title}</h2><p className="mt-1 text-xs leading-5 text-white/50">{text}</p></div>)}</div>
        </div>
        <p className="mt-7 flex items-center gap-2 text-xs text-white/45"><span className="h-1 w-1 rounded-full bg-brand" /> Estamos construyendo una nueva forma de aprender.</p>
      </section>
      <section className="flex items-center justify-center py-5 lg:py-9"><div className="w-full max-w-md">{children}</div></section>
    </div><footer className="mt-8 flex flex-wrap justify-between gap-2 text-xs text-muted"><span>© {new Date().getFullYear()} RankStudy</span><span>Aprende a tu ritmo. Avanza a tu manera.</span></footer>
  </main>;
}
