import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { checkPaidToken, isStripeCheckoutSession, useLock } from "@/lib/lock";

export const Route = createFileRoute("/paid")({
  validateSearch: (s: Record<string, unknown>) => ({
    t: typeof s.t === "string" ? s.t : "",
    session_id: typeof s.session_id === "string" ? s.session_id : "",
  }),
  component: PaidPage,
});

function PaidPage() {
  const { t, session_id } = Route.useSearch();
  const unlock = useLock((s) => s.unlock);
  const unlocked = useLock((s) => s.unlocked);
  const navigate = useNavigate();
  const [ok, setOk] = useState(false);
  const [bad, setBad] = useState(false);

  useEffect(() => {
    if (checkPaidToken(t) || isStripeCheckoutSession(session_id)) {
      unlock();
      setOk(true);
      const id = window.setTimeout(() => {
        void navigate({ to: "/consegnato" });
      }, 1600);
      return () => window.clearTimeout(id);
    }
    if (unlocked) {
      setOk(true);
      return;
    }
    setBad(true);
  }, [t, session_id, unlock, unlocked, navigate]);

  return (
    <section className="bg-berry text-rosa">
      <div className="shell flex min-h-[80svh] max-w-lg flex-col justify-center py-20">
        <p className="type-meta text-rosa/55">Stripe</p>
        <h1 className="type-display-md mt-4">
          {ok ? "Pagamento ricevuto." : bad ? "Link non valido." : "Verifica…"}
        </h1>
        <p className="mt-6 leading-relaxed text-rosa/80">
          {ok
            ? "Watermark rimosso su questo browser. Torna alla home."
            : bad
              ? "Il pagamento non risulta da questo indirizzo. Se hai già pagato, apri il sito dallo stesso dispositivo dopo il checkout, oppure usa /lock."
              : "Stiamo togliendo il watermark."}
        </p>
        {ok || bad ? (
          <Link to="/" className="btn-invert mt-10 w-fit">
            Home
          </Link>
        ) : null}
      </div>
    </section>
  );
}
