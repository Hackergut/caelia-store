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

function BrowserChrome({
  url,
  href,
  children,
}: {
  url: string;
  href?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-crema bg-[#faf4f0] shadow-[0_32px_80px_-36px_rgba(74,14,22,0.5)]">
      <div className="flex items-center gap-2 border-b border-crema bg-white/80 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-[#e8b4b4]" />
        <span className="h-2 w-2 rounded-full bg-[#dfc0b4]" />
        <span className="h-2 w-2 rounded-full bg-berry/35" />
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="ml-2 min-w-0 flex-1 truncate rounded-full bg-rosa px-3 py-1 text-center text-[10px] tracking-[0.14em] text-berry uppercase hover:bg-berry hover:text-rosa"
          >
            {url.replace("https://", "")} ↗
          </a>
        ) : (
          <span className="ml-2 min-w-0 flex-1 truncate rounded-full bg-rosa px-3 py-1 text-center text-[10px] tracking-[0.14em] text-cacao uppercase">
            {url.replace("https://", "")}
          </span>
        )}
      </div>
      {children}
    </div>
  );
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
  { src: "/setup/01-hero.png", t: "Hero", href: SITE_PREVIEW_URL },
  { src: "/setup/02-collezione.png", t: "Collezione", href: `${SITE_PREVIEW_URL}/products` },
  { src: "/setup/03-prodotto.png", t: "Prodotto", href: `${SITE_PREVIEW_URL}/products/burgundy-caelia` },
  { src: "/setup/04-mappa.png", t: "Mappa", href: `${SITE_PREVIEW_URL}/products/burgundy-caelia` },
  { src: "/setup/05-lifestyle.png", t: "Storia", href: `${SITE_PREVIEW_URL}/about` },
];

const install = [
  {
    n: "01",
    t: "Guarda la preview",
    d: "Apri il sito live nel mockup o in una nuova scheda. Così è il negozio dopo Publish.",
    img: "/setup/01-hero.png",
    href: SITE_PREVIEW_URL,
    label: "Apri il sito",
  },
  {
    n: "02",
    t: "Scarica le immagini",
    d: "Zip libero, prima del pagamento. Tre colori, lifestyle, video, zoom.",
    img: "/setup/06-pack-berry.jpg",
    href: IMAGES_ZIP_URL,
    label: "caelia-immagini.zip",
    download: true,
  },
  {
    n: "03",
    t: "Paga e scarica il tema",
    d: "€ 200. Stripe apre la consegna. Nel zip: caelia-os2.zip + products.csv + CONFIG.md.",
    img: "/setup/install-01.png",
    href: STRIPE_PAY_URL,
    label: "Get — € 200",
    pay: true,
  },
  {
    n: "04",
    t: "Upload zip in Shopify",
    d: "Admin → Online Store → Themes → Add theme → Upload zip file → tema/caelia-os2.zip.",
    img: "/setup/install-01.png",
  },
  {
    n: "05",
    t: "Publish",
    d: "Theme library → CAELIA → Actions → Publish. Diventa il tema corrente.",
    img: "/setup/install-02.png",
  },
  {
    n: "06",
    t: "Importa i 3 prodotti",
    d: "Products → Import → products.csv. Handle: burgundy-caelia, crema-caelia, cacao-caelia. 58 €.",
    img: "/setup/install-03.png",
  },
  {
    n: "07",
    t: "Assegna le foto",
    d: "Products → Media. Berry → pair-berry.jpg · Rosa → pair-rosa.jpg · Marrone → pair-cacao.jpg.",
    img: "/setup/install-04.png",
  },
  {
    n: "08",
    t: "Customize",
    d: "Hero (foto/video), collezione home = CAELIA, capitoli, mappa, testi, menu, SEO. Tutto da pannello.",
    img: "/setup/install-05.png",
  },
  {
    n: "09",
    t: "Pagamenti",
    d: "Settings → Payments → Shopify Payments. Apple Pay, Google Pay, carta. Checkout #973851.",
    img: "/setup/install-06.png",
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
    <section className="bg-[#f7eee9] pb-36 text-burgundy">
      <div className="mx-auto max-w-6xl px-5 pt-24 md:px-8 md:pt-28">
        <p className="type-meta text-cacao">Shopify theme · Preview + install</p>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
          <div>
            <h1 className="type-display-md">CAELIA</h1>
            <p className="mt-3 max-w-md text-lg text-cacao">
              Mockup live del sito. Poi le immagini, poi il tema, poi i passi in Admin.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={SITE_PREVIEW_URL} target="_blank" rel="noreferrer" className="btn-ghost">
              Apri preview
            </a>
            {unlocked ? (
              <Link to="/download" className="btn-primary">Download tema</Link>
            ) : (
              <a href={STRIPE_PAY_URL} className="btn-primary">Get — € 200</a>
            )}
          </div>
        </div>

        <div id="preview" className="mt-12 grid items-start gap-8 lg:grid-cols-[1fr_220px]">
          <div>
            <BrowserChrome url={SITE_PREVIEW_URL} href={SITE_PREVIEW_URL}>
              <iframe
                title="Preview live CAELIA"
                src="/"
                className="h-[70vh] w-full bg-rosa"
              />
            </BrowserChrome>
            <p className="mt-3 text-sm text-cacao">
              Sito navigabile nel mockup. Oppure{" "}
              <a href={SITE_PREVIEW_URL} target="_blank" rel="noreferrer" className="underline decoration-berry/40 underline-offset-4">
                apri caelia-store-x1wb.vercel.app
              </a>
            </p>
          </div>
          <div className="hidden lg:block lg:pt-8">
            <a href={SITE_PREVIEW_URL} target="_blank" rel="noreferrer" className="block">
              <Phone src="/setup/09-mobile.png" />
            </a>
          </div>
        </div>

        <div className="mt-16">
          <p className="type-meta text-berry">Pagine</p>
          <h2 className="mt-3 font-serif text-3xl tracking-wide">Clicca e apri.</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {gallery.map((g) => (
              <a key={g.t} href={g.href} target="_blank" rel="noreferrer" className="block">
                <BrowserChrome url={g.href} href={g.href}>
                  <img src={g.src} alt={g.t} className="aspect-[16/10] w-full object-cover object-top" />
                </BrowserChrome>
                <p className="mt-3 type-meta text-cacao">{g.t} ↗</p>
              </a>
            ))}
          </div>
        </div>

        <div id="install" className="mt-20">
          <p className="type-meta text-berry">Installazione</p>
          <h2 className="mt-3 font-serif text-3xl tracking-wide">Nove passi, con le immagini.</h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-cacao">
            Immagini subito. Tema dopo il pagamento. Poi Admin Shopify, in quest’ordine.
          </p>
          <ol className="mt-12 space-y-16">
            {install.map((step) => {
              const isPay = Boolean(step.pay) && !unlocked;
              const href = step.pay && unlocked ? "/download" : step.href;
              return (
                <li key={step.n} className="grid items-start gap-8 md:grid-cols-2">
                  <div className={step.n === "02" || step.n === "07" ? "md:order-2" : ""}>
                    <p className="type-meta text-berry">{step.n}</p>
                    <h3 className="mt-3 font-serif text-3xl">{step.t}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-cacao">{step.d}</p>
                    {href ? (
                      step.pay && unlocked ? (
                        <Link to="/download" className="btn-primary mt-6">Download tema</Link>
                      ) : (
                        <a
                          href={href}
                          {...(step.download ? { download: true } : !isPay ? { target: "_blank", rel: "noreferrer" } : {})}
                          className="btn-primary mt-6"
                        >
                          {step.pay && unlocked ? "Download tema" : step.label}
                        </a>
                      )
                    ) : null}
                  </div>
                  <div className={step.n === "02" || step.n === "07" ? "md:order-1" : ""}>
                    <img src={step.img} alt={step.t} className="w-full border border-crema bg-white object-cover" />
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="mt-20 overflow-hidden border border-crema bg-white">
          <div className="grid sm:grid-cols-3">
            {["/setup/06-pack-berry.jpg", "/setup/07-pack-rosa.jpg", "/setup/08-pack-cacao.jpg"].map((src, i) => (
              <figure key={src}>
                <img src={src} alt="" className="aspect-square w-full object-cover" />
                <figcaption className="px-3 py-3 type-meta text-cacao">
                  {["07 · pair-berry.jpg", "07 · pair-rosa.jpg", "07 · pair-cacao.jpg"][i]}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-6 border border-crema bg-white px-6 py-8 md:flex-row md:items-center md:px-10">
          <div>
            <p className="type-meta text-berry">License</p>
            <p className="mt-2 font-serif text-3xl">€ 200,00</p>
            <p className="mt-2 text-sm text-cacao">Tema Shopify configurabile. Foto già nel pack immagini.</p>
          </div>
          {unlocked ? (
            <Link to="/download" className="btn-primary">Download tema</Link>
          ) : (
            <a href={STRIPE_PAY_URL} className="btn-primary">Get CAELIA — € 200</a>
          )}
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-berry/15 bg-[#f7eee9]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-3 md:flex-row md:items-center md:px-8">
          <div className="flex-1">
            <p className="font-serif text-xl">CAELIA</p>
            <p className="type-meta text-cacao">{unlocked ? "Tema sbloccato" : "Preview libera · tema € 200"}</p>
          </div>
          <a href={SITE_PREVIEW_URL} className="type-meta py-2 text-cacao" target="_blank" rel="noreferrer">
            Preview
          </a>
          <a href="#install" className="type-meta py-2 text-cacao">Install</a>
          {unlocked ? (
            <Link to="/download" className="btn-primary">Download</Link>
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
              <a href={STRIPE_PAY_URL} className="btn-primary">Get — € 200</a>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
