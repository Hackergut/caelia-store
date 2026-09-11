import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { useCart } from "@/lib/cart";
import { SHOP } from "@/lib/commerce";

export const Route = createFileRoute("/ordine")({
  component: OrdinePage,
  head: () => ({ meta: [{ title: "Ordine — CAELIA" }, { name: "robots", content: "noindex" }] }),
});

function OrdinePage() {
  const clear = useCart((s) => s.clear);
  useEffect(() => {
    clear();
  }, [clear]);

  return (
    <section className="bg-rosa">
      <div className="shell section-y max-w-xl">
        <p className="eyebrow">Grazie</p>
        <h1 className="type-display-md mt-3">Ordine ricevuto.</h1>
        <p className="mt-6 leading-relaxed text-cacao">
          Stripe ti ha inviato la ricevuta. Spedizione Italia 2–4 giorni, tracking in una seconda email.
          Reso 14 giorni: {SHOP.email}.
        </p>
        <Link to="/products" className="btn-primary mt-10">
          La collezione
        </Link>
      </div>
    </section>
  );
}
