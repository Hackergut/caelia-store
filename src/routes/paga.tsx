import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { STRIPE_PAY_URL } from "@/lib/lock";

export const Route = createFileRoute("/paga")({
  head: () => ({
    meta: [{ title: "CAELIA · Consuntivo 01/2026" }],
  }),
  component: PagaPage,
});

const rows = [
  { n: "01", t: "Direzione creativa e design system", d: "Palette Burgundy Berry / rosa nude / marrone, Tenor Sans, layout editoriale.", h: "6 h", p: "€  60" },
  { n: "02", t: "Landing motion 3D", d: "Hero blur → logo sticky, navbar a tenda, Due pezzi, parallax.", h: "9 h", p: "€  85" },
  { n: "03", t: "Collezione e prodotto", d: "Tre colori stessa vista, schede, zoom lente, mappa punti.", h: "6 h", p: "€  55" },
  { n: "04", t: "Fotografia e cloni 1/1", d: "Packshot, lifestyle vanity, ritocco, tre colorazioni.", h: "7 h", p: "€  70" },
  { n: "05", t: "Video campaign", d: "Splash gloss, caduta slow, hero drip 3D da frame originali.", h: "6 h", p: "€  70" },
  { n: "06", t: "Lock, watermark, Stripe, deploy", d: "Pagina /lock, /consegnato, watermark, Payment Link, Vercel live.", h: "4 h", p: "€  40" },
  { n: "07", t: "Infrastruttura AI e media", d: "Token, Imagine 2K, video 720p, iterazioni visive di produzione.", h: "—", p: "€  70" },
];

function AppleMark() {
  return (
    <svg viewBox="0 0 14 17" className="h-4 w-3.5" aria-hidden>
      <path
        fill="currentColor"
        d="M11.5 9.1c0-2 1.6-3 1.7-3.1-1-1.4-2.5-1.6-3-1.6-1.3-.1-2.5.8-3.1.8s-1.6-.8-2.7-.7c-1.4 0-2.7.8-3.4 2.1-1.5 2.5-.4 6.3 1 8.3.7 1 1.5 2.1 2.6 2 1 .1 1.4-.7 2.7-.7s1.6.7 2.7.6c1.1 0 1.8-1 2.5-2 .8-1.1 1.1-2.2 1.1-2.3-.1 0-2.1-.8-2.1-3.4zM9.6 3.4c.6-.7 1-1.7.9-2.7-1 .1-2.1.7-2.7 1.4-.6.6-1.1 1.7-1 2.6 1.1.1 2.2-.5 2.8-1.3z"
      />
    </svg>
  );
}

