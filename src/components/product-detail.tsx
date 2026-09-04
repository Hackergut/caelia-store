"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart-context";
import { WishlistButton } from "@/components/wishlist-button";
import { InventoryBadge } from "@/components/inventory-badge";
import { StickyAddToCart } from "@/components/sticky-add-to-cart";
import { BackInStockButton } from "@/components/back-in-stock";
import { Caelia3DFrame } from "@/components/caelia-3d-frame";
import { events } from "@/lib/track";
import { pushRecentlyViewed } from "@/lib/recently-viewed";
import { formatMoney } from "@/lib/format";
import { Price } from "@/lib/currency";
import type { Product } from "@/lib/types";

export function ProductDetail({
  product,
  colorSiblings = [],
}: {
  product: Product;
  colorSiblings?: Product[];
}) {
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const { add } = useCart();

  // Each Shopify product here is a single colour with a single variant.
  const variant = product.variants[0];
  const variantImages = product.images.length > 0 ? product.images : [
    { src: "/products/caelia-burgundy-front.jpg", alt: product.title },
  ];

  // Track ViewContent on mount
  useEffect(() => {
    events.viewItem({
      id: product.id,
      title: product.title,
      price: Number(variant.price.amount),
      currency: variant.price.currencyCode,
    });
    pushRecentlyViewed(product.handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.id, variant.id]);

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-10 pb-32 lg:pb-24 grid lg:grid-cols-2 gap-12 lg:gap-20">
      {/* 3D hero + 2D gallery fallback */}
      <Caelia3DFrame product={product} variant={variant} />
      <div className="flex flex-col gap-4">
        <div
          className="group relative aspect-[4/5] overflow-hidden rounded-md bg-cream-deep cursor-zoom-in"
          onMouseMove={(e) => {
            const target = e.currentTarget;
            const rect = target.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            target.style.setProperty("--zoom-x", `${x}%`);
            target.style.setProperty("--zoom-y", `${y}%`);
          }}
        >
          <Image
            src={variantImages[activeImage % variantImages.length].src}
            alt={variantImages[activeImage % variantImages.length].alt}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover transition-transform duration-[var(--dur-slow)] ease-[var(--ease-out)] group-hover:scale-[2] [transform-origin:var(--zoom-x)_var(--zoom-y)]"
          />
        </div>
        <div className="grid grid-cols-4 gap-3">
          {variantImages.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setActiveImage(i)}
              className={`relative aspect-square overflow-hidden rounded-md bg-cream-deep border ${
                i === activeImage ? "border-burgundy" : "border-transparent"
              }`}
              aria-label={`Mostra immagine ${i + 1}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="120px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="lg:sticky lg:top-28 self-start">
        <p className="text-xs uppercase tracking-[0.32em] text-ink/60">
          {product.productType}
        </p>
        <h1 className="mt-3 font-serif text-4xl lg:text-5xl leading-[1.1]">
          {product.title}
        </h1>
        <p className="mt-6 text-lg text-ink/80 leading-relaxed">
          {product.description}
        </p>

        <Price amountEUR={Number(variant.price.amount)} className="mt-8 font-serif text-3xl" />

        <div className="mt-3">
          <InventoryBadge sku={variant.sku} />
        </div>
        {!variant.available && (
          <BackInStockButton sku={variant.sku} variantTitle={variant.title} />
        )}

        <div className="mt-10">
          <p className="text-xs uppercase tracking-[0.22em] text-ink/60 mb-3">
            Colore
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="flex items-center gap-3 border border-burgundy rounded-full pl-2 pr-4 py-2 text-xs uppercase tracking-[0.18em] chip">
              <span
                className="h-4 w-4 rounded-full ring-1 ring-burgundy/10"
                style={{ background: variant.swatch ?? "#cfc7be" }}
              />
              {variant.title}
            </span>
          </div>
          {colorSiblings.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-3">
              {colorSiblings.map((sibling) => {
                const siblingVariant = sibling.variants[0];
                return (
                  <Link
                    key={sibling.handle}
                    href={`/products/${sibling.handle}`}
                    className="flex items-center gap-3 border border-mist rounded-full pl-2 pr-4 py-2 text-xs uppercase tracking-[0.18em] transition-colors chip hover:border-burgundy/60"
                  >
                    <span
                      className="h-4 w-4 rounded-full ring-1 ring-burgundy/10"
                      style={{ background: siblingVariant?.swatch ?? "#cfc7be" }}
                    />
                    {siblingVariant?.title ?? sibling.title}
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        <div className="mt-8 flex items-center gap-4">
          <div className="inline-flex items-center border border-mist rounded-full">
            <button
              type="button"
              className="h-11 w-11"
              aria-label="Diminuisci quantita"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            >
              −
            </button>
            <span className="w-10 text-center">{quantity}</span>
            <button
              type="button"
              className="h-11 w-11"
              aria-label="Aumenta quantita"
              onClick={() => setQuantity((q) => q + 1)}
            >
              +
            </button>
          </div>
          <button
            type="button"
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
            disabled={!variant.available}
            className="flex-1 bg-burgundy text-cream py-3 text-xs uppercase tracking-[0.22em] hover:bg-burgundy-deep transition-colors btn-press disabled:bg-ink/30 disabled:cursor-not-allowed"
          >
            {variant.available ? "Aggiungi al carrello" : "Esaurito"}
          </button>
          <WishlistButton handle={product.handle} />
        </div>

        <ul className="mt-10 space-y-3 text-sm text-ink/80">
          {product.features.map((f) => (
            <li key={f} className="flex gap-3">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-burgundy" />
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-4 text-sm border-t border-mist/60 pt-6">
          <DetailItem label="Materiale" value={product.details.material} />
          <DetailItem label="Dimensioni" value={product.details.dimensions} />
          <DetailItem label="Peso" value={product.details.weight} />
          <DetailItem label="Prodotto in" value={product.details.madeIn} />
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs uppercase tracking-[0.18em] text-ink/60">
          <span>· Spedizione gratuita oltre 60€</span>
          <span>· Resi gratuiti 30 giorni</span>
          <span>· Spedizione tracciata</span>
        </div>
      </div>
    </div>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.22em] text-ink/60">{label}</p>
      <p className="mt-1">{value}</p>
    </div>
  );
}
