import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { useLock } from "@/lib/lock";

export const Route = createFileRoute("/consegnato")({
  head: () => ({ meta: [{ title: "CAELIA · Consegna" }] }),
  component: ConsegnatoPage,
});

function ConsegnatoPage() {
  const unlock = useLock((s) => s.unlock);
  useEffect(() => {
    unlock();
  }, [unlock]);

  return (
    <section className="bg-berry text-rosa">
      <div className="shell max-w-3xl py-24 md:py-32">
        <p className="type-meta text-rosa/55">Pagamento ricevuto</p>
        <h1 className="type-display-md mt-4">Sbloccato.</h1>
        <p className="mt-6 max-w-lg leading-relaxed text-rosa/80">
          Watermark rimosso su questo browser. Tema Shopify e sito finale sono
          disponibili da qui.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          <Link to="/" className="border border-rosa/25 p-5 transition-colors hover:bg-rosa/10">
            <p className="type-meta text-rosa/50">01</p>
            <p className="mt-3 font-serif text-2xl">Sito live</p>
            <p className="mt-2 text-sm text-rosa/70">Home senza watermark, come in consegna.</p>
          </Link>
          <Link to="/download" className="border border-rosa/25 p-5 transition-colors hover:bg-rosa/10">
            <p className="type-meta text-rosa/50">02</p>
            <p className="mt-3 font-serif text-2xl">Tema Shopify</p>
            <p className="mt-2 text-sm text-rosa/70">Download zip sbloccato. Upload in Admin.</p>
          </Link>
          <a
            href="/CAELIA-consuntivo-01-2026.pdf"
            className="border border-rosa/25 p-5 transition-colors hover:bg-rosa/10"
          >
            <p className="type-meta text-rosa/50">03</p>
            <p className="mt-3 font-serif text-2xl">Consuntivo</p>
            <p className="mt-2 text-sm text-rosa/70">PDF con voci, ore, saldo 200 €.</p>
          </a>
        </div>
      </div>
    </section>
  );
}
