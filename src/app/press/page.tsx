import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Press & media",
  description: "Brand assets, founder bio, and contact for press inquiries about CAELIA.",
};

const COLORS = [
  { name: "Burgundy Caelia", hex: "#5c2e38", text: "#f7f1ea" },
  { name: "Cacao Caelia", hex: "#6d403b", text: "#f7f1ea" },
  { name: "Crema Caelia", hex: "#e5d1bd", text: "#4a0e16" },
  { name: "Blush", hex: "#e9c9c4", text: "#4a0e16" },
];

const FONTS = [
  { name: "Tenor Sans", role: "Logo", sample: "CAELIA" },
  { name: "Fraunces", role: "Display serif", sample: "Aprire. Ritoccare." },
  { name: "Inter", role: "UI sans-serif", sample: "Aprire. Ritoccare. Ripartire." },
];

export default function PressPage() {
  return (
    <div className="shell max-w-5xl pt-16 pb-24">
      <p className="text-xs uppercase tracking-[0.32em] text-ink/60">Press</p>
      <h1 className="mt-4 font-serif fluid-h2">
        Stampa e media kit.
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-ink/80 leading-relaxed">
        Tutto il necessario per raccontare CAELIA: biografie delle fondatrici,
        palette, tipografia, immagini del prodotto. Per interviste o richieste
        stampa, scrivi a{" "}
        <a href="mailto:press@caelia.com" className="underline">
          press@caelia.com
        </a>
        .
      </p>

      <section className="mt-16">
        <h2 className="font-serif text-3xl">Le fondatrici</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div className="rounded-md bg-cream-deep p-6">
            <p className="font-serif text-2xl">Carla</p>
            <p className="text-xs uppercase tracking-[0.22em] text-ink/60">Co-founder</p>
            <p className="mt-3 text-sm text-ink/80">
              Vive a Los Angeles. Ha lavorato per anni tra set cinematografici
              e redazioni, sempre con una Beauty Mirror Case nella borsa.
            </p>
          </div>
          <div className="rounded-md bg-cream-deep p-6">
            <p className="font-serif text-2xl">Giulia</p>
            <p className="text-xs uppercase tracking-[0.22em] text-ink/60">Co-founder</p>
            <p className="mt-3 text-sm text-ink/80">
              Vive a Dubai. Architetta gli spazi retail dove CAELIA prende
              forma. Trova nel design un modo per rallentare.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="font-serif text-3xl">Brand identity</h2>
        <p className="mt-3 text-ink/70 max-w-2xl">
          Logo, palette e tipografia. Usa questi asset in modo coerente con il
          tono editoriale CAELIA: minimal, caldo, italiano.
        </p>

        <div className="mt-6">
          <p className="text-xs uppercase tracking-[0.22em] text-ink/60 mb-3">
            Palette
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {COLORS.map((c) => (
              <div
                key={c.name}
                className="rounded-md p-6 aspect-[4/3] flex flex-col justify-end"
                style={{ background: c.hex, color: c.text }}
              >
                <p className="text-sm font-medium">{c.name}</p>
                <p className="text-xs opacity-80">{c.hex.toUpperCase()}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <p className="text-xs uppercase tracking-[0.22em] text-ink/60 mb-3">
            Tipografia
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {FONTS.map((f) => (
              <div key={f.name} className="rounded-md bg-cream-deep p-6">
                <p className="text-xs uppercase tracking-[0.22em] text-ink/60">{f.role}</p>
                <p
                  className={`mt-2 ${
                    f.name === "Tenor Sans"
                      ? "font-logo text-3xl"
                      : f.name === "Fraunces"
                        ? "font-serif text-4xl"
                        : "text-2xl"
                  }`}
                >
                  {f.sample}
                </p>
                <p className="mt-2 text-xs text-ink/60">{f.name}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <p className="text-xs uppercase tracking-[0.22em] text-ink/60 mb-3">
            Logo
          </p>
          <div className="rounded-md bg-cream-deep p-12 flex items-center justify-center">
            <p className="font-serif text-4xl tracking-[0.08em] sm:text-6xl">CAELIA</p>
          </div>
          <p className="mt-2 text-xs text-ink/60">
            Scarica il logo vettoriale:{" "}
            <Link href="/logo.svg" className="underline">SVG</Link>
          </p>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="font-serif text-3xl">Tagline</h2>
        <p className="mt-3 font-serif text-2xl italic text-ink/80 max-w-2xl">
          &ldquo;Aprire. Ritoccare. Ripartire.&rdquo;
        </p>
        <p className="mt-2 text-sm text-ink/60">
          Tre verbi che descrivono il rituale CAELIA in 25 caratteri.
        </p>
      </section>

      <section className="mt-16">
        <h2 className="font-serif text-3xl">Contatti stampa</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <a
            href="mailto:press@caelia.com"
            className="rounded-md border border-mist p-6 hover:border-charcoal transition-colors"
          >
            <p className="text-xs uppercase tracking-[0.22em] text-ink/60">Email</p>
            <p className="mt-2 font-serif text-xl">press@caelia.com</p>
          </a>
          <a
            href="mailto:partnerships@caelia.com"
            className="rounded-md border border-mist p-6 hover:border-charcoal transition-colors"
          >
            <p className="text-xs uppercase tracking-[0.22em] text-ink/60">Partnership</p>
            <p className="mt-2 font-serif text-xl">partnerships@caelia.com</p>
          </a>
        </div>
      </section>
    </div>
  );
}