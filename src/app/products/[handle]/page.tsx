import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductByHandle, products } from "@/lib/products";
import { ProductDetail } from "@/components/product-detail";
import { ProductCard } from "@/components/product-card";

type Params = { handle: string };

export function generateStaticParams(): Params[] {
  return products.map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { handle } = await params;
  const product = getProductByHandle(handle);
  if (!product) return {};
  return {
    title: product.seo.title,
    description: product.seo.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { handle } = await params;
  const product = getProductByHandle(handle);
  if (!product) notFound();

  const related = products.filter((p) => p.handle !== handle).slice(0, 3);

  return (
    <>
      <ProductDetail product={product} />

      <section className="bg-cream-deep relative grain">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24 relative z-10">
          <p className="text-xs uppercase tracking-[0.32em] text-ink/60 mb-6">
            Per completare il rituale
          </p>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}