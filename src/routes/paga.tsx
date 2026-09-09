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
    meta: [{ title: "CAELIA — Website Template for Shopify" }],
  }),
  component: PagaPage,
});

const shots = [
  { src: "/setup/01-hero.png", t: "Home", href: SITE_PREVIEW_URL },
  { src: "/setup/02-collezione.png", t: "Collezione", href: `${SITE_PREVIEW_URL}/products` },
  { src: "/setup/03-prodotto.png", t: "Prodotto", href: `${SITE_PREVIEW_URL}/products/burgundy-caelia` },
  { src: "/setup/05-lifestyle.png", t: "Storia", href: `${SITE_PREVIEW_URL}/about` },
];

const pages = [
  { t: "Home", d: "Hero drip, logo sticky, film chapters, parallax." },
  { t: "Collezione", d: "Tre colori, stessa inquadratura, 58 €." },
  { t: "Prodotto", d: "Zoom lente, mappa 01–06, checkout." },
  { t: "Storia", d: "Lookbook, testi CMS." },
  { t: "Contatti", d: "Form e pagina legale." },
  { t: "Carrello", d: "Shopify native, Apple Pay." },
];

const after = [
  { t: "Tema OS 2.0", d: "Zip da caricare in Admin. Sezioni, settings, SEO." },
  { t: "Customize", d: "Foto, colori, testi, menu: dal pannello, senza codice." },
  { t: "Checkout", d: "Apple Pay, Google Pay, carta. Non è il demo." },
  { t: "Preview pulita", d: "Watermark spento su questo browser." },
];

const install = [
  {
    n: "01",
    t: "See it live",
    d: "Apri la preview. È il sito che avrai dopo Publish.",
    img: "/setup/01-hero.png",
    href: SITE_PREVIEW_URL,
    label: "See it live →",
  },
  {
    n: "02",
    t: "Pack immagini",
    d: "Già scaricabile. Berry, rosa, marrone, lifestyle, video, zoom.",
    img: "/setup/06-pack-berry.jpg",
    href: IMAGES_ZIP_URL,
    label: "Download images",
    download: true,
  },
  {
    n: "03",
    t: "Get the theme",
    d: "€ 200. Stripe consegna caelia-os2.zip, CSV, CONFIG.md.",
    img: "/setup/install-01.png",
    href: STRIPE_PAY_URL,
    label: "Buy for € 200",
    pay: true,
  },
  {
    n: "04",
    t: "Upload zip",
    d: "Online Store → Themes → Add theme → Upload zip → caelia-os2.zip.",
    img: "/setup/install-01.png",
  },
  {
    n: "05",
    t: "Publish",
    d: "Theme library → CAELIA → Publish. Diventa il tema corrente.",
    img: "/setup/install-02.png",
  },
  {
    n: "06",
    t: "Import products",
    d: "Products → Import → products.csv. Tre handle, 58 €.",
    img: "/setup/install-03.png",
  },
  {
    n: "07",
    t: "Assign photos",
    d: "Media: pair-berry.jpg, pair-rosa.jpg, pair-cacao.jpg.",
    img: "/setup/install-04.png",
  },
  {
    n: "08",
    t: "Customize",
    d: "Hero, collezione caelia, capitoli, mappa, menu, SEO.",
    img: "/setup/install-05.png",
  },
  {
    n: "09",
    t: "Payments",
    d: "Shopify Payments. Apple Pay, Google Pay, carta. Checkout #973851.",
    img: "/setup/install-06.png",
  },
];

function Pill({
  href,
  filled,
  children,
}: {
  href: string;
  filled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") && !href.includes("stripe.com") ? "_blank" : undefined}
      rel="noreferrer"
      className={`inline-flex h-11 items-center rounded-full px-6 text-[0.7rem] tracking-[0.16em] uppercase ${
        filled ? "bg-burgundy text-rosa" : "border border-burgundy/20 text-burgundy"
      }`}
    >
      {children}
    </a>
  );
}

function Shot({ src, href, t }: { src: string; href: string; t: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="group block">
      <div className="overflow-hidden rounded-[22px] bg-crema">
        <img
          src={src}
          alt={t}
          className="aspect-[16/10] w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </div>
    </a>
  );
}

