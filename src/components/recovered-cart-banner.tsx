"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart-context";

type Stored = { at: number; count: number } | null;

const STORAGE_KEY = "caelia_abandoned_cart_v1";
const DISMISS_KEY = "caelia_abandoned_dismissed_v1";

export function RecoveredCartBanner() {
  const { lines, clear } = useCart();
  const [stored, setStored] = useState<Stored>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setStored(JSON.parse(raw) as Stored);
    } catch {
      // ignore
    }
  }, []);

  if (!stored) return null;
  if (lines.length > 0) return null;
  if (Date.now() - stored.at < 30 * 60 * 1000) return null;
  try {
    if (window.localStorage.getItem(DISMISS_KEY)) return null;
  } catch {
    // ignore
  }

  function dismiss() {
    try {
      window.localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // ignore
    }
    setStored(null);
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:bottom-6 z-40 max-w-md rounded-md bg-charcoal text-cream p-5 shadow-2xl border border-cream/10">
      <p className="text-xs uppercase tracking-[0.22em] text-blush">
        Bentornata
      </p>
      <p className="mt-2 text-sm leading-relaxed">
        Hai {stored.count} {stored.count === 1 ? "articolo" : "articoli"} nel
        carrello. Lo abbiamo conservato per te.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Link
          href="/cart"
          className="px-3 py-2 text-xs uppercase tracking-[0.18em] bg-cream text-charcoal hover:bg-blush"
        >
          Recupera il carrello
        </Link>
        <button
          type="button"
          onClick={() => {
            clear();
            dismiss();
          }}
          className="px-3 py-2 text-xs uppercase tracking-[0.18em] border border-cream/30 hover:bg-cream/10"
        >
          No, grazie
        </button>
      </div>
    </div>
  );
}