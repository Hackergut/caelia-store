import type { Metadata } from "next";
import { products } from "@/lib/products";
import { WishlistView } from "./wishlist-view";

export const metadata: Metadata = {
  title: "Preferiti",
  description: "I tuoi Beauty Mirror Case salvati.",
};

export default async function WishlistPage({
  searchParams,
}: {
  searchParams: Promise<{ h?: string }>;
}) {
  const sp = await searchParams;
  const handles = (sp.h ?? "").split(",").filter(Boolean);
  return <WishlistView allProducts={products} initialHandles={handles} />;
}