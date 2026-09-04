import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cura del prodotto",
  description: "Come prendersi cura del Beauty Mirror Case CAELIA.",
};

export default function CarePage() {
  return (
    <div className="shell max-w-3xl pt-16 pb-24 space-y-8">
      <p className="text-xs uppercase tracking-[0.32em] text-ink/60">Cura</p>
      <h1 className="font-serif fluid-h2">
        Pelle vegana, specchio, gloss.
      </h1>
      <ul className="space-y-4 text-ink/80 leading-relaxed">
        <li>
          · Pulisci l’esterno con un panno umido. Niente alcol, niente solventi.
        </li>
        <li>
          · Lo specchio si pulisce con la fodera in microfibra interna.
        </li>
        <li>· Tieni lontano da fonti di calore e dal sole diretto per ore.</li>
        <li>
          · La matita si tempera con un temperamatite classico. Il gloss si
          richiude a scatto.
        </li>
      </ul>
    </div>
  );
}
