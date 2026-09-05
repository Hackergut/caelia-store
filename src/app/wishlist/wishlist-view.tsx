"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/product-card";
import { WishlistShare } from "@/components/wishlist-share";

export function WishlistView({
  allProducts,
  initialHandles,
}: {
  allProducts: Product[];
  initialHandles?: string[];
}) {
  const [handles, setHandles] = useState<string[] | null>(
    initialHandles ?? null,
  );

  useEffect(() => {
    if (initialHandles && initialHandles.length > 0) {
      // Seed local storage from the shared link.
      try {
        window.localStorage.setItem(
          "caelia_wishlist_v1",
          JSON.stringify(initialHandles),
        );
      } catch {
        // ignore
      }
      setHandles(initialHandles);
      return;
    }
    try {
      const raw = window.localStorage.getItem("caelia_wishlist_v1");
      if (raw) setHandles(JSON.parse(raw) as string[]);
      else setHandles([]);
    } catch {
      setHandles([]);
    }
    function onChange(e: StorageEvent) {
      if (e.key === "caelia_wishlist_v1" && e.newValue) {
        setHandles(JSON.parse(e.newValue) as string[]);
      }
    }
    window.addEventListener("storage", onChange);
    return () => window.removeEventListener("storage", onChange);
  }, []);

  if (handles === null) {
    return (
      <div className="shell pt-16 pb-24">
        <div className="h-10 w-40 bg-mist/40 rounded animate-pulse" />
      </div>
    );
  }

  const saved = allProducts.filter((p) => handles.includes(p.handle));

  return (
    <div className="shell pt-16 pb-24">
      <p className="text-xs uppercase tracking-[0.32em] text-ink/60">Preferiti</p>
      <h1 className="mt-4 font-serif fluid-h2">
        I tuoi Beauty Mirror Case.
      </h1>
      <div className="mt-4">
        <WishlistShare handles={handles ?? []} />
      </div>

      {saved.length === 0 ? (
        <div className="mt-16 rounded-md bg-cream-deep p-12 text-center">
          <p className="font-serif text-2xl">Non hai ancora salvato nulla.</p>
          <p className="mt-3 text-ink/70 max-w-md mx-auto">
            Tocca il cuore su qualsiasi prodotto per aggiungerlo ai preferiti.
          </p>
          <Link
            href="/products"
            className="mt-6 inline-flex items-center justify-center bg-charcoal text-cream px-8 py-4 text-xs uppercase tracking-[0.22em] hover:bg-burgundy transition-colors"
          >
            Esplora la collezione
          </Link>
        </div>
      ) : (
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {saved.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}