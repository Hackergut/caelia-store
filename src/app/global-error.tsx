"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="it">
      <body className="bg-cream text-ink font-sans">
        <div className="mx-auto max-w-2xl px-6 lg:px-10 pt-32 pb-24 text-center">
          <p className="text-xs uppercase tracking-[0.32em] text-ink/60">
            Errore critico
          </p>
          <h1 className="mt-4 font-serif text-5xl lg:text-6xl leading-[1.05]">
            Stiamo riavviando.
          </h1>
          <p className="mt-6 text-ink/70">
            Qualcosa si è rotto a livello di applicazione. Riprova, o
            ricarica la pagina.
          </p>
          {error.digest && (
            <p className="mt-3 text-xs text-ink/40">Riferimento: {error.digest}</p>
          )}
          <button
            type="button"
            onClick={reset}
            className="mt-10 inline-flex items-center justify-center bg-charcoal text-cream px-8 py-4 text-xs uppercase tracking-[0.22em] hover:bg-rose transition-colors"
          >
            Riprova
          </button>
        </div>
      </body>
    </html>
  );
}
