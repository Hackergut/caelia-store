"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const ease = [0.23, 1, 0.32, 1] as const;

const chapters = [
  {
    href: "/products/burgundy-caelia",
    src: "/products/burgundy-caelia-pair.jpg",
    hover: "/products/burgundy-caelia-pencils.jpg",
    n: "01",
    t: "Burgundy",
    d: "Il bordeaux maison",
  },
  {
    href: "/products/cacao-caelia",
    src: "/products/cacao-caelia-pair.jpg",
    hover: "/products/cacao-caelia-pencils.jpg",
    n: "02",
    t: "Cacao",
    d: "Cuoio caldo",
  },
  {
    href: "/products/crema-caelia",
    src: "/products/crema-caelia-pair.jpg",
    hover: "/products/crema-caelia-lifestyle.jpg",
    n: "03",
    t: "Crema",
    d: "Pelle luminosa",
  },
];

const studio = [
  { src: "/products/burgundy-caelia-pencils.jpg", t: "Burgundy · pocket" },
  { src: "/products/crema-caelia-lifestyle.jpg", t: "Crema · still" },
  { src: "/products/burgundy-caelia-stitch.jpg", t: "Pelle · cucitura" },
  { src: "/products/cacao-caelia-pencils.jpg", t: "Cacao · essentials" },
  { src: "/editorial/lifestyle-burgundy.jpg", t: "Vanity burgundy" },
  { src: "/editorial/liner-lips.jpg", t: "Rituale labbra" },
];

export function HomeCampaign() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <>
      <section ref={heroRef} className="relative overflow-hidden bg-cream">
        <div className="shell grid items-center gap-8 pb-14 pt-6 lg:grid-cols-12 lg:gap-10 lg:py-16">
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease }}
          >
            <p className="text-[10px] uppercase tracking-[0.32em] text-ink/45 sm:text-[11px]">
              Campaign 02 · Splash Studio
            </p>
            <h1 className="fluid-display mt-3 font-light tracking-tight text-ink sm:mt-5">
              Il gesto,
              <br />
              in movimento.
            </h1>
            <p className="mt-4 max-w-sm leading-relaxed text-ink/70 sm:mt-6">
              Beauty Mirror Case. Pelle, specchio, colore che esplode.
              Un oggetto fermo — una scena viva.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/products"
                className="btn-press inline-flex min-h-12 items-center bg-burgundy px-8 text-[11px] uppercase tracking-[0.22em] text-cream"
              >
                La collezione
              </Link>
              <Link
                href="#studio"
                className="btn-press inline-flex min-h-12 items-center border border-ink/15 px-8 text-[11px] uppercase tracking-[0.22em] text-ink"
              >
                Studio splash
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="relative -mx-[clamp(1rem,4vw,2.5rem)] aspect-[4/5] overflow-hidden bg-cream-deep sm:mx-0 lg:col-span-7 lg:aspect-[5/4]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease }}
          >
            <motion.img
              style={{ y, scale }}
              src="/products/burgundy-caelia-pencils.jpg"
              alt="Caelia — tasca e matite"
              className="absolute inset-0 h-[115%] w-full object-cover"
            />
            <motion.div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/35 via-transparent to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </motion.div>
        </div>
      </section>

      <section className="relative min-h-[64svh] overflow-hidden bg-night md:min-h-[78vh]">
        <motion.img
          src="/products/burgundy-caelia-stitch.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover brightness-[0.55]"
          initial={{ scale: 1.08 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease }}
        />
        <div className="absolute inset-0 bg-night/35" />
        <div className="shell-narrow relative z-10 flex min-h-[64svh] flex-col items-center justify-center py-16 text-center md:min-h-[78vh]">
          <motion.p
            className="text-[11px] uppercase tracking-[0.38em] text-cream/70"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease }}
          >
            Manifesto
          </motion.p>
          <motion.h2
            className="mt-6 text-balance text-2xl font-light leading-[1.3] text-cream sm:text-3xl lg:text-[2.6rem]"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08, ease }}
          >
            «Il ritocco non è un incidente.
            <br />
            È un gesto preciso.»
          </motion.h2>
          <p className="mt-10 text-[11px] uppercase tracking-[0.28em] text-cream/65">
            Carla &amp; Giulia — fondatrici
          </p>
        </div>
      </section>
    </>
  );
}

export function CampaignStudio() {
  return (
    <section id="studio" className="bg-cream">
      <div className="shell section-y">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.32em] text-ink/40">Studio</p>
            <h2 className="fluid-h2 mt-3 font-light">Splash / still / fruit</h2>
          </div>
          <p className="hidden max-w-xs text-right text-sm text-ink/55 md:block">
            Nuove inquadrature campaign. Gel, ciliegie, vanity.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {studio.map((shot, i) => (
            <motion.figure
              key={shot.src}
              className={`group relative overflow-hidden bg-cream-deep ${i === 0 || i === 4 ? "md:col-span-2 md:aspect-[16/10]" : "aspect-[3/4]"}`}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.06, ease }}
            >
              <img
                src={shot.src}
                alt={shot.t}
                className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.04]"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night/55 to-transparent p-4 text-[11px] uppercase tracking-[0.2em] text-cream">
                {shot.t}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ChapterGrid() {
  return (
    <section className="bg-cream">
      <div className="shell section-y">
        <p className="mb-8 text-[11px] uppercase tracking-[0.32em] text-ink/40">Capitoli</p>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {chapters.map((c, i) => (
            <motion.div
              key={c.href}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.07, ease }}
            >
              <Link href={c.href} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden bg-cream-deep">
                  <img
                    src={c.src}
                    alt={c.t}
                    className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                  />
                  <img
                    src={c.hover}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                </div>
                <p className="mt-3 text-[11px] uppercase tracking-[0.22em] text-ink/40">{c.n}</p>
                <p className="mt-1 text-xl font-light">{c.t}</p>
                <p className="mt-1 text-sm text-ink/55">{c.d}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function RitualBlock() {
  return (
    <section className="bg-cream">
      <div className="shell section-y grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
        <motion.div
          className="aspect-[4/5] overflow-hidden bg-cream-deep sm:aspect-[3/4]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease }}
        >
          <img
            src="/editorial/liner-lips.jpg"
            alt="Rituale labbra Caelia"
            className="h-full w-full object-cover object-top"
          />
        </motion.div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.32em] text-ink/40">Il rituale</p>
          <h2 className="fluid-h2 mt-5 font-light">
            Tre gesti.
            <br />
            Pronta.
          </h2>
          <ol className="mt-6 md:mt-10">
            {[
              { n: "01", t: "Apri", d: "Una mano. Si apre." },
              { n: "02", t: "Ritocca", d: "Matita, gloss, specchio." },
              { n: "03", t: "Riparti", d: "Richiudi. Sei oltre." },
            ].map((s, i) => (
              <motion.li
                key={s.n}
                className="border-t border-mist/70 py-5"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07, ease }}
              >
                <p className="text-[11px] tracking-[0.28em] text-ink/40">{s.n}</p>
                <p className="mt-1 font-serif text-2xl">{s.t}</p>
                <p className="mt-1 text-ink/65">{s.d}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
