import type { Metadata } from "next";
import { CartView } from "@/components/cart-view";

export const metadata: Metadata = {
  title: "Carrello",
  description: "Il tuo carrello CAELIA.",
  robots: { index: false, follow: false },
};

export default function CartPage() {
  return <CartView />;
}
