"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function SuccessView({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    searchParams.then((p) => {
      if (!cancelled) setOrderId(p.order ?? null);
    });
    return () => {
      cancelled = true;
    };
  }, [searchParams]);

  return (
    <div className="shell max-w-2xl py-24 text-center">
      <div className="mx-auto h-20 w-20 rounded-full bg-rose/10 flex items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          className="h-10 w-10 text-rose"
          aria-hidden="true"
        >
          <path
            d="M5 13l4 4L19 7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <p className="mt-8 text-xs uppercase tracking-[0.32em] text-ink/60">
        Ordine confermato
      </p>
      <h1 className="mt-4 font-serif fluid-h2">
        Grazie.
      </h1>
      <p className="mt-6 text-lg text-ink/80">
        Il tuo ordine {orderId ? <strong>{orderId}</strong> : null} è in
        preparazione. Ti abbiamo inviato una conferma via email.
      </p>
      <p className="mt-4 text-sm text-ink/70">
        Riceverai il numero di tracciamento non appena il pacco lascera il
        nostro magazzino.
      </p>

      <div className="mt-12 grid gap-4 sm:grid-cols-3 text-sm">
        <div className="rounded-md bg-cream-deep p-5 text-left">
          <p className="text-xs uppercase tracking-[0.18em] text-ink/60">
            Spedizione
          </p>
          <p className="mt-2 font-serif text-lg">3-5 giorni</p>
          <p className="text-ink/70">Con corriere espresso tracciato.</p>
        </div>
        <div className="rounded-md bg-cream-deep p-5 text-left">
          <p className="text-xs uppercase tracking-[0.18em] text-ink/60">
            Resi
          </p>
          <p className="mt-2 font-serif text-lg">30 giorni</p>
          <p className="text-ink/70">Resi gratuiti, senza domande.</p>
        </div>
        <div className="rounded-md bg-cream-deep p-5 text-left">
          <p className="text-xs uppercase tracking-[0.18em] text-ink/60">
            Supporto
          </p>
          <p className="mt-2 font-serif text-lg">ciao@caelia.com</p>
          <p className="text-ink/70">Ti rispondiamo entro 24 ore.</p>
        </div>
      </div>

      <div className="mt-12 flex flex-wrap justify-center gap-3">
        <Link
          href={orderId ? `/ordini/${orderId}` : "/products"}
          className="inline-flex items-center justify-center bg-charcoal text-cream px-8 py-4 text-xs uppercase tracking-[0.22em] hover:bg-rose transition-colors"
        >
          Stato del tuo ordine
        </Link>
        <Link
          href="/journal"
          className="inline-flex items-center justify-center border border-charcoal px-8 py-4 text-xs uppercase tracking-[0.22em] nav-link"
        >
          Leggi il journal
        </Link>
      </div>
    </div>
  );
}