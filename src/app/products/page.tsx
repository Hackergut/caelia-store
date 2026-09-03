import type { Metadata } from "next";
import { Suspense } from "react";
import { listProducts } from "@/lib/catalog";
import { ProductsExplorer } from "@/components/products-explorer";

export const metadata: Metadata = {
  title: "Collezione",
  description:
    "Tutti i prodotti CAELIA: Beauty Mirror Case e Mini. Specchio, matita contorno labbra e lip gloss, in un astuccio compatto.",
};

export default async function ProductsPage() {
  const products = await listProducts();
  return (
    <>
      <ProductsPageHeader />
      <Suspense fallback={<ProductsSkeleton />}>
        <ProductsExplorer products={products} />
      </Suspense>
    </>
  );
}

function ProductsPageHeader() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-16 pb-12">
      <div className="max-w-2xl">
        <p className="text-xs uppercase tracking-[0.32em] text-ink/60">
          Collezione
        </p>
        <h1 className="mt-4 font-serif text-5xl lg:text-6xl leading-[1.05]">
          Un astuccio.
          <br />
          Tutto il necessario.
        </h1>
        <p className="mt-6 text-lg text-ink/80 leading-relaxed">
          CAELIA nasce per chi passa da un appuntamento all&apos;altro, da una
          citta all&apos;altra, da un momento all&apos;altro della giornata.
          Scegli la tua tonalita.
        </p>
      </div>
    </div>
  );
}

function ProductsSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-10">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-[4/5] bg-mist/40 rounded-md" />
            <div className="mt-4 h-5 w-2/3 bg-mist/40 rounded" />
            <div className="mt-2 h-3 w-1/3 bg-mist/40 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}