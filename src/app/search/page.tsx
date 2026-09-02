import type { Metadata } from "next";
import { products } from "@/lib/products";
import { SearchView } from "./search-view";

export const metadata: Metadata = {
  title: "Cerca",
  description: "Cerca nella collezione CAELIA.",
  robots: { index: false, follow: true },
};

export default function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  return <SearchView searchParams={searchParams} allProducts={products} />;
}
