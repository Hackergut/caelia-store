import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { hydrateLock, THEME_ZIP_URL, useLock } from "@/lib/lock";

export const Route = createFileRoute("/download")({
  head: () => ({ meta: [{ title: "CAELIA · Download tema" }] }),
  component: DownloadPage,
});

function DownloadPage() {
  const unlocked = useLock((s) => s.unlocked);
  const navigate = useNavigate();

  useEffect(() => {
    hydrateLock();
    const ok = useLock.getState().unlocked;
    if (!ok) {
      void navigate({ to: "/paga", search: { da: "tema" }, replace: true });
      return;
    }
    window.location.replace(THEME_ZIP_URL);
  }, [unlocked, navigate]);

  return (
    <section className="bg-berry text-rosa">
      <div className="shell flex min-h-[70svh] max-w-lg flex-col justify-center py-20">
        <p className="type-meta text-rosa/55">Tema Shopify</p>
        <h1 className="type-display-md mt-4">{unlocked ? "Download…" : "Bloccato."}</h1>
        <p className="mt-6 text-rosa/75">
          {unlocked
            ? "Parte il pacchetto: tema Shopify + tutte le immagini prodotto."
            : "Il tema si sblocca dopo il pagamento. Ti portiamo al consuntivo."}
        </p>
      </div>
    </section>
  );
}
