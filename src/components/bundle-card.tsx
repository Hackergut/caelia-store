import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import type { Product } from "@/lib/types";
import { formatMoney } from "@/lib/format";
import { Price } from "@/lib/currency";

type Bundle = {
  handle: string;
  title: string;
  description: string;
  productHandles: string[];
  percentOff: number;
};

const BUNDLES: Bundle[] = [
  {
    handle: "duo-essentials",
    title: "Duo Essentials",
    description:
      "Beauty Mirror Case + Mini: specchio, matita e gloss in due formati. Risparmi il15%.",
    productHandles: ["beauty-mirror-case", "beauty-mirror-case-mini"],
    percentOff: 15,
  },
];

export function BundleSection({ all }: { all: Product[] }) {
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
              <p className="text-xs uppercase tracking-[0.22em] text-rose">
                -{b.percentOff}%
              </p>
              <h3 className="mt-2 font-serif text-3xl leading-tight">
                {b.title}
              </h3>
              <p className="mt-3 text-ink/70 leading-relaxed">{b.description}</p>
              <div className="mt-6 grid gap-4 grid-cols-2">
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
              <Link
                href="/products?bundle=duo-essentials"
                className="mt-6 inline-flex items-center justify-center bg-charcoal text-cream px-6 py-3 text-xs uppercase tracking-[0.22em] hover:bg-rose transition-colors self-start"
              >
                Acquista il bundle
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}