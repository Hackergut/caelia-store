import type { ReactNode } from "react";

export function LegalPage({
  eyebrow = "Legale",
  title,
  updated,
  children,
}: {
  eyebrow?: string;
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl px-6 lg:px-10 pt-12 pb-24">
      <p className="text-xs uppercase tracking-[0.32em] text-ink/60">{eyebrow}</p>
      <h1 className="mt-4 font-serif text-5xl leading-[1.05]">{title}</h1>
      <p className="mt-4 text-xs uppercase tracking-[0.18em] text-ink/50">
        Ultimo aggiornamento: {updated}
      </p>
      <div className="legal-prose mt-12 space-y-8 text-ink/75 leading-relaxed">
        {children}
      </div>
    </div>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="font-serif text-2xl text-ink">{title}</h2>
      <div className="mt-3 space-y-4">{children}</div>
    </section>
  );
}
