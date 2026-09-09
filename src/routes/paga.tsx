import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { IMAGES_ZIP_URL, SITE_PREVIEW_URL, STRIPE_PAY_URL, useLock } from "@/lib/lock";

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

const screens = [
  { src: "/setup/01-hero.png", n: "01", t: "Home live", d: "Hero drip, logo sticky, motion. Così sarà il negozio." },
  { src: "/setup/02-collezione.png", n: "02", t: "Tre colori", d: "Stessa inquadratura. In Shopify la collezione caelia alimenta questa riga." },
  { src: "/setup/03-prodotto.png", n: "03", t: "Scheda prodotto", d: "Foto, prezzo, checkout nativo. Ogni media si cambia da Products → Media." },
  { src: "/setup/04-mappa.png", n: "04", t: "Mappa punti", d: "Customize → sezione Mappa: sostituisci la foto, sposti i pin." },
  { src: "/setup/05-lifestyle.png", n: "05", t: "Storia", d: "Pagine CMS. Testi e immagini dal tema, modificabili." },
];

const packs = [
  { src: "/setup/06-pack-berry.jpg", t: "Burgundy Berry" },
  { src: "/setup/07-pack-rosa.jpg", t: "Rosa nude" },
  { src: "/setup/08-pack-cacao.jpg", t: "Marrone" },
];

