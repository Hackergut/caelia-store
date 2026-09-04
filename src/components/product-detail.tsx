"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart-context";
import { WishlistButton } from "@/components/wishlist-button";
import { InventoryBadge } from "@/components/inventory-badge";
import { BackInStockButton } from "@/components/back-in-stock";
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
  const [i, setI] = useState(0);
  const [openDesc, setOpenDesc] = useState(true);
  const { add } = useCart();
  const variant = product.variants[0];
  const photos = product.images;
  const n = photos.length;
  const img = photos[i] ?? photos[0];

  useEffect(() => {
    setI(0);
    events.viewItem({
      id: product.id,
      title: product.title,
      price: Number(variant.price.amount),
      currency: variant.price.currencyCode,
    });
    pushRecentlyViewed(product.handle);
  }, [product.id, product.handle, product.title, variant.price.amount, variant.price.currencyCode]);

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

  function prev() {
    setI((x) => (x - 1 + n) % n);
  }
  function next() {
    setI((x) => (x + 1) % n);
  }

  return (
    <div className="mx-auto max-w-6xl px-5 lg:px-10 pt-8 pb-24 grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-16">
      <div>
        <div className="relative aspect-square bg-cream-deep">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img.src}
            alt={img.alt}
            className="h-full w-full object-cover cursor-pointer"
            onClick={next}
          />
          {n > 1 && (
            <>
              <button
                type="button"
                onClick={prev}
                className="absolute left-3 top-1/2 z-10 -translate-y-1/2 h-10 w-10 bg-cream/90 text-ink"
                aria-label="Foto precedente"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={next}
                className="absolute right-3 top-1/2 z-10 -translate-y-1/2 h-10 w-10 bg-cream/90 text-ink"
                aria-label="Foto successiva"
              >
                ›
              </button>
            </>
          )}
        </div>
        <div className="mt-3 grid grid-cols-5 gap-2">
          {photos.map((thumb, idx) => (
            <button
              key={thumb.src}
              type="button"
              onClick={() => setI(idx)}
              className={`aspect-square overflow-hidden ${
                idx === i ? "ring-2 ring-burgundy" : "ring-1 ring-mist/40"
              }`}
              aria-label={`Foto ${idx + 1}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={thumb.src} alt="" className="h-full w-full object-cover pointer-events-none" />
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-[11px] uppercase tracking-[0.28em] text-ink/50">
          CAELIA · Beauty accessory
        </p>
        <h1 className="mt-3 text-[2rem] lg:text-[2.6rem] leading-[1.12] font-light">
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

        <div className="mt-8 flex items-stretch gap-3">
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
          <button
            type="button"
            onClick={addToCart}
            disabled={!variant.available}
            className="flex-1 bg-burgundy text-cream py-3 text-[11px] uppercase tracking-[0.22em] hover:bg-burgundy-deep disabled:bg-ink/30"
          >
            {variant.available ? "Aggiungi al carrello" : "Esaurito"}
          </button>
          <WishlistButton handle={product.handle} />
        </div>

        <p className="mt-4 text-[11px] uppercase tracking-[0.16em] text-ink/45">
          Spedizione gratuita oltre 60€ · Resi 30 giorni
        </p>

        <div className="mt-10 border-t border-mist/70">
          <button
            type="button"
            className="flex w-full items-center justify-between py-4 text-left text-xs uppercase tracking-[0.2em]"
            onClick={() => setOpenDesc((v) => !v)}
          >
            Descrizione
            <span>{openDesc ? "−" : "+"}</span>
          </button>
          {openDesc && (
            <p className="pb-5 text-[15px] leading-relaxed text-ink/80">
              {product.description}
            </p>
          )}
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 border-t border-mist/70 py-5 text-sm">
            <DetailItem label="Materiale" value={product.details.material} />
            <DetailItem label="Dimensioni" value={product.details.dimensions} />
            <DetailItem label="Peso" value={product.details.weight} />
            <DetailItem label="Prodotto in" value={product.details.madeIn} />
          </div>
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
