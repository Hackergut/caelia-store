import Link from "next/link";
import { listProducts } from "@/lib/catalog";
import { ProductCard } from "@/components/product-card";
import { RecentlyViewedSection } from "@/components/recently-viewed-section";

export default async function Home() {
  const products = await listProducts();
  return (
    <>
      <section className="relative min-h-[88vh] flex items-end overflow-hidden bg-night">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/products/burgundy-caelia-pair.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/55 to-night/15" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-10 pb-16 lg:pb-24 pt-40">
          <p className="text-[11px] uppercase tracking-[0.4em] text-cream/70">
            Volume 01 · Los Angeles · Dubai
          </p>
          <h1 className="mt-5 max-w-3xl font-light text-5xl sm:text-6xl lg:text-8xl leading-[0.95] text-cream tracking-tight">
            Aprire.
            <br />
            Ritoccare.
            <br />
            Ripartire.
          </h1>
          <p className="mt-8 max-w-md text-cream/80 leading-relaxed">
            Beauty Mirror Case. Specchio, matita, gloss. Un gesto, si riparte.
          </p>
          <Link
            href="/products"
            className="mt-10 inline-flex bg-cream text-night px-8 py-4 text-[11px] uppercase tracking-[0.22em]"
          >
            La collezione
          </Link>
        </div>
      </section>

      <section className="relative overflow-hidden min-h-[70vh] flex items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/products/burgundy-caelia-stitch.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-cream/70" />
        <div className="relative z-10 mx-auto max-w-3xl px-6 py-28 text-center">
          <p className="text-[11px] uppercase tracking-[0.32em] text-ink/50">Manifesto</p>
          <h2 className="mt-8 text-3xl sm:text-4xl lg:text-[2.75rem] font-light leading-[1.2] text-balance">
            «Quante volte, per un semplice ritocco, ci ritroviamo a rovistare
            nella borsa?»
          </h2>
          <p className="mt-10 text-[11px] uppercase tracking-[0.28em] text-ink/55">
            Carla &amp; Giulia — fondatrici
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-24">
        <div className="flex items-end justify-between gap-6 mb-14">
          <div>
            <p className="text-[11px] uppercase tracking-[0.32em] text-ink/50">N° 03</p>
            <h2 className="mt-3 text-4xl lg:text-5xl font-light">Tre colori.</h2>
          </div>
          <Link href="/products" className="text-[11px] uppercase tracking-[0.22em] nav-link">
            Vedi tutto →
          </Link>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <ProductCard
              key={p.id}
              product={p}
              className="reveal"
              style={{ "--i": i } as React.CSSProperties}
            />
          ))}
        </div>
      </section>

      <section className="relative min-h-[80vh] overflow-hidden text-cream">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/products/cacao-caelia-pencils.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-night/70" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 py-28 grid lg:grid-cols-2 gap-16">
          <div>
            <p className="text-[11px] uppercase tracking-[0.32em] text-cream/60">Il rituale</p>
            <h2 className="mt-6 text-4xl lg:text-6xl font-light leading-[1.05]">
              Tre gesti.
              <br />
              Pronta.
            </h2>
          </div>
          <ol className="space-y-10 self-end">
            {[
              { n: "01", t: "Apri", d: "Una mano. Si apre." },
              { n: "02", t: "Ritocca", d: "Matita, gloss, specchio." },
              { n: "03", t: "Riparti", d: "Richiudi. Sei oltre." },
            ].map((s) => (
              <li key={s.n} className="border-t border-cream/20 pt-5">
                <p className="text-[11px] tracking-[0.28em] text-cream/50">{s.n}</p>
                <p className="mt-2 text-3xl font-light">{s.t}</p>
                <p className="mt-2 text-cream/70">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="grid lg:grid-cols-2">
        <Link href="/products/burgundy-caelia" className="relative min-h-[60vh] overflow-hidden group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/products/burgundy-caelia-logo.jpg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-night/35" />
          <div className="relative z-10 flex h-full min-h-[60vh] items-end p-10 text-cream">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] opacity-80">01</p>
              <p className="mt-2 text-4xl font-light">Burgundy</p>
            </div>
          </div>
        </Link>
        <Link href="/products/cacao-caelia" className="relative min-h-[60vh] overflow-hidden group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/products/cacao-caelia-logo.jpg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-night/30" />
          <div className="relative z-10 flex h-full min-h-[60vh] items-end p-10 text-cream">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] opacity-80">02</p>
              <p className="mt-2 text-4xl font-light">Cacao</p>
            </div>
          </div>
        </Link>
        <Link href="/products/crema-caelia" className="relative min-h-[55vh] overflow-hidden lg:col-span-2 group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/products/crema-caelia-pair.jpg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-night/25" />
          <div className="relative z-10 flex h-full min-h-[55vh] items-end p-10 text-cream">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] opacity-80">03</p>
              <p className="mt-2 text-4xl font-light">Crema</p>
            </div>
          </div>
        </Link>
      </section>

      <RecentlyViewedSection all={products} />

      <section className="relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/products/crema-caelia-pencils.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-cream/80" />
        <div className="relative z-10 mx-auto max-w-4xl px-6 py-28 text-center">
          <p className="text-[11px] uppercase tracking-[0.32em] text-ink/50">In movimento</p>
          <p className="mt-8 text-2xl lg:text-3xl font-light leading-snug">
            Due città, due vite: lavoro, palestra, trasferte, serate che
            cominciano subito dopo.
          </p>
          <p className="mt-12 text-[11px] uppercase tracking-[0.22em] text-ink/50">
            Italia · Pelle vegana · Resi 30 giorni
          </p>
        </div>
      </section>
    </>
  );
}
