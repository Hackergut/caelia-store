"use client";

import { useCart } from "@/lib/cart-context";
import { events } from "@/lib/track";
import { Price } from "@/lib/currency";
import type { Product, ProductVariant } from "@/lib/types";

export function StickyAddToCart({
  product,
  variant,
  quantity,
}: {
  product: Product;
  variant: ProductVariant;
  quantity: number;
}) {
  const { add } = useCart();

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-mist bg-cream/95 px-4 py-3 backdrop-blur-md lg:hidden">
      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs uppercase tracking-[0.18em] text-ink/60">
            {variant.title}
          </p>
          <Price amountEUR={Number(variant.price.amount)} className="font-serif text-lg" />
        </div>
        <button
          type="button"
          disabled={!variant.available}
          onClick={() => {
            add(product, variant, quantity);
            events.addToCart({
              id: product.id,
              title: product.title,
              price: Number(variant.price.amount),
              currency: variant.price.currencyCode,
              quantity,
            });
          }}
          className="inline-flex items-center justify-center bg-burgundy text-cream px-5 py-3 text-xs uppercase tracking-[0.22em] hover:bg-burgundy-deep transition-colors btn-press disabled:bg-ink/30"
        >
          {variant.available ? "Aggiungi" : "Esaurito"}
        </button>
      </div>
    </div>
  );
}