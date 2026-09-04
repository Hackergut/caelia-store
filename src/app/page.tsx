import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { BundleSection } from "@/components/bundle-card";
import { PaymentIcons, LockIcon, TruckIcon, RefreshIcon } from "@/components/trust-icons";
import { products } from "@/lib/products";

const PALETTE = [
  { name: "Burgundy", role: "Colore principale + accento — logo, CTA, hover, enfasi sui link", hex: "#4a0e16", fg: "text-cream" },
  { name: "Burgundy Deep", role: "Stato hover", hex: "#2e070d", fg: "text-cream" },
  { name: "Cacao", role: "Neutro — testo, titoli, superfici", hex: "#7b5644", fg: "text-cream" },
  { name: "Cacao Deep", role: "Hover su superfici scure", hex: "#5a3d2e", fg: "text-cream" },
  { name: "Rosa", role: "Tinta decorativa — badge, accenti", hex: "#d49b96", fg: "text-ink" },
  { name: "Blush", role: "Rosa caldo — tinta cream", hex: "#e9c9c4", fg: "text-ink" },
  { name: "Night", role: "Superficie — footer, barra annunci", hex: "#1a0a0e", fg: "text-cream" },
  { name: "Cream", role: "Sfondo", hex: "#f7f1ea", fg: "text-ink" },
  { name: "Mist", role: "Separatori caldi", hex: "#e0d6c9", fg: "text-ink" },
];

const COLOR_VARIANTS = [
  {
    name: "Cacao",
    hex: "#7b5644",
    images: [
      { src: "/products/colors/case-cacao-mirror.jpeg", alt: "CAELIA Beauty Case con specchio, Cacao — dettaglio specchio" },
      { src: "/products/colors/cacao-pair.jpeg", alt: "CAELIA Beauty Case con specchio e portacarte, Cacao, sul tavolo" },
      { src: "/products/colors/cacao-pencils.jpeg", alt: "CAELIA astuccio con matite trucco, Cacao" },
    ],
  },
  {
    name: "Burgundy",
    hex: "#4a0e16",
    images: [
      { src: "/products/colors/case-burgundy.jpg", alt: "CAELIA custodia, Burgundy — dettaglio" },
      { src: "/products/colors/burgundy-pair.jpeg", alt: "CAELIA Beauty Case con specchio e portacarte, Burgundy, sul tavolo" },
      { src: "/products/colors/burgundy-pencils.jpeg", alt: "CAELIA astuccio con matite trucco, Burgundy" },
    ],
  },
  {
    name: "Rosa",
    hex: "#d49b96",
    images: [
      { src: "/products/colors/case-rosa-mirror.jpeg", alt: "CAELIA Beauty Case con specchio, Rosa — dettaglio specchio" },
      { src: "/products/colors/rosa-pair.jpeg", alt: "CAELIA Beauty Case con specchio e portacarte, Rosa, sul tavolo" },
      { src: "/products/colors/rosa-pair.jpeg", alt: "CAELIA Beauty Case con specchio, Rosa — dettaglio logo goffrato", zoom: true },
    ],
  },
];

