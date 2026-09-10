import { Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Hero3DScroll } from "@/components/hero-3d";

const ease = [0.23, 1, 0.32, 1] as const;

function useCompact() {
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 749px)");
    const sync = () => setCompact(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return compact;
}

function ParallaxFrame({
  src,
  alt,
  className = "",
  intensity = 1,
}: {
  src: string;
  alt: string;
  className?: string;
  intensity?: number;
}) {
  const compact = useCompact();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const shift = compact ? 6 * intensity : 16 * intensity;
  const y = useTransform(scrollYProgress, [0, 1], [`${-shift}%`, `${shift}%`]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    compact ? [1.04, 1.01, 1.03] : [1.12 + intensity * 0.04, 1.04, 1.1],
  );

  return (
    <div
      ref={ref}
      className={`overflow-hidden isolate ${className}`}
      style={{ transform: "translateZ(0)" }}
    >
      <motion.img
        src={src}
        alt={alt}
        style={{ y, scale }}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover object-center will-change-transform"
      />
    </div>
  );
}

function AutoVideo({
  src,
  poster,
  className = "",
}: {
  src: string;
  poster?: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) void el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      className={`h-full w-full object-cover ${className}`}
    />
  );
}

export function HomeCampaign() {
  return <Hero3DScroll />;
}

export function FilmChapter({
  n,
  title,
  body,
  src,
  alt,
  video,
  poster,
  tone = "berry",
}: {
  n: string;
  title: string;
  body: string;
  src?: string;
  alt: string;
  video?: string;
  poster?: string;
  tone?: "berry" | "rosa";
}) {
  const onBerry = tone === "berry";
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const captionY = useTransform(scrollYProgress, [0, 1], [24, -24]);
  const captionOp = useTransform(scrollYProgress, [0.1, 0.35, 0.75], [0.55, 1, 1]);

  return (
    <section
      ref={ref}
      className={onBerry ? "bg-berry text-rosa" : "bg-rosa text-burgundy"}
    >
      <motion.div
        className="shell flex flex-col gap-4 py-10 md:flex-row md:items-end md:justify-between md:gap-6 md:py-20"
        style={{ y: captionY, opacity: captionOp }}
      >
        <div>
          <p className={`type-meta ${onBerry ? "text-rosa/55" : "text-cacao"}`}>{n}</p>
          <h2 className="type-display-md mt-3 md:mt-4">{title}</h2>
        </div>
        <p className={`max-w-sm text-base leading-relaxed md:text-lg ${onBerry ? "text-rosa/80" : "text-cacao"}`}>
          {body}
        </p>
      </motion.div>
      {video ? (
        <div className="mx-auto aspect-[3/4] w-full max-h-[70svh] overflow-hidden md:aspect-auto md:h-[92svh] md:max-h-none">
          <AutoVideo src={video} poster={poster ?? src} />
        </div>
      ) : (
        <ParallaxFrame
          src={src ?? ""}
          alt={alt}
          intensity={0.7}
          className="mx-auto aspect-[4/5] w-full max-h-[70svh] md:aspect-auto md:h-[92svh] md:max-h-none"
        />
      )}
    </section>
  );
}

const works = [
  {
    handle: "burgundy-caelia",
    src: "/campaign/pair-berry.jpg",
    n: "01",
    t: "Burgundy Berry",
  },
  {
    handle: "crema-caelia",
    src: "/campaign/pair-rosa.jpg",
    n: "02",
    t: "Rosa nude",
  },
  {
    handle: "cacao-caelia",
    src: "/campaign/pair-cacao.jpg",
    n: "03",
    t: "Marrone",
  },
] as const;

export function WorkRow() {
  return (
    <section className="bg-rosa">
      <div className="shell py-10 md:section-y">
        <div className="flex items-end justify-between gap-4">
          <div className="min-w-0">
            <p className="eyebrow">Collezione</p>
            <h2 className="type-display-md mt-3">Tre colori.</h2>
            <p className="mt-3 max-w-sm text-cacao">
              Marrone, rosa nude, burgundy berry.
            </p>
          </div>
          <Link to="/products" className="type-meta shrink-0 text-cacao transition-colors hover:text-berry">
            Vedi tutto
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-8 sm:mt-12 sm:grid-cols-3 sm:gap-5">
          {works.map((w, i) => (
            <motion.div
              key={w.handle}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1, ease }}
            >
              <Link to="/products/$handle" params={{ handle: w.handle }} className="group block">
                <ParallaxFrame
                  src={w.src}
                  alt={w.t}
                  intensity={0.35}
                  className="aspect-square bg-white"
                />
                <div className="mt-4 flex items-baseline justify-between gap-3">
                  <p className="font-serif text-2xl tracking-wide">{w.t}</p>
                  <p className="type-meta text-cacao">{w.n}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
