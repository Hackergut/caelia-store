import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import { getProduct, listProducts } from "@/lib/catalog";
import { ProductDetail } from "@/components/product-detail";
import { ProductCard } from "@/components/product-card";
import { ProductReviews } from "@/components/product-reviews";
import { getReviewsForProduct } from "@/lib/reviews";
import { productJsonLd, breadcrumbJsonLd } from "@/lib/json-ld";

type Params = { handle: string };

export async function generateStaticParams(): Promise<Params[]> {
  const products = await listProducts();
  return products.map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProduct(handle);
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
  const product = await getProduct(handle);
  if (!product) notFound();

  const products = await listProducts();
  const related = products.filter((p) => p.handle !== handle).slice(0, 3);
  const ldProduct = productJsonLd(product);
  const ldBreadcrumb = breadcrumbJsonLd([
    { name: "Home", href: "/" },
    { name: "Collezione", href: "/products" },
    { name: product.title, href: `/products/${handle}` },
  ]);

  return (
    <>
      <Script
        id="ld-product"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldProduct) }}
      />
      <Script
        id="ld-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldBreadcrumb) }}
      />
      <ProductDetail product={product} />
      <ProductReviews reviews={getReviewsForProduct(product.handle)} />

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