import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/contact")({ component: ContactPage });

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <section className="bg-rosa">
      <div className="shell section-y max-w-xl">
        <p className="eyebrow">Contatti</p>
        <h1 className="type-display-md mt-3">Scrivici</h1>
        {sent ? (
          <p className="mt-8 text-cacao">Messaggio ricevuto. Ti rispondiamo a breve.</p>
        ) : (
          <form
            className="mt-8 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <label className="block text-sm">
              Nome
              <input required className="mt-2 min-h-12 w-full border border-mist bg-rosa px-3" />
            </label>
            <label className="block text-sm">
              Email
              <input type="email" required className="mt-2 min-h-12 w-full border border-mist bg-rosa px-3" />
            </label>
            <label className="block text-sm">
              Messaggio
              <textarea required rows={5} className="mt-2 w-full border border-mist bg-rosa px-3 py-3" />
            </label>
            <button type="submit" className="btn-primary">
              Invia
            </button>
          </form>
        )}
        <p className="mt-10 text-sm text-cacao">
          CAELIA · Milano · info@caelia.store · PEC pec@caelia.store
          <br />
          P.IVA e REA si compilano in Shopify Admin prima del go-live.
        </p>
      </div>
    </section>
  );
}
