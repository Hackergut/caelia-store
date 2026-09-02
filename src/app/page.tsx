import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { RecentlyViewedSection } from "@/components/recently-viewed-section";
import { BundleSection } from "@/components/bundle-card";
import { Caelia3DExplorer } from "@/components/caelia-3d-explorer";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-16 pb-24 lg:pt-24 lg:pb-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-ink/60">
                Los Angeles · Dubai
              </p>
              <h1 className="mt-6 font-serif text-5xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight">
                Aprire. <span className="italic text-rose">Ritoccare.</span>
                <br />
                Ripartire.
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink/80">
                Il Beauty Mirror Case CAELIA: un astuccio compatto che racchiude
                matita contorno labbra, lip gloss e specchio. Pensato per le
                giornate fatte di continui passaggi.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center bg-charcoal text-cream px-8 py-4 text-xs uppercase tracking-[0.22em] hover:bg-rose transition-colors"
                >
                  Scopri la collezione
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] nav-link"
                >
                  La nostra storia →
                </Link>
              </div>
              <div className="mt-12 flex gap-10 text-xs uppercase tracking-[0.22em] text-ink/60">
                <div>
                  <p className="font-serif text-3xl normal-case text-ink">3</p>
                  <p>Tonalità</p>
                </div>
                <div>
                  <p className="font-serif text-3xl normal-case text-ink">3-in-1</p>
                  <p>Specchio, matita, gloss</p>
                </div>
                <div>
                  <p className="font-serif text-3xl normal-case text-ink">100%</p>
                  <p>Pelle vegana</p>
                </div>
              </div>
            </div>
            <div className="relative aspect-[4/5] rounded-md overflow-hidden shadow-product">
              <Image
                src="/products/beauty-case-rose-front.svg"
                alt="Beauty Mirror Case CAELIA"
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Manifesto */}
      <section className="bg-cream-deep relative grain">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 py-24 lg:py-32 text-center relative z-10">
          <p className="text-xs uppercase tracking-[0.32em] text-ink/60">Manifesto</p>
          <h2 className="mt-6 font-serif text-3xl sm:text-4xl lg:text-5xl leading-[1.15]">
            &ldquo;Quante volte, per un semplice ritocco, ci ritroviamo a rovistare
            nella borsa alla ricerca di una matita, del lip gloss o dello
            specchietto?&rdquo;
          </h2>
          <p className="mt-8 text-sm uppercase tracking-[0.22em] text-ink/70">
            Carla &amp; Giulia — fondatrici di CAELIA
          </p>
        </div>
      </section>

      {/* Featured products */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-24 lg:py-32">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-ink/60">
              Collezione
            </p>
            <h2 className="mt-3 font-serif text-4xl lg:text-5xl leading-[1.1]">
              Un astuccio. Tutto il necessario.
            </h2>
          </div>
          <Link
            href="/products"
            className="text-xs uppercase tracking-[0.22em] nav-link self-start md:self-end"
          >
            Vedi tutto →
          </Link>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Ritual */}
      <section className="bg-charcoal text-cream">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24 lg:py-32 grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/5] rounded-md overflow-hidden">
            <Image
              src="/products/beauty-case-rose-open.svg"
              alt="Beauty Mirror Case aperto"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-blush">
              Il rituale CAELIA
            </p>
            <h2 className="mt-6 font-serif text-4xl lg:text-5xl leading-[1.1]">
              Tre gesti.
              <br />
              Pronta a ripartire.
            </h2>
            <ol className="mt-10 space-y-6 text-cream/80">
              {[
                {
                  n: "01",
                  t: "Apri",
                  d: "Chiusura magnetica, si apre con una sola mano.",
                },
                {
                  n: "02",
                  t: "Ritocca",
                  d: "Matita contorno labbra, gloss, specchio. Tutto in un gesto.",
                },
                {
                  n: "03",
                  t: "Ripartire",
                  d: "Richiudi e sei gia oltre. Nessun attimo perso.",
                },
              ].map((step) => (
                <li key={step.n} className="flex gap-6">
                  <span className="font-serif text-2xl text-blush">
                    {step.n}
                  </span>
                  <div>
                    <p className="font-serif text-2xl">{step.t}</p>
                    <p className="mt-1 text-sm text-cream/70">{step.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <BundleSection all={products} />
      <RecentlyViewedSection all={products} />

      <Caelia3DExplorer />

      {/* Press / Trust */}
      <section className="mx-auto max-w-5xl px-6 lg:px-10 py-20 lg:py-28 text-center">
        <p className="text-xs uppercase tracking-[0.32em] text-ink/60">
          Pensato per chi vive in movimento
        </p>
        <p className="mt-6 font-serif text-2xl lg:text-3xl leading-snug text-ink/80">
          Due citta lontane, due vite scandite da lavoro, appuntamenti, palestra,
          trasferte, weekend improvvisati e serate che cominciano subito dopo.
        </p>
        <div className="mt-12 flex flex-wrap justify-center gap-x-12 gap-y-4 text-xs uppercase tracking-[0.22em] text-ink/60">
          <span>Prodotto in Italia</span>
          <span>·</span>
          <span>Pelle vegana certificata</span>
          <span>·</span>
          <span>Spedizioni tracciate</span>
          <span>·</span>
          <span>Resi gratuiti 30 giorni</span>
        </div>
      </section>
    </>
  );
}
