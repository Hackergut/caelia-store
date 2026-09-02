"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "caelia_support_open_v1";

export function SupportWidget() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (window.localStorage.getItem(STORAGE_KEY)) return;
    } catch {
      // ignore
    }
    // Wait 6 seconds before showing the bubble for the first time
    const t = window.setTimeout(() => setOpen(true), 6000);
    return () => window.clearTimeout(t);
  }, []);

  function dismiss() {
    setOpen(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end gap-3">
      {open && (
        <div className="relative w-80 max-w-[calc(100vw-3rem)] rounded-md bg-cream border border-mist p-5 shadow-2xl">
          <button
            type="button"
            onClick={dismiss}
            aria-label="Chiudi supporto"
            className="absolute top-2 right-3 h-6 w-6 text-ink/50 hover:text-ink"
          >
            ×
          </button>
          <p className="text-xs uppercase tracking-[0.22em] text-ink/60">
            Hai bisogno di aiuto?
          </p>
          <p className="mt-2 font-serif text-lg leading-tight">
            Ti rispondiamo entro 24 ore.
          </p>
          <div className="mt-4 space-y-2 text-sm">
            <a
              href="mailto:ciao@caelia.com"
              className="flex items-center gap-2 text-ink/80 hover:text-charcoal"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                <path d="M3 6h18v12H3z" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <path d="M3 6l9 7 9-7" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              ciao@caelia.com
            </a>
            <a
              href="/faq"
              className="flex items-center gap-2 text-ink/80 hover:text-charcoal"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <path d="M9 9a3 3 0 116 0c0 1.5-3 1.5-3 3M12 17.5v.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              Domande frequenti
            </a>
          </div>
        </div>
      )}
      <button
        type="button"
        aria-label={open ? "Chiudi supporto" : "Apri supporto"}
        onClick={() => setOpen((v) => !v)}
        className="h-14 w-14 rounded-full bg-charcoal text-cream shadow-2xl hover:bg-rose transition-colors flex items-center justify-center"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
          {open ? (
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          ) : (
            <>
              <path
                d="M21 12c0 4.4-4 8-9 8-1.4 0-2.7-.3-3.8-.8L3 21l1.8-5.2C3.7 14.5 3 13.3 3 12c0-4.4 4-8 9-8s9 3.6 9 8z"
                fill="currentColor"
              />
            </>
          )}
        </svg>
      </button>
    </div>
  );
}