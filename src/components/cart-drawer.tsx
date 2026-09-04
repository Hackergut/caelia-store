"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/lib/cart-context";
import { formatMoney } from "@/lib/format";
import { Price } from "@/lib/currency";

export function CartDrawer() {
  const { isOpen, close, lines, subtotal, setQuantity, remove } = useCart();

  // Lock body scroll when open
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  return (
    <>
      <div
        aria-hidden={!isOpen}
        className={`fixed inset-0 z-50 bg-night/40 transition-opacity duration-[var(--dur-medium)] ease-[var(--ease-out)] ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={close}
      />
      <aside
        role="dialog"
        aria-label="Carrello"
        aria-hidden={!isOpen}
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-md bg-cream shadow-2xl transition-transform duration-[var(--dur-slow)] ease-[var(--ease-drawer)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-mist/60">
          <p className="font-serif text-xl" style={{ color: "var(--color-burgundy-deep)" }}>Il tuo carrello</p>
          <button
            type="button"
            onClick={close}
            aria-label="Chiudi carrello"
            className="text-xs uppercase tracking-[0.18em]"
          >
            Chiudi
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex h-[70vh] flex-col items-center justify-center px-6 text-center">
            <p className="font-serif text-2xl" style={{ color: "var(--color-cacao)" }}>Il carrello è vuoto.</p>
            <p className="mt-3 text-sm text-ink/70 max-w-xs">
              Apri il Beauty Mirror Case, prova i colori, scegli la tua tonalità.
            </p>
            <Link
              href="/products"
              onClick={close}
              className="mt-6 inline-flex items-center justify-center bg-burgundy text-cream px-6 py-3 text-xs uppercase tracking-[0.22em]"
            >
              Scopri la collezione
            </Link>
          </div>
        ) : (
          <div className="flex h-[calc(100%-8rem)] flex-col">
            <ul className="flex-1 overflow-y-auto px-6 py-5 divide-y divide-mist/60">
              {lines.map((line) => (
                <li key={line.variantId} className="flex gap-4 py-5">
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-md bg-cream-deep">
                    <Image
                      src={line.image}
                      alt={line.productTitle}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <p className="font-serif text-lg leading-tight">
                      {line.productTitle}
                    </p>
                    <p className="text-xs uppercase tracking-[0.18em] text-ink/60">
                      {line.variantTitle}
                    </p>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="inline-flex items-center border border-mist rounded-full">
                        <button
                          className="h-7 w-7 text-sm"
                          aria-label="Diminuisci quantita"
                          onClick={() =>
                            setQuantity(line.variantId, line.quantity - 1)
                          }
                        >
                          −
                        </button>
                        <span className="w-7 text-center text-sm">
                          {line.quantity}
                        </span>
                        <button
                          className="h-7 w-7 text-sm"
                          aria-label="Aumenta quantita"
                          onClick={() =>
                            setQuantity(line.variantId, line.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                      <p className="text-sm">
                        {formatMoney({
                          amount: (
                            Number(line.price.amount) * line.quantity
                          ).toFixed(2),
                          currencyCode: line.price.currencyCode,
                        })}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => remove(line.variantId)}
                    className="self-start text-xs uppercase tracking-[0.18em] text-ink/60 hover:text-burgundy"
                    aria-label="Rimuovi dal carrello"
                  >
                    Rimuovi
                  </button>
                </li>
              ))}
            </ul>

            <div className="border-t border-mist/60 px-6 py-5 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="uppercase tracking-[0.18em]">Subtotale</span>
                <span className="font-serif text-xl">
                  {formatMoney(subtotal)}
                </span>
              </div>
              <p className="text-xs text-ink/60">
                Spedizione calcolata al checkout. Resi gratuiti entro 30 giorni.
              </p>
              <Link
                href="/checkout"
                onClick={close}
                className="block w-full text-center bg-burgundy text-cream py-3 text-xs uppercase tracking-[0.22em] hover:bg-burgundy-deep transition-colors btn-press"
              >
                Procedi al checkout
              </Link>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
