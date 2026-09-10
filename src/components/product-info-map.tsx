import { useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

type Part = {
  id: string;
  n: string;
  title: string;
  body: string;
  x: number;
  y: number;
};

const ease = [0.23, 1, 0.32, 1] as const;
const SRC = "/campaign/pair-berry.jpg";

const PARTS: Part[] = [
  {
    id: "pocket",
    n: "01",
    title: "Tasca frontale",
    body: "Cinque matite in verticale. Si sfilano con un dito: niente bottoni, niente linguette.",
    x: 36.5,
    y: 22.9,
  },
  {
    id: "body",
    n: "02",
    title: "Corpo dell'astuccio",
    body: "Pelle vegana morbida su fodera in raso. Protegge il lip combo da urti e tappi che si aprono in borsa.",
    x: 36.5,
    y: 46.5,
  },
  {
    id: "logo",
    n: "03",
    title: "Logo impresso",
    body: "Il wordmark CAELIA è inciso nella pelle, non stampato: non si scrosta e resta leggibile negli anni.",
    x: 36.5,
    y: 77.4,
  },
  {
    id: "stitch",
    n: "04",
    title: "Cucitura perimetrale",
    body: "Filo tono su tono lungo tutto il bordo arrotondato: tiene la struttura piatta e protegge la pelle dagli urti.",
    x: 25.4,
    y: 51.6,
  },
  {
    id: "mirror",
    n: "05",
    title: "Specchio anti-riflesso",
    body: "Superficie infrangibile montata a filo della cornice. Riflette senza distorcere, anche con luce laterale o in penombra.",
    x: 65.4,
    y: 47.9,
  },
  {
    id: "frame",
    n: "06",
    title: "Cornice in pelle",
    body: "La pelle avvolge lo specchio su tutti e quattro i lati: nessun bordo di vetro esposto, nessuna scheggia.",
    x: 65.4,
    y: 18.5,
  },
];

function nearestPart(x: number, y: number) {
  let best = PARTS[0];
  let dist = Infinity;
  for (const p of PARTS) {
    const d = (p.x - x) ** 2 + (p.y - y) ** 2;
    if (d < dist) {
      dist = d;
      best = p;
    }
  }
  return best;
}

function clamp(n: number, a: number, b: number) {
  return Math.min(b, Math.max(a, n));
}

export function ProductInfoMap() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState("pocket");
  const [lens, setLens] = useState({
    x: 50,
    y: 50,
    on: false,
    w: 1,
    touch: false,
    cx: 0,
    cy: 0,
  });
  const current = PARTS.find((p) => p.id === active) ?? PARTS[0];

  const apply = (e: PointerEvent<HTMLElement>, on: boolean) => {
    const el = stageRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = clamp(((e.clientX - r.left) / r.width) * 100, 0, 100);
    const y = clamp(((e.clientY - r.top) / r.height) * 100, 0, 100);
    setLens({
      x,
      y,
      on,
      w: r.width,
      touch: e.pointerType !== "mouse",
      cx: e.clientX,
      cy: e.clientY,
    });
    const next = nearestPart(x, y);
    setActive((id) => (next.id === id ? id : next.id));
  };

  const onDown = (e: PointerEvent<HTMLElement>) => {
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    apply(e, true);
  };

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (!e.currentTarget.hasPointerCapture(e.pointerId) && e.pointerType !== "mouse") return;
    apply(e, true);
  };

  const onUp = (e: PointerEvent<HTMLElement>) => {
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* already released */
    }
    if (e.pointerType !== "mouse") setLens((s) => ({ ...s, on: false }));
  };

  const touch = lens.touch;
  const zoom = touch ? 2.5 : 3.2;
  const L = touch ? 132 : Math.round(Math.min(260, Math.max(168, lens.w * 0.38)));
  const bg = lens.w * zoom;
  const bx = L / 2 - (lens.x / 100) * bg;
  const by = L / 2 - (lens.y / 100) * bg;
  const loupeStyle: CSSProperties = touch
    ? {
        position: "fixed",
        width: L,
        height: L,
        left: lens.cx,
        top: lens.cy,
        transform: "translate(-50%, calc(-100% - 18px))",
        backgroundImage: `url(${SRC})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: `${bg}px ${bg}px`,
        backgroundPosition: `${bx}px ${by}px`,
        zIndex: 80,
      }
    : {
        position: "absolute",
        width: L,
        height: L,
        left: `${lens.x}%`,
        top: `${lens.y}%`,
        transform: "translate(-50%, -50%)",
        backgroundImage: `url(${SRC})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: `${bg}px ${bg}px`,
        backgroundPosition: `${bx}px ${by}px`,
      };

  return (
    <section id="info" className="border-t border-mist/40 bg-rosa">
      <div className="shell py-10 md:section-y">
        <motion.div
          initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease }}
        >
          <p className="eyebrow">Info prodotto</p>
          <h2 className="type-display-md mt-3 md:mt-4">Ogni parte ha un perché.</h2>
          <p className="mt-2 text-sm text-cacao md:hidden">Tieni premuto per lo zoom.</p>
        </motion.div>

        <div className="mt-6 grid gap-6 lg:mt-14 lg:grid-cols-2 lg:items-start lg:gap-14">
          <div
            ref={stageRef}
            className="relative mx-auto w-full max-w-[min(100%,48svh)] cursor-crosshair overflow-hidden bg-white select-none lg:max-w-none"
            style={{ touchAction: "none", WebkitTouchCallout: "none" }}
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerCancel={onUp}
            onPointerLeave={(e) => {
              if (e.pointerType === "mouse") setLens((s) => ({ ...s, on: false }));
            }}
          >
            <img
              src={SRC}
              alt="Beauty Mirror Case Burgundy Berry: astuccio con matite e specchio"
              className="pointer-events-none block aspect-square w-full object-cover"
              draggable={false}
            />

            {PARTS.map((p, i) => {
              const isActive = active === p.id;
              return (
                <motion.span
                  key={p.id}
                  initial={{ opacity: 0, scale: 0.25 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", duration: 0.45, bounce: 0, delay: 0.08 + i * 0.05 }}
                  aria-hidden
                  className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${p.x}%`, top: `${p.y}%` }}
                >
                  <span
                    className={cn(
                      "flex items-center justify-center rounded-full border-2 tabular-nums shadow-[0_2px_10px_rgba(74,14,22,0.35)]",
                      "h-8 w-8 text-[11px] md:h-10 md:w-10 md:text-sm",
                      isActive
                        ? "scale-110 border-rosa bg-rosa text-berry"
                        : "border-rosa/80 bg-burgundy/55 text-rosa backdrop-blur-[2px]",
                    )}
                  >
                    {p.n}
                  </span>
                </motion.span>
              );
            })}

            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-berry/92 to-transparent px-4 pb-3 pt-10 text-rosa lg:hidden">
              <p className="type-meta text-rosa/70">{current.n}</p>
              <p className="font-serif text-xl tracking-wide">{current.title}</p>
            </div>

            {lens.on ? (
              <div
                aria-hidden
                className="pointer-events-none z-30 overflow-hidden rounded-full border-2 border-rosa shadow-[0_16px_40px_rgba(74,14,22,0.35)]"
                style={loupeStyle}
              >
                <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/35" />
                <span className="absolute left-1/2 top-1/2 h-3 w-px -translate-x-1/2 -translate-y-1/2 bg-rosa/80" />
                <span className="absolute left-1/2 top-1/2 h-px w-3 -translate-x-1/2 -translate-y-1/2 bg-rosa/80" />
              </div>
            ) : null}
          </div>

          <div>
            <ol className="flex justify-center gap-2 lg:hidden">
              {PARTS.map((p) => {
                const isActive = active === p.id;
                return (
                  <li key={p.id}>
                    <button
                      type="button"
                      onClick={() => setActive(p.id)}
                      aria-pressed={isActive}
                      aria-label={`${p.n} ${p.title}`}
                      className={cn(
                        "flex h-11 w-11 items-center justify-center rounded-full border text-xs tabular-nums",
                        isActive ? "border-berry bg-berry text-rosa" : "border-mist text-cacao",
                      )}
                    >
                      {p.n}
                    </button>
                  </li>
                );
              })}
            </ol>
            <p className="mt-3 text-center text-sm leading-relaxed text-cacao lg:hidden">{current.body}</p>

            <div className="hidden lg:block">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22, ease }}
                >
                  <p className="type-meta text-cacao">{current.n}</p>
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
                        onMouseEnter={() => setActive(p.id)}
                        onFocus={() => setActive(p.id)}
                        onClick={() => setActive(p.id)}
                        aria-expanded={isActive}
                        className="flex min-h-12 w-full items-center gap-4 py-3 text-left"
                      >
                        <span
                          className={cn(
                            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs tabular-nums",
                            isActive ? "border-berry bg-berry text-rosa" : "border-mist text-cacao",
                          )}
                        >
                          {p.n}
                        </span>
                        <span
                          className={cn(
                            "font-serif text-lg tracking-wide",
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
      </div>
    </section>
  );
}
