import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gift card",
  description:
    "Regalare CAELIA: gift card digitale e confezione regalo al checkout.",
};

export default function GiftCardsPage() {
  return (
    <div className="shell max-w-3xl pt-16 pb-24">
      <p className="text-xs uppercase tracking-[0.32em] text-ink/60">Regali</p>
      <h1 className="mt-4 font-serif fluid-h2">
        Gift card e confezione.
      </h1>
      <p className="mt-6 text-lg text-ink/80 leading-relaxed">
        Al checkout puoi aggiungere confezione regalo (€ 4,90) e un messaggio.
        La gift card digitale arriverà con Shopify: nel frattempo spedisci il
        Beauty Mirror Case all’indirizzo del destinatario.
      </p>
      <Link
        href="/products"
        className="mt-10 inline-flex bg-charcoal text-cream px-8 py-4 text-xs uppercase tracking-[0.22em] hover:bg-burgundy transition-colors btn-press"
      >
        Scegli un Beauty Mirror Case
      </Link>
    </div>
  );
}
