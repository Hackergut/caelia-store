"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart-context";
import { formatMoney } from "@/lib/format";
import { Price } from "@/lib/currency";
import { LockIcon, PaymentIcons, TruckIcon, RefreshIcon } from "@/components/trust-icons";

export function CartView() {
  const { lines, subtotal, setQuantity, remove, clear } = useCart();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => setHydrated(true), []);

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-16 pb-24">
        <p className="text-ink/60">Caricamento...</p>
      </div>
    );
  }

  const shipping =
    Number(subtotal.amount) === 0
      ? 0
      : Number(subtotal.amount) >= 60
        ? 0
        : 4.9;
  const total = Number(subtotal.amount) + shipping;

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-12 pb-24">
      <p className="text-xs uppercase tracking-[0.32em] text-ink/60">Carrello</p>
      <h1 className="mt-4 font-serif text-5xl leading-[1.05]">
        Il tuo Beauty Mirror Case.
      </h1>

      {lines.length === 0 ? (
        <div className="mt-16 rounded-md bg-cream-deep p-12 text-center">
          <p className="font-serif text-2xl">Il carrello è vuoto.</p>
          <p className="mt-3 text-ink/70 max-w-md mx-auto">
            Apri la collezione e scegli la tua tonalità.
          </p>
          <Link
            href="/products"
            className="mt-6 inline-flex items-center justify-center bg-burgundy text-cream px-8 py-4 text-xs uppercase tracking-[0.22em] hover:bg-burgundy-deep transition-colors btn-press"
          >
            Esplora la collezione
          </Link>
        </div>
      ) : (
        <div className="mt-12 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <ul className="divide-y divide-mist/60 border-y border-mist/60">
            {lines.map((line) => (
              <li
                key={line.variantId}
                className="flex flex-col sm:flex-row gap-4 py-6"
              >
                <div className="relative h-28 w-28 sm:h-32 sm:w-32 shrink-0 overflow-hidden rounded-md bg-cream-deep">
                  <Image
                    src={line.image}
                    alt={line.productTitle}
                    fill
                    sizes="128px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col">
                  <Link
                    href={`/products/${line.productHandle}`}
                    className="font-serif text-xl leading-tight hover:underline"
                  >
                    {line.productTitle}
                  </Link>
                  <p className="text-xs uppercase tracking-[0.18em] text-ink/60">
                    {line.variantTitle}
                  </p>
                  <div className="mt-auto flex items-center justify-between gap-3">
                    <div className="inline-flex items-center border border-mist rounded-full">
                      <button
                        type="button"
                        className="h-9 w-9 text-sm"
                        aria-label="Diminuisci quantita"
                        onClick={() =>
                          setQuantity(line.variantId, line.quantity - 1)
                        }
                      >
                        −
                      </button>
                      <span className="w-9 text-center text-sm">
                        {line.quantity}
                      </span>
                      <button
                        type="button"
                        className="h-9 w-9 text-sm"
                        aria-label="Aumenta quantita"
                        onClick={() =>
                          setQuantity(line.variantId, line.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                    <Price
                      amountEUR={Number(line.price.amount) * line.quantity}
                      className="text-sm"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => remove(line.variantId)}
                  className="self-start text-xs uppercase tracking-[0.18em] text-ink/60 hover:text-burgundy"
                >
                  Rimuovi
                </button>
              </li>
            ))}
          </ul>

          <aside className="space-y-6 self-start lg:sticky lg:top-28">
            <div className="bg-cream-deep rounded-md p-6">
              <p className="font-serif text-2xl">Riepilogo</p>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt>Subtotale</dt>
                  <dd>{formatMoney(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Spedizione</dt>
                  <dd>
                    {shipping === 0 ? "Gratuita" : formatMoney({ amount: shipping.toFixed(2), currencyCode: "EUR" })}
                  </dd>
                </div>
                <div className="flex justify-between border-t border-mist/60 pt-2 mt-2">
                  <dt className="font-serif text-lg">Totale</dt>
                  <dd className="font-serif text-xl">
                    {formatMoney({ amount: total.toFixed(2), currencyCode: "EUR" })}
                  </dd>
                </div>
              </dl>
              <Link
                href="/checkout"
                className="mt-6 block w-full text-center bg-burgundy text-cream py-3 text-xs uppercase tracking-[0.22em] hover:bg-burgundy-deep transition-colors btn-press"
              >
                Procedi al checkout
              </Link>
              <button
                type="button"
                onClick={clear}
                className="mt-3 block w-full text-center text-xs uppercase tracking-[0.18em] text-ink/60 hover:text-burgundy"
              >
                Svuota carrello
              </button>
              <p className="mt-4 inline-flex items-center gap-2 text-xs text-ink/60">
                <LockIcon className="h-4 w-4" /> Pagamento sicuro
              </p>
            </div>
            <div className="rounded-md border border-mist p-6 space-y-3 text-xs text-ink/70">
              <p className="inline-flex items-center gap-2">
                <TruckIcon className="h-4 w-4" /> Spedizione gratuita sopra € 60
              </p>
              <p className="inline-flex items-center gap-2">
                <RefreshIcon className="h-4 w-4" /> Resi gratuiti entro 30 giorni
              </p>
              <p className="inline-flex items-center gap-2">
                <LockIcon className="h-4 w-4" /> Crittografia SSL
              </p>
            </div>
            <PaymentIcons />
          </aside>
        </div>
      )}
    </div>
  );
}
