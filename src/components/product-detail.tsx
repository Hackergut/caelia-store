"use client";

import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { formatMoney } from "@/lib/format";
import type { Product } from "@/lib/types";

export function ProductDetail({ product }: { product: Product }) {
  const [variantId, setVariantId] = useState(product.variants[0].id);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const { add } = useCart();

  const variant =
    product.variants.find((v) => v.id === variantId) ?? product.variants[0];

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-10 pb-24 grid lg:grid-cols-2 gap-12 lg:gap-20">
      {/* Gallery */}
      <div className="flex flex-col gap-4">
        <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-cream-deep">
          <Image
            src={product.images[activeImage].src}
            alt={product.images[activeImage].alt}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="grid grid-cols-4 gap-3">
          {product.images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setActiveImage(i)}
              className={`relative aspect-square overflow-hidden rounded-md bg-cream-deep border ${
                i === activeImage ? "border-charcoal" : "border-transparent"
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

        <p className="mt-8 font-serif text-3xl">
          {formatMoney(variant.price)}
        </p>

        <div className="mt-10">
          <p className="text-xs uppercase tracking-[0.22em] text-ink/60 mb-3">
            Colore
          </p>
          <div className="flex flex-wrap gap-3">
            {product.variants.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setVariantId(v.id)}
                className={`flex items-center gap-3 border rounded-full pl-2 pr-4 py-2 text-xs uppercase tracking-[0.18em] transition-colors ${
                  v.id === variantId
                    ? "border-charcoal"
                    : "border-mist hover:border-charcoal/60"
                }`}
              >
                <span
                  className="h-4 w-4 rounded-full ring-1 ring-charcoal/10"
                  style={{ background: v.swatch ?? "#cfc7be" }}
                />
                {v.title.replace(product.title, "").trim() || v.title}
              </button>
            ))}
          </div>
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
            onClick={() => add(product, variant, quantity)}
            className="flex-1 bg-charcoal text-cream py-3 text-xs uppercase tracking-[0.22em] hover:bg-rose transition-colors"
          >
            Aggiungi al carrello
          </button>
        </div>

        <ul className="mt-10 space-y-3 text-sm text-ink/80">
          {product.features.map((f) => (
            <li key={f} className="flex gap-3">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-rose" />
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
