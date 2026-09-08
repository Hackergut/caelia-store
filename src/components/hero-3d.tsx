import { Link } from "@tanstack/react-router";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef } from "react";

export function Hero3DScroll() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const p = useSpring(scrollYProgress, { stiffness: 80, damping: 28, mass: 0.4 });

  const farY = useTransform(p, [0, 1], [0, 120]);
  const farScale = useTransform(p, [0, 1], [1.22, 1.06]);
  const farBlur = useTransform(p, [0, 0.55, 1], [36, 8, 4]);
  const farFilter = useTransform(farBlur, (v) => `blur(${v}px)`);
  const veil = useTransform(p, [0, 0.7], [0.48, 0.18]);
  const logoY = useTransform(p, [0, 1], [0, -80]);
  const logoOp = useTransform(p, [0, 0.75, 1], [1, 1, 0]);

  if (reduce) {
    return (
      <section className="relative h-svh overflow-hidden bg-berry text-rosa">
        <img
          src="/campaign/edit-drip.jpg"
          alt=""
          className="absolute inset-0 h-full w-full scale-110 object-cover blur-2xl"
        />
        <div className="absolute inset-0 bg-berry/50" />
        <Lockup />
      </section>
    );
  }

  return (
    <section ref={ref} className="relative h-[160vh] bg-berry text-rosa">
      <div className="sticky top-0 h-svh overflow-hidden">
        <motion.div
          className="absolute inset-[-12%] will-change-transform"
          style={{ y: farY, scale: farScale, filter: farFilter }}
        >
          <video
            src="/campaign/hero-pour.mp4"
            poster="/campaign/edit-drip.jpg"
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
          />
        </motion.div>
        <motion.div className="absolute inset-0 bg-berry" style={{ opacity: veil }} />
        <motion.div
          className="relative z-10 flex h-full flex-col"
          style={{ y: logoY, opacity: logoOp }}
        >
          <Lockup />
        </motion.div>
      </div>
    </section>
  );
}

function Lockup() {
  return (
    <div className="flex h-full flex-col items-center justify-center px-6 text-center">
      <p className="type-meta text-rosa/55">Volume 01</p>
      <h1 className="type-logo mt-8 text-rosa">CAELIA</h1>
      <p className="mt-7 type-meta tracking-[0.46em] text-rosa/70">Beauty Essentials</p>
      <div className="mt-12 flex gap-4">
        <Link to="/products" className="btn-invert">
          La collezione
        </Link>
        <a href="#info" className="btn-ghost-light">
          Il prodotto
        </a>
      </div>
    </div>
  );
}
