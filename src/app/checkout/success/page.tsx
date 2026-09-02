import type { Metadata } from "next";
import { SuccessView } from "./success-view";

export const metadata: Metadata = {
  title: "Ordine confermato",
  description: "Grazie per il tuo ordine CAELIA.",
  robots: { index: false, follow: false },
};

export default function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  return <SuccessView searchParams={searchParams} />;
}