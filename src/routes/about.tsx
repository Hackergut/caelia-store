import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";

export const Route = createFileRoute("/about")({ component: AboutPage });

const ease = [0.23, 1, 0.32, 1] as const;

const frames = [
  { src: "/campaign/life-plane.jpg", alt: "In viaggio, CAELIA come specchio" },
  { src: "/campaign/life-carla.jpg", alt: "Carla con CAELIA Burgundy Berry" },
  { src: "/campaign/life-apply.jpg", alt: "Il gesto" },
  { src: "/campaign/life-flatlay.jpg", alt: "Still life tre colori" },
  { src: "/campaign/life-meadow.jpg", alt: "Nel prato" },
];

function AboutPage() {
  return (
    <div className="bg-rosa">
      <section className="shell section-y grid items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease }}
        >
          <p className="eyebrow">Storia</p>
          <h1 className="type-display-md mt-4">Carla & Giulia</h1>
          <p className="mt-6 leading-relaxed text-cacao">
            Quante volte, per un semplice ritocco, ci ritroviamo a rovistare nella
            borsa? CAELIA nasce da quel gesto: specchio, matita e gloss in un
            astuccio che sta nella palma.
          </p>
          <p className="mt-4 leading-relaxed text-cacao">
            Pelle vegana, cuciture pulite, logo tono su tono. Fatto per la borsa,
            il viaggio, l’ufficio.
          </p>
        </motion.div>
        <motion.img
          src="/campaign/life-carla.jpg"
          alt="Carla con l’astuccio CAELIA Burgundy Berry"
          className="aspect-4/5 w-full object-cover"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
        />
      </section>

      <section className="bg-berry text-rosa">
        <div className="shell section-y grid gap-10 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="type-meta text-rosa/55">01</p>
            <h2 className="type-display-md mt-4">Tre colori, un oggetto.</h2>
          </div>
          <p className="max-w-md text-lg leading-relaxed text-rosa/80">
            Burgundy Berry, rosa nude, marrone. Stesso taglio, stesso specchio,
            stesso logo inciso.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3">
          {[
            { src: "/campaign/pair-berry.jpg", t: "Burgundy Berry" },
            { src: "/campaign/pair-rosa.jpg", t: "Rosa nude" },
            { src: "/campaign/pair-cacao.jpg", t: "Marrone" },
          ].map((c) => (
            <figure key={c.t} className="bg-white">
              <img src={c.src} alt={c.t} className="aspect-square w-full object-cover" loading="lazy" decoding="async" />
            </figure>
          ))}
        </div>
      </section>

      <section className="overflow-hidden">
        <img
          src="/campaign/life-plane.jpg"
          alt="CAELIA in viaggio — specchio, matite in tasca"
          className="aspect-square w-full object-cover md:aspect-16/9"
          loading="lazy"
          decoding="async"
        />
      </section>

      <section className="overflow-hidden">
        <img
          src="/campaign/life-flatlay.jpg"
          alt="Still life CAELIA — tre colori, peonie"
          className="aspect-16/9 w-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </section>

      <section className="shell section-y">
        <p className="eyebrow">Dietro il prodotto</p>
        <h2 className="type-display-md mt-4">La pelle, da vicino.</h2>
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {frames.map((f, i) => (
            <motion.img
              key={f.src}
              src={f.src}
              alt={f.alt}
              className={`w-full object-cover ${i === 0 || i === 5 ? "col-span-2 aspect-16/9 md:col-span-1 md:aspect-4/5" : "aspect-4/5"}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.05, ease }}
            />
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-berry text-rosa">
        <img
          src="/campaign/edit-drip.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-berry/50" />
        <div className="relative z-10 shell section-y max-w-2xl">
          <p className="type-meta text-rosa/70">CAELIA</p>
          <h2 className="type-display-md mt-6">
            Specchio, matita, un solo gesto.
          </h2>
          <Link to="/products" className="btn-invert mt-10 inline-flex">
            La collezione
          </Link>
        </div>
      </section>
    </div>
  );
}
