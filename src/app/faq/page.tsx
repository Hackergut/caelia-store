import Link from "next/link";

export const metadata = {
  title: "Domande frequenti",
  description:
    "Risposte alle domande più comuni su CAELIA Beauty Mirror Case: materiali, spedizioni, resi, cura del prodotto e pagamenti.",
};

const GROUPS: { title: string; items: { q: string; a: string }[] }[] = [
  {
    title: "Prodotto",
    items: [
      {
        q: "Di che materiale è fatto il CAELIA Beauty Mirror Case?",
        a: "Esterno in pelle vegana e fodera interna in microfibra. Lo specchio è integrato e anti-riflesso, con chiusura magnetica sicura.",
      },
      {
        q: "Quali sono le dimensioni?",
        a: "11,5 x 7,5 x 2 cm, per un peso di circa 120 g. Entra facilmente in borsa o in una piccola pochette.",
      },
      {
        q: "In quali colori è disponibile?",
        a: "In tre tonalità di firma: Burgundy, Cacao e Crema.",
      },
      {
        q: "Come si pulisce?",
        a: "Passa un panno morbido leggermente inumidito sull'esterno. La fodera in microfibra si pulisce a secco. Evita solventi e alcol.",
      },
    ],
  },
  {
    title: "Ordini e spedizioni",
    items: [
      {
        q: "Quanto costa la spedizione?",
        a: "La spedizione è gratuita in Italia per ordini superiori a 60 euro. Sotto tale soglia si applica una tariffa fissa mostrata al checkout.",
      },
      {
        q: "In quanto tempo ricevo l'ordine?",
        a: "In Italia consegniamo di norma in 2–4 giorni lavorativi. Per le spedizioni internazionali i tempi variano in base alla destinazione.",
      },
      {
        q: "Posso tracciare la spedizione?",
        a: "Sì. Appena l'ordine viene spedito ricevi un'email con il numero di tracciamento.",
      },
    ],
  },
  {
    title: "Resi e rimborsi",
    items: [
      {
        q: "Posso restituire il prodotto?",
        a: "Sì, hai 30 giorni dalla consegna per il reso. Il prodotto deve essere integro e nella confezione originale.",
      },
      {
        q: "Quando ricevo il rimborso?",
        a: "Una volta ricevuto e verificato il reso, il rimborso viene emesso entro 5–10 giorni lavorativi sullo stesso metodo di pagamento.",
      },
    ],
  },
  {
    title: "Pagamenti",
    items: [
      {
        q: "Quali metodi di pagamento accettate?",
        a: "Carte di credito e debito principali e i wallet digitali disponibili al checkout. Tutti i pagamenti sono protetti e cifrati.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 lg:px-10 pt-12 pb-24">
      <p className="text-xs uppercase tracking-[0.32em] text-ink/60">Aiuto</p>
      <h1 className="mt-4 font-serif text-5xl leading-[1.05]">Domande frequenti.</h1>
      <p className="mt-4 text-ink/70 leading-relaxed">
        Non trovi quello che cerchi? Scrivici dalla pagina{" "}
        <Link href="/contact" className="text-burgundy underline underline-offset-4">
          Contatti
        </Link>
        .
      </p>

      <div className="mt-12 space-y-12">
        {GROUPS.map((g) => (
          <section key={g.title}>
            <h2 className="text-xs uppercase tracking-[0.22em] text-burgundy">
              {g.title}
            </h2>
            <div className="mt-4 divide-y divide-mist/60 border-t border-mist/60">
              {g.items.map((it) => (
                <details key={it.q} className="group py-4">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 font-serif text-lg leading-snug marker:content-none [&::-webkit-details-marker]:hidden">
                    {it.q}
                    <span
                      aria-hidden="true"
                      className="shrink-0 text-burgundy transition-transform duration-200 group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-ink/70 leading-relaxed">{it.a}</p>
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
