import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Account",
  description: "Accedi al tuo account CAELIA.",
};

export default function AccountPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 lg:px-10 pt-16 pb-24">
      <h1 className="font-serif text-4xl">Il mio account</h1>
      <p className="mt-3 text-ink/70">
        I tuoi ordini recenti. Per accedere al profilo completo collega
        Shopify Customer Accounts o il tuo provider auth preferito.
      </p>

      <h2 className="mt-12 font-serif text-2xl">Ordini recenti</h2>
      <AccountOrders />
    </div>
  );
}

import { AccountOrders } from "@/components/account-orders";
export function AccountSignInSection() {
  return (
    <div className="mx-auto max-w-md px-6 lg:px-10 pt-20 pb-24">
      <h1 className="font-serif text-4xl">Accedi</h1>
      <p className="mt-3 text-sm text-ink/70">
        Entra nel tuo account per visualizzare gli ordini, i salvataggi e la
        cronologia delle spedizioni.
      </p>

      <form className="mt-10 space-y-4">
        <label className="block">
          <span className="block text-xs uppercase tracking-[0.22em] text-ink/60 mb-1">
            Email
          </span>
          <input
            type="email"
            required
            className="w-full border border-mist rounded-md px-4 py-3 text-sm bg-cream focus:outline-none focus:border-charcoal"
          />
        </label>
        <label className="block">
          <span className="block text-xs uppercase tracking-[0.22em] text-ink/60 mb-1">
            Password
          </span>
          <input
            type="password"
            required
            className="w-full border border-mist rounded-md px-4 py-3 text-sm bg-cream focus:outline-none focus:border-charcoal"
          />
        </label>
        <button
          type="button"
          className="w-full bg-charcoal text-cream py-3 text-xs uppercase tracking-[0.22em] hover:bg-rose transition-colors"
        >
          Accedi
        </button>
        <p className="text-xs text-center text-ink/60">
          Non hai un account?{" "}
          <Link href="#" className="underline">
            Creane uno
          </Link>
        </p>
      </form>

      <div className="mt-10 rounded-md border border-mist p-4 text-xs text-ink/60">
        Demo: questa pagina è pronta per essere collegata a Shopify Customer
        Accounts, Clerk o Auth0. Collega il tuo provider preferito nel file{" "}
        <code>src/app/account/page.tsx</code>.
      </div>
    </div>
  );
}
