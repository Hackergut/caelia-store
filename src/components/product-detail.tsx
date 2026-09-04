"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart-context";
import { WishlistButton } from "@/components/wishlist-button";
import { InventoryBadge } from "@/components/inventory-badge";
import { StickyAddToCart } from "@/components/sticky-add-to-cart";
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

const CHAOS = [
  {
    title: "Niente più scavare in fondo alla borsa",
    body: "Tutto in un astuccio sottile. Zero caos. Matita, gloss e specchio sempre nello stesso posto.",
  },
  {
    title: "Mai più senza specchio",
    body: "Ritocco in auto, in fila, in ascensore. Lo specchio è già nel case.",
  },
  {
    title: "Niente punte spezzate",
    body: "Le matite restano protette, pronte, con il tappo al suo posto.",
  },
  {
    title: "Trenta secondi e sei fuori",
    body: "Non serve un beauty intero. Serve il labbro. Un case, un gesto, si riparte.",
  },
];

export function ProductDetail({ product }: { product: Product }) {
  const [variantId, setVariantId] = useState(product.variants[0].id);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [openDesc, setOpenDesc] = useState(true);
  const { add } = useCart();

  useEffect(() => {
    setActiveImage(0);
  }, [variantId]);

  const variant =
    product.variants.find((v) => v.id === variantId) ?? product.variants[0];

  const variantImages = product.images;

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

  const img = variantImages[activeImage % variantImages.length];

  return (
    <>
      <div className="mx-auto max-w-6xl px-5 lg:px-10 pt-8 pb-20 grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-16">
        <div>
          <div className="relative aspect-square overflow-hidden bg-cream-deep">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              priority
              unoptimized
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="mt-3 grid grid-cols-5 gap-2">
            {variantImages.slice(0, 10).map((thumb, i) => (
              <button
                key={thumb.src + i}
                type="button"
                onClick={() => setActiveImage(i)}
                className={`relative aspect-square overflow-hidden bg-cream-deep ring-1 ${
                  i === activeImage ? "ring-burgundy" : "ring-transparent"
                }`}
                aria-label={`Immagine ${i + 1}`}
              >
                <Image src={thumb.src} alt="" fill sizes="80px" unoptimized className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="lg:sticky lg:top-28 self-start">
          <p className="text-[11px] uppercase tracking-[0.28em] text-ink/50">
            CAELIA · Beauty accessory
          </p>
          <h1 className="mt-3 font-serif text-[2rem] lg:text-[2.6rem] leading-[1.12]">
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

          <Price
            amountEUR={Number(variant.price.amount)}
            className="mt-8 font-serif text-2xl"
          />
          <div className="mt-2">
            <InventoryBadge sku={variant.sku} />
          </div>
          {!variant.available && (
            <BackInStockButton sku={variant.sku} variantTitle={variant.title} />
          )}

          <div className="mt-8">
            <p className="text-[11px] uppercase tracking-[0.22em] text-ink/55 mb-3">
              Colore — {variant.title}
            </p>
            <div className="flex gap-3">
              {product.variants.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setVariantId(v.id)}
                  className={`h-9 w-9 rounded-full ring-offset-2 ring-offset-cream ${
                    v.id === variantId ? "ring-2 ring-burgundy" : "ring-1 ring-mist"
                  }`}
                  style={{ background: v.swatch ?? "#cfc7be" }}
                  aria-label={v.title}
                />
              ))}
            </div>
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
              className="flex-1 bg-burgundy text-cream py-3 text-[11px] uppercase tracking-[0.22em] hover:bg-burgundy-deep transition-colors btn-press disabled:bg-ink/30"
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

      <section className="bg-cream-deep">
        <div className="mx-auto max-w-6xl px-5 lg:px-10 py-16 lg:py-24">
          <p className="text-[11px] uppercase tracking-[0.28em] text-ink/50">
            Il piccolo caos, risolto
          </p>
          <h2 className="mt-3 font-serif text-3xl lg:text-4xl leading-tight">
            Questo risolve il mio…
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {CHAOS.map((c) => (
              <div key={c.title} className="border-t border-ink/10 pt-5">
                <h3 className="font-serif text-xl">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <StickyAddToCart product={product} variant={variant} quantity={quantity} />
    </>
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
