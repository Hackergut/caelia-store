"use client";

import dynamic from "next/dynamic";
import { CAELIA_VARIANTS, type CaeliaVariant } from "@/lib/caelia/variants";
import type { Product, ProductVariant } from "@/lib/types";

const CaeliaViewer = dynamic(() => import("./caelia-viewer"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 grid place-items-center bg-cream-deep/40">
      <div className="flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-ink/60">
        <span className="h-2 w-2 animate-pulse rounded-full bg-rose" />
        Caricamento 3D
      </div>
    </div>
  ),
});

/**
 * Map the active product variant to the closest matching 3D material.
 * Falls back to the first variant (Cognac) when the swatch doesn&apos;t match.
 */
function variantFor(swatch: string | undefined): CaeliaVariant {
  if (!swatch) return CAELIA_VARIANTS[0];
  const hex = swatch.toLowerCase();
  if (hex === "#d49b96" || hex === "#e9c9c4") {
    // Pink family -> Blush
    return CAELIA_VARIANTS.find((v) => v.id === "blush") ?? CAELIA_VARIANTS[0];
  }
  if (hex === "#1f1d1c") {
    // Noir -> Bordeaux (closest dark)
    return CAELIA_VARIANTS.find((v) => v.id === "bordeaux") ?? CAELIA_VARIANTS[0];
  }
  if (hex === "#efe5d8") {
    // Ivory -> Cognac (warm light)
    return CAELIA_VARIANTS[0];
  }
  return CAELIA_VARIANTS[0];
}

export function Caelia3DFrame({
  product,
  variant,
}: {
  product: Product;
  variant: ProductVariant;
}) {
  const modelVariant = variantFor(variant.swatch);
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md bg-gradient-to-br from-cream-deep to-blush/20 group">
      <CaeliaViewer
        variant={modelVariant}
        view="mirror"
        autoRotate={true}
        onSnapshotReady={() => undefined}
      />
      <div className="pointer-events-none absolute top-4 left-4 z-10 inline-flex items-center gap-2 rounded-full bg-cream/90 px-3 py-1 text-xs uppercase tracking-[0.22em] text-ink">
        <span className="h-1.5 w-1.5 rounded-full bg-rose" />
        Live 3D · {product.variants.length} colori
      </div>
      <p className="pointer-events-none absolute bottom-4 left-4 z-10 text-xs uppercase tracking-[0.22em] text-ink/70">
        Trascina per ruotare
      </p>
    </div>
  );
}