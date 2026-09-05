"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/product-card";
import { cn } from "@/lib/utils";

type Sort = "featured" | "price-asc" | "price-desc" | "title";

export function ProductsExplorer({ products }: { products: Product[] }) {
  const [color, setColor] = useState<string | "all">("all");
  const [type, setType] = useState<string | "all">("all");
  const [sort, setSort] = useState<Sort>("featured");

  const allColors = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) =>
      p.variants.forEach((v) => v.swatch && set.add(v.swatch)),
    );
    return Array.from(set);
  }, [products]);

  const allTypes = useMemo(() => {
    const set = new Set(products.map((p) => p.productType));
    return Array.from(set);
  }, [products]);

  const filtered = useMemo(() => {
    let list = products.slice();
    if (color !== "all") {
      list = list.filter((p) =>
        p.variants.some((v) => v.swatch === color),
      );
    }
    if (type !== "all") {
      list = list.filter((p) => p.productType === type);
    }
    switch (sort) {
      case "price-asc":
        list.sort((a, b) => Number(a.variants[0].price.amount) - Number(b.variants[0].price.amount));
        break;
      case "price-desc":
        list.sort((a, b) => Number(b.variants[0].price.amount) - Number(a.variants[0].price.amount));
        break;
      case "title":
        list.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }
    return list;
  }, [products, color, type, sort]);

  return (
    <>
      <div className="shell mt-8 border-y border-mist/60 py-3 md:mt-12 md:py-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          {/* Mobile: single horizontal snap rail. Desktop: wrapping pills. */}
          <div className="snap-rail -mx-1 px-1 text-[11px] uppercase tracking-[0.2em] text-ink/70 lg:mx-0 lg:flex-wrap lg:items-center lg:gap-3 lg:overflow-visible lg:px-0">
            <span className="hidden items-center lg:inline-flex">Filtra:</span>
            <FilterPill
              label="Tutti"
              active={color === "all"}
              onClick={() => setColor("all")}
            />
            {allColors.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setColor(c)}
                className={cn(
                  "inline-flex min-h-9 items-center gap-2 rounded-full border px-3 transition-colors",
                  color === c
                    ? "border-charcoal"
                    : "border-mist hover:border-charcoal/60",
                )}
                aria-pressed={color === c}
              >
                <span
                  className="h-3.5 w-3.5 rounded-full ring-1 ring-charcoal/10"
                  style={{ background: c }}
                />
                <span className="whitespace-nowrap">{colorLabel(c)}</span>
              </button>
            ))}
            <span className="mx-1 hidden text-mist lg:inline">|</span>
            {allTypes.map((t) => (
              <FilterPill
                key={t}
                label={t}
                active={type === t}
                onClick={() => setType(type === t ? "all" : t)}
              />
            ))}
          </div>
          <label className="flex items-center justify-between gap-2 text-[11px] uppercase tracking-[0.2em] text-ink/70 lg:justify-start">
            Ordina:
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="min-h-11 flex-1 rounded-md border border-mist bg-cream px-3 text-sm normal-case tracking-normal lg:min-h-9 lg:flex-none lg:text-xs"
            >
              <option value="featured">Consigliati</option>
              <option value="price-asc">Prezzo crescente</option>
              <option value="price-desc">Prezzo decrescente</option>
              <option value="title">Nome A-Z</option>
            </select>
          </label>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="shell mt-12 rounded-md bg-cream-deep px-6 py-12 text-center md:mt-16">
          <p className="font-serif text-2xl">Nessun prodotto corrisponde.</p>
          <button
            type="button"
            onClick={() => { setColor("all"); setType("all"); }}
            className="mt-4 text-xs uppercase tracking-[0.22em] nav-link"
          >
            Reimposta i filtri
          </button>
        </div>
      ) : (
        <>
          <p className="shell mt-6 text-xs uppercase tracking-[0.22em] text-ink/60">
            {filtered.length} {filtered.length === 1 ? "prodotto" : "prodotti"}
          </p>
          <div className="shell mt-4 grid gap-6 pb-16 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} className="reveal" style={{ "--i": i } as React.CSSProperties} />
            ))}
          </div>
        </>
      )}
    </>
  );
}

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex min-h-9 items-center whitespace-nowrap rounded-full border px-3 transition-colors",
        active
          ? "border-charcoal bg-charcoal text-cream"
          : "border-mist hover:border-charcoal/60",
      )}
    >
      {label}
    </button>
  );
}

function colorLabel(hex: string): string {
  const map: Record<string, string> = {
    "#4a0e16": "Burgundy Caelia",
    "#5c2e38": "Burgundy Caelia",
    "#6b333d": "Burgundy Caelia",
    "#604c46": "Cacao Caelia",
    "#6d403b": "Cacao Caelia",
    "#7b443b": "Cacao Caelia",
    "#7b5644": "Cacao Caelia",
    "#e7d4c0": "Crema Caelia",
    "#e5d1bd": "Crema Caelia",
    "#ead6c2": "Crema Caelia",
    "#efe5d8": "Crema Caelia",
    "#dfc0b4": "Rosa Caelia",
    "#d49b96": "Rosa Caelia",
    "#1f1d1c": "Cacao Caelia",
    "#cfc7be": "Mist",
  };
  return map[hex.toLowerCase()] ?? hex;
}