import { createFileRoute, Link } from "@tanstack/react-router";
import { IMAGES_ZIP_URL, SITE_PREVIEW_URL, useLock } from "@/lib/lock";

export const Route = createFileRoute("/shopify")({
  head: () => ({
    meta: [
      { title: "CAELIA · Tema Shopify" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ShopifyPage,
});

function ShopifyPage() {
  const unlocked = useLock((s) => s.unlocked);

  return (
    <section className="bg-rosa">
      <div className="shell section-y max-w-2xl">
        <p className="eyebrow">Shopify 2.0</p>
        <h1 className="type-display-md mt-3">Tutto configurabile.</h1>
        <p className="mt-6 leading-relaxed text-cacao">
          Foto, testi, colori, collezione, hero, mappa: dal Customize, senza codice.
          Le immagini le scarichi ora. Il tema (zip da caricare in Admin) dopo i 200 €.
        </p>
        <a href={SITE_PREVIEW_URL} className="mt-6 inline-block type-meta text-berry">
          Preview sito finito →
        </a>
        <img src="/setup/01-hero.png" alt="Preview home CAELIA" className="mt-8 w-full border border-crema" />
        <div className="mt-4 grid grid-cols-2 gap-2">
          <img src="/setup/02-collezione.png" alt="Collezione tre colori" className="w-full border border-crema" />
          <img src="/setup/03-prodotto.png" alt="Scheda prodotto" className="w-full border border-crema" />
        </div>
        <ol className="mt-10 list-decimal space-y-3 pl-5 text-cacao">
          <li>Scarica <code>caelia-immagini.zip</code> (già sbloccato)</li>
          <li>Dopo il pagamento: upload <code>caelia-os2.zip</code> → Publish</li>
          <li>Products → Import CSV · Media dalle cartelle 01 / 02 / 03</li>
          <li>Customize → Collezione home, Hero image/video, capitoli, mappa</li>
          <li>Payments → Shopify Payments / Apple Pay</li>
        </ol>
        <div className="mt-10 flex flex-wrap gap-3">
          <a href={IMAGES_ZIP_URL} download className="btn-primary">
            Scarica le immagini
          </a>
          {unlocked ? (
            <Link to="/download" className="btn-primary">
              Scarica il tema
            </Link>
          ) : (
            <Link to="/paga" search={{ da: "tema" }} className="btn-primary">
              Paga 200 € per il tema
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
