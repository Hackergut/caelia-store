import { useRef, useState, type PointerEvent } from "react";
import { motion } from "motion/react";

const DETAILS = [
  {
    src: "/campaign/zoom-wordmark.jpg",
    t: "Wordmark",
    d: "CAELIA inciso nella pelle.",
  },
  {
    src: "/campaign/zoom-logo.jpg",
    t: "Logo",
    d: "Tono su tono, in basso sull’astuccio.",
  },
  {
    src: "/campaign/zoom-mirror.jpg",
    t: "Specchio",
    d: "Cornice in pelle, vetro a filo.",
  },
  {
    src: "/campaign/zoom-corner.jpg",
    t: "Angolo",
    d: "Due file di cucitura sul bordo.",
  },
  {
    src: "/campaign/zoom-stitch.jpg",
    t: "Cucitura",
    d: "Punto a sella, filo tono su tono.",
  },
] as const;

const ease = [0.23, 1, 0.32, 1] as const;

function clamp(n: number, a: number, b: number) {
  return Math.min(b, Math.max(a, n));
}

export function ZoomStage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const [on, setOn] = useState(false);

  const move = (e: PointerEvent<HTMLDivElement>) => {
    const r = (ref.current ?? e.currentTarget).getBoundingClientRect();
    setOrigin({
      x: clamp(((e.clientX - r.left) / r.width) * 100, 0, 100),
      y: clamp(((e.clientY - r.top) / r.height) * 100, 0, 100),
    });
  };

  const down = (e: PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    setOn(true);
    move(e);
  };

  const up = (e: PointerEvent<HTMLDivElement>) => {
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* already released */
    }
    setOn(false);
    setOrigin({ x: 50, y: 50 });
  };

  return (
    <div
      ref={ref}
      className="relative mx-auto aspect-square w-full max-w-[min(100%,48svh)] cursor-crosshair overflow-hidden bg-crema lg:max-w-none"
      style={{ touchAction: "none" }}
      onPointerDown={down}
      onPointerMove={(e) => {
        if (e.pointerType === "mouse") {
          setOn(true);
          move(e);
          return;
        }
        if (e.currentTarget.hasPointerCapture(e.pointerId)) move(e);
      }}
      onPointerUp={up}
      onPointerCancel={up}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") {
          setOn(false);
          setOrigin({ x: 50, y: 50 });
        }
      }}
    >
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover will-change-transform"
        style={{
          transform: on ? "scale(2.2)" : "scale(1)",
          transformOrigin: `${origin.x}% ${origin.y}%`,
          transition: on ? "transform 80ms linear" : "transform 400ms cubic-bezier(0.23,1,0.32,1)",
        }}
        draggable={false}
      />
      <p className="pointer-events-none absolute bottom-3 right-3 type-meta text-burgundy/40">
        {on ? "Zoom" : "Tieni premuto"}
      </p>
    </div>
  );
}

export function ZoomDetails() {
  const [i, setI] = useState(0);
  const current = DETAILS[i];

  return (
    <section className="bg-rosa">
      <div className="shell section-y">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
        >
          <p className="eyebrow">Dettagli</p>
          <h2 className="type-display-md mt-4">La pelle, da vicino.</h2>
        </motion.div>

        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-12">
          <div className="lg:col-span-8">
            <ZoomStage src={current.src} alt={current.d} />
          </div>
          <div className="lg:col-span-4">
            <p className="type-meta text-cacao">{String(i + 1).padStart(2, "0")}</p>
            <h3 className="mt-4 font-serif text-3xl tracking-wide">{current.t}</h3>
            <p className="mt-3 max-w-xs text-cacao">{current.d}</p>
            <div className="mt-8 grid grid-cols-5 gap-2 lg:grid-cols-1 lg:gap-3">
              {DETAILS.map((d, n) => (
                <button
                  key={d.src}
                  type="button"
                  onClick={() => setI(n)}
                  className={`overflow-hidden bg-crema ${n === i ? "ring-1 ring-berry" : ""}`}
                >
                  <img src={d.src} alt={d.t} className="aspect-square w-full object-cover lg:aspect-4/3" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
