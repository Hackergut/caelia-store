import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { STRIPE_PAY_URL, useLock } from "@/lib/lock";

export const Route = createFileRoute("/paga")({
  head: () => ({
    meta: [{ title: "CAELIA \u00b7 Consuntivo e sblocco" }],
  }),
  component: PagaPage,
});

const rows = [
  { n: "01", t: "Direzione creativa e design system", d: "Palette Burgundy Berry / rosa nude / marrone, Tenor Sans, layout editoriale.", h: "6 h", p: "\u20ac  60" },
  { n: "02", t: "Landing motion 3D", d: "Hero blur \u2192 logo sticky, navbar a tenda, Due pezzi, parallax.", h: "9 h", p: "\u20ac  85" },
  { n: "03", t: "Collezione e prodotto", d: "Tre colori stessa vista, schede, zoom lente, mappa punti.", h: "6 h", p: "\u20ac  55" },
  { n: "04", t: "Fotografia e cloni 1/1", d: "Packshot, lifestyle vanity, ritocco, tre colorazioni.", h: "7 h", p: "\u20ac  70" },
  { n: "05", t: "Video campaign", d: "Splash gloss, caduta slow, hero drip 3D da frame originali.", h: "6 h", p: "\u20ac  70" },
  { n: "06", t: "Lock, watermark, Stripe, deploy", d: "Pagina /lock, /consegnato, watermark, Payment Link, Vercel live.", h: "4 h", p: "\u20ac  40" },
  { n: "07", t: "Infrastruttura AI e media", d: "Token, Imagine 2K, video 720p, iterazioni visive di produzione.", h: "\u2014", p: "\u20ac  70" },
];

const unlocks = [
  {
    n: "01",
    t: "Sito senza watermark",
    d: "La home, la collezione e tutte le pagine restano pulite su questo browser. Nessuna scritta di anteprima.",
    to: "/",
    label: "Apri l'anteprima col watermark",
    hint: "Prima del pagamento vedi ancora il marchio. Dopo Stripe sparisce da solo.",
  },
  {
    n: "02",
    t: "Tema Shopify 2.0",
    d: "Zip da caricare in Admin: prodotti, carrello, checkout, Apple Pay, SEO, stesso look CAELIA.",
    to: "/shopify",
    label: "Vedi guida tema",
    hint: "Il download dello zip si apre solo a pagamento avvenuto.",
  },
  {
    n: "03",
    t: "Pagina consegna",
    d: "Stripe apre /consegnato da solo. Da l\u00ec: sito pulito, zip Shopify, PDF.",
    to: "/shopify",
    label: "Cosa include il tema",
    hint: "Non serve copiare nessun link: il redirect \u00e8 automatico dopo Apple Pay o carta.",
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
            <p className="mt-2 type-meta text-cacao">Beauty Mirror Case</p>
          </div>
          <div className="text-right">
            <p className="type-meta text-berry">Consuntivo</p>
            <p className="mt-2 text-sm text-cacao">N\u00b0 01 / 2026</p>
            <p className="text-sm text-cacao">9 settembre 2026</p>
          </div>
        </header>

        {unlocked ? (
          <div className="mt-8 border border-berry bg-berry px-5 py-5 text-rosa">
            <p className="type-meta text-rosa/60">Gi\u00e0 sbloccato</p>
            <p className="mt-2 font-serif text-2xl">Pagamento registrato su questo browser.</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link to="/" className="btn-invert">Sito finale</Link>
              <Link to="/shopify" className="btn-ghost-light">Tema Shopify</Link>
            </div>
          </div>
        ) : (
          <p className="mt-8 max-w-xl text-sm leading-relaxed text-cacao">
            Saldo 200 \u20ac. A pagamento Stripe il watermark sparisce e si sblocca il
            tema Shopify da installare sul negozio.
          </p>
        )}

        <div className="mt-10">
          <p className="type-meta text-berry">Anteprima</p>
          <h2 className="type-display-md mt-3">Cosa vedi ora, e dopo.</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <a href="/" className="group block bg-white">
              <img src="/campaign/logo-drip.jpg" alt="Home con watermark, stato attuale" className="aspect-[4/5] w-full object-cover" />
              <div className="p-4">
                <p className="type-meta text-cacao">Adesso</p>
                <p className="mt-2 font-serif text-xl">Sito + watermark</p>
                <p className="mt-1 text-xs leading-relaxed text-cacao">La home live. Il marchio resta finch\u00e9 non paghi.</p>
              </div>
            </a>
            <Link to="/shopify" className="group block bg-white">
              <img src="/campaign/pair-berry.jpg" alt="Tema Shopify, packshot tre colori" className="aspect-[4/5] w-full object-cover" />
              <div className="p-4">
                <p className="type-meta text-cacao">Incluso</p>
                <p className="mt-2 font-serif text-xl">Tema Shopify</p>
                <p className="mt-1 text-xs leading-relaxed text-cacao">OS 2.0, checkout, Apple Pay, SEO. Zip dopo il saldo.</p>
              </div>
            </Link>
            <div className="group block bg-white">
              <img src="/campaign/lifestyle-trio.jpg" alt="Consegna senza watermark" className="aspect-[4/5] w-full object-cover" />
              <div className="p-4">
                <p className="type-meta text-cacao">Dopo Stripe</p>
                <p className="mt-2 font-serif text-xl">Sito pulito</p>
                <p className="mt-1 text-xs leading-relaxed text-cacao">Redirect automatico. Watermark e zip sbloccati.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14">
          <p className="type-meta text-berry">Sblocco</p>
          <h2 className="mt-3 font-serif text-3xl tracking-wide">Tre cose, un pagamento.</h2>
          <ol className="mt-6 space-y-5">
            {unlocks.map((u) => (
              <li key={u.n} className="border-t border-crema pt-5">
                <p className="type-meta text-berry">{u.n}</p>
                <p className="mt-2 font-serif text-2xl">{u.t}</p>
                <p className="mt-2 text-sm leading-relaxed text-cacao">{u.d}</p>
                <p className="mt-2 text-xs text-cacao/80">{u.hint}</p>
                <Link to={u.to} className="mt-3 inline-block text-sm tracking-wide underline decoration-berry/30 underline-offset-4">
                  {u.label}
                </Link>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-14 grid gap-8 border-b border-crema pb-8 md:grid-cols-2">
          <div>
            <p className="type-meta text-berry">Committente</p>
            <p className="mt-2 font-serif text-2xl">CAELIA \u00b7 Carla &amp; Giulia</p>
            <p className="mt-1 text-sm text-cacao">Landing, tema Shopify, motion, media, deploy.</p>
          </div>
          <div className="md:text-right">
            <p className="type-meta text-berry">Emittente</p>
            <p className="mt-2 font-serif text-2xl">Sergio Guttilla</p>
            <p className="mt-1 text-sm text-cacao">Consuntivo lavori \u00b7 Volume 01 \u00b7 Non fiscale</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3 bg-rosa px-4 py-4 text-sm md:px-6">
          <div>
            <p className="type-meta text-berry">Ore</p>
            <p className="mt-1 font-serif text-xl">38 h</p>
          </div>
          <div>
            <p className="type-meta text-berry">Periodo</p>
            <p className="mt-1 font-serif text-xl">5\u20139 set 2026</p>
          </div>
          <div>
            <p className="type-meta text-berry">Stato</p>
            <p className="mt-1 font-serif text-xl">{unlocked ? "Sbloccato" : "Saldo 200 \u20ac"}</p>
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
            Incluso nel saldo: tema Shopify 2.0 (zip + CSV tre colori + guida installazione).
          </div>
        </div>

        <div className="mt-8 ml-auto max-w-xs space-y-2 text-sm">
          <div className="flex justify-between text-cacao">
            <span>Totale lavori</span>
            <span className="font-serif text-base text-burgundy">\u20ac 450,00</span>
          </div>
          <div className="flex justify-between text-cacao">
            <span>Anticipo versato</span>
            <span>\u2212 \u20ac 150,00</span>
          </div>
          <div className="flex items-end justify-between bg-berry px-4 py-4 text-rosa">
            <span className="type-meta">Da pagare</span>
            <span className="font-serif text-3xl">\u20ac 200,00</span>
          </div>
        </div>

        <div className="mt-12 border border-crema bg-white p-5 md:p-8">
          <p className="type-meta text-berry">Come funziona</p>
          <ol className="mt-4 space-y-3 text-sm leading-relaxed text-cacao">
            <li><strong className="text-burgundy">1.</strong> Paga 200 \u20ac qui sotto (Apple Pay, Google Pay o carta) oppure bonifico.</li>
            <li><strong className="text-burgundy">2.</strong> Stripe apre <span className="tracking-wide">/consegnato</span> \u2014 watermark spento su questo browser.</li>
            <li><strong className="text-burgundy">3.</strong> Da l\u00ec scarichi il tema Shopify e navighi il sito finale.</li>
            <li><strong className="text-burgundy">4.</strong> In Shopify Admin: Themes \u2192 Upload zip \u2192 importa i 3 prodotti \u2192 Payments.</li>
          </ol>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div>
            <p className="type-meta text-berry">Bonifico</p>
            <p className="mt-3 font-serif text-xl">Sergio Guttilla</p>
            <p className="mt-2 text-sm tracking-wide">IT55 T036 4601 6005 2600 7699 943</p>
            <p className="mt-1 text-sm text-cacao">NTSBITM1XXX \u00b7 Causale: Pagamento CAELIA 200 EUR</p>
            <p className="mt-3 text-xs text-cacao">Con bonifico lo sblocco non \u00e8 automatico: arriva dopo l'accredito.</p>
          </div>
          <div>
            <p className="type-meta text-berry">Documenti</p>
            <a href="/CAELIA-consuntivo-01-2026.pdf" className="mt-3 block text-sm tracking-wide underline decoration-berry/30 underline-offset-4">
              Consuntivo PDF
            </a>
            <Link to="/shopify" className="mt-2 block text-sm tracking-wide underline decoration-berry/30 underline-offset-4">
              Guida tema Shopify
            </Link>
            <Link to="/" className="mt-2 block text-sm tracking-wide underline decoration-berry/30 underline-offset-4">
              Anteprima sito (con watermark)
            </Link>
          </div>
        </div>
      </article>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-berry/20 bg-berry/95 text-rosa backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl flex-col gap-3 px-5 py-4 md:flex-row md:items-center md:gap-4">
          <div className="flex-1">
            <p className="type-meta text-rosa/55">
              {unlocked ? "Sbloccato su questo browser" : "Stripe live \u00b7 sblocca sito + tema"}
            </p>
            <p className="mt-1 font-serif text-2xl">{unlocked ? "Consegna aperta" : "\u20ac 200,00"}</p>
          </div>
          {unlocked ? (
            <>
              <Link to="/" className="btn-invert flex-1 md:flex-none">Sito finale</Link>
              <Link to="/shopify" className="btn-ghost-light flex-1 md:flex-none">Scarica Shopify</Link>
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
                {apple ? "Carta / Google Pay" : "Paga e sblocca \u2014 Apple Pay / carta"}
              </a>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
