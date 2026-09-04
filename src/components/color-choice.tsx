import Link from "next/link";
import type { Product } from "@/lib/types";
import { Price } from "@/lib/currency";

/**
 * Scelta colore — stessa grammatica dei "tre gesti":
 * fasce orizzontali con il crop colore in sfondo e il testo in overlay.
 * Su desktop le fasce diventano tre colonne alte.
 */

const CHAPTER: Record<string, string> = {
  "burgundy-caelia": "/products/chapter-burgundy.jpg",
  "cacao-caelia": "/products/chapter-cacao.jpg",
  "crema-caelia": "/products/chapter-crema.jpg",
};

export function ColorChoice({ products }: { products: Product[] }) {
  return (
    <section className="border-t border-mist/40 bg-cream">
      <div className="shell section-y">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4 md:mb-10 md:gap-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.32em] text-ink/40">
              N° 03
            </p>
            <h2 className="fluid-h2 mt-2 font-light">Tre colori.</h2>
          </div>
          <Link
            href="/products"
            className="text-[11px] uppercase tracking-[0.2em] text-ink/70"
          >
            Vedi tutto →
          </Link>
        </div>

        <ol className="-mx-[clamp(1rem,4vw,2.5rem)] flex flex-col gap-2 md:mx-0 md:grid md:grid-cols-3 md:gap-3">
          {products.map((p, i) => {
            const variant = p.variants[0];
            const n = String(i + 1).padStart(2, "0");
            const src = CHAPTER[p.handle] ?? p.images[0].src;

            return (
              <li key={p.id}>
                <Link
                  href={`/products/${p.handle}`}
                  className="group relative block aspect-[4/1] overflow-hidden sm:aspect-[5/1] md:aspect-[3/4] md:rounded-sm"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={p.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-night/80 via-night/45 to-night/10 md:bg-gradient-to-t md:from-night/85 md:via-night/20 md:to-transparent" />

                  <div className="relative flex h-full items-center gap-4 px-[clamp(1rem,4vw,2.5rem)] md:items-end md:px-5 md:pb-5">
                    <span className="text-[11px] tracking-[0.28em] text-cream/60 md:hidden">
                      {n}
                    </span>
                    <span className="min-w-0 flex-1 md:flex-none">
                      <span className="hidden text-[11px] tracking-[0.28em] text-cream/60 md:block">
                        {n}
                      </span>
                      <span className="block text-xl font-light leading-tight text-cream sm:text-2xl md:mt-1">
                        {p.title}
                      </span>
                      <span className="block truncate text-sm text-cream/70">
                        {variant.title}
                      </span>
                    </span>
                    <Price
                      amountEUR={Number(variant.price.amount)}
                      className="ml-auto shrink-0 text-sm text-cream md:ml-0 md:mt-1"
                    />
                  </div>
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
