import type { Metadata } from "next";
import { products } from "@/lib/products";
import { ProductsExplorer } from "@/components/products-explorer";

export const metadata: Metadata = {
  title: "Collezione",
  description:
    "Tutti i prodotti CAELIA: Beauty Mirror Case e Mini. Specchio, matita contorno labbra e lip gloss, in un astuccio compatto.",
};

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-16 pb-24">
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

      <ProductsExplorer products={products} />
    </div>
  );
}
