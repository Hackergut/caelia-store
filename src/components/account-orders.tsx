"use client";

import Link from "next/link";
import { useOrders } from "@/lib/orders-history";
import { Price } from "@/lib/currency";

export function AccountOrders() {
  const orders = useOrders();

  if (orders.length === 0) {
    return (
      <div className="mt-6 rounded-md bg-cream-deep p-6 text-sm">
        <p className="font-serif text-lg">Nessun ordine ancora.</p>
        <p className="mt-1 text-ink/70">
          Quando completi un checkout, il riepilogo compare qui.
        </p>
        <Link
          href="/products"
          className="mt-4 inline-flex items-center justify-center bg-charcoal text-cream px-6 py-3 text-xs uppercase tracking-[0.22em] hover:bg-rose transition-colors"
        >
          Esplora la collezione
        </Link>
      </div>
    );
  }

  return (
    <ul className="mt-6 divide-y divide-mist/60 border-y border-mist/60">
      {orders.map((o) => (
        <li
          key={o.orderId}
          className="flex flex-col gap-2 py-5 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p className="font-serif text-lg">
              {o.orderId}
            </p>
            <p className="text-xs uppercase tracking-[0.18em] text-ink/60">
              {new Date(o.placedAt).toLocaleDateString("it-IT", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}{" "}
              · {o.items} {o.items === 1 ? "articolo" : "articoli"}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Price
              amountEUR={o.total}
              className="text-sm"
            />
            <Link
              href={`/ordini/${o.orderId}`}
              className="text-xs uppercase tracking-[0.22em] nav-link"
            >
              Stato
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}