import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Boutique",
  description: "Dove trovare CAELIA. Online e, presto, a Los Angeles e Dubai.",
};

export default function StoresPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 lg:px-10 pt-16 pb-24">
      <p className="text-xs uppercase tracking-[0.32em] text-ink/60">Boutique</p>
      <h1 className="mt-4 font-serif text-5xl leading-[1.05]">
        Per ora, solo online.
      </h1>
      <p className="mt-6 text-lg text-ink/80 leading-relaxed">
        CAELIA nasce digitale. Stiamo selezionando partner retail a Los Angeles
        e Dubai. Iscriviti alla newsletter in footer per il primo pop-up.
      </p>
      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        <div className="rounded-md bg-cream-deep p-6">
          <p className="text-xs uppercase tracking-[0.22em] text-ink/60">
            Los Angeles
          </p>
          <p className="mt-2 font-serif text-2xl">In arrivo</p>
          <p className="mt-2 text-sm text-ink/70">
            Pop-up in Silver Lake, fine 2026.
          </p>
        </div>
        <div className="rounded-md bg-cream-deep p-6">
          <p className="text-xs uppercase tracking-[0.22em] text-ink/60">Dubai</p>
          <p className="mt-2 font-serif text-2xl">In arrivo</p>
          <p className="mt-2 text-sm text-ink/70">
            Corner in DIFC, inizio 2027.
          </p>
        </div>
      </div>
    </div>
  );
}