const MOTION_TOKENS = [
  { name: "--ease-out", value: "cubic-bezier(0.23, 1, 0.32, 1)", use: "Entrate, rilascio dopo pressione" },
  { name: "--ease-drawer", value: "cubic-bezier(0.32, 0.72, 0, 1)", use: "Cassetto carrello, pannelli, modali" },
  { name: "--ease-spring-out", value: "cubic-bezier(0.16, 1.08, 0.38, 1)", use: "Toast, momenti marketing" },
  { name: "--dur-fast / --dur-base", value: "160ms / 220ms", use: "Pressione bottone, piccoli popover" },
  { name: "--dur-slow", value: "480ms", use: "Modali, ingresso cassetti, rivelazioni" },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-cream-deep">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24 lg:py-32 grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="reveal" style={{ "--i": 0 } as React.CSSProperties}>
            <p className="text-xs uppercase tracking-[0.32em] text-burgundy">
              CAELIA design system
            </p>
            <h1 className="mt-4 font-display text-5xl lg:text-6xl leading-[1.05] text-balance">
              Aprire. Ritoccare. Ripartire.
            </h1>
            <p className="mt-6 max-w-md text-ink/70 leading-relaxed">
              Un sistema caldo e minimale pensato per una boutique di accessori
              beauty: una palette a tre toni cacao / burgundy / rosa, una
              tipografia Inter unica e un linguaggio di movimento in stile
              Emil Kowalski, tarato per l&apos;e-commerce — feedback alla
              pressione, cassetti e rivelazioni scaglionate.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/"
                className="inline-flex items-center justify-center bg-burgundy text-cream px-7 py-3.5 text-xs uppercase tracking-[0.22em] hover:bg-burgundy-deep transition-colors btn-press"
              >
                Scopri la collezione
              </Link>
              <Link
                href="/"
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
              src="/products/beauty-case-rose-lifestyle.png"
              alt="CAELIA Beauty Mirror Case, Rose, in use"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Palette */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
        <p className="text-xs uppercase tracking-[0.32em] text-ink/60">Token</p>
        <h2 className="mt-3 font-serif text-4xl lg:text-5xl leading-[1.05]">
          Palette a tre toni.
        </h2>
        <p className="mt-4 max-w-2xl text-ink/70 leading-relaxed">
          Ogni colore ha un ruolo definito — mai scelto solo per decorazione.
          Il burgundy è il colore principale e di accento della piattaforma:
          il logo, le CTA primarie e ogni superficie a forte enfasi
          convergono su di esso. Il cacao resta il neutro caldo per il testo
          di lettura; il rosa resta decorativo.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PALETTE.map((c, i) => (
            <div
              key={c.name}
              className="chip rounded-md border border-mist/60 overflow-hidden reveal"
              style={{ "--i": i } as React.CSSProperties}
            >
              <div
                className={`h-24 flex items-end p-4 ${c.fg}`}
                style={{ background: c.hex }}
              >
                <span className="text-xs uppercase tracking-[0.18em] opacity-80">
                  {c.hex}
                </span>
              </div>
              <div className="p-4 bg-cream">
                <p className="font-medium">{c.name}</p>
                <p className="mt-1 text-xs text-ink/60 leading-relaxed">{c.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Colorways — real product photography, one shot per palette color */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-20 border-t border-mist/60">
        <p className="text-xs uppercase tracking-[0.32em] text-ink/60">Colorazioni</p>
        <h2 className="mt-3 font-serif text-4xl lg:text-5xl leading-[1.05]">
          Scegli il tuo colore.
        </h2>
        <p className="mt-4 max-w-2xl text-ink/70 leading-relaxed">
          I tre stessi toni, resi sul pellame: Cacao, Burgundy e Rosa — ognuno
          con un set standard di tre immagini e-commerce (hero, coppia
          lifestyle e dettaglio contenuto).
        </p>
        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          {COLOR_VARIANTS.map((c, i) => (
            <div key={c.name} className="reveal" style={{ "--i": i } as React.CSSProperties}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-cream-deep media-zoom lift">
                <Image
                  src={c.images[0].src}
                  alt={c.images[0].alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {c.images.slice(1).map((img, j) => (
                  <div
                    key={`${img.src}-${j}`}
                    className="relative aspect-square overflow-hidden rounded-md bg-cream-deep media-zoom lift"
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(min-width: 1024px) 16vw, 50vw"
                      className={
                        "zoom" in img && img.zoom
                          ? "object-cover scale-[2.1] object-[78%_70%]"
                          : "object-cover"
                      }
                    />
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between">
                <p className="font-medium">{c.name}</p>
                <span
                  className="chip h-5 w-5 rounded-full border border-mist/60"
                  style={{ background: c.hex }}
                  aria-hidden="true"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Typography */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-20 border-t border-mist/60">
        <p className="text-xs uppercase tracking-[0.32em] text-ink/60">Tipografia</p>
        <h2 className="mt-3 font-serif text-4xl lg:text-5xl leading-[1.05]">
          Solo Inter, senza grazie.
        </h2>
        <p className="mt-4 max-w-2xl text-ink/70 leading-relaxed">
          Nessun serif decorativo — Inter copre sia i titoli che il corpo del
          testo, con una spaziatura più stretta sui titoli e una tracciatura
          maiuscola ampia per etichette e navigazione.
        </p>
        <div className="mt-10 space-y-6 border-t border-mist/60 pt-10">
          <div className="flex flex-wrap items-baseline gap-4 border-b border-mist/40 pb-6">
            <h1 className="font-display text-6xl leading-none">Caelia</h1>
            <span className="text-xs uppercase tracking-[0.18em] text-ink/50">
              h1 · font-display · -0.024em
            </span>
          </div>
          <div className="flex flex-wrap items-baseline gap-4 border-b border-mist/40 pb-6">
            <h2 className="font-serif text-4xl leading-tight">Beauty Case con specchio</h2>
            <span className="text-xs uppercase tracking-[0.18em] text-ink/50">
              h2 · -0.02em
            </span>
          </div>
          <div className="flex flex-wrap items-baseline gap-4 border-b border-mist/40 pb-6">
            <p className="text-lg leading-relaxed max-w-xl text-ink/80">
              L&apos;astuccio compatto che racchiude tutto ciò che serve per
              un ritocco veloce.
            </p>
            <span className="text-xs uppercase tracking-[0.18em] text-ink/50">
              testo · text-lg
            </span>
          </div>
          <div className="flex flex-wrap items-baseline gap-4">
            <p className="text-xs uppercase tracking-[0.22em]">Collezione · Storia · Journal</p>
            <span className="text-xs uppercase tracking-[0.18em] text-ink/50">
              etichetta nav · tracking-[0.22em]
            </span>
          </div>
        </div>
      </section>

      {/* Motion tokens */}
      <section className="bg-night text-cream py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="text-xs uppercase tracking-[0.32em] text-cream/60">Movimento</p>
          <h2 className="mt-3 font-serif text-4xl lg:text-5xl leading-[1.05]">
            Curve marcate, durate brevi.
          </h2>
          <p className="mt-4 max-w-2xl text-cream/70 leading-relaxed">
            Il movimento dell&apos;interfaccia resta sotto i 300ms con curve di
            easing scelte a mano — mai la famiglia CSS predefinita{" "}
            <code className="text-cream/90">ease</code>. Il feedback alla
            pressione scatta su <code className="text-cream/90">:active</code>,
            mai al rilascio.
          </p>
          <div className="mt-10 grid gap-px bg-cream/10 sm:grid-cols-2 lg:grid-cols-5 rounded-md overflow-hidden">
            {MOTION_TOKENS.map((t) => (
              <div key={t.name} className="bg-night p-5">
                <p className="font-mono text-sm text-[color:var(--color-burgundy-tint)]">{t.name}</p>
                <p className="mt-2 text-xs text-cream/60">{t.value}</p>
                <p className="mt-3 text-xs uppercase tracking-[0.1em] text-cream/40">
                  {t.use}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <button className="btn-press lift bg-cream text-night px-6 py-3 text-xs uppercase tracking-[0.22em]">
              Passa il mouse e premi
            </button>
            <span className="chip inline-flex items-center rounded-full border border-cream/30 px-4 py-2 text-xs uppercase tracking-[0.18em]">
              Chip con lift al hover
            </span>
          </div>
        </div>
      </section>

      {/* Product showcase */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
        <p className="text-xs uppercase tracking-[0.32em] text-ink/60">Componente</p>
        <h2 className="mt-3 font-serif text-4xl lg:text-5xl leading-[1.05]">
          Card prodotto.
        </h2>
        <p className="mt-4 max-w-2xl text-ink/70 leading-relaxed">
          Zoom sull&apos;immagine al passaggio del mouse, rivelazione
          scaglionata al caricamento e una riga di campioni colore derivata
          direttamente dai dati della variante.
        </p>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
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
