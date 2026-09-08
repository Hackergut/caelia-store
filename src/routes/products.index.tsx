import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { products } from "@/lib/products";
import { formatEUR } from "@/lib/utils";

export const Route = createFileRoute("/products/")({ component: ProductsPage });

const ease = [0.23, 1, 0.32, 1] as const;

function ProductsPage() {
  return (
    <section className="bg-rosa">
      <div className="shell section-y">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.45, ease }}
        >
          Volume 01
        </motion.p>
        <motion.h1
          className="type-display-md mt-3"
          initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.55, delay: 0.08, ease }}
        >
          La collezione
        </motion.h1>
        <p className="mt-4 max-w-md text-cacao">
          Avorio caldo, rosa nude, burgundy berry. Una forma.
        </p>
        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {products.map((p, i) => (
            <motion.div
              key={p.handle}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12 + i * 0.08, ease }}
            >
              <Link to="/products/$handle" params={{ handle: p.handle }} className="group block">
                <div className="aspect-3/4 overflow-hidden bg-crema">
                  <img
                    src={p.images[0].src}
                    alt={p.images[0].alt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="mt-4 flex items-start justify-between">
                  <div>
                    <p className="font-serif text-xl tracking-wide">{p.title}</p>
                    <p className="mt-1 type-meta text-cacao">{p.tagline}</p>
                  </div>
                  <p className="tabular-nums text-sm">{formatEUR(p.price)}</p>
                </div>
                <span
                  className="mt-3 block h-3 w-3 rounded-full ring-1 ring-burgundy/15"
                  style={{ background: p.swatch }}
                  aria-hidden
                />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
