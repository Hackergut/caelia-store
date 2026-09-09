import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { STRIPE_PAY_URL, useLock } from "@/lib/lock";

export const Route = createFileRoute("/paga")({
  validateSearch: (s: Record<string, unknown>) => ({
    da: typeof s.da === "string" ? s.da : "",
  }),
  head: () => ({
    meta: [{ title: "CAELIA · Setup, consegna e pagamento" }],
  }),
  component: PagaPage,
});

const rows = [
  { n: "01", t: "Direzione creativa e design system", d: "Palette maison, Tenor Sans, griglia editoriale Framer, navbar a tenda.", h: "6 h", p: "€  60" },
  { n: "02", t: "Landing motion 3D", d: "Hero blur → logo sticky, Due pezzi, scroll parallax, film chapters.", h: "9 h", p: "€  85" },
  { n: "03", t: "Collezione e prodotto", d: "Tre colori stessa vista, zoom lente, mappa 6 punti, carrello.", h: "6 h", p: "€  55" },
  { n: "04", t: "Fotografia e cloni 1/1", d: "Packshot, lifestyle, ritocco labbra/matita, tre colorazioni.", h: "7 h", p: "€  70" },
  { n: "05", t: "Video campaign", d: "Splash gloss, caduta slow, hero drip da frame originali.", h: "6 h", p: "€  70" },
  { n: "06", t: "Lock, Stripe, tema Shopify, deploy", d: "Watermark, /paga, /consegnato, tema OS 2.0, Vercel live.", h: "4 h", p: "€  40" },
  { n: "07", t: "Infrastruttura AI e media", d: "Token, Imagine 2K, video 720p, iterazioni visive.", h: "—", p: "€  70" },
];

const got = [
  {
    n: "01",
    t: "Sito editoriale live",
    d: "Home motion, collezione tre colori, schede prodotto, storia, contatti, carrello demo. Font Tenor Sans. Burgundy Berry protagonista.",
  },
  {
    n: "02",
    t: "Sblocco watermark",
    d: "Dopo Stripe il marchio di anteprima sparisce su questo browser. La home è la versione di consegna.",
  },
  {
    n: "03",
    t: "Tema Shopify 2.0",
    d: "Zip da caricare in Admin: prodotti nativi, carrello, checkout Shopify, Apple Pay, SEO JSON-LD, mappa punti, hero, tre colori.",
  },
  {
    n: "04",
    t: "Catalogo pronto",
    d: "CSV: Burgundy Berry, Rosa nude, Marrone — 58 €. Handle burgundy-caelia, crema-caelia, cacao-caelia. Collezione caelia.",
  },
  {
    n: "05",
    t: "Configurazione",
    d: "CONFIG.md: colori hex, menu, pagine Storia/Contatti, Payments, sitemap, Open Graph.",
  },
  {
    n: "06",
    t: "Consuntivo PDF",
    d: "Fattura di lavori 450 €, anticipo 150 €, saldo 200 €, IBAN, Stripe.",
  },
];

