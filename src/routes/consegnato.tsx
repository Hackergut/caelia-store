import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useLock } from "@/lib/lock";

export const Route = createFileRoute("/consegnato")({ component: ConsegnatoPage });

function ConsegnatoPage() {
  const unlock = useLock((s) => s.unlock);
  const navigate = useNavigate();

  useEffect(() => {
    unlock();
    void navigate({ to: "/", replace: true });
  }, [unlock, navigate]);

  return (
    <section className="bg-berry text-rosa">
      <div className="shell flex min-h-[80svh] max-w-lg flex-col justify-center py-20">
        <p className="type-meta text-rosa/55">Consegna</p>
        <h1 className="type-display-md mt-4">Versione finale.</h1>
        <p className="mt-6 leading-relaxed text-rosa/80">
          Watermark rimosso. Questa è la home come dopo il pagamento.
        </p>
      </div>
    </section>
  );
}
