"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/product-card";

export function SearchView({
  searchParams,
  allProducts,
}: {
  searchParams: Promise<{ q?: string }>;
  allProducts: Product[];
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");

  useEffect(() => {
    let cancelled = false;
    searchParams.then((p) => {
      if (cancelled) return;
      const q = (p.q ?? "").trim();
      setQuery(q);
      setSubmittedQuery(q);
    });
    return () => {
      cancelled = true;
    };
  }, [searchParams]);

  const results = useMemo(() => {
    if (!submittedQuery) return [];
    const q = submittedQuery.toLowerCase();
    return allProducts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        p.variants.some((v) => v.title.toLowerCase().includes(q)),
    );
  }, [submittedQuery, allProducts]);

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-12 pb-24">
      <p className="text-xs uppercase tracking-[0.32em] text-ink/60">Cerca</p>
      <h1 className="mt-4 font-serif text-5xl leading-[1.05]">
        Cosa stai cercando?
      </h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const q = query.trim();
          router.push(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
          setSubmittedQuery(q);
        }}
        className="mt-8 flex border-b border-charcoal pb-2 max-w-xl"
      >
        <input
          type="search"
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Beauty Mirror Case, specchio, gloss..."
          className="flex-1 bg-transparent text-lg placeholder:text-ink/40 focus:outline-none"
        />
        <button
          type="submit"
          className="text-xs uppercase tracking-[0.22em]"
        >
          Cerca
        </button>
      </form>

      <div className="mt-12">
        {submittedQuery === "" ? (
          <p className="text-ink/60">Inserisci un termine di ricerca.</p>
        ) : results.length === 0 ? (
          <div className="rounded-md bg-cream-deep p-10 text-center">
            <p className="font-serif text-xl">
              Nessun risultato per &ldquo;{submittedQuery}&rdquo;.
            </p>
            <p className="mt-3 text-ink/70">
              Prova &ldquo;mirror&rdquo;, &ldquo;beauty case&rdquo; o &ldquo;mini&rdquo;.
            </p>
          </div>
        ) : (
          <>
            <p className="text-xs uppercase tracking-[0.22em] text-ink/60 mb-6">
              {results.length} {results.length === 1 ? "risultato" : "risultati"} per &ldquo;{submittedQuery}&rdquo;
            </p>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}