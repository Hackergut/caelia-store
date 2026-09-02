import type { Metadata } from "next";
import { products } from "@/lib/products";
import { WishlistView } from "./wishlist-view";

export const metadata: Metadata = {
  title: "Preferiti",
  description: "I tuoi Beauty Mirror Case salvati.",
};

export default function WishlistPage() {
  return <WishlistView allProducts={products} />;
}
