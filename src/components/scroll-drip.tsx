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
  const scale = useTransform(scrollYProgress, [0, 1], [1.04, 1.18]);
  const blur = useTransform(scrollYProgress, [0, 0.18, 1], [10, 0, 0]);
  const filter = useTransform(blur, (v) => `blur(${v}px)`);
  const capY = useTransform(scrollYProgress, [0, 0.16, 0.88, 1], [28, 0, 0, -24]);
  const capOp = useTransform(scrollYProgress, [0, 0.1, 0.86, 1], [0, 1, 1, 0.45]);

  useEffect(() => {
    FRAMES.forEach((src) => {
      const el = new Image();
      el.src = src;
    });
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const x = Math.min(FRAMES.length - 1, Math.max(0, v * (FRAMES.length - 1)));
    const a = Math.floor(x);
    const b = Math.min(FRAMES.length - 1, a + 1);
    const t = x - a;
    setMix((s) => (s.a === a && s.b === b && Math.abs(s.t - t) < 0.02 ? s : { a, b, t }));
  });

  return (
    <section ref={pin} className="relative h-[240vh] bg-berry text-rosa">
      <div className="sticky top-0 h-svh overflow-hidden bg-berry">
        <motion.div className="absolute inset-0 will-change-transform" style={{ scale, filter }}>
          <img
            src={FRAMES[mix.a]}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            draggable={false}
          />
          <img
            src={FRAMES[mix.b]}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            style={{ opacity: mix.t }}
            draggable={false}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-berry/55 via-transparent to-transparent" />
        <motion.div
          className="relative z-10 flex h-full flex-col justify-end px-6 pb-14 md:px-12 md:pb-20"
          style={{ y: capY, opacity: capOp }}
        >
          <p className="type-meta text-rosa/70">01</p>
          <h2 className="type-display-md mt-3">Due pezzi.</h2>
          <p className="mt-4 max-w-sm text-lg leading-relaxed text-rosa/85">
            Astuccio e specchio, in caduta. Poi il gloss li prende.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
