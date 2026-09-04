import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Boutique",
  description: "Dove trovare CAELIA.",
};

export default function StoresPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 lg:px-10 pt-16 pb-24">
      <p className="text-xs uppercase tracking-[0.32em] text-ink/60">Boutique</p>
      <h1 className="mt-4 font-serif text-5xl leading-[1.05]">Per ora, solo online.</h1>
      <p className="mt-6 text-lg text-ink/80">Pop-up a Los Angeles e Dubai in arrivo.</p>
      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        <div className="rounded-md bg-cream-deep p-6">
          <p className="text-xs uppercase tracking-[0.22em] text-ink/60">Los Angeles</p>
          <p className="mt-2 font-serif text-2xl">Silver Lake · fine 2026</p>
        </div>
        <div className="rounded-md bg-cream-deep p-6">
          <p className="text-xs uppercase tracking-[0.22em] text-ink/60">Dubai</p>
          <p className="mt-2 font-serif text-2xl">DIFC · inizio 2027</p>
        </div>
      </div>
    </div>
  );
}
