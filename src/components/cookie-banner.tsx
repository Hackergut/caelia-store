"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "caelia_cookie_consent_v1";

type ConsentValue = "all" | "essential-only";

export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!window.localStorage.getItem(STORAGE_KEY)) {
        // Slight delay so it does not flash during initial render
        const t = window.setTimeout(() => setShow(true), 800);
        return () => window.clearTimeout(t);
      }
    } catch {
      // ignore
    }
  }, []);

  function save(value: ConsentValue) {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // ignore
    }
    setShow(false);
    // Dispatch event so analytics scripts can react
    window.dispatchEvent(new CustomEvent("caelia:consent", { detail: value }));
  }

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-label="Consenso cookie"
      className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:bottom-6 z-40 max-w-md rounded-md bg-charcoal text-cream p-5 shadow-2xl border border-cream/10"
    >
      <p className="text-xs uppercase tracking-[0.22em] text-blush">Cookie</p>
      <p className="mt-3 text-sm leading-relaxed">
        Usiamo cookie tecnici e, previo consenso, cookie di analisi per
        migliorare la tua esperza.{" "}
        <Link href="/cookies" className="underline">
          Cookie policy
        </Link>
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => save("essential-only")}
          className="px-3 py-2 text-xs uppercase tracking-[0.18em] border border-cream/30 hover:bg-cream/10"
        >
          Solo essenziali
        </button>
        <button
          type="button"
          onClick={() => save("all")}
          className="px-3 py-2 text-xs uppercase tracking-[0.18em] bg-cream text-charcoal hover:bg-blush"
        >
          Accetta tutto
        </button>
      </div>
    </div>
  );
}
