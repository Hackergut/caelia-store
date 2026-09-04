import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Resi",
  description: "Resi gratuiti entro 30 giorni.",
};

export default function ReturnsPage() {
  return (
    <div className="shell max-w-3xl pt-16 pb-24 space-y-10">
      <header>
        <p className="text-xs uppercase tracking-[0.32em] text-ink/60">Resi</p>
        <h1 className="mt-4 font-serif fluid-h2">30 giorni, senza domande.</h1>
      </header>
      <ol className="space-y-6">
        {[
          { n: "01", t: "Scrivici", d: "ciao@caelia.com con il numero d’ordine. Etichetta entro 24 ore." },
          { n: "02", t: "Imballa", d: "Confezione originale. Cosmetici aperti non rimborsabili." },
          { n: "03", t: "Spedisci", d: "Rimborso entro 5 giorni lavorativi dal ricevimento." },
        ].map((s) => (
          <li key={s.n} className="flex gap-6">
            <span className="font-serif text-2xl text-rose">{s.n}</span>
            <div>
              <p className="font-serif text-2xl">{s.t}</p>
              <p className="mt-1 text-ink/70">{s.d}</p>
            </div>
          </li>
        ))}
      </ol>
      <Link href="/shipping" className="text-xs uppercase tracking-[0.22em] nav-link">
        Spedizioni →
      </Link>
    </div>
  );
}
