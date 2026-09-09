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
          File OS 2.0, CSV tre colori, CONFIG.md. Checkout Shopify, Apple Pay, SEO.
        </p>
        <img
          src="/campaign/pair-berry.jpg"
          alt="Packshot Burgundy Berry"
          className="mt-10 aspect-[16/9] w-full object-cover"
        />
        <ol className="mt-10 list-decimal space-y-3 pl-5 text-cacao">
          <li>Online Store → Themes → Upload zip → Publish</li>
          <li>Products → Import <code>products.csv</code></li>
          <li>Collezione handle <code>caelia</code></li>
          <li>Customize → Collezione home = CAELIA</li>
          <li>Menu: Home, Collezione, Storia, Contatti</li>
          <li>Payments → Shopify Payments / Apple Pay</li>
        </ol>
        <Link to="/download" className="btn-primary mt-10">
          Scarica il tema
        </Link>
        <p className="mt-4 text-sm text-cacao">caelia-shopify-theme.zip · solo dopo il saldo</p>
      </div>
    </section>
  );
}
