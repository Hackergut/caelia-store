import type { Metadata } from "next";
import Link from "next/link";
import { AccountOrders } from "@/components/account-orders";

export const metadata: Metadata = {
  title: "Account",
  description: "Accedi al tuo account CAELIA.",
};

export default function AccountPage() {
  return (
    <div className="shell max-w-2xl pt-16 pb-24">
      <h1 className="font-serif text-4xl">Il mio account</h1>
      <p className="mt-3 text-ink/70">
        Ordini recenti. Per il profilo completo collega Shopify Customer
        Accounts.
      </p>
      <p className="mt-4">
        <Link href="/login" className="text-xs uppercase tracking-[0.18em] nav-link">
          Accedi →
        </Link>
      </p>
      <h2 className="mt-12 font-serif text-2xl">Ordini recenti</h2>
      <AccountOrders />
    </div>
  );
}
