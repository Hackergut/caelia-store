import { Link } from "@tanstack/react-router";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useChrome } from "@/lib/chrome";

export function Hero3DScroll() {
  const reduce = useReducedMotion();
  const setShowNav = useChrome((s) => s.setShowNav);
  const ref = useRef<HTMLElement>(null);
  const [compact, setCompact] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const p = useSpring(scrollYProgress, { stiffness: 72, damping: 28, mass: 0.4 });

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 749px)");
    const sync = () => setCompact(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const blur = useTransform(p, [0, compact ? 0.22 : 0.32], [compact ? 6 : 28, 0]);
  const farFilter = useTransform(blur, (v) => `blur(${v}px)`);
  const farScale = useTransform(p, [0, 0.7], [1.12, 1.28]);
  const veil = useTransform(p, [0, 0.3, 1], [compact ? 0.18 : 0.55, 0.18, 0.12]);
  const logoOp = useTransform(p, compact ? [0, 0.12] : [0.1, 0.3], [compact ? 0.92 : 0, 1]);
  const logoBlur = useTransform(p, compact ? [0, 0.18] : [0.1, 0.32], [compact ? 2 : 10, 0]);
  const logoFilter = useTransform(logoBlur, (v) => `blur(${v}px)`);

  useMotionValueEvent(p, "change", (v) => {
    setShowNav(compact ? v > 0.08 : v > 0.42);
  });

  useEffect(() => {
    if (reduce || compact) setShowNav(true);
    return () => setShowNav(false);
  }, [reduce, compact, setShowNav]);

  if (reduce) {
    return (
      <section className="relative h-svh overflow-hidden bg-berry text-rosa">
        <img
          src="/campaign/logo-drip.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-berry/45" />
        <Lockup />
      </section>
    );
  }

  return (
    <section ref={ref} className="relative h-[160vh] bg-berry text-rosa md:h-[240vh]">
      <div className="sticky top-0 h-svh overflow-hidden isolate" style={{ transform: "translateZ(0)" }}>
        <motion.div
          className="absolute inset-[-8%] will-change-transform pointer-events-none"
          style={{ scale: farScale, filter: farFilter }}
        >
          <video
            src="/campaign/logo-drip.mp4"
            poster="/campaign/logo-drip.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="h-full w-full object-cover"
          />
        </motion.div>
        <motion.div className="absolute inset-0 bg-berry" style={{ opacity: veil }} />
      </div>
      <motion.div
        className="pointer-events-none sticky top-0 z-20 -mt-[100svh] flex h-svh flex-col"
        style={{ opacity: logoOp, filter: logoFilter }}
      >
        <Lockup />
      </motion.div>
    </section>
  );
}

function Lockup() {
  return (
    <div className="flex h-full flex-col items-center justify-center px-6 text-center">
      <p className="type-meta text-rosa/55">Volume 01</p>
      <h1 className="type-logo mt-6 text-rosa md:mt-8">CAELIA</h1>
      <p className="mt-5 type-meta tracking-[0.32em] text-rosa/70 md:mt-7 md:tracking-[0.46em]">Beauty Essentials</p>
      <div className="pointer-events-auto mt-8 flex flex-col items-center gap-3 sm:mt-12 sm:flex-row sm:gap-4">
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
