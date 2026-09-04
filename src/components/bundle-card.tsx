"use client";

import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import type { Product } from "@/lib/types";
import { formatMoney } from "@/lib/format";
import { Price } from "@/lib/currency";
import { useCart } from "@/lib/cart-context";
import { useRouter } from "next/navigation";

type Bundle = {
  handle: string;
  title: string;
  description: string;
  productHandles: string[];
  percentOff: number;
};

const BUNDLES: Bundle[] = [
  {
    handle: "trio-tonalita",
    title: "Trio delle Tonalità",
    description:
      "Burgundy, Cacao e Crema: le tre firme colore CAELIA insieme, per avere sempre il tono giusto a portata di mano. Risparmi il 15%.",
    productHandles: [
      "caelia-beauty-mirror-case-burgundy",
      "caelia-beauty-mirror-case-cacao",
      "caelia-beauty-mirror-case-crema",
    ],
    percentOff: 15,
  },
];

export function BundleSection({ all }: { all: Product[] }) {
  const { add } = useCart();
  const router = useRouter();
  return (
    <section className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
      <p className="text-xs uppercase tracking-[0.32em] text-ink/60">
        Bundle
      </p>
      <h2 className="mt-3 font-serif text-4xl lg:text-5xl leading-[1.05]">
        Risparmia con i duo.
      </h2>
      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {BUNDLES.map((b) => {
          const items = all.filter((p) => b.productHandles.includes(p.handle));
          const total = items.reduce(
            (sum, p) => sum + Number(p.variants[0].price.amount),
            0,
          );
          const discounted = total * (1 - b.percentOff / 100);
          return (
            <article
              key={b.handle}
              className="rounded-md bg-cream-deep p-8 flex flex-col"
            >
              <p className="text-xs uppercase tracking-[0.22em] text-burgundy">
                -{b.percentOff}%
              </p>
              <h3 className="mt-2 font-serif text-3xl leading-tight">
                {b.title}
              </h3>
              <p className="mt-3 text-ink/70 leading-relaxed">{b.description}</p>
              <div className="mt-6 grid gap-4 grid-cols-3">
                {items.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
              <div className="mt-6 flex items-baseline justify-between border-t border-mist/60 pt-4">
                <p className="text-xs uppercase tracking-[0.18em] text-ink/60">
                  Prezzo bundle
                </p>
                <div>
                  <span className="text-sm text-ink/60 line-through mr-2">
                    <Price amountEUR={total} />
                  </span>
                  <span className="font-serif text-2xl">
                    <Price amountEUR={discounted} />
                  </span>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => {
                    items.forEach((p) => {
                      const v = p.variants.find((x) => x.available) ?? p.variants[0];
                      add(p, v, 1);
                    });
                    router.push("/cart");
                  }}
                  className="inline-flex items-center justify-center bg-burgundy text-cream px-6 py-3 text-xs uppercase tracking-[0.22em] hover:bg-burgundy-deep transition-colors btn-press"
                >
                  Aggiungi al carrello (-{b.percentOff}%)
                </button>
                <Link
                  href="/products?bundle=trio-tonalita"
                  className="inline-flex items-center justify-center border border-burgundy text-burgundy px-6 py-3 text-xs uppercase tracking-[0.22em] hover:bg-burgundy hover:text-cream transition-colors btn-press"
                >
                  Dettagli
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
