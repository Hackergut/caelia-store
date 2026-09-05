import Link from "next/link";
import { ProductInfoMap } from "@/components/product-info-map";

export default function Home() {
  return (
    <>
      <section className="bg-cream">
        <div className="shell grid items-center gap-6 pb-12 pt-6 sm:gap-8 md:pb-16 md:pt-10 lg:grid-cols-2 lg:gap-16 lg:py-20">
          {/* Titolo — mobile in cima, desktop colonna sinistra */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.32em] text-ink/45 sm:text-[11px] sm:tracking-[0.38em]">
              Volume 01 · Los Angeles · Dubai
            </p>
            <h1 className="fluid-display mt-3 font-light tracking-tight text-ink sm:mt-5">
              Aprire.
              <br />
              Ritoccare.
              <br />
              Ripartire.
            </h1>
            <p className="mt-4 max-w-sm leading-relaxed text-ink/70 sm:mt-6">
              Beauty Mirror Case. Specchio, matita, gloss. Un gesto.
            </p>
          </div>

          {/* Immagine con la CTA in overlay — stesso trattamento su mobile e desktop */}
          <div className="group relative -mx-[clamp(1rem,4vw,2.5rem)] aspect-[5/4] overflow-hidden bg-cream-deep sm:mx-0 sm:aspect-[16/9] lg:aspect-square">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/products/burgundy-caelia-pencils.jpg"
              alt="Burgundy Caelia — matita labbra e gloss nella tasca dell'astuccio"
              width={1600}
              height={1600}
              className="h-full w-full object-cover"
              fetchPriority="high"
              decoding="async"
            />

            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night/70 to-transparent p-4 lg:p-6">
              <Link
                href="/products"
                className="flex min-h-12 w-full items-center justify-center bg-cream px-8 text-[11px] uppercase tracking-[0.22em] text-burgundy transition-colors hover:bg-burgundy hover:text-cream"
              >
                La collezione
              </Link>
            </div>
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

      <ProductInfoMap />

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
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {[
              {
                href: "/products/burgundy-caelia",
                src: "/products/burgundy-caelia-pair.jpg",
                n: "01",
                t: "Burgundy",
              },
              {
                href: "/products/cacao-caelia",
                src: "/products/cacao-caelia-pair.jpg",
                n: "02",
                t: "Cacao",
              },
              {
                href: "/products/crema-caelia",
                src: "/products/crema-caelia-pair.jpg",
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
        <div className="shell-narrow py-10 text-center text-[10px] uppercase tracking-[0.22em] text-ink/40 sm:text-[11px] md:py-14">
          Italia · Pelle vegana · Resi 30 giorni
        </div>
      </section>
    </>
  );
}
