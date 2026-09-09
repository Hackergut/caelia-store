import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/shopify")({
  head: () => ({ meta: [{ title: "CAELIA · Tema Shopify" }] }),
  component: ShopifyPage,
});

function ShopifyPage() {
  return (
    <section className="bg-rosa">
      <div className="shell section-y max-w-2xl">
        <p className="eyebrow">Shopify 2.0</p>
        <h1 className="type-display-md mt-3">Tema nativo.</h1>
        <p className="mt-6 leading-relaxed text-cacao">
          Il sito CAELIA è pronto come tema Online Store 2.0: prodotti, carrello,
          checkout Shopify, Apple Pay, collezioni. Stesso design — Tenor Sans,
          Burgundy Berry.
        </p>
        <ol className="mt-8 list-decimal space-y-3 pl-5 text-cacao">
          <li>Admin Shopify → Online Store → Themes → Upload zip</li>
          <li>Carica il file qui sotto e pubblica</li>
          <li>Importa i tre prodotti (CSV nel zip) e la collezione handle <code>caelia</code></li>
          <li>Pagine Storia e Contatti; Payments → Shopify Payments / Apple Pay</li>
        </ol>
        <a href="/caelia-shopify-theme.zip" className="btn-primary mt-10" download>
          Scarica il tema Shopify
        </a>
        <p className="mt-4 text-sm text-cacao">caelia-shopify-theme.zip · OS 2.0 · checkout nativo</p>
      </div>
    </section>
  );
}
