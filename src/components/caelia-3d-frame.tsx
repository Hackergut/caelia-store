"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
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

function variantFor(swatch: string | undefined): CaeliaVariant {
  if (!swatch) return CAELIA_VARIANTS[0];
  const hex = swatch.toLowerCase();
  if (hex === "#4a0e16") {
    return CAELIA_VARIANTS.find((v) => v.id === "burgundy") ?? CAELIA_VARIANTS[0];
  }
  if (hex === "#7b5644") {
    return CAELIA_VARIANTS.find((v) => v.id === "cacao") ?? CAELIA_VARIANTS[0];
  }
  if (hex === "#efe5d8" || hex === "#f7f1ea") {
    return CAELIA_VARIANTS.find((v) => v.id === "crema") ?? CAELIA_VARIANTS[0];
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
  const [allow3D, setAllow3D] = useState(true);

  // Respect prefers-reduced-motion: fall back to the static 2D image
  // rather than render a continuously rotating canvas.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    function apply() { setAllow3D(!mql.matches); }
    apply();
    mql.addEventListener("change", apply);
    return () => mql.removeEventListener("change", apply);
  }, []);

  // Poster image shown beneath the canvas so users see the product even
  // before WebGL finishes loading, and as the static fallback for the
  // reduced-motion case.
  const poster = product.images[0]?.src ?? "/products/burgundy-caelia-pair.jpg";

  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md bg-gradient-to-br from-cream-deep to-blush/20 group">
      {/* Static poster: always present, visible underneath / behind the
          canvas. The canvas fades in once Three.js is ready. */}
      <img
        src={poster}
        alt={product.images[0]?.alt ?? product.title}
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
        decoding="async"
      />
      {allow3D && (
        <div className="absolute inset-0 img-fade-in">
          <CaeliaViewer
            variant={modelVariant}
            view="mirror"
            autoRotate={true}
            onSnapshotReady={() => undefined}
          />
        </div>
      )}
      <div className="pointer-events-none absolute top-4 left-4 z-10 inline-flex items-center gap-2 rounded-full bg-cream/90 px-3 py-1 text-xs uppercase tracking-[0.22em] text-ink">
        <span className="h-1.5 w-1.5 rounded-full bg-rose" />
        {allow3D ? "Live 3D" : "Immagine"} · {product.variants.length} colori
      </div>
      <p className="pointer-events-none absolute bottom-4 left-4 z-10 text-xs uppercase tracking-[0.22em] text-ink/70">
        {allow3D ? "Trascina per ruotare" : "Scegli un colore qui sotto"}
      </p>
    </div>
  );
}