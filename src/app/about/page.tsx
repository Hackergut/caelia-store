import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "La nostra storia",
  description:
    "CAELIA nasce dall'idea di Carla e Giulia, due sorelle fra Los Angeles e Dubai: un beauty case con specchio elegante, ordinato e sempre a portata di mano.",
};

export default function AboutPage() {
  return (
    <div className="pb-24">
      {/* Hero */}
      <section className="bg-cream-deep">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20 lg:py-28 grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-burgundy">
              La nostra storia
            </p>
            <h1 className="mt-4 font-display text-5xl lg:text-6xl leading-[1.05] text-balance">
              Aprire. Ritoccare. Ripartire.
            </h1>
            <p className="mt-6 max-w-md text-ink/70 leading-relaxed">
              CAELIA nasce da un gesto quotidiano: aprire uno specchio, ritoccarsi
              e ripartire. Un oggetto piccolo, ma pensato per accompagnare le
              donne che non si fermano mai.
            </p>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-cream">
            <Image
              src="/products/caelia-burgundy-front.jpg"
              alt="CAELIA Beauty Mirror Case, Burgundy"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Origine */}
      <section className="mx-auto max-w-3xl px-6 lg:px-10 py-20">
        <p className="text-xs uppercase tracking-[0.32em] text-ink/60">Le fondatrici</p>
        <h2 className="mt-3 font-serif text-4xl leading-[1.1]">
          Due sorelle, due città, un&apos;unica ossessione per il dettaglio.
        </h2>
        <div className="mt-8 space-y-6 text-ink/75 leading-relaxed">
          <p>
            Carla e Giulia vivono fra Los Angeles e Dubai. Fra un volo e l&apos;altro,
            avevano lo stesso problema: un beauty case elegante, ordinato e
            davvero pratico non esisteva. Specchietti che si graffiavano,
            chiusure che cedevano, materiali che invecchiavano male.
          </p>
          <p>
            Così hanno deciso di crearlo. CAELIA è il risultato di decine di
            prototipi: uno specchio integrato anti-riflesso, una chiusura
            magnetica sicura, una fodera in microfibra per una pulizia rapida.
            Ogni pezzo è realizzato in Italia in pelle vegana, con la stessa cura
            di un accessorio di alta pelletteria.
          </p>
          <p>
            Il nome CAELIA richiama il cielo — <em>caelum</em> in latino — perché
            ogni ritocco è un piccolo momento di leggerezza da portare con sé.
          </p>
        </div>
      </section>

      {/* Valori */}
      <section className="border-t border-mist/60">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20 grid gap-10 md:grid-cols-3">
          {[
            {
              t: "Materiali responsabili",
              d: "Pelle vegana e fodera in microfibra, selezionate per durare e invecchiare bene.",
            },
            {
              t: "Fatto in Italia",
              d: "Prodotto da laboratori artigianali italiani, con controllo qualità pezzo per pezzo.",
            },
            {
              t: "Design essenziale",
              d: "Nessun dettaglio superfluo: specchio, chiusura magnetica e logo goffrato.",
            },
          ].map((v) => (
            <div key={v.t}>
              <h3 className="font-serif text-2xl">{v.t}</h3>
              <p className="mt-3 text-ink/70 leading-relaxed">{v.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Gamma colori */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-8">
        <div className="grid gap-8 sm:grid-cols-3">
          {[
            { src: "/products/caelia-burgundy-front.jpg", name: "Burgundy" },
            { src: "/products/caelia-cacao-front.jpg", name: "Cacao" },
            { src: "/products/caelia-crema-front.jpg", name: "Crema" },
          ].map((c) => (
            <figure key={c.name}>
              <div className="relative aspect-square overflow-hidden rounded-md bg-cream-deep">
                <Image
                  src={c.src}
                  alt={`CAELIA Beauty Mirror Case, ${c.name}`}
                  fill
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 text-xs uppercase tracking-[0.22em] text-ink/70">
                {c.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-16 text-center">
        <h2 className="font-serif text-3xl lg:text-4xl">Scopri la collezione.</h2>
        <p className="mt-3 text-ink/70">Tre tonalità di firma. Un solo gesto.</p>
        <Link
          href="/products"
          className="mt-8 inline-flex items-center justify-center bg-burgundy text-cream px-7 py-3.5 text-xs uppercase tracking-[0.22em] hover:bg-burgundy-deep transition-colors btn-press"
        >
          Vai alla collezione
        </Link>
      </section>
    </div>
  );
}
