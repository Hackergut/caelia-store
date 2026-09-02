import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Stato ordine",
  description: "Verifica lo stato del tuo ordine CAELIA.",
  robots: { index: false, follow: false },
};

const STAGES = [
  { key: "received", label: "Ricevuto", desc: "Abbiamo ricevuto il tuo ordine." },
  { key: "preparing", label: "In preparazione", desc: "Stiamo preparando il pacco." },
  { key: "shipped", label: "Spedito", desc: "Il corriere ha preso in carico il pacco." },
  { key: "delivered", label: "Consegnato", desc: "Consegnato. Buon ritocco." },
];

function stageIndexFor(orderId: string): number {
  // Deterministic but realistic: order IDs ending in 9xxx are shipped,
  // 7-8k are preparing, others received. Pure placeholder for the MVP.
  const n = Number.parseInt(orderId.replace(/[^0-9]/g, "").slice(-4), 10) || 0;
  if (n >= 9000) return 3;
  if (n >= 7000) return 2;
  if (n >= 3000) return 1;
  return 0;
}

export default async function OrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!id || !/^CAELIA-\d{3,6}$/.test(id)) notFound();

  const stage = stageIndexFor(id);

  return (
    <div className="mx-auto max-w-2xl px-6 lg:px-10 pt-16 pb-24">
      <p className="text-xs uppercase tracking-[0.32em] text-ink/60">Ordine</p>
      <h1 className="mt-4 font-serif text-4xl lg:text-5xl leading-[1.05]">
        {id}
      </h1>
      <p className="mt-2 text-sm text-ink/60">
        Stato aggiornato al {new Date().toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric" })}.
      </p>
      <div className="mt-4">
        <span
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs uppercase tracking-[0.22em] ${
            stage === 3
              ? "bg-emerald-700/10 text-emerald-700"
              : stage === 2
                ? "bg-rose/10 text-rose"
                : "bg-charcoal/5 text-charcoal"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              stage === 3
                ? "bg-emerald-700"
                : stage === 2
                  ? "bg-rose"
                  : "bg-charcoal"
            } animate-pulse`}
            aria-hidden
          />
          {STAGES[stage].label}
        </span>
      </div>
      {stage >= 2 && (
        <div className="mt-6 rounded-md border border-mist p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-ink/60">
            Tracking
          </p>
          <p className="mt-2 font-serif text-lg">
            CAELIA-TRK-{id.replace("CAELIA-", "")}
          </p>
          <p className="text-sm text-ink/70">
            {stage === 3
              ? "Consegnato. Firma ricevuta."
              : "In transito · consegna stimata 24-48 ore."}
          </p>
        </div>
      )}

      <ol className="mt-12 space-y-6">
        {STAGES.map((s, i) => {
          const done = i <= stage;
          const current = i === stage;
          return (
            <li
              key={s.key}
              className={`flex gap-4 rounded-md p-4 ${
                done ? "bg-cream-deep" : "bg-cream/30"
              }`}
            >
              <span
                className={`mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-medium ${
                  done
                    ? current
                      ? "bg-rose text-cream"
                      : "bg-charcoal text-cream"
                    : "bg-mist text-ink/60"
                }`}
                aria-hidden="true"
              >
                {done ? (current ? "\u25CF" : "\u2713") : i + 1}
              </span>
              <div>
                <p className={`font-serif text-lg ${done ? "" : "text-ink/60"}`}>
                  {s.label}
                </p>
                <p className={`text-sm ${done ? "text-ink/70" : "text-ink/40"}`}>
                  {s.desc}
                </p>
              </div>
            </li>
          );
        })}
      </ol>

      <div className="mt-12 rounded-md bg-cream-deep p-6 text-sm">
        <p className="font-serif text-lg">Hai bisogno di aiuto?</p>
        <p className="mt-1 text-ink/70">
          Scrivici a ciao@caelia.com con il numero d&apos;ordine e ti
          rispondiamo entro 24 ore.
        </p>
      </div>

      <div className="mt-8 text-center">
        <Link href="/products" className="text-xs uppercase tracking-[0.22em] nav-link">
          Continua a esplorare
        </Link>
      </div>
    </div>
  );
}