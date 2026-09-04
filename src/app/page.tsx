import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { BundleSection } from "@/components/bundle-card";
import { PaymentIcons, LockIcon, TruckIcon, RefreshIcon } from "@/components/trust-icons";
import { loadProducts } from "@/lib/shopify";

export default async function Home() {
  const products = await loadProducts(25);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-cream-deep">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24 lg:py-32 grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="reveal" style={{ "--i": 0 } as React.CSSProperties}>
            <p className="text-xs uppercase tracking-[0.32em] text-burgundy">
              CAELIA Beauty
            </p>
            <h1 className="mt-4 font-display text-5xl lg:text-6xl leading-[1.05] text-balance">
              Aprire. Ritoccare. Ripartire.
            </h1>
            <p className="mt-6 max-w-md text-ink/70 leading-relaxed">
              Lo specchio compatto che unisce eleganza e praticità. In pelle
              vegana, chiusura magnetica e riflesso anti-riflesso. Scegli tra
              i tre colori di firma CAELIA: Burgundy, Cacao e Crema.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center bg-burgundy text-cream px-7 py-3.5 text-xs uppercase tracking-[0.22em] hover:bg-burgundy-deep transition-colors btn-press"
              >
                Scopri la collezione
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center border border-burgundy text-burgundy px-7 py-3.5 text-xs uppercase tracking-[0.22em] hover:bg-burgundy hover:text-cream transition-colors btn-press"
              >
                La nostra storia
              </Link>
            </div>
          </div>
          <div
            className="relative aspect-[4/5] overflow-hidden rounded-md bg-cream media-zoom lift-strong reveal"
            style={{ "--i": 1 } as React.CSSProperties}
          >
            <Image
              src="/products/beauty-mirror-case-burgundy.png"
              alt="CAELIA Beauty Mirror Case, Burgundy"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-20 border-t border-mist/60">
        <p className="text-xs uppercase tracking-[0.32em] text-ink/60">Collezione</p>
        <h2 className="mt-3 font-serif text-4xl lg:text-5xl leading-[1.05]">
          CAELIA Beauty Mirror Case.
        </h2>
        <p className="mt-4 max-w-2xl text-ink/70 leading-relaxed">
          Disponibile in tre tonalità di firma: Burgundy caldo, Cacao accogliente
          e Crema luminosa. Ogni prodotto racchiude design minimalista e funzionalità
          raffinata — specchio integrato, chiusura magnetica e fodera in microfibra.
        </p>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.slice(0, 3).map((p, i) => (
            <ProductCard key={p.id} product={p} style={{ "--i": i } as React.CSSProperties} />
          ))}
        </div>
      </section>

      {/* Bundle card — realistic composition with cart wiring */}
      <div className="border-t border-mist/60">
        <BundleSection all={products} />
      </div>

      {/* Trust strip */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-16 border-t border-mist/60">
        <div className="flex flex-wrap items-center justify-between gap-8">
          <div className="flex flex-wrap items-center gap-8 text-xs uppercase tracking-[0.18em] text-ink/70">
            <span className="inline-flex items-center gap-2">
              <LockIcon className="h-5 w-5" /> Pagamenti sicuri
            </span>
            <span className="inline-flex items-center gap-2">
              <TruckIcon className="h-5 w-5" /> Spedizione gratuita
            </span>
            <span className="inline-flex items-center gap-2">
              <RefreshIcon className="h-5 w-5" /> Resi in 30 giorni
            </span>
          </div>
          <PaymentIcons />
        </div>
      </section>
    </>
  );
}
