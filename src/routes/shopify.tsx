import { createFileRoute, Link } from "@tanstack/react-router";
import { useLock } from "@/lib/lock";

export const Route = createFileRoute("/shopify")({
  head: () => ({ meta: [{ title: "CAELIA · Tema Shopify" }] }),
  component: ShopifyPage,
});

function ShopifyPage() {
  const unlocked = useLock((s) => s.unlocked);

  return (
    <section className="bg-rosa">
      <div className="shell section-y max-w-2xl">
        <p className="eyebrow">Shopify 2.0</p>
        <h1 className="type-display-md mt-3">Tema nativo.</h1>
        <p className="mt-6 leading-relaxed text-cacao">
          Stesso design CAELIA, carrello e checkout Shopify, Apple Pay, tre colori.
          Il file zip si scarica dopo il pagamento da 200 €.
        </p>

        <div className="mt-10 overflow-hidden bg-crema">
          <img
            src="/campaign/pair-berry.jpg"
            alt="Anteprima packshot Burgundy Berry nel tema"
            className="aspect-[16/9] w-full object-cover"
          />
        </div>

        <ol className="mt-10 list-decimal space-y-3 pl-5 text-cacao">
          <li>Admin Shopify → Online Store → Themes → Upload zip</li>
          <li>Pubblica il tema CAELIA</li>
          <li>Importa <code>products.csv</code> (Burgundy Berry, Rosa nude, Marrone — 58 €)</li>
          <li>Collezione con handle <code>caelia</code></li>
          <li>Pagine Storia e Contatti (template contact)</li>
          <li>Settings → Payments → Shopify Payments / Apple Pay</li>
          <li>Search Console → sitemap del negozio</li>
        </ol>

        {unlocked ? (
          <>
            <a href="/caelia-shopify-theme.zip" className="btn-primary mt-10" download>
              Scarica il tema Shopify
            </a>
            <p className="mt-4 text-sm text-cacao">caelia-shopify-theme.zip · OS 2.0 · SEO e checkout nativi</p>
          </>
        ) : (
          <>
            <p className="mt-10 text-sm leading-relaxed text-cacao">
              Il download è bloccato fino al saldo. Dopo Stripe si apre da solo
              questa pagina sbloccata.
            </p>
            <Link to="/paga" className="btn-primary mt-6">
              Paga 200 € e sblocca
            </Link>
          </>
        )}
      </div>
    </section>
  );
}
