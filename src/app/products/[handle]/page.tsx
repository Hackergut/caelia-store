import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/product-detail";
import { loadProductByHandle, loadProducts, loadColorSiblings } from "@/lib/shopify";

export const dynamicParams = true;

export async function generateStaticParams() {
  const products = await loadProducts(50);
  return products.map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const resolvedParams = await params;
  const product = await loadProductByHandle(resolvedParams.handle);
  if (!product) return { title: "Not Found" };
  return {
    title: `${product.title} | CAELIA`,
    description: product.description.slice(0, 160),
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const resolvedParams = await params;
  const product = await loadProductByHandle(resolvedParams.handle);

  if (!product) {
    notFound();
  }

  const colorSiblings = await loadColorSiblings(resolvedParams.handle);

  return <ProductDetail product={product} colorSiblings={colorSiblings} />;
}
