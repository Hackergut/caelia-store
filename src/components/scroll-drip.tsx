import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";

const FRAMES = [
  "/campaign/due-seq/01.jpg",
  "/campaign/due-seq/02.jpg",
  "/campaign/due-seq/03.jpg",
] as const;

export function ScrollDrip() {
  const pin = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: pin,
    offset: ["start start", "end end"],
  });
  const [mix, setMix] = useState({ a: 0, b: 0, t: 0 });
  const [compact, setCompact] = useState(false);
  const scale = useTransform(scrollYProgress, [0, 1], compact ? [1.02, 1.06] : [1.04, 1.18]);
  const blur = useTransform(scrollYProgress, [0, 0.18, 1], compact ? [4, 0, 0] : [10, 0, 0]);
  const filter = useTransform(blur, (v) => `blur(${v}px)`);
  const capY = useTransform(scrollYProgress, [0, 0.16, 0.88, 1], [16, 0, 0, -16]);
  const capOp = useTransform(scrollYProgress, [0, 0.08, 0.86, 1], [0.85, 1, 1, 0.7]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 749px)");
    const sync = () => setCompact(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    FRAMES.forEach((src) => {
      const el = new Image();
      el.src = src;
    });
    return () => mq.removeEventListener("change", sync);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const x = Math.min(FRAMES.length - 1, Math.max(0, v * (FRAMES.length - 1)));
    const a = Math.floor(x);
    const b = Math.min(FRAMES.length - 1, a + 1);
    const t = x - a;
    setMix((s) => (s.a === a && s.b === b && Math.abs(s.t - t) < 0.02 ? s : { a, b, t }));
  });

  return (
    <section ref={pin} className="relative h-[170vh] bg-berry text-rosa md:h-[240vh]">
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden bg-berry">
        <div
          className="relative mx-auto w-full max-h-[min(72svh,133vw)] min-h-0 flex-1 overflow-hidden isolate md:max-h-none"
          style={{ transform: "translateZ(0)" }}
        >
          <motion.div className="absolute inset-0 will-change-transform" style={{ scale, filter }}>
            <img
              src={FRAMES[mix.a]}
              alt=""
              className="absolute inset-0 h-full w-full object-cover object-center"
              draggable={false}
            />
            <img
              src={FRAMES[mix.b]}
              alt=""
              className="absolute inset-0 h-full w-full object-cover object-center"
              style={{ opacity: mix.t }}
              draggable={false}
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-berry/55 via-transparent to-transparent" />
        </div>
        <motion.div
          className="relative z-10 shrink-0 px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4 md:absolute md:inset-x-0 md:bottom-0 md:px-12 md:pb-20"
          style={{ y: capY, opacity: capOp }}
        >
          <p className="type-meta text-rosa/70">01</p>
          <h2 className="type-display-md mt-2 md:mt-3">Due pezzi.</h2>
          <p className="mt-3 max-w-sm text-base leading-relaxed text-rosa/85 md:mt-4 md:text-lg">
            Astuccio e specchio, in caduta. Poi il gloss li prende.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
