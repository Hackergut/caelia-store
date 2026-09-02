"use client";

import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/product-card";
import { useRecentlyViewed } from "@/lib/recently-viewed";

export function RecentlyViewedSection({ all }: { all: Product[] }) {
  const handles = useRecentlyViewed();
  const items = all.filter((p) => handles.includes(p.handle)).slice(0, 4);
  if (items.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
      <p className="text-xs uppercase tracking-[0.32em] text-ink/60">
        Visti di recente
      </p>
      <h2 className="mt-3 font-serif text-3xl lg:text-4xl leading-[1.1]">
        Torna dove eri rimasta.
      </h2>
      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}