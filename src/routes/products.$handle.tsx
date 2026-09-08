import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { getProduct, products } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { formatEUR } from "@/lib/utils";
import { ZoomStage } from "@/components/zoom-details";

export const Route = createFileRoute("/products/$handle")({
  component: ProductPage,
});

const ease = [0.23, 1, 0.32, 1] as const;

function ProductPage() {
  const { handle } = Route.useParams();
  const product = getProduct(handle);
  const add = useCart((s) => s.add);
  const [active, setActive] = useState(0);
  const [added, setAdded] = useState(false);

  if (!product) throw notFound();

  return (
    <>
    <section className="bg-rosa">
      <div className="shell section-y grid gap-10 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
        >
          <ZoomStage
            src={product.images[active]?.src}
            alt={product.images[active]?.alt ?? product.title}
          />
          <div className="mt-3 grid grid-cols-5 gap-2">
            {product.images.map((img, i) => (
              <button
                key={img.src}
                type="button"
                onClick={() => setActive(i)}
                className={`aspect-square overflow-hidden bg-crema ${i === active ? "ring-1 ring-berry" : ""}`}
              >
                <img src={img.src} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 18, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.55, delay: 0.08, ease }}
        >
          <p className="eyebrow">{product.tagline}</p>
          <h1 className="type-display-md mt-3">{product.title}</h1>
          <p className="mt-4 tabular-nums text-lg">{formatEUR(product.price)}</p>
          <p className="mt-6 max-w-md leading-relaxed text-cacao">{product.description}</p>
          <ul className="mt-8 space-y-2 text-sm text-cacao">
            {product.features.map((f) => (
              <li key={f} className="border-t border-mist/70 py-3">
                {f}
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="btn-primary mt-8 w-full sm:w-auto"
            onClick={() => {
              add(product.handle);
              setAdded(true);
            }}
          >
            {added ? "Aggiunto al carrello" : "Aggiungi al carrello"}
          </button>
          {added ? (
            <Link to="/cart" className="mt-4 block type-meta text-berry">
              Vai al carrello
            </Link>
          ) : null}
          <div className="mt-12">
            <p className="eyebrow">Altri colori</p>
            <div className="mt-4 flex gap-3">
              {products
                .filter((p) => p.handle !== product.handle)
                .map((p) => (
                  <Link
                    key={p.handle}
                    to="/products/$handle"
                    params={{ handle: p.handle }}
                    className="w-24"
                  >
                    <img src={p.images[0].src} alt={p.title} className="aspect-3/4 w-full object-cover" />
                    <p className="mt-2 type-meta">{p.title.replace(" Caelia", "")}</p>
                  </Link>
                ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
    </>
  );
}
