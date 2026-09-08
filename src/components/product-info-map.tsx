import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { ZoomStage } from "@/components/zoom-details";

type Part = {
  id: string;
  n: string;
  title: string;
  body: string;
  x: number;
  y: number;
  zoom: string;
};

const ease = [0.23, 1, 0.32, 1] as const;

/* Coordinate su /campaign/pair-berry.jpg */
const PARTS: Part[] = [
  {
    id: "pocket",
    n: "01",
    title: "Tasca frontale",
    body: "Cinque matite in verticale. Si sfilano con un dito: niente bottoni, niente linguette.",
    x: 28,
    y: 20,
    zoom: "/campaign/pin-pocket.jpg",
  },
  {
    id: "body",
    n: "02",
    title: "Corpo dell'astuccio",
    body: "Pelle vegana morbida su fodera in raso. Protegge il lip combo da urti e tappi che si aprono in borsa.",
    x: 28,
    y: 52,
    zoom: "/campaign/pin-body.jpg",
  },
  {
    id: "logo",
    n: "03",
    title: "Logo impresso",
    body: "Il wordmark CAELIA è inciso nella pelle, non stampato: non si scrosta e resta leggibile negli anni.",
    x: 28,
    y: 84,
    zoom: "/campaign/pin-logo.jpg",
  },
  {
    id: "stitch",
    n: "04",
    title: "Cucitura perimetrale",
    body: "Filo tono su tono lungo tutto il bordo arrotondato: tiene la struttura piatta e protegge la pelle dagli urti.",
    x: 14,
    y: 62,
    zoom: "/campaign/pin-stitch.jpg",
  },
  {
    id: "mirror",
    n: "05",
    title: "Specchio anti-riflesso",
    body: "Superficie infrangibile montata a filo della cornice. Riflette senza distorcere, anche con luce laterale o in penombra.",
    x: 72,
    y: 50,
    zoom: "/campaign/pin-mirror.jpg",
  },
  {
    id: "frame",
    n: "06",
    title: "Cornice in pelle",
    body: "La pelle avvolge lo specchio su tutti e quattro i lati: nessun bordo di vetro esposto, nessuna scheggia.",
    x: 72,
    y: 16,
    zoom: "/campaign/pin-frame.jpg",
  },
];

export function ProductInfoMap() {
  const [active, setActive] = useState("pocket");
  const current = PARTS.find((p) => p.id === active) ?? PARTS[0];

  return (
    <section id="info" className="border-t border-mist/40 bg-rosa">
      <div className="shell section-y">
        <motion.div
          initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease }}
        >
          <p className="eyebrow">Info prodotto</p>
          <h2 className="type-display-md mt-4">
            Ogni parte ha un perché.
          </h2>
        </motion.div>

        <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-2 lg:items-start lg:gap-14">
          <motion.figure
            className="relative overflow-hidden bg-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            <img
              src="/campaign/pair-berry.jpg"
              alt="Beauty Mirror Case Burgundy Berry: astuccio con matite e specchio"
              className="block aspect-square w-full object-cover"
            />

            {PARTS.map((p, i) => {
              const isActive = active === p.id;
              return (
                <motion.button
                  key={p.id}
                  type="button"
                  initial={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
                  whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", duration: 0.45, bounce: 0, delay: 0.12 + i * 0.06 }}
                  onClick={() => setActive(p.id)}
                  onMouseEnter={() => setActive(p.id)}
                  aria-label={`${p.n} — ${p.title}`}
                  aria-pressed={isActive}
                  className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${p.x}%`, top: `${p.y}%` }}
                >
                  <span
                    className={cn(
                      "relative flex h-11 w-11 items-center justify-center rounded-full border-2 text-sm tabular-nums shadow-[0_2px_10px_rgba(74,14,22,0.35)] transition-colors duration-200",
                      isActive
                        ? "scale-110 border-rosa bg-rosa text-berry pin-live"
                        : "border-rosa/80 bg-burgundy/55 text-rosa backdrop-blur-[2px] hover:bg-burgundy/75",
                    )}
                  >
                    {p.n}
                  </span>
                </motion.button>
              );
            })}
          </motion.figure>

          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease }}
              >
                <ZoomStage src={current.zoom} alt={current.title} />
                <p className="mt-5 type-meta text-cacao">{current.n}</p>
                <h3 className="mt-2 font-serif text-3xl tracking-wide">{current.title}</h3>
                <p className="mt-3 max-w-md leading-relaxed text-cacao">{current.body}</p>
              </motion.div>
            </AnimatePresence>

            <ol className="mt-8">
              {PARTS.map((p) => {
                const isActive = active === p.id;
                return (
                  <li key={p.id} className="border-t border-mist/70 last:border-b">
                    <button
                      type="button"
                      onClick={() => setActive(p.id)}
                      onMouseEnter={() => setActive(p.id)}
                      aria-expanded={isActive}
                      className="flex min-h-12 w-full items-center gap-4 py-3 text-left"
                    >
                      <span
                        className={cn(
                          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs tabular-nums transition-colors duration-200",
                          isActive
                            ? "border-berry bg-berry text-rosa"
                            : "border-mist text-cacao",
                        )}
                      >
                        {p.n}
                      </span>
                      <span
                        className={cn(
                          "font-serif text-lg tracking-wide transition-colors duration-200",
                          isActive ? "text-berry" : "text-burgundy",
                        )}
                      >
                        {p.title}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