function PagaPage() {
  const unlocked = useLock((s) => s.unlocked);
  const [apple, setApple] = useState(false);
  useEffect(() => {
    setApple(typeof window !== "undefined" && "ApplePaySession" in window);
  }, []);

  return (
    <section className="bg-[#f4ebe6] pb-32 text-burgundy">
      <div className="mx-auto max-w-[1180px] px-5 pt-24 md:px-8 md:pt-28">
        <p className="text-[0.7rem] tracking-[0.04em] text-cacao">
          Marketplace / Templates / Shopify
        </p>

        <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="font-serif text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.05] tracking-wide">
              CAELIA — Website Template for Shopify
            </h1>
            <p className="mt-3 text-cacao">A refined beauty store theme. Tre colori, checkout nativo.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Pill href={SITE_PREVIEW_URL}>Preview</Pill>
            {unlocked ? (
              <Link
                to="/download"
                className="inline-flex h-11 items-center rounded-full bg-burgundy px-6 text-[0.7rem] tracking-[0.16em] text-rosa uppercase"
              >
                Download
              </Link>
            ) : (
              <Pill href={STRIPE_PAY_URL} filled>
                Buy for € 200
              </Pill>
            )}
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {shots.map((s) => (
            <Shot key={s.t} {...s} />
          ))}
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-[1.4fr_0.8fr]">
          <a href={`${SITE_PREVIEW_URL}/products/burgundy-caelia`} target="_blank" rel="noreferrer" className="block overflow-hidden rounded-[22px]">
            <img src="/setup/04-mappa.png" alt="Mappa prodotto" className="aspect-[16/9] w-full object-cover object-top" />
          </a>
          <a href={SITE_PREVIEW_URL} target="_blank" rel="noreferrer" className="block overflow-hidden rounded-[22px] bg-burgundy">
            <img src="/setup/09-mobile.png" alt="Mobile" className="mx-auto h-full max-h-[420px] object-contain object-top" />
          </a>
        </div>

        <p className="mt-6">
          <a href={SITE_PREVIEW_URL} target="_blank" rel="noreferrer" className="text-sm text-berry">
            🔗 See it live →
          </a>
        </p>

        <div className="mt-16 grid gap-16 lg:grid-cols-[1fr_320px]">
          <div>
            <h2 className="font-serif text-3xl tracking-wide">About CAELIA</h2>
            <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-cacao">
              Tema editoriale per Shopify. Burgundy Berry, rosa nude, marrone. Tenor Sans,
              motion da Framer, packshot 1/1. Ogni foto e testo si cambia da Customize.
            </p>

            <h3 className="mt-14 font-serif text-2xl">Pages included</h3>
            <ul className="mt-6 divide-y divide-crema border-y border-crema">
              {pages.map((p) => (
                <li key={p.t} className="flex gap-6 py-4">
                  <span className="w-28 font-serif text-lg">{p.t}</span>
                  <span className="text-sm text-cacao">{p.d}</span>
                </li>
              ))}
            </ul>

            <h3 className="mt-14 font-serif text-2xl">After you buy</h3>
            <ul className="mt-6 grid gap-6 sm:grid-cols-2">
              {after.map((a) => (
                <li key={a.t}>
                  <p className="font-serif text-xl">{a.t}</p>
                  <p className="mt-2 text-sm text-cacao">{a.d}</p>
                </li>
              ))}
            </ul>

            <h3 className="mt-14 font-serif text-2xl">Live preview</h3>
            <p className="mt-3 text-sm text-cacao">Naviga il sito nel mockup, o aprilo a schermo intero.</p>
            <div className="mt-6 overflow-hidden rounded-[22px] border border-crema bg-white">
              <div className="flex items-center justify-between border-b border-crema px-4 py-2.5">
                <span className="text-[11px] tracking-[0.14em] text-cacao uppercase">
                  {SITE_PREVIEW_URL.replace("https://", "")}
                </span>
                <a href={SITE_PREVIEW_URL} target="_blank" rel="noreferrer" className="text-[11px] tracking-[0.14em] text-berry uppercase">
                  Open ↗
                </a>
              </div>
              <iframe title="CAELIA live" src="/" className="h-[64vh] w-full" />
            </div>

            <div id="setup" className="mt-16">
              <h3 className="font-serif text-2xl">Setup</h3>
              <p className="mt-3 text-sm text-cacao">Nove passi, con le immagini. Immagini ora, tema dopo il buy.</p>
              <ol className="mt-10 space-y-14">
                {install.map((step) => (
                  <li key={step.n} className="grid gap-6 md:grid-cols-2 md:items-center">
                    <div>
                      <p className="text-[0.65rem] tracking-[0.22em] text-berry uppercase">{step.n}</p>
                      <p className="mt-2 font-serif text-2xl">{step.t}</p>
                      <p className="mt-3 text-sm leading-relaxed text-cacao">{step.d}</p>
                      {step.href ? (
                        step.pay && unlocked ? (
                          <Link to="/download" className="mt-5 inline-block text-sm text-berry">
                            Download theme →
                          </Link>
                        ) : (
                          <a
                            href={step.pay && unlocked ? undefined : step.href}
                            download={step.download || undefined}
                            target={step.download || step.pay ? undefined : "_blank"}
                            rel="noreferrer"
                            className="mt-5 inline-block text-sm text-berry"
                          >
                            {step.label}
                          </a>
                        )
                      ) : null}
                    </div>
                    <img src={step.img} alt={step.t} className="w-full rounded-[18px] object-cover" />
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-[22px] border border-crema bg-white p-6">
              <p className="text-[0.65rem] tracking-[0.2em] text-cacao uppercase">Shopify theme</p>
              <p className="mt-3 font-serif text-4xl">€ 200</p>
              <p className="mt-2 text-sm text-cacao">One-time. Anticipo 150 € già versato.</p>
              {unlocked ? (
                <Link
                  to="/download"
                  className="mt-6 flex h-12 items-center justify-center rounded-full bg-burgundy text-[0.7rem] tracking-[0.16em] text-rosa uppercase"
                >
                  Download theme
                </Link>
              ) : (
                <a
                  href={STRIPE_PAY_URL}
                  className="mt-6 flex h-12 items-center justify-center rounded-full bg-burgundy text-[0.7rem] tracking-[0.16em] text-rosa uppercase"
                >
                  Buy for € 200
                </a>
              )}
              <a
                href={SITE_PREVIEW_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-3 flex h-12 items-center justify-center rounded-full border border-burgundy/15 text-[0.7rem] tracking-[0.16em] uppercase"
              >
                See it live
              </a>
              <a
                href={IMAGES_ZIP_URL}
                download
                className="mt-3 block text-center text-sm text-cacao underline decoration-crema underline-offset-4"
              >
                Free image pack
              </a>
              <ul className="mt-8 space-y-2 text-sm text-cacao">
                <li>OS 2.0 · Customize</li>
                <li>Apple Pay checkout</li>
                <li>3 products + CSV</li>
                <li>Tenor Sans · Berry palette</li>
              </ul>
              <p className="mt-8 text-[0.65rem] tracking-[0.16em] text-cacao uppercase">Sergio Guttilla</p>
            </div>
          </aside>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-crema bg-[#f4ebe6]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1180px] items-center gap-4 px-5 py-3 md:px-8">
          <div className="min-w-0 flex-1">
            <p className="truncate font-serif text-lg">CAELIA</p>
            <p className="text-[0.65rem] tracking-[0.16em] text-cacao uppercase">
              {unlocked ? "Unlocked" : "Website template · € 200"}
            </p>
          </div>
          <a href={SITE_PREVIEW_URL} target="_blank" rel="noreferrer" className="hidden text-sm text-cacao md:block">
            Preview
          </a>
          {unlocked ? (
            <Link
              to="/download"
              className="inline-flex h-11 items-center rounded-full bg-burgundy px-6 text-[0.7rem] tracking-[0.16em] text-rosa uppercase"
            >
              Download
            </Link>
          ) : (
            <>
              {apple ? (
                <a href={STRIPE_PAY_URL} className="hidden h-11 items-center rounded-full bg-black px-5 text-[0.65rem] tracking-[0.16em] text-white uppercase md:inline-flex">
                  Apple Pay
                </a>
              ) : null}
              <a
                href={STRIPE_PAY_URL}
                className="inline-flex h-11 items-center rounded-full bg-burgundy px-6 text-[0.7rem] tracking-[0.16em] text-rosa uppercase"
              >
                Buy for € 200
              </a>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
