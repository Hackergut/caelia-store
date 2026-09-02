import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatMoney } from "@/lib/format";

export function ProductCard({ product }: { product: Product }) {
  const variant = product.variants[0];
  const colors = product.variants
    .map((v) => v.swatch)
    .filter((c): c is string => Boolean(c));

  return (
    <Link
      href={`/products/${product.handle}`}
      className="group block img-fade-in"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-cream-deep">
        <Image
          src={product.images[0].src}
          alt={product.images[0].alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {colors.length > 0 && (
          <div className="absolute bottom-4 left-4 flex gap-1.5">
            {colors.map((c) => (
              <span
                key={c}
                className="h-3.5 w-3.5 rounded-full ring-1 ring-charcoal/10"
              style={{ background: c }}
              />
            ))}
          </div>
        )}
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <p className="font-serif text-lg leading-snug">{product.title}</p>
          <p className="mt-1 text-xs uppercase tracking-[0.18em] text-ink/60">
            {variant.title}
          </p>
        </div>
        <p className="text-sm font-medium">
          {formatMoney(variant.price)}
        </p>
      </div>
    </Link>
  );
}
