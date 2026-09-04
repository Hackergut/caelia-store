"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[CAELIA error]", error);
    if (typeof window !== "undefined" && (window as unknown as { Sentry?: { captureException?: (e: Error) => void } }).Sentry) {
      (window as unknown as { Sentry: { captureException: (e: Error) => void } }).Sentry.captureException(error);
    }
  }, [error]);

  return (
    <div className="shell max-w-2xl pt-32 pb-24 text-center">
      <p className="text-xs uppercase tracking-[0.32em] text-ink/60">
        Qualcosa è andato storto
      </p>
      <h1 className="mt-4 font-serif fluid-h2">
        Non era previsto.
      </h1>
      <p className="mt-6 text-ink/70">
        Il nostro team è già stato notificato. Nel frattempo puoi riprovare
        o tornare alla collezione.
      </p>
      {error.digest && (
        <p className="mt-3 text-xs text-ink/40">Riferimento: {error.digest}</p>
      )}
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center justify-center bg-charcoal text-cream px-8 py-4 text-xs uppercase tracking-[0.22em] hover:bg-rose transition-colors"
        >
          Riprova
        </button>
        <Link
          href="/"
          className="inline-flex items-center justify-center border border-charcoal px-8 py-4 text-xs uppercase tracking-[0.22em] nav-link"
        >
          Torna alla home
        </Link>
      </div>
    </div>
  );
}