const configBits = [
  { n: "01", t: "Foto ovunque", d: "Hero, capitoli, mappa, prodotti: image picker in Customize. Niente codice." },
  { n: "02", t: "Colori maison", d: "Theme settings: Berry #973851, Rosa #ffddde, Avorio #dfc0b4, Marrone #5b3f33." },
  { n: "03", t: "Collezione", d: "Assegni la collezione caelia: i tre packshot si aggiornano da soli." },
  { n: "04", t: "Testi e menu", d: "Ogni titolo/didascalia è un campo. Menu header/footer da Navigation." },
  { n: "05", t: "Checkout", d: "Carrello Shopify, Apple Pay, Google Pay, carta. Non è il demo del sito preview." },
  { n: "06", t: "SEO", d: "Title, meta, Open Graph, JSON-LD prodotto già nel tema." },
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
            <p className="mt-2 type-meta text-cacao">Preview · asset · tema</p>
          </div>
          <div className="text-right">
            <p className="type-meta text-berry">Consuntivo</p>
            <p className="mt-2 text-sm text-cacao">N° 01 / 2026</p>
          </div>
        </header>

        {da === "tema" && !unlocked ? (
          <div className="mt-8 border border-berry bg-berry px-5 py-5 text-rosa">
            <p className="type-meta text-rosa/60">Tema bloccato</p>
            <p className="mt-2 font-serif text-2xl">Il file del tema si sblocca con i 200 €.</p>
            <p className="mt-2 text-sm text-rosa/80">Le immagini prodotto le scarichi già ora, qui sotto.</p>
          </div>
        ) : null}

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <a href={SITE_PREVIEW_URL} className="block border border-crema bg-white p-4">
            <p className="type-meta text-berry">01 · Subito</p>
            <p className="mt-3 font-serif text-2xl">Sito preview</p>
            <p className="mt-2 text-xs leading-relaxed text-cacao">Versione finita live. Watermark finché non paghi.</p>
            <p className="mt-3 text-sm underline decoration-berry/30 underline-offset-4">Apri il sito</p>
          </a>
          <a href={IMAGES_ZIP_URL} download className="block border border-crema bg-white p-4">
            <p className="type-meta text-berry">02 · Subito</p>
            <p className="mt-3 font-serif text-2xl">Immagini</p>
            <p className="mt-2 text-xs leading-relaxed text-cacao">Tutti gli asset: 3 colori, lifestyle, video, zoom. Prima del pagamento.</p>
            <p className="mt-3 text-sm underline decoration-berry/30 underline-offset-4">Scarica caelia-immagini.zip</p>
          </a>
          {unlocked ? (
            <Link to="/download" className="block border border-berry bg-berry p-4 text-rosa">
              <p className="type-meta text-rosa/55">03 · Sbloccato</p>
              <p className="mt-3 font-serif text-2xl">Tema Shopify</p>
              <p className="mt-2 text-xs leading-relaxed text-rosa/75">OS 2.0, sezioni, checkout, SEO. Tutto configurabile.</p>
              <p className="mt-3 text-sm underline underline-offset-4">Scarica il tema</p>
            </Link>
          ) : (
            <a href={STRIPE_PAY_URL} className="block border border-berry bg-berry p-4 text-rosa">
              <p className="type-meta text-rosa/55">03 · Dopo i 200 €</p>
              <p className="mt-3 font-serif text-2xl">Tema Shopify</p>
              <p className="mt-2 text-xs leading-relaxed text-rosa/75">Layout, carrello, Apple Pay. Foto e testi dal Customize.</p>
              <p className="mt-3 text-sm underline underline-offset-4">Paga e sblocca</p>
            </a>
          )}
        </div>

        <div className="mt-14">
          <p className="type-meta text-berry">Preview finita</p>
          <h2 className="type-display-md mt-3">Il sito, come sarà.</h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-cacao">
            Stesso look che andrà su Shopify. Apri la preview, scorri hero, collezione, scheda, mappa.
          </p>
          <a
            href={SITE_PREVIEW_URL}
            className="btn-primary mt-6"
          >
            caelia-store-x1wb.vercel.app
          </a>
          <div className="mt-8 space-y-8">
            {screens.map((s) => (
              <figure key={s.n} className="overflow-hidden border border-crema bg-white">
                <img src={s.src} alt={s.t} className="w-full object-cover object-top" />
                <figcaption className="px-4 py-4 md:px-5">
                  <p className="type-meta text-berry">{s.n}</p>
                  <p className="mt-2 font-serif text-2xl">{s.t}</p>
                  <p className="mt-1 text-sm text-cacao">{s.d}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="mt-14">
          <p className="type-meta text-berry">Asset già tuoi</p>
          <h2 className="mt-3 font-serif text-3xl tracking-wide">Foto prima del pagamento.</h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-cacao">
            Zip libero: packshot dei tre colori, lifestyle, video hero, zoom. Li carichi in Products → Media. Il tema (struttura) resta chiuso fino al saldo.
          </p>
          <div className="mt-6 grid grid-cols-3 gap-2">
            {packs.map((p) => (
              <figure key={p.t} className="bg-white">
                <img src={p.src} alt={p.t} className="aspect-square w-full object-cover" />
                <figcaption className="px-2 py-3 text-center text-sm">{p.t}</figcaption>
              </figure>
            ))}
          </div>
          <a href={IMAGES_ZIP_URL} download className="btn-primary mt-6">
            Scarica le immagini
          </a>
        </div>

        <div className="mt-14">
          <p className="type-meta text-berry">Tema, dopo il saldo</p>
          <h2 className="mt-3 font-serif text-3xl tracking-wide">Tutto configurabile. Foto comprese.</h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-cacao">
            Non è un HTML fisso. È un tema Online Store 2.0: in Customize cambi hero, video, capitoli, mappa, collezione, colori, menu, SEO. Ogni blocco ha image picker. I prodotti prendono le foto che hai già scaricato.
          </p>
          <ol className="mt-8 space-y-5">
            {configBits.map((c) => (
              <li key={c.n} className="border-t border-crema pt-4">
                <p className="type-meta text-berry">{c.n}</p>
                <p className="mt-2 font-serif text-xl">{c.t}</p>
                <p className="mt-1 text-sm leading-relaxed text-cacao">{c.d}</p>
              </li>
            ))}
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
            <p className="mt-1 text-sm text-cacao">Consuntivo 01 / 2026 · Non fiscale</p>
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
            Immagini scaricabili ora. Tema Shopify (configurabile: foto, testi, collezione, checkout) dopo il pagamento.
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
            <p className="type-meta text-berry">Link</p>
            <a href={SITE_PREVIEW_URL} className="mt-3 block text-sm underline decoration-berry/30 underline-offset-4">
              Preview sito finito
            </a>
            <a href={IMAGES_ZIP_URL} download className="mt-2 block text-sm underline decoration-berry/30 underline-offset-4">
              Zip immagini (ora)
            </a>
            <a href="/CAELIA-consuntivo-01-2026.pdf" className="mt-2 block text-sm underline decoration-berry/30 underline-offset-4">
              Consuntivo PDF
            </a>
          </div>
        </div>
      </article>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-berry/20 bg-berry/95 text-rosa backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl flex-col gap-3 px-5 py-4 md:flex-row md:items-center md:gap-4">
          <div className="flex-1">
            <p className="type-meta text-rosa/55">
              {unlocked ? "Tema sbloccato" : "Immagini libere · tema dopo 200 €"}
            </p>
            <p className="mt-1 font-serif text-2xl">{unlocked ? "Consegna aperta" : "€ 200,00"}</p>
          </div>
          {unlocked ? (
            <>
              <a href={SITE_PREVIEW_URL} className="btn-invert flex-1 md:flex-none">Preview</a>
              <Link to="/download" className="btn-ghost-light flex-1 md:flex-none">Tema Shopify</Link>
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
                {apple ? "Carta / Google Pay" : "Paga e sblocca il tema"}
              </a>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
