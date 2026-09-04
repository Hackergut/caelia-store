import Link from "next/link";
import { listProducts } from "@/lib/catalog";
import { ProductCard } from "@/components/product-card";

export default async function Home() {
  const products = await listProducts();
  return (
    <>
      <section className="bg-cream">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-12 lg:py-16 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <p className="text-[11px] uppercase tracking-[0.38em] text-ink/45">
              Volume 01 · Los Angeles · Dubai
            </p>
            <h1 className="mt-5 text-5xl sm:text-6xl lg:text-[4.6rem] font-light leading-[0.98] tracking-tight text-ink">
              Aprire.
              <br />
              Ritoccare.
              <br />
              Ripartire.
            </h1>
            <p className="mt-7 max-w-sm text-ink/70 leading-relaxed">
              Beauty Mirror Case. Specchio, matita, gloss. Un gesto.
            </p>
            <Link
              href="/products"
              className="mt-8 inline-flex bg-burgundy text-cream px-8 py-3.5 text-[11px] uppercase tracking-[0.22em]"
            >
              La collezione
            </Link>
          </div>
          <div className="aspect-square overflow-hidden bg-cream-deep">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/products/burgundy-caelia-pair.jpg"
              alt="Burgundy Caelia"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-3xl px-6 py-24 lg:py-28 text-center">
          <p className="text-[11px] uppercase tracking-[0.32em] text-ink/40">Manifesto</p>
          <h2 className="mt-8 text-3xl sm:text-4xl font-light leading-[1.25] text-ink">
            «Quante volte, per un semplice ritocco, ci ritroviamo a rovistare
            nella borsa?»
          </h2>
          <p className="mt-10 text-[11px] uppercase tracking-[0.28em] text-ink/40">
            Carla &amp; Giulia — fondatrici
          </p>
        </div>
      </section>

      <section className="bg-cream border-t border-mist/40">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20 lg:py-24">
          <div className="mb-12 flex items-end justify-between gap-6">
            <div>
              <p className="text-[11px] uppercase tracking-[0.32em] text-ink/40">N° 03</p>
              <h2 className="mt-2 text-4xl lg:text-5xl font-light">Tre colori.</h2>
            </div>
            <Link href="/products" className="text-[11px] uppercase tracking-[0.2em] text-ink/70">
              Vedi tutto →
            </Link>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream border-t border-mist/40">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div className="aspect-[3/4] overflow-hidden bg-cream-deep">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/editorial/liner-lips.jpg"
              alt="Matita labbra"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.32em] text-ink/40">Il rituale</p>
            <h2 className="mt-5 text-4xl lg:text-5xl font-light leading-[1.05]">
              Tre gesti.
              <br />
              Pronta.
            </h2>
            <ol className="mt-10">
              {[
                { n: "01", t: "Apri", d: "Una mano. Si apre." },
                { n: "02", t: "Ritocca", d: "Matita, gloss, specchio." },
                { n: "03", t: "Riparti", d: "Richiudi. Sei oltre." },
              ].map((s) => (
                <li key={s.n} className="border-t border-mist/60 py-5">
                  <p className="text-[11px] tracking-[0.28em] text-ink/40">{s.n}</p>
                  <p className="mt-1 text-2xl font-light">{s.t}</p>
                  <p className="mt-1 text-ink/65">{s.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 lg:py-20">
          <p className="text-[11px] uppercase tracking-[0.32em] text-ink/40 mb-8">Capitoli</p>
          <div className="grid md:grid-cols-3 gap-3">
            {[
              {
                href: "/products/burgundy-caelia",
                src: "/products/chapter-burgundy.jpg",
                n: "01",
                t: "Burgundy",
              },
              {
                href: "/products/cacao-caelia",
                src: "/products/chapter-cacao.jpg",
                n: "02",
                t: "Cacao",
              },
              {
                href: "/products/crema-caelia",
                src: "/products/chapter-crema.jpg",
                n: "03",
                t: "Crema",
              },
            ].map((c) => (
              <Link key={c.href} href={c.href} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden bg-cream-deep">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.src}
                    alt={c.t}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <p className="mt-3 text-[11px] uppercase tracking-[0.22em] text-ink/40">
                  {c.n}
                </p>
                <p className="mt-1 text-xl font-light">{c.t}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-mist/40 bg-cream">
        <div className="mx-auto max-w-4xl px-6 py-14 text-center text-[11px] uppercase tracking-[0.22em] text-ink/40">
          Italia · Pelle vegana · Resi 30 giorni
        </div>
      </section>
    </>
  );
}
