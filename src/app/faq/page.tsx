import type { Metadata } from "next";
import Script from "next/script";
import { faqJsonLd } from "@/lib/json-ld";

export const metadata: Metadata = {
  title: "Domande frequenti",
  description: "Le risposte alle domande più comuni su CAELIA.",
};

const QUESTIONS = [
  {
    q: "Cosa contiene il Beauty Mirror Case?",
    a: "Specchio integrato anti-riflesso, matita contorno labbra dalla formula cremosa, lip gloss non appiccicoso. Il tutto in un astuccio compatto con chiusura magnetica.",
  },
  {
    q: "La matita e il gloss sono ricaricabili?",
    a: "La versione attuale è monouso, pensata per garantire la freschezza del prodotto. Le ricariche saranno disponibili a partire dall autunno 2027.",
  },
  {
    q: "Quanto dura la spedizione?",
    a: "Italia: 3-5 giorni standard. Europa: 4-7 giorni. USA e Dubai: 5-9 giorni. Express disponibile al checkout.",
  },
  {
    q: "Posso regalarlo?",
    a: "Si. Aggiungi al carrello e inserisci l indirizzo del destinatario al checkout. Aggiungeremo un biglietto su richiesta.",
  },
  {
    q: "La pelle è vera?",
    a: "No. Usiamo pelle vegana certificata, di alta qualità e resistente, prodotta in Italia.",
  },
  {
    q: "Avete uno store fisico?",
    a: "Per ora vendiamo solo online. Stiamo selezionando partner retail a Los Angeles e Dubai. Iscriviti alla newsletter per essere la prima a saperlo.",
  },
];

export default function FaqPage() {
  const ldFaq = faqJsonLd(QUESTIONS.map((q) => ({ question: q.q, answer: q.a })));
  return (
    <>
    <Script id="ld-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldFaq) }} />
    <div className="mx-auto max-w-3xl px-6 lg:px-10 pt-16 pb-24">
      <p className="text-xs uppercase tracking-[0.32em] text-ink/60">FAQ</p>
      <h1 className="mt-4 font-serif text-5xl leading-[1.05]">
        Domande frequenti.
      </h1>

      <div className="mt-12 divide-y divide-mist/60 border-t border-b border-mist/60">
        {QUESTIONS.map((item, i) => (
          <details key={i} className="group py-6">
            <summary className="flex items-center justify-between gap-4 cursor-pointer list-none">
              <span className="font-serif text-xl">{item.q}</span>
              <span className="text-2xl group-open:rotate-45 transition-transform">
                +
              </span>
            </summary>
            <p className="mt-3 text-ink/70 max-w-2xl leading-relaxed">
              {item.a}
            </p>
          </details>
        ))}
      </div>
    </div>
    </>
  );
}
