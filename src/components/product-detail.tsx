"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart-context";
import { WishlistButton } from "@/components/wishlist-button";
import { InventoryBadge } from "@/components/inventory-badge";
import { BackInStockButton } from "@/components/back-in-stock";
import { ProductCarousel } from "@/components/product-carousel";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { events } from "@/lib/track";
import { pushRecentlyViewed } from "@/lib/recently-viewed";
import { Price } from "@/lib/currency";
import type { Product } from "@/lib/types";

const BENEFITS = [
  "Ritocco in qualsiasi momento, con specchio integrato",
  "Tasca che tiene matite e gloss al sicuro",
  "Protegge il lip combo da urti e tappi persi",
  "Pensato per ogni borsa, anche la più mini",
];

const COLORS = [
  { handle: "burgundy-caelia", label: "Burgundy", hex: "#4a0e16" },
  { handle: "cacao-caelia", label: "Cacao", hex: "#7b5644" },
  { handle: "crema-caelia", label: "Crema", hex: "#efe5d8" },
];

export function ProductDetail({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { add } = useCart();
  const variant = product.variants[0];

  useEffect(() => {
    events.viewItem({
      id: product.id,
      title: product.title,
      price: Number(variant.price.amount),
      currency: variant.price.currencyCode,
    });
    pushRecentlyViewed(product.handle);
  }, [
    product.id,
    product.handle,
    product.title,
    variant.price.amount,
    variant.price.currencyCode,
  ]);

  function addToCart() {
    add(product, variant, quantity);
    events.addToCart({
      id: product.id,
      title: product.title,
      price: Number(variant.price.amount),
      currency: variant.price.currencyCode,
      quantity,
    });
  }

  return (
    <div className="shell grid max-w-6xl gap-8 pt-6 pb-28 md:pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pt-8">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <ProductCarousel images={product.images} id={product.handle} />
      </div>

      <div>
        <p className="text-[11px] uppercase tracking-[0.28em] text-ink/50">
          CAELIA · Beauty accessory
        </p>
        <h1 className="mt-3 text-[1.65rem] font-light leading-[1.15] sm:text-[2rem] lg:text-[2.6rem]">
          {product.title}
        </h1>
        <p className="mt-3 text-sm text-ink/55">5.000+ venduti in tutto il mondo</p>

        <ul className="mt-6 space-y-2.5 text-[15px] text-ink/85">
          {BENEFITS.map((b) => (
            <li key={b} className="flex gap-3">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-burgundy" />
              {b}
            </li>
          ))}
        </ul>

        <Price amountEUR={Number(variant.price.amount)} className="mt-8 text-2xl font-light" />
        <div className="mt-2">
          <InventoryBadge sku={variant.sku} />
        </div>
        {!variant.available && (
          <BackInStockButton sku={variant.sku} variantTitle={variant.title} />
        )}

        <div className="mt-8">
          <p className="text-[11px] uppercase tracking-[0.22em] text-ink/55 mb-3">
            Colore
          </p>
          <div className="flex gap-3">
            {COLORS.map((c) => (
              <Link
                key={c.handle}
                href={`/products/${c.handle}`}
                title={c.label}
                className={`h-9 w-9 rounded-full ring-offset-2 ring-offset-cream ${
                  product.handle === c.handle ? "ring-2 ring-burgundy" : "ring-1 ring-mist"
                }`}
                style={{ background: c.hex }}
              />
            ))}
          </div>
          <p className="mt-2 text-xs text-ink/50">{product.title}</p>
        </div>

        <div className="mt-8 flex flex-wrap items-stretch gap-3">
          <div className="inline-flex items-center border border-mist">
            <button
              type="button"
              className="h-12 w-11 text-lg"
              aria-label="Diminuisci quantità"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            >
              −
            </button>
            <span className="w-8 text-center text-sm">{quantity}</span>
            <button
              type="button"
              className="h-12 w-11 text-lg"
              aria-label="Aumenta quantità"
              onClick={() => setQuantity((q) => q + 1)}
            >
              +
            </button>
          </div>
          <Button
            type="button"
            onClick={addToCart}
            disabled={!variant.available}
            className="min-w-[12rem] flex-1"
          >
            {variant.available ? "Aggiungi al carrello" : "Esaurito"}
          </Button>
          <WishlistButton handle={product.handle} />
        </div>

        <p className="mt-4 text-[11px] uppercase tracking-[0.16em] text-ink/45">
          Spedizione gratuita oltre 60€ · Resi 30 giorni
        </p>

        <div className="mt-10 border-t border-mist/70">
          <Accordion type="single" collapsible defaultValue="desc">
            <AccordionItem value="desc" className="border-b-0">
              <AccordionTrigger>Descrizione</AccordionTrigger>
              <AccordionContent>{product.description}</AccordionContent>
            </AccordionItem>
          </Accordion>
          <div className="grid grid-cols-1 gap-x-6 gap-y-4 border-t border-mist/70 py-5 text-sm sm:grid-cols-2">
            <DetailItem label="Materiale" value={product.details.material} />
            <DetailItem label="Dimensioni" value={product.details.dimensions} />
            <DetailItem label="Peso" value={product.details.weight} />
            <DetailItem label="Prodotto in" value={product.details.madeIn} />
          </div>
        </div>
      </div>

      {/* Mobile sticky buy bar */}
      <div className="buybar-mobile fixed inset-x-0 bottom-0 z-[280] border-t border-mist/70 bg-cream/95 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur md:hidden">
        <div className="flex items-center gap-3">
          <div className="min-w-0">
            <p className="truncate text-[11px] uppercase tracking-[0.18em] text-ink/55">
              {product.title}
            </p>
            <Price
              amountEUR={Number(variant.price.amount)}
              className="text-base font-light"
            />
          </div>
          <Button
            type="button"
            onClick={addToCart}
            disabled={!variant.available}
            className="ml-auto flex-1"
          >
            {variant.available ? "Aggiungi" : "Esaurito"}
          </Button>
        </div>
      </div>
    </div>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.18em] text-ink/50">{label}</p>
      <p className="mt-1 text-ink/80">{value}</p>
    </div>
  );
}
