import Link from "next/link";
import { listProducts } from "@/lib/catalog";
import { ProductCard } from "@/components/product-card";

export default async function Home() {
  const products = await listProducts();
  return (
    <>
      <section className="relative min-h-[78vh] overflow-hidden bg-night">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/products/burgundy-caelia-pair.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover scale-105 blur-[6px] brightness-50"
        />
        <div className="absolute inset-0 bg-night/45" />
        <div className="relative z-10 mx-auto flex min-h-[78vh] max-w-7xl flex-col justify-end px-6 lg:px-10 pb-16 lg:pb-24 pt-32">
          <p className="text-[11px] uppercase tracking-[0.32em] text-cream/80">
            Los Angeles · Dubai
          </p>
          <h1 className="mt-4 max-w-2xl text-5xl sm:text-6xl lg:text-7xl font-light leading-[1.02] text-cream">
            Aprire. Ritoccare.
            <br />
            Ripartire.
          </h1>
          <p className="mt-6 max-w-md text-cream/85 leading-relaxed">
            Beauty Mirror Case: specchio, matita e gloss in un astuccio.
          </p>
          <Link
            href="/products"
            className="mt-8 inline-flex w-fit bg-cream text-night px-8 py-3.5 text-[11px] uppercase tracking-[0.22em]"
          >
            Scopri la collezione
          </Link>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-3xl px-6 py-20 lg:py-24 text-center">
          <p className="text-[11px] uppercase tracking-[0.32em] text-ink/45">Manifesto</p>
          <h2 className="mt-6 text-2xl sm:text-3xl font-light leading-snug text-ink">
            Quante volte, per un ritocco, cerchiamo matita, gloss e specchio
            in fondo alla borsa?
          </h2>
          <p className="mt-8 text-[11px] uppercase tracking-[0.22em] text-ink/45">
            Carla &amp; Giulia
          </p>
        </div>
      </section>

      <section className="bg-cream border-t border-mist/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 lg:py-24">
          <div className="mb-10 flex items-end justify-between">
            <h2 className="text-3xl lg:text-4xl font-light">Collezione</h2>
            <Link href="/products" className="text-[11px] uppercase tracking-[0.2em]">
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

      <section className="relative overflow-hidden bg-night text-cream">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/products/cacao-caelia-pencils.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover blur-[8px] brightness-[0.35]"
        />
        <div className="absolute inset-0 bg-night/50" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 py-20 lg:py-28 grid lg:grid-cols-2 gap-12">
          <h2 className="text-4xl lg:text-5xl font-light leading-tight">
            Tre gesti.
            <br />
            Pronta a ripartire.
          </h2>
          <ol className="space-y-8">
            {[
              { n: "01", t: "Apri", d: "Si apre con una mano." },
              { n: "02", t: "Ritocca", d: "Matita, gloss, specchio." },
              { n: "03", t: "Riparti", d: "Richiudi e vai." },
            ].map((s) => (
              <li key={s.n}>
                <p className="text-[11px] tracking-[0.28em] text-cream/55">{s.n} · {s.t}</p>
                <p className="mt-1 text-cream/90">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center text-[11px] uppercase tracking-[0.22em] text-ink/45">
          Italia · Pelle vegana · Resi 30 giorni
        </div>
      </section>
    </>
  );
}
