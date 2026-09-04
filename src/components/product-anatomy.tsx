"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type Part = {
  id: string;
  n: string;
  title: string;
  body: string;
};

const PARTS: Part[] = [
  {
    id: "pocket",
    n: "01",
    title: "Tasca frontale",
    body: "La sovrapposizione cucita a metà altezza trattiene matita e gloss in verticale: si sfilano con un dito, senza bottoni né linguette.",
  },
  {
    id: "logo",
    n: "02",
    title: "Logo impresso",
    body: "Il wordmark CAELIA è inciso nella pelle, non stampato: non si scrosta e resta leggibile negli anni.",
  },
  {
    id: "stitch",
    n: "03",
    title: "Cucitura perimetrale",
    body: "Filo tono su tono lungo tutto il bordo arrotondato: tiene la struttura piatta e protegge la pelle dagli urti in borsa.",
  },
  {
    id: "two-pieces",
    n: "04",
    title: "Due pezzi separati",
    body: "Astuccio e specchio sono indipendenti: usi lo specchio con una mano mentre l'altra tiene il lip combo.",
  },
  {
    id: "mirror",
    n: "05",
    title: "Specchio anti-riflesso",
    body: "Superficie infrangibile montata a filo: riflette senza distorcere, anche con luce laterale o in penombra.",
  },
  {
    id: "frame",
    n: "06",
    title: "Cornice in pelle",
    body: "La pelle avvolge lo specchio su tutti e quattro i lati: nessun bordo di vetro esposto, nessuna scheggia.",
  },
];

export function ProductAnatomy() {
  const [active, setActive] = useState<string>("pocket");

  return (
    <section className="border-t border-mist/40 bg-cream">
      <div className="shell section-y">
        <p className="text-[11px] uppercase tracking-[0.32em] text-ink/40">
          Anatomia
        </p>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
          <h2 className="fluid-h2 font-light">Ogni parte ha un perché.</h2>
          <p className="max-w-sm text-sm leading-relaxed text-ink/65">
            Sei dettagli, nessuno decorativo.
          </p>
        </div>

        <ol className="mt-8 grid gap-x-14 md:mt-10 md:grid-cols-2">
          {PARTS.map((h) => {
            const isActive = active === h.id;
            return (
              <li key={h.id} className="border-t border-mist/70">
                <button
                  type="button"
                  onClick={() => setActive(h.id)}
                  onMouseEnter={() => setActive(h.id)}
                  className="flex w-full items-start gap-4 py-5 text-left"
                  aria-expanded={isActive}
                >
                  <span
                    className={cn(
                      "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[10px] tabular-nums transition-colors",
                      isActive
                        ? "border-burgundy bg-burgundy text-cream"
                        : "border-mist text-ink/50",
                    )}
                  >
                    {h.n}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span
                      className={cn(
                        "block text-base font-light transition-colors",
                        isActive ? "text-burgundy" : "text-ink",
                      )}
                    >
                      {h.title}
                    </span>
                    {/* Mobile: always readable. Desktop: reveals on hover. */}
                    <span
                      className={cn(
                        "mt-1.5 block overflow-hidden text-sm leading-relaxed text-ink/65 transition-all duration-300",
                        isActive
                          ? "max-h-40 opacity-100"
                          : "max-h-40 opacity-100 md:max-h-0 md:opacity-0",
                      )}
                    >
                      {h.body}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
