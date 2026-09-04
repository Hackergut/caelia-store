import Link from "next/link";
import { listProducts } from "@/lib/catalog";
import { ProductCard } from "@/components/product-card";
import { ProductAnatomy } from "@/components/product-anatomy";

export default async function Home() {
  const products = await listProducts();
  return (
    <>
      <section className="bg-cream">
        <div className="shell section-y grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-[11px] uppercase tracking-[0.38em] text-ink/45">
              Volume 01 · Los Angeles · Dubai
            </p>
            <h1 className="fluid-display mt-5 font-light tracking-tight text-ink">
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
              className="mt-8 inline-flex min-h-12 w-full items-center justify-center bg-burgundy px-8 text-[11px] uppercase tracking-[0.22em] text-cream sm:w-auto"
            >
              La collezione
            </Link>
          </div>
          <div className="order-first aspect-[4/3] overflow-hidden bg-cream-deep sm:aspect-square lg:order-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/products/burgundy-caelia-pair.jpg"
              alt="Burgundy Caelia"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="relative min-h-[60svh] overflow-hidden bg-night md:min-h-[72vh]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/products/burgundy-caelia-stitch.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover blur-[4px] brightness-[0.42]"
        />
        <div className="absolute inset-0 bg-night/40" />
        <div className="shell-narrow relative z-10 flex min-h-[60svh] flex-col items-center justify-center py-16 text-center md:min-h-[72vh] md:py-24">
          <p className="text-[11px] uppercase tracking-[0.38em] text-cream/70">Manifesto</p>
          <h2 className="mt-6 text-balance text-2xl font-light leading-[1.3] text-cream sm:text-3xl lg:text-[2.6rem] md:mt-8">
            «Quante volte, per un semplice ritocco, ci ritroviamo a rovistare
            nella borsa?»
          </h2>
          <p className="mt-10 text-[11px] uppercase tracking-[0.28em] text-cream/65">
            Carla &amp; Giulia — fondatrici
          </p>
        </div>
      </section>

      <ProductAnatomy />

      <section className="bg-cream border-t border-mist/40">
        <div className="shell section-y">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4 md:mb-12 md:gap-6">
            <div>
              <p className="text-[11px] uppercase tracking-[0.32em] text-ink/40">N° 03</p>
              <h2 className="fluid-h2 mt-2 font-light">Tre colori.</h2>
            </div>
            <Link href="/products" className="text-[11px] uppercase tracking-[0.2em] text-ink/70">
              Vedi tutto →
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="shell section-y grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="aspect-[4/3] overflow-hidden bg-cream-deep sm:aspect-[3/4]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/editorial/liner-lips.jpg"
              alt="Ritocco labbra"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.32em] text-ink/40">Il rituale</p>
            <h2 className="fluid-h2 mt-5 font-light">
              Tre gesti.
              <br />
              Pronta.
            </h2>
            <ol className="mt-6 md:mt-10">
              {[
                { n: "01", t: "Apri", d: "Una mano. Si apre." },
                { n: "02", t: "Ritocca", d: "Matita, gloss, specchio." },
                { n: "03", t: "Riparti", d: "Richiudi. Sei oltre." },
              ].map((s) => (
                <li key={s.n} className="border-t border-mist/70 py-5">
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
        <div className="shell section-y">
          <p className="text-[11px] uppercase tracking-[0.32em] text-ink/40 mb-8">Capitoli</p>
          <div className="-mx-[clamp(1rem,4vw,2.5rem)] flex flex-col gap-2 md:mx-0 md:grid md:grid-cols-3 md:gap-3">
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
                {/* Mobile: wide banner crop with the label over the image.
                    Desktop: the original tall chapter card. */}
                <div className="relative aspect-[3/1] overflow-hidden bg-cream-deep sm:aspect-[4/1] md:aspect-[3/4]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.src}
                    alt={c.t}
                    className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-night/70 via-night/25 to-transparent md:hidden" />
                  <div className="absolute inset-y-0 left-0 flex items-center gap-4 px-[clamp(1rem,4vw,2.5rem)] md:hidden">
                    <span className="text-[10px] uppercase tracking-[0.28em] text-cream/60">
                      {c.n}
                    </span>
                    <span className="text-[1.6rem] font-light leading-none text-cream">
                      {c.t}
                    </span>
                  </div>
                </div>
                <p className="mt-3 hidden text-[11px] uppercase tracking-[0.22em] text-ink/40 md:block">
                  {c.n}
                </p>
                <p className="mt-1 hidden text-xl font-light md:block">{c.t}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-mist/40 bg-cream">
        <div className="shell-narrow py-10 text-center text-[10px] uppercase tracking-[0.22em] text-ink/40 sm:text-[11px] md:py-14">
          Italia · Pelle vegana · Resi 30 giorni
        </div>
      </section>
    </>
  );
}
