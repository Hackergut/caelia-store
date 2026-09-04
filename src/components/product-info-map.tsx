"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type Part = {
  id: string;
  n: string;
  title: string;
  body: string;
  /** Posizione del numero sulla foto, in % di larghezza/altezza. */
  x: number;
  y: number;
};

/* Coordinate riferite a /products/burgundy-caelia-pair.jpg:
   astuccio a sinistra (x 17–47%), specchio a destra (x 53–85%). */
const PARTS: Part[] = [
  {
    id: "pocket",
    n: "01",
    title: "Tasca frontale",
    body: "La sovrapposizione cucita a metà altezza trattiene matita e gloss in verticale. Si sfilano con un dito: niente bottoni, niente linguette.",
    x: 31,
    y: 30,
  },
  {
    id: "body",
    n: "02",
    title: "Corpo dell'astuccio",
    body: "Pelle vegana morbida su fodera in raso. Protegge il lip combo da urti e tappi che si aprono in borsa.",
    x: 31,
    y: 55,
  },
  {
    id: "logo",
    n: "03",
    title: "Logo impresso",
    body: "Il wordmark CAELIA è inciso nella pelle, non stampato: non si scrosta e resta leggibile negli anni.",
    x: 32,
    y: 79,
  },
  {
    id: "stitch",
    n: "04",
    title: "Cucitura perimetrale",
    body: "Filo tono su tono lungo tutto il bordo arrotondato: tiene la struttura piatta e protegge la pelle dagli urti.",
    x: 18,
    y: 68,
  },
  {
    id: "mirror",
    n: "05",
    title: "Specchio anti-riflesso",
    body: "Superficie infrangibile montata a filo della cornice. Riflette senza distorcere, anche con luce laterale o in penombra.",
    x: 69,
    y: 50,
  },
  {
    id: "frame",
    n: "06",
    title: "Cornice in pelle",
    body: "La pelle avvolge lo specchio su tutti e quattro i lati: nessun bordo di vetro esposto, nessuna scheggia.",
    x: 55,
    y: 25,
  },
];

export function ProductInfoMap() {
  const [active, setActive] = useState("pocket");

  return (
    <section className="border-t border-mist/40 bg-cream">
      <div className="shell section-y">
        <p className="text-[11px] uppercase tracking-[0.32em] text-ink/40">
          Info prodotto
        </p>
        <h2 className="fluid-h2 mt-2 font-light">Ogni parte ha un perché.</h2>

        <div className="mt-8 grid gap-8 md:mt-12 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-14">
          <figure className="relative overflow-hidden rounded-sm bg-cream-deep">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/products/burgundy-caelia-pair.jpg"
              alt="Beauty Mirror Case: astuccio con tasca frontale e specchio nella cornice di pelle"
              className="block aspect-square w-full object-cover"
            />

            {PARTS.map((p) => {
              const isActive = active === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActive(p.id)}
                  onMouseEnter={() => setActive(p.id)}
                  aria-label={`${p.n} — ${p.title}`}
                  aria-pressed={isActive}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${p.x}%`, top: `${p.y}%` }}
                >
                  <span
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full border-2 text-[13px] font-medium tabular-nums shadow-[0_2px_10px_rgba(0,0,0,0.35)] transition-all duration-200 sm:h-12 sm:w-12 sm:text-[15px]",
                      isActive
                        ? "scale-110 border-cream bg-cream text-burgundy"
                        : "border-cream/80 bg-night/55 text-cream backdrop-blur-[2px] hover:bg-night/75",
                    )}
                  >
                    {p.n}
                  </span>
                </button>
              );
            })}
          </figure>

          <ol>
            {PARTS.map((p) => {
              const isActive = active === p.id;
              return (
                <li key={p.id} className="border-t border-mist/70 last:border-b">
                  <button
                    type="button"
                    onClick={() => setActive(p.id)}
                    onMouseEnter={() => setActive(p.id)}
                    aria-expanded={isActive}
                    className="flex w-full items-start gap-4 py-4 text-left"
                  >
                    <span
                      className={cn(
                        "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-medium tabular-nums transition-colors",
                        isActive
                          ? "border-burgundy bg-burgundy text-cream"
                          : "border-mist text-ink/50",
                      )}
                    >
                      {p.n}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span
                        className={cn(
                          "block text-base font-light transition-colors",
                          isActive ? "text-burgundy" : "text-ink",
                        )}
                      >
                        {p.title}
                      </span>
                      {/* Su mobile sempre leggibile, su desktop si apre al passaggio */}
                      <span
                        className={cn(
                          "mt-1 block overflow-hidden text-sm leading-relaxed text-ink/65 transition-all duration-300",
                          isActive
                            ? "max-h-40 opacity-100"
                            : "max-h-40 opacity-100 md:max-h-0 md:opacity-0",
                        )}
                      >
                        {p.body}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
