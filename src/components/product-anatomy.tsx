"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type Hotspot = {
  id: string;
  n: string;
  title: string;
  body: string;
  /** Anchor point on the image, in % of width/height. */
  x: number;
  y: number;
  /** Which way the info line runs on desktop. */
  side: "left" | "right";
};

const HOTSPOTS: Hotspot[] = [
  {
    id: "pocket",
    n: "01",
    title: "Tasca frontale",
    body: "La sovrapposizione cucita a metà altezza trattiene matita e gloss in verticale: si sfilano con un dito, senza bottoni né linguette.",
    x: 31,
    y: 33,
    side: "left",
  },
  {
    id: "logo",
    n: "02",
    title: "Logo impresso",
    body: "Il wordmark CAELIA è inciso nella pelle, non stampato: non si scrosta e resta leggibile negli anni.",
    x: 32,
    y: 79,
    side: "left",
  },
  {
    id: "stitch",
    n: "03",
    title: "Cucitura perimetrale",
    body: "Filo tono su tono lungo tutto il bordo arrotondato: tiene la struttura piatta e protegge la pelle dagli urti in borsa.",
    x: 18,
    y: 60,
    side: "left",
  },
  {
    id: "two-pieces",
    n: "04",
    title: "Due pezzi separati",
    body: "Astuccio e specchio sono indipendenti: usi lo specchio con una mano mentre l'altra tiene il lip combo.",
    x: 50,
    y: 20,
    side: "right",
  },
  {
    id: "mirror",
    n: "05",
    title: "Specchio anti-riflesso",
    body: "Superficie infrangibile montata a filo: riflette senza distorcere, anche con luce laterale o in penombra.",
    x: 69,
    y: 52,
    side: "right",
  },
  {
    id: "frame",
    n: "06",
    title: "Cornice in pelle",
    body: "La pelle avvolge lo specchio su tutti e quattro i lati: nessun bordo di vetro esposto, nessuna scheggia.",
    x: 84,
    y: 30,
    side: "right",
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
            Sei dettagli, nessuno decorativo. Tocca un numero sulla foto per
            scoprire cosa fa.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:items-center lg:gap-14">
          {/* Figure with hotspots */}
          <figure className="relative overflow-hidden rounded-sm bg-cream-deep">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/products/burgundy-caelia-pair.jpg"
              alt="Beauty Mirror Case Burgundy Caelia: astuccio con tasca e specchio in cornice di pelle"
              className="block aspect-square w-full object-cover"
            />

            {HOTSPOTS.map((h) => {
              const isActive = active === h.id;
              return (
                <button
                  key={h.id}
                  type="button"
                  onClick={() => setActive(h.id)}
                  onMouseEnter={() => setActive(h.id)}
                  aria-pressed={isActive}
                  aria-label={`${h.n} — ${h.title}`}
                  className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${h.x}%`, top: `${h.y}%` }}
                >
                  <span
                    className={cn(
                      "flex h-7 w-7 items-center justify-center rounded-full border text-[10px] tabular-nums backdrop-blur transition-all duration-200 sm:h-8 sm:w-8 sm:text-[11px]",
                      isActive
                        ? "scale-110 border-burgundy bg-burgundy text-cream shadow-lg"
                        : "border-ink/25 bg-cream/80 text-ink hover:bg-cream",
                    )}
                  >
                    {h.n}
                  </span>
                  {isActive && (
                    <span className="pointer-events-none absolute inset-0 -z-10 animate-ping rounded-full bg-burgundy/25" />
                  )}
                </button>
              );
            })}

            {/* Caption overlay — the "info line" readout on the image itself */}
            <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-cream via-cream/92 to-transparent px-4 pb-4 pt-14 sm:px-6 sm:pb-6">
              {HOTSPOTS.filter((h) => h.id === active).map((h) => (
                <div key={h.id}>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-ink/50">
                    {h.n} · {h.title}
                  </p>
                  <p className="mt-1 max-w-xl text-sm leading-relaxed text-ink/80 sm:text-[15px]">
                    {h.body}
                  </p>
                </div>
              ))}
            </figcaption>
          </figure>

          {/* Info lines list */}
          <ol className="border-t border-mist/70">
            {HOTSPOTS.map((h) => {
              const isActive = active === h.id;
              return (
                <li key={h.id} className="border-b border-mist/70">
                  <button
                    type="button"
                    onClick={() => setActive(h.id)}
                    onMouseEnter={() => setActive(h.id)}
                    className="flex w-full items-start gap-4 py-4 text-left"
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
                      <span
                        className={cn(
                          "block overflow-hidden text-sm leading-relaxed text-ink/65 transition-all duration-300",
                          isActive
                            ? "mt-1 max-h-32 opacity-100"
                            : "max-h-0 opacity-0",
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
      </div>
    </section>
  );
}
