"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "caelia_exit_intent_v1";

type Status = "idle" | "loading" | "ok" | "err";

export function ExitIntentModal() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (window.localStorage.getItem(STORAGE_KEY)) return;
    } catch {
      // ignore
    }
    // Wait until the user has been on the page at least 8 seconds, then
    // arm the mouseleave listener (only triggers when cursor leaves the
    // viewport at the top edge).
    let armed = false;
    const armTimer = window.setTimeout(() => {
      armed = true;
    }, 8000);
    function onLeave(e: MouseEvent) {
      if (!armed) return;
      if (e.clientY <= 0) {
        try {
          window.localStorage.setItem(STORAGE_KEY, "1");
        } catch {
          // ignore
        }
        setShow(true);
        window.removeEventListener("mouseleave", onLeave);
      }
    }
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.clearTimeout(armTimer);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as {
          error?: string;
        };
        throw new Error(body.error ?? "Errore");
      }
      setStatus("ok");
      setTimeout(() => setShow(false), 1800);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Errore");
      setStatus("err");
    }
  }

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-label="Iscriviti per il 10% di sconto"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-night/50"
      onClick={() => setShow(false)}
    >
      <div
        className="relative w-full max-w-md bg-cream rounded-md shadow-2xl p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setShow(false)}
          aria-label="Chiudi"
          className="absolute top-3 right-3 h-8 w-8 rounded-full hover:bg-mist/30"
        >
          ×
        </button>

        {status === "ok" ? (
          <div className="text-center py-8">
            <p className="font-serif text-3xl">Codice inviato.</p>
            <p className="mt-3 text-ink/70">
              Controlla la tua email: trovi il 10% di sconto CAELIA10.
            </p>
          </div>
        ) : (
          <>
            <p className="text-xs uppercase tracking-[0.32em] text-ink/60">
              Solo per te
            </p>
            <h2 className="mt-3 font-serif text-3xl leading-tight">
              Resta. Ti regaliamo il 10%.
            </h2>
            <p className="mt-3 text-ink/70">
              Lascia la tua email e ricevi subito un codice sconto sul primo
              Beauty Mirror Case.
            </p>
            <form onSubmit={submit} className="mt-6 space-y-3">
              <input
                type="email"
                required
                placeholder="email@esempio.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === "loading"}
                className="w-full border border-mist rounded-md px-4 py-3 text-sm bg-cream focus:outline-none focus:border-charcoal"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-charcoal text-cream py-3 text-xs uppercase tracking-[0.22em] hover:bg-rose transition-colors disabled:opacity-50"
              >
                {status === "loading" ? "Invio..." : "Scarica il 10%"}
              </button>
              {status === "err" && error && (
                <p role="alert" className="text-xs text-rose">
                  {error}
                </p>
              )}
              <p className="text-xs text-ink/50">
                Niente spam. Solo lanci, rifornimenti e idee di stile.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}