import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { hydrateLock, useLock } from "@/lib/lock";

export const Route = createFileRoute("/shopify")({
  head: () => ({ meta: [{ title: "CAELIA · Tema Shopify" }] }),
  component: ShopifyPage,
});

function ShopifyPage() {
  const unlocked = useLock((s) => s.unlocked);
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    hydrateLock();
    setReady(true);
    if (!useLock.getState().unlocked) {
      void navigate({ to: "/paga", search: { da: "tema" }, replace: true });
    }
  }, [navigate]);

  if (!ready || !unlocked) {
    return (
      <section className="bg-rosa">
        <div className="shell section-y max-w-xl">
          <p className="eyebrow">Tema Shopify</p>
          <h1 className="type-display-md mt-3">Bloccato.</h1>
          <p className="mt-6 text-cacao">Il download si apre dopo il pagamento da 200 €.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-rosa">
      <div className="shell section-y max-w-2xl">
        <p className="eyebrow">Sbloccato</p>
        <h1 className="type-display-md mt-3">Tema Shopify.</h1>
        <p className="mt-6 leading-relaxed text-cacao">
          Nel zip: tema da caricare in Admin, più tutte le foto e i video da
          assegnare ai tre prodotti (Burgundy Berry, Rosa nude, Marrone),
          lifestyle, hero e dettagli zoom.
        </p>
        <img
          src="/campaign/pair-berry.jpg"
          alt="Packshot Burgundy Berry"
          className="mt-10 aspect-[16/9] w-full object-cover"
        />
        <ol className="mt-10 list-decimal space-y-3 pl-5 text-cacao">
          <li>Apri il zip → cartella <code>tema/</code> → upload <code>caelia-os2.zip</code> → Publish</li>
          <li>Products → Import <code>products.csv</code></li>
          <li>Media: cartella <code>immagini/01-burgundy-berry</code> sul prodotto Berry, e così via</li>
          <li>Copertine: <code>pair-berry.jpg</code> / <code>pair-rosa.jpg</code> / <code>pair-cacao.jpg</code></li>
          <li>Collezione handle <code>caelia</code> · Customize → Collezione home</li>
          <li>Payments → Shopify Payments / Apple Pay</li>
        </ol>
        <p className="mt-6 text-sm text-cacao">
          01 Burgundy · 02 Rosa nude · 03 Marrone · 04 Lifestyle · 05 Video · 06 Zoom · 07 Schede
        </p>
        <Link to="/download" className="btn-primary mt-10">
          Scarica il tema
        </Link>
        <p className="mt-4 text-sm text-cacao">caelia-shopify-theme.zip · solo dopo il saldo</p>
      </div>
    </section>
  );
}
