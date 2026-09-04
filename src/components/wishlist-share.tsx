"use client";

import { useState } from "react";

export function WishlistShare({ handles }: { handles: string[] }) {
  const [copied, setCopied] = useState(false);

  async function share() {
    if (handles.length === 0) return;
    const url = `${window.location.origin}/wishlist?h=${handles.join(",")}`;
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: "La mia wishlist CAELIA", url });
        return;
      } catch {
        // fall through to clipboard
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  }

  return (
    <button
      type="button"
      onClick={share}
      disabled={handles.length === 0}
      className="text-xs uppercase tracking-[0.22em] nav-link disabled:opacity-40 disabled:cursor-not-allowed"
    >
      {copied ? "Copiato" : "Condividi la mia wishlist"}
    </button>
  );
}