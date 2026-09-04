import { ProductCard } from "@/components/product-card";
import { loadProducts } from "@/lib/shopify";

export const metadata = {
  title: "Collezione | CAELIA",
  description: "Scopri la collezione completa di CAELIA Beauty Mirror Case in tre tonalità: Burgundy, Cacao e Crema.",
};

export default async function ProductsPage() {
  const products = await loadProducts(25);

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-12 pb-24">
      <p className="text-xs uppercase tracking-[0.32em] text-ink/60">Collezione</p>
      <h1 className="mt-4 font-serif text-5xl leading-[1.05]">
        CAELIA Beauty Mirror Case.
      </h1>
      <p className="mt-4 max-w-2xl text-ink/70 leading-relaxed">
        Scopri la collezione completa disponibile in tre tonalità di firma.
        Ogni prodotto combina design minimalista, qualità artigianale e
        funzionalità raffinata.
      </p>

      {products.length === 0 ? (
        <div className="mt-12 rounded-md bg-cream-deep p-12 text-center">
          <p className="font-serif text-2xl">Nessun prodotto disponibile.</p>
          <p className="mt-2 text-ink/70">Ritorna più tardi per scoprire la collezione.</p>
        </div>
      ) : (
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              style={{ "--i": i } as React.CSSProperties}
            />
          ))}
        </div>
      )}
    </div>
  );
}
