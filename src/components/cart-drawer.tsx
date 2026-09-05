"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatMoney } from "@/lib/format";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export function CartDrawer() {
  const { isOpen, close, lines, subtotal, setQuantity, remove } = useCart();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <Sheet open={isOpen} onOpenChange={(v) => !v && close()}>
      <SheetContent
        side={isDesktop ? "right" : "bottom"}
        className="md:max-w-md"
        aria-label="Carrello"
      >
        <SheetHeader>
          <SheetTitle>Il tuo carrello</SheetTitle>
          <SheetDescription className="sr-only">
            Articoli attualmente nel carrello
          </SheetDescription>
        </SheetHeader>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
            <p className="font-serif text-2xl">Il carrello è vuoto.</p>
            <p className="mt-3 max-w-xs text-sm text-ink/70">
              Apri il Beauty Mirror Case, prova i colori, scegli la tua tonalità.
            </p>
            <Link
              href="/products"
              onClick={close}
              className="mt-6 inline-flex min-h-12 items-center justify-center bg-charcoal px-6 text-xs uppercase tracking-[0.22em] text-cream"
            >
              Scopri la collezione
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-mist/60 overflow-y-auto overscroll-contain px-5 py-4 md:px-6 md:py-5">
              {lines.map((line) => (
                <li key={line.variantId} className="flex gap-4 py-4 md:py-5">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-cream-deep md:h-24 md:w-24">
                    <Image
                      src={line.image}
                      alt={line.productTitle}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate font-serif text-base leading-tight md:text-lg">
                          {line.productTitle}
                        </p>
                        <p className="mt-0.5 text-[10px] uppercase tracking-[0.18em] text-ink/60">
                          {line.variantTitle}
                        </p>
                      </div>
                      <button
                        onClick={() => remove(line.variantId)}
                        className="shrink-0 text-[10px] uppercase tracking-[0.18em] text-ink/60 hover:text-burgundy"
                        aria-label="Rimuovi dal carrello"
                      >
                        Rimuovi
                      </button>
                    </div>
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <div className="inline-flex items-center rounded-full border border-mist">
                        <button
                          className="h-9 w-9 text-sm"
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
                          className="h-9 w-9 text-sm"
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
                </li>
              ))}
            </ul>

            <SheetFooter className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="uppercase tracking-[0.18em]">Subtotale</span>
                <span className="text-xl">{formatMoney(subtotal)}</span>
              </div>
              <p className="text-xs text-ink/60">
                Spedizione calcolata al checkout. Resi gratuiti entro 30 giorni.
              </p>
              <Link
                href="/checkout"
                onClick={close}
                className="btn-press flex min-h-12 w-full items-center justify-center bg-charcoal text-xs uppercase tracking-[0.22em] text-cream transition-colors hover:bg-burgundy"
              >
                Procedi al checkout
              </Link>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
