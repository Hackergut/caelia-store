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
    title: "Tasca curva",
    body: "Il taglio a onda trattiene matita e gloss ma li lascia uscire con un dito. Niente linguette, niente bottoni.",
    x: 41,
    y: 34,
    side: "left",
  },
  {
    id: "logo",
    n: "02",
    title: "Logo impresso a caldo",
    body: "Il wordmark CAELIA è inciso nella pelle, non stampato: non si scrosta e resta leggibile negli anni.",
    x: 33,
    y: 69,
    side: "left",
  },
  {
    id: "stitch",
    n: "03",
    title: "Cucitura tono su tono",
    body: "Filo a contrasto minimo lungo tutto il perimetro: tiene la struttura piatta e protegge il bordo dagli urti.",
    x: 46,
    y: 84,
    side: "left",
  },
  {
    id: "mirror",
    n: "04",
    title: "Specchio infrangibile",
    body: "Superficie anti-riflesso montata a filo della cornice. Riflette senza distorcere, anche con luce laterale.",
    x: 66,
    y: 47,
    side: "right",
  },
  {
    id: "frame",
    n: "05",
    title: "Cornice cucita",
    body: "La pelle avvolge lo specchio su tutti e quattro i lati: nessun bordo esposto, nessuna scheggia in borsa.",
    x: 76,
    y: 72,
    side: "right",
  },
  {
    id: "profile",
    n: "06",
    title: "Profilo 6 mm",
    body: "Due pezzi piatti che scorrono uno sull'altro. Insieme restano più sottili di un mazzo di carte.",
    x: 57,
    y: 22,
    side: "right",
  },
];

export function ProductAnatomy() {
  const [active, setActive] = useState<string>("mirror");

  return (
    <section className="border-t border-mist/40 bg-cream">
      <div className="shell section-y">
        <p className="text-[11px] uppercase tracking-[0.32em] text-ink/40">
          Anatomia
        </p>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
          <h2 className="fluid-h2 font-light">Ogni parte ha un perché.</h2>
          <p className="max-w-sm text-sm leading-relaxed text-ink/65">
            Sei dettagli, nessuno decorativo. Tocca un numero per scoprire cosa
            fa.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:items-center lg:gap-14">
          {/* Figure with hotspots */}
          <figure className="relative overflow-hidden rounded-sm bg-night">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/products/burgundy-caelia-slim-pair.jpg"
              alt="Slim Mirror Card Case: sleeve con tasca curva e cornice con specchio"
              className="block aspect-[16/10] w-full object-cover sm:aspect-[16/9]"
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
                        ? "scale-110 border-cream bg-cream text-ink shadow-lg"
                        : "border-cream/70 bg-night/45 text-cream hover:bg-night/70",
                    )}
                  >
                    {h.n}
                  </span>
                  {isActive && (
                    <span className="pointer-events-none absolute inset-0 -z-10 animate-ping rounded-full bg-cream/25" />
                  )}
                </button>
              );
            })}

            {/* Caption overlay — the "info line" readout on the image itself */}
            <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-night via-night/80 to-transparent px-4 pb-4 pt-12 sm:px-6 sm:pb-6">
              {HOTSPOTS.filter((h) => h.id === active).map((h) => (
                <div key={h.id}>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-cream/60">
                    {h.n} · {h.title}
                  </p>
                  <p className="mt-1 max-w-xl text-sm leading-relaxed text-cream/90 sm:text-[15px]">
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
