import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wholesale",
  description: "Partnership e wholesale CAELIA.",
};

export default function WholesalePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 lg:px-10 pt-16 pb-24">
      <p className="text-xs uppercase tracking-[0.32em] text-ink/60">
        Partnership
      </p>
      <h1 className="mt-4 font-serif text-5xl leading-[1.05]">
        Wholesale e stockist.
      </h1>
      <p className="mt-6 text-lg text-ink/80 leading-relaxed">
        Selezioniamo boutique, concept store e spa. Minimo d’ordine e listino
        su richiesta.
      </p>
      <a
        href="mailto:partnerships@caelia.com"
        className="mt-10 inline-flex bg-charcoal text-cream px-8 py-4 text-xs uppercase tracking-[0.22em] hover:bg-rose transition-colors btn-press"
      >
        partnerships@caelia.com
      </a>
    </div>
  );
}
