import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Resi",
  description: "Resi gratuiti entro 30 giorni. Come restituire un ordine CAELIA.",
};

export default function ReturnsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 lg:px-10 pt-16 pb-24 space-y-10">
      <header>
        <p className="text-xs uppercase tracking-[0.32em] text-ink/60">Resi</p>
        <h1 className="mt-4 font-serif text-5xl leading-[1.05]">
          30 giorni, senza domande.
        </h1>
        <p className="mt-4 text-lg text-ink/80">
          Se il Beauty Mirror Case non è quello che cercavi, lo riprendiamo.
          Il prodotto deve essere integro e nella confezione originale.
        </p>
      </header>
      <ol className="space-y-6">
        {[
          {
            n: "01",
            t: "Scrivici",
            d: "Invia una mail a ciao@caelia.com con il numero d’ordine. Ti rispondiamo entro 24 ore con l’etichetta di reso.",
          },
          {
            n: "02",
            t: "Imballa",
            d: "Usa la scatola originale. Non aprire i prodotti cosmetici: per igiene non sono rimborsabili se aperti.",
          },
          {
            n: "03",
            t: "Spedisci",
            d: "Consegna al corriere. Il rimborso parte entro 5 giorni lavorativi dal ricevimento in magazzino.",
          },
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
      <p className="text-sm text-ink/60">
        Dettagli su tempi e costi:{" "}
        <Link href="/shipping" className="underline">
          spedizioni e resi
        </Link>
        .
      </p>
    </div>
  );
}