const work = [
  {
    n: "01",
    t: "Design system",
    d: "Palette esatta Avorio caldo #dfc0b4, Rosa nude #ffddde, Burgundy Berry #973851, Marrone #5b3f33. Tenor Sans su titoli e UI. Layout editoriale a tutta altezza, caption meta, bottoni maison.",
  },
  {
    n: "02",
    t: "Hero e motion",
    d: "Partenza da blur sul drip Burgundy. Con lo scroll il logo CAELIA si fissa, la navbar a tenda compare. Sequenza Due pezzi (astuccio + specchio + gloss) e capitoli film con parallax.",
  },
  {
    n: "03",
    t: "Prodotto",
    d: "Tre packshot stessa inquadratura. Scheda con zoom reale sul punto. Mappa 01–06 (tasca, corpo, logo, cucitura, specchio, cornice) con lente al passaggio del mouse.",
  },
  {
    n: "04",
    t: "Immagini",
    d: "Cloni 1/1 dei case, lifestyle vanity e prato, ritocco matita/labbra, splash gel. File campaign in /campaign, tre colorazioni allineate.",
  },
  {
    n: "05",
    t: "Video",
    d: "Caduta slow, splash denso tipo smalto, hero drip. Frame forniti usati come partenza, non inventati.",
  },
  {
    n: "06",
    t: "Shopify + lock",
    d: "Tema Liquid OS 2.0 con settings, SEO, checkout nativo. Download del zip chiuso: senza pagamento si torna qui. Stripe 200 € apre /consegnato e sblocca il file.",
  },
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
  const { da } = Route.useSearch();
  const unlocked = useLock((s) => s.unlocked);
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
            <p className="mt-2 type-meta text-cacao">Setup · consegna · saldo</p>
          </div>
          <div className="text-right">
            <p className="type-meta text-berry">Consuntivo</p>
            <p className="mt-2 text-sm text-cacao">N° 01 / 2026</p>
            <p className="text-sm text-cacao">9 settembre 2026</p>
          </div>
        </header>

        {da === "tema" && !unlocked ? (
          <div className="mt-8 border border-berry bg-berry px-5 py-5 text-rosa">
            <p className="type-meta text-rosa/60">Download bloccato</p>
            <p className="mt-2 font-serif text-2xl">Il tema Shopify si sblocca qui.</p>
            <p className="mt-2 text-sm text-rosa/80">
              Paga 200 € (Apple Pay o carta). Stripe apre la consegna e il file zip parte da /download.
            </p>
          </div>
        ) : null}

        {unlocked ? (
          <div className="mt-8 border border-berry bg-berry px-5 py-5 text-rosa">
            <p className="type-meta text-rosa/60">Pagamento registrato</p>
            <p className="mt-2 font-serif text-2xl">Sito e tema sbloccati su questo browser.</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link to="/" className="btn-invert">Sito finale</Link>
              <Link to="/download" className="btn-ghost-light">Scarica tema Shopify</Link>
            </div>
          </div>
        ) : (
          <p className="mt-8 max-w-xl text-sm leading-relaxed text-cacao">
            Saldo 200 €. Include il sito senza watermark e il tema Shopify da pubblicare sul negozio.
            Senza pagamento il file zip non si scarica: si torna sempre su questa pagina.
          </p>
        )}

        <div className="mt-12">
          <p className="type-meta text-berry">Cosa ottieni</p>
          <h2 className="type-display-md mt-3">Sei consegne, un saldo.</h2>
          <ol className="mt-8 space-y-6">
            {got.map((g) => (
              <li key={g.n} className="border-t border-crema pt-5">
                <p className="type-meta text-berry">{g.n}</p>
                <p className="mt-2 font-serif text-2xl">{g.t}</p>
                <p className="mt-2 text-sm leading-relaxed text-cacao">{g.d}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-14">
          <p className="type-meta text-berry">Lavoro svolto</p>
          <h2 className="mt-3 font-serif text-3xl tracking-wide">38 ore, 5–9 settembre.</h2>
          <div className="mt-8 space-y-6">
            {work.map((w) => (
              <div key={w.n} className="grid gap-2 md:grid-cols-[4rem_1fr]">
                <p className="type-meta text-berry">{w.n}</p>
                <div>
                  <p className="font-serif text-xl">{w.t}</p>
                  <p className="mt-2 text-sm leading-relaxed text-cacao">{w.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14">
          <p className="type-meta text-berry">Anteprima</p>
          <h2 className="mt-3 font-serif text-3xl tracking-wide">Ora, e dopo Stripe.</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <a href="/" className="block bg-white">
              <img src="/campaign/logo-drip.jpg" alt="Home attuale con watermark" className="aspect-[4/5] w-full object-cover" />
              <div className="p-4">
                <p className="type-meta text-cacao">Adesso</p>
                <p className="mt-2 font-serif text-xl">Sito + watermark</p>
              </div>
            </a>
            <div className="block bg-white">
              <img src="/campaign/pair-berry.jpg" alt="Tema Shopify" className="aspect-[4/5] w-full object-cover" />
              <div className="p-4">
                <p className="type-meta text-cacao">Incluso, bloccato</p>
                <p className="mt-2 font-serif text-xl">Zip Shopify</p>
              </div>
            </div>
            <div className="block bg-white">
              <img src="/campaign/lifestyle-trio.jpg" alt="Dopo pagamento" className="aspect-[4/5] w-full object-cover" />
              <div className="p-4">
                <p className="type-meta text-cacao">Dopo i 200 €</p>
                <p className="mt-2 font-serif text-xl">Sito pulito + zip</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 border border-crema bg-white p-5 md:p-8">
          <p className="type-meta text-berry">Lock del tema</p>
          <h2 className="mt-3 font-serif text-2xl">Come si sblocca il file.</h2>
          <ol className="mt-5 space-y-3 text-sm leading-relaxed text-cacao">
            <li><strong className="text-burgundy">1.</strong> Qualsiasi tentativo di download senza saldo torna qui.</li>
            <li><strong className="text-burgundy">2.</strong> Paga 200 € (Apple Pay, Google Pay, carta). Bonifico: sblocco dopo accredito.</li>
            <li><strong className="text-burgundy">3.</strong> Stripe apre /consegnato — watermark spento, cookie di sblocco su questo browser.</li>
            <li><strong className="text-burgundy">4.</strong> Da /shopify o /download parte lo zip. Poi: Themes → Upload → CSV → collezione <code>caelia</code> → Payments.</li>
          </ol>
        </div>

        <div className="mt-14 grid gap-8 border-b border-crema pb-8 md:grid-cols-2">
          <div>
            <p className="type-meta text-berry">Committente</p>
            <p className="mt-2 font-serif text-2xl">CAELIA · Carla & Giulia</p>
            <p className="mt-1 text-sm text-cacao">Landing, motion, media, tema Shopify, deploy.</p>
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
            <p className="mt-1 font-serif text-xl">5–9 set</p>
          </div>
          <div>
            <p className="type-meta text-berry">Stato</p>
            <p className="mt-1 font-serif text-xl">{unlocked ? "Sbloccato" : "Saldo 200 €"}</p>
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
          <div className="bg-rosa px-5 py-4 text-sm text-cacao">
            Incluso nel saldo: tema Shopify 2.0 (zip + CSV + CONFIG). Download chiuso fino al pagamento.
          </div>
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

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div>
            <p className="type-meta text-berry">Bonifico</p>
            <p className="mt-3 font-serif text-xl">Sergio Guttilla</p>
            <p className="mt-2 text-sm tracking-wide">IT55 T036 4601 6005 2600 7699 943</p>
            <p className="mt-1 text-sm text-cacao">NTSBITM1XXX · Causale: Pagamento CAELIA 200 EUR</p>
          </div>
          <div>
            <p className="type-meta text-berry">Documenti</p>
            <a href="/CAELIA-consuntivo-01-2026.pdf" className="mt-3 block text-sm underline decoration-berry/30 underline-offset-4">
              Consuntivo PDF
            </a>
            <Link to="/" className="mt-2 block text-sm underline decoration-berry/30 underline-offset-4">
              Anteprima sito (watermark)
            </Link>
          </div>
        </div>
      </article>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-berry/20 bg-berry/95 text-rosa backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl flex-col gap-3 px-5 py-4 md:flex-row md:items-center md:gap-4">
          <div className="flex-1">
            <p className="type-meta text-rosa/55">
              {unlocked ? "Sbloccato su questo browser" : "Paga e sblocca sito + tema Shopify"}
            </p>
            <p className="mt-1 font-serif text-2xl">{unlocked ? "Consegna aperta" : "€ 200,00"}</p>
          </div>
          {unlocked ? (
            <>
              <Link to="/" className="btn-invert flex-1 md:flex-none">Sito finale</Link>
              <Link to="/download" className="btn-ghost-light flex-1 md:flex-none">Scarica tema</Link>
            </>
          ) : (
            <>
              {apple ? (
                <a
                  href={STRIPE_PAY_URL}
                  className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 bg-black text-white text-[0.7rem] tracking-[0.18em] uppercase md:flex-none md:px-10"
                >
                  <AppleMark />
                  Paga con Apple Pay
                </a>
              ) : null}
              <a href={STRIPE_PAY_URL} className="btn-invert flex-1 md:flex-none">
                {apple ? "Carta / Google Pay" : "Paga 200 € e sblocca il tema"}
              </a>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
