import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  IMAGES_ZIP_URL,
  SITE_PREVIEW_URL,
  STRIPE_PAY_URL,
  useLock,
} from "@/lib/lock";

export const Route = createFileRoute("/paga")({
  validateSearch: (s: Record<string, unknown>) => ({
    da: typeof s.da === "string" ? s.da : "",
  }),
  head: () => ({
    meta: [{ title: "CAELIA — Shopify theme" }],
  }),
  component: PagaPage,
});

function Browser({
  src,
  url,
  href,
  label,
}: {
  src: string;
  url: string;
  href?: string;
  label?: string;
}) {
  const inner = (
    <div className="overflow-hidden rounded-xl border border-crema bg-[#faf4f0] shadow-[0_32px_80px_-36px_rgba(74,14,22,0.5)]">
      <div className="flex items-center gap-2 border-b border-crema bg-white/80 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-[#e8b4b4]" />
        <span className="h-2 w-2 rounded-full bg-[#dfc0b4]" />
        <span className="h-2 w-2 rounded-full bg-berry/35" />
        <span className="ml-2 min-w-0 flex-1 truncate rounded-full bg-rosa px-3 py-0.5 text-center text-[10px] tracking-[0.14em] text-cacao uppercase">
          {url.replace("https://", "")}
        </span>
      </div>
      <div className="relative">
        <img src={src} alt={label ?? ""} className="aspect-[16/10] w-full object-cover object-top" />
        {href ? (
          <span className="absolute inset-0 grid place-items-center bg-berry/0 opacity-0 transition-opacity duration-300 group-hover:bg-berry/35 group-hover:opacity-100">
            <span className="btn-invert">Preview</span>
          </span>
        ) : null}
      </div>
    </div>
  );
  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className="group block">
        {inner}
      </a>
    );
  }
  return inner;
}

function Phone({ src }: { src: string }) {
  return (
    <div className="mx-auto w-[220px] overflow-hidden rounded-[2rem] border-[6px] border-burgundy bg-burgundy shadow-[0_28px_60px_-28px_rgba(74,14,22,0.55)]">
      <div className="mx-auto mt-2 h-4 w-20 rounded-full bg-berry/40" />
      <img src={src} alt="Mobile" className="mt-2 aspect-[9/16] w-full object-cover object-top" />
    </div>
  );
}

const gallery = [
  { src: "/setup/01-hero.png", t: "Hero" },
  { src: "/setup/02-collezione.png", t: "Collezione" },
  { src: "/setup/03-prodotto.png", t: "Prodotto" },
  { src: "/setup/04-mappa.png", t: "Mappa" },
  { src: "/setup/05-lifestyle.png", t: "Storia" },
];

const after = [
  { n: "01", t: "Tema Shopify OS 2.0", d: "File da caricare in Admin. Hero, capitoli, mappa, carrello, checkout." },
  { n: "02", t: "Customize completo", d: "Ogni foto, colore, titolo e menu si cambia dal pannello. Niente codice." },
  { n: "03", t: "Checkout Apple Pay", d: "Shopify Payments, carta, Google Pay. Non è il carrello demo." },
  { n: "04", t: "Sito preview pulito", d: "Watermark rimosso su questo browser. Stessa grafica della listing." },
];

