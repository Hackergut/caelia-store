"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/product-card";

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
      <div className="mt-12 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between border-y border-mist/60 py-4">
        <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.22em] text-ink/70">
          <span>Filtra:</span>
          <FilterPill
            label="Tutti i colori"
            active={color === "all"}
            onClick={() => setColor("all")}
          />
          {allColors.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setColor(c)}
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 transition-colors ${
                color === c ? "border-burgundy" : "border-mist hover:border-burgundy/60"
              }`}
              aria-pressed={color === c}
            >
              <span
                className="h-3.5 w-3.5 rounded-full ring-1 ring-burgundy/10"
                style={{ background: c }}
              />
              <span>{colorLabel(c)}</span>
            </button>
          ))}
          <span className="mx-2 text-mist">|</span>
          {allTypes.map((t) => (
            <FilterPill
              key={t}
              label={t}
              active={type === t}
              onClick={() => setType(type === t ? "all" : t)}
            />
          ))}
        </div>
        <label className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-ink/70">
          Ordina:
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="border border-mist rounded-md px-3 py-2 text-xs normal-case tracking-normal bg-cream"
          >
            <option value="featured">Consigliati</option>
            <option value="price-asc">Prezzo crescente</option>
            <option value="price-desc">Prezzo decrescente</option>
            <option value="title">Nome A-Z</option>
          </select>
        </label>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-16 rounded-md bg-cream-deep p-12 text-center">
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
          <p className="mt-6 text-xs uppercase tracking-[0.22em] text-ink/60">
            {filtered.length} {filtered.length === 1 ? "prodotto" : "prodotti"}
          </p>
          <div className="mt-4 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
      className={`rounded-full border px-3 py-1 transition-colors ${
        active ? "border-burgundy bg-burgundy text-cream" : "border-mist hover:border-burgundy/60"
      }`}
    >
      {label}
    </button>
  );
}

function colorLabel(hex: string): string {
  const map: Record<string, string> = {
    "#d49b96": "Rose",
    "#1f1d1c": "Noir",
    "#efe5d8": "Ivory",
    "#cfc7be": "Mist",
  };
  return map[hex.toLowerCase()] ?? hex;
}