function PagaPage() {
  const [apple, setApple] = useState(false);
  useEffect(() => {
    setApple(typeof window !== "undefined" && "ApplePaySession" in window);
  }, []);

  return (
    <section className="bg-[#faf4f0] pb-40 text-burgundy">
      <article className="mx-auto max-w-3xl px-5 pt-24 md:px-8 md:pt-28">
        <header className="flex items-start justify-between border-b-2 border-berry pb-6">
          <div>
            <p className="font-logo text-2xl tracking-[0.28em]">CAELIA</p>
            <p className="mt-2 type-meta text-cacao">Beauty Mirror Case</p>
          </div>
          <div className="text-right">
            <p className="type-meta text-berry">Consuntivo</p>
            <p className="mt-2 text-sm text-cacao">N° 01 / 2026</p>
            <p className="text-sm text-cacao">9 settembre 2026</p>
          </div>
        </header>

        <div className="mt-8 grid gap-8 border-b border-crema pb-8 md:grid-cols-2">
          <div>
            <p className="type-meta text-berry">Committente</p>
            <p className="mt-2 font-serif text-2xl">CAELIA · Carla & Giulia</p>
            <p className="mt-1 text-sm text-cacao">Landing editoriale, collezione, motion, media, deploy.</p>
          </div>
          <div className="md:text-right">
            <p className="type-meta text-berry">Emittente</p>
            <p className="mt-2 font-serif text-2xl">Sergio Guttilla</p>
            <p className="mt-1 text-sm text-cacao">Consuntivo lavori · Volume 01 · Non fiscale</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3 bg-rosa px-4 py-4 text-sm md:px-6">
          <div>
            <p className="type-meta text-berry">Ore</p>
            <p className="mt-1 font-serif text-xl">38 h</p>
          </div>
          <div>
            <p className="type-meta text-berry">Periodo</p>
            <p className="mt-1 font-serif text-xl">5–9 set 2026</p>
          </div>
          <div>
            <p className="type-meta text-berry">Stato</p>
            <p className="mt-1 font-serif text-xl">Live</p>
          </div>
        </div>

        <div className="mt-8 overflow-hidden border border-crema">
          <div className="grid grid-cols-[2.2rem_1fr_3.2rem_4.2rem] bg-berry px-4 py-3 text-[0.65rem] tracking-[0.28em] text-rosa uppercase md:grid-cols-[2.5rem_1fr_4rem_5.5rem] md:px-5">
            <span></span>
            <span>Voce</span>
            <span className="text-right">Ore</span>
            <span className="text-right">Importo</span>
          </div>
          {rows.map((r, i) => (
            <div
              key={r.n}
              className={`grid grid-cols-[2.2rem_1fr_3.2rem_4.2rem] items-start gap-x-1 px-4 py-4 md:grid-cols-[2.5rem_1fr_4rem_5.5rem] md:px-5 ${
                i % 2 === 0 ? "bg-white" : "bg-[#f7eeea]"
              }`}
            >
              <span className="text-xs text-berry">{r.n}</span>
              <div>
                <p className="font-serif text-[1.05rem] leading-tight">{r.t}</p>
                <p className="mt-1 text-xs leading-relaxed text-cacao">{r.d}</p>
              </div>
              <span className="text-right text-sm text-cacao">{r.h}</span>
              <span className="text-right font-serif">{r.p}</span>
            </div>
          ))}
        </div>

        <div className="mt-8 ml-auto max-w-xs space-y-2 text-sm">
          <div className="flex justify-between text-cacao">
            <span>Totale lavori</span>
            <span className="font-serif text-base text-burgundy">€ 450,00</span>
          </div>
          <div className="flex justify-between text-cacao">
            <span>Anticipo versato</span>
            <span>− € 150,00</span>
          </div>
          <div className="flex items-end justify-between bg-berry px-4 py-4 text-rosa">
            <span className="type-meta">Da pagare</span>
            <span className="font-serif text-3xl">€ 200,00</span>
          </div>
        </div>

        <div className="mt-10 grid gap-6 border-t border-crema pt-8 md:grid-cols-2">
          <div>
            <p className="type-meta text-berry">Bonifico</p>
            <p className="mt-3 font-serif text-xl">Sergio Guttilla</p>
            <p className="mt-2 text-sm tracking-wide">IT55 T036 4601 6005 2600 7699 943</p>
            <p className="mt-1 text-sm text-cacao">NTSBITM1XXX · Causale: Pagamento CAELIA 200 EUR</p>
          </div>
          <div>
            <p className="type-meta text-berry">Dopo il pagamento</p>
            <p className="mt-3 text-sm leading-relaxed text-cacao">
              Stripe apre da solo il sito senza watermark. Stesso effetto su questo browser.
            </p>
            <a
              href="/CAELIA-consuntivo-01-2026.pdf"
              className="mt-4 inline-block text-sm tracking-wide underline decoration-berry/30 underline-offset-4"
            >
              Scarica PDF
            </a>
          </div>
        </div>
      </article>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-berry/20 bg-berry/95 text-rosa backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl flex-col gap-3 px-5 py-4 md:flex-row md:items-center md:gap-4">
          <div className="flex-1">
            <p className="type-meta text-rosa/55">Stripe live · HACKGUT</p>
            <p className="mt-1 font-serif text-2xl">€ 200,00</p>
          </div>
          {apple ? (
            <a
              href={STRIPE_PAY_URL}
              className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 bg-black text-white text-[0.7rem] tracking-[0.18em] uppercase md:flex-none md:px-10"
            >
              <AppleMark />
              Paga con Apple Pay
            </a>
          ) : null}
          <a
            href={STRIPE_PAY_URL}
            className="btn-invert flex-1 md:flex-none"
          >
            {apple ? "Carta / Google Pay" : "Paga con Apple Pay, Google Pay, carta"}
          </a>
        </div>
      </div>
    </section>
  );
}