const now = [
  { n: "01", t: "Preview live", d: "Il sito finito, con watermark.", href: SITE_PREVIEW_URL, label: "Apri preview" },
  { n: "02", t: "Pack immagini", d: "3 colori, lifestyle, video, zoom. Già scaricabile.", href: IMAGES_ZIP_URL, label: "Scarica zip", download: true },
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
    <section className="bg-[#f7eee9] pb-36 text-burgundy">
      <div className="mx-auto max-w-6xl px-5 pt-24 md:px-8 md:pt-28">
        <p className="type-meta text-cacao">Shopify theme · Community</p>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
          <div>
            <h1 className="type-display-md">CAELIA</h1>
            <p className="mt-3 max-w-md text-lg text-cacao">Beauty Mirror Case. Tema editoriale, tre colori, checkout nativo.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={SITE_PREVIEW_URL} target="_blank" rel="noreferrer" className="btn-ghost">
              Preview
            </a>
            {unlocked ? (
              <Link to="/download" className="btn-primary">
                Download tema
              </Link>
            ) : (
              <a href={STRIPE_PAY_URL} className="btn-primary">
                Get — € 200
              </a>
            )}
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2 text-[0.65rem] tracking-[0.22em] uppercase text-cacao">
          <span className="border border-crema px-3 py-1">Shopify 2.0</span>
          <span className="border border-crema px-3 py-1">Editorial</span>
          <span className="border border-crema px-3 py-1">Tenor Sans</span>
          <span className="border border-crema px-3 py-1">Apple Pay</span>
        </div>

        <div className="mt-12 grid items-end gap-8 lg:grid-cols-[1fr_220px]">
          <Browser
            src="/setup/01-hero.png"
            url={SITE_PREVIEW_URL}
            href={SITE_PREVIEW_URL}
            label="Preview home CAELIA"
          />
          <div className="hidden lg:block">
            <Phone src="/setup/09-mobile.png" />
          </div>
        </div>

        <div className="mt-16">
          <p className="type-meta text-berry">Gallery</p>
          <h2 className="mt-3 font-serif text-3xl tracking-wide">Il mockup, pagina per pagina.</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {gallery.map((g) => (
              <div key={g.t}>
                <Browser src={g.src} url={`${SITE_PREVIEW_URL}`} label={g.t} />
                <p className="mt-3 type-meta text-cacao">{g.t}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-3 sm:grid-cols-3">
          {["/setup/06-pack-berry.jpg", "/setup/07-pack-rosa.jpg", "/setup/08-pack-cacao.jpg"].map((src, i) => (
            <figure key={src} className="bg-white">
              <img src={src} alt="" className="aspect-square w-full object-cover" />
              <figcaption className="px-3 py-3 type-meta text-cacao">
                {["Burgundy Berry", "Rosa nude", "Marrone"][i]}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-20 grid gap-12 lg:grid-cols-2">
          <div>
            <p className="type-meta text-berry">Prima dell’acquisto</p>
            <h2 className="mt-3 font-serif text-3xl tracking-wide">Cosa vedi ora.</h2>
            <ul className="mt-8 space-y-6">
              {now.map((item) => (
                <li key={item.n} className="border-t border-crema pt-5">
                  <p className="type-meta text-berry">{item.n}</p>
                  <p className="mt-2 font-serif text-2xl">{item.t}</p>
                  <p className="mt-2 text-sm text-cacao">{item.d}</p>
                  <a
                    href={item.href}
                    {...(item.download ? { download: true } : { target: "_blank", rel: "noreferrer" })}
                    className="mt-3 inline-block text-sm underline decoration-berry/30 underline-offset-4"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="type-meta text-berry">Dopo l’acquisto</p>
            <h2 className="mt-3 font-serif text-3xl tracking-wide">Cosa ottieni.</h2>
            <ul className="mt-8 space-y-6">
              {after.map((item) => (
                <li key={item.n} className="border-t border-berry/20 pt-5">
                  <p className="type-meta text-berry">{item.n}</p>
                  <p className="mt-2 font-serif text-2xl">{item.t}</p>
                  <p className="mt-2 text-sm text-cacao">{item.d}</p>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm leading-relaxed text-cacao">
              Il tema è un file Shopify vero: Customize → image picker su hero, video, capitoli, mappa, collezione. Colori, testi, menu, SEO. Le foto del pack si caricano sui prodotti.
            </p>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-start justify-between gap-6 border border-crema bg-white px-6 py-8 md:flex-row md:items-center md:px-10">
          <div>
            <p className="type-meta text-berry">License</p>
            <p className="mt-2 font-serif text-3xl">€ 200,00</p>
            <p className="mt-2 text-sm text-cacao">Saldo su lavori 450 € · anticipo 150 € già versato.</p>
          </div>
          {unlocked ? (
            <Link to="/download" className="btn-primary">
              Download tema
            </Link>
          ) : (
            <a href={STRIPE_PAY_URL} className="btn-primary">
              Get CAELIA — € 200
            </a>
          )}
        </div>

        <p className="mt-6 text-xs text-cacao">
          Sergio Guttilla · IT55 T036 4601 6005 2600 7699 943 · Stripe HACKGUT
        </p>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-berry/15 bg-[#f7eee9]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-3 md:flex-row md:items-center md:px-8">
          <div className="flex-1">
            <p className="font-serif text-xl">CAELIA</p>
            <p className="type-meta text-cacao">{unlocked ? "Sbloccato" : "Shopify theme · € 200"}</p>
          </div>
          <a href={SITE_PREVIEW_URL} className="type-meta py-2 text-cacao" target="_blank" rel="noreferrer">
            Preview
          </a>
          {unlocked ? (
            <Link to="/download" className="btn-primary">
              Download
            </Link>
          ) : (
            <>
              {apple ? (
                <a
                  href={STRIPE_PAY_URL}
                  className="inline-flex min-h-12 items-center justify-center gap-2 bg-black px-6 text-white text-[0.7rem] tracking-[0.18em] uppercase"
                >
                  <AppleMark />
                  Apple Pay
                </a>
              ) : null}
              <a href={STRIPE_PAY_URL} className="btn-primary">
                Get — € 200
              </a>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
