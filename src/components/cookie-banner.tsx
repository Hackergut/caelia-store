import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getConsent, setConsent, type Consent } from "@/lib/consent";

export function CookieBanner() {
  const [state, setState] = useState<Consent>("pending");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setState(getConsent());
    setReady(true);
  }, []);

  if (!ready || state !== "pending") return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-title"
      className="fixed inset-x-0 bottom-0 z-[80] border-t border-rosa/20 bg-berry p-5 text-rosa md:p-8"
    >
      <div className="shell flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl">
          <p id="cookie-title" className="font-serif text-xl">
            Cookie
          </p>
          <p className="mt-2 text-sm leading-relaxed text-rosa/80">
            Necessari al carrello, sempre. Analytics e ads solo se accetti.{" "}
            <Link to="/legal/cookies" className="underline underline-offset-4">
              Informativa
            </Link>
            .
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className="min-h-11 border border-rosa/40 px-5 text-[0.7rem] tracking-[0.18em] uppercase"
            onClick={() => {
              setConsent("rejected");
              setState("rejected");
            }}
          >
            Rifiuta
          </button>
          <button
            type="button"
            className="min-h-11 bg-rosa px-5 text-[0.7rem] tracking-[0.18em] text-berry uppercase"
            onClick={() => {
              setConsent("accepted");
              setState("accepted");
            }}
          >
            Accetta
          </button>
        </div>
      </div>
    </div>
  );
}
