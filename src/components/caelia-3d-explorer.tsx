"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { CAELIA_VARIANTS, type CaeliaVariant } from "@/lib/caelia/variants";

const CaeliaViewer = dynamic(() => import("./caelia-viewer"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 grid place-items-center bg-cream-deep/40">
      <div className="flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-ink/60">
        <span className="h-2 w-2 animate-pulse rounded-full bg-rose" />
        Caricamento 3D
      </div>
    </div>
  ),
});

type View = "mirror" | "pocket";

export function Caelia3DExplorer() {
  const [variant, setVariant] = useState<CaeliaVariant>(CAELIA_VARIANTS[0]);
  const [view, setView] = useState<View>("mirror");
  const [autoRotate, setAutoRotate] = useState(true);
  const [snapshotReady, setSnapshotReady] = useState<(() => string) | null>(
    null,
  );
  const [snapshotBusy, setSnapshotBusy] = useState(false);

  async function downloadSnapshot() {
    if (!snapshotReady) return;
    setSnapshotBusy(true);
    try {
      const dataUrl = snapshotReady();
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `caelia-${variant.id}-${view}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } finally {
      setSnapshotBusy(false);
    }
  }

  return (
    <section className="relative bg-night text-cream overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20 lg:py-28">
        <div className="grid lg:grid-cols-[1.6fr_1fr] gap-10 lg:gap-14 items-center">
          {/* 3D Canvas */}
          <div className="relative aspect-[4/5] rounded-md overflow-hidden bg-gradient-to-br from-cream-deep/30 to-blush/30">
            <CaeliaViewer
              variant={variant}
              view={view}
              autoRotate={autoRotate}
              onSnapshotReady={setSnapshotReady}
            />
            <div className="pointer-events-none absolute top-4 left-4 z-10 inline-flex items-center gap-2 rounded-full bg-cream/90 px-3 py-1 text-xs uppercase tracking-[0.22em] text-ink">
              <span className="h-1.5 w-1.5 rounded-full bg-rose" />
              Live 3D
            </div>
            <div className="pointer-events-none absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-xs uppercase tracking-[0.22em] text-ink/70">
              <span>{variant.name}</span>
              <span>
                {view === "mirror" ? "Lato specchio" : "Lato portamatita"}
              </span>
            </div>
          </div>

          {/* Controls panel */}
          <div className="space-y-8">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-blush">
                Studio 3D
              </p>
              <h2 className="mt-3 font-serif text-4xl lg:text-5xl leading-[1.05]">
                Tieni il Beauty Mirror Case tra le mani.
              </h2>
              <p className="mt-4 text-cream/80 leading-relaxed">
                Esplora la tua tonalità da ogni angolazione. Trascina per
                ruotare, usa la rotella per lo zoom, scegli una sfumatura.
              </p>
            </div>

            {/* Variant selector */}
            <fieldset>
              <legend className="text-xs uppercase tracking-[0.22em] text-cream/70">
                Colore pelle
              </legend>
              <div className="mt-3 flex gap-3" role="group">
                {CAELIA_VARIANTS.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setVariant(v)}
                    aria-pressed={variant.id === v.id}
                    aria-label={v.name}
                    title={`${v.name} — ${v.description}`}
                    className={`group relative h-14 flex-1 rounded-md border-2 transition-[border-color,box-shadow,transform] duration-[var(--dur-fast)] ease-[var(--ease-out)] chip ${
                      variant.id === v.id
                        ? "border-cream shadow-[0_0_0_4px_rgba(184,101,95,0.25)]"
                        : "border-cream/20 hover:border-cream/50"
                    }`}
                    style={{ background: v.swatch }}
                  />
                ))}
              </div>
              <p className="mt-3 font-serif text-xl">{variant.name}</p>
              <p className="text-sm text-cream/60">{variant.description}</p>
            </fieldset>

            {/* View selector */}
            <fieldset>
              <legend className="text-xs uppercase tracking-[0.22em] text-cream/70">
                Vista
              </legend>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setView("mirror")}
                  aria-pressed={view === "mirror"}
                  className={`px-4 py-3 text-xs uppercase tracking-[0.22em] border transition-colors ${
                    view === "mirror"
                      ? "bg-cream text-charcoal border-cream"
                      : "border-cream/30 hover:border-cream/60"
                  }`}
                >
                  Lato specchio
                </button>
                <button
                  type="button"
                  onClick={() => setView("pocket")}
                  aria-pressed={view === "pocket"}
                  className={`px-4 py-3 text-xs uppercase tracking-[0.22em] border transition-colors ${
                    view === "pocket"
                      ? "bg-cream text-charcoal border-cream"
                      : "border-cream/30 hover:border-cream/60"
                  }`}
                >
                  Lato portamatita
                </button>
              </div>
              <label className="mt-4 flex items-center justify-between rounded-md border border-cream/20 px-4 py-3 cursor-pointer">
                <span className="text-sm">Rotazione automatica</span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={autoRotate}
                  aria-label="Attiva rotazione automatica"
                  onClick={() => setAutoRotate((v) => !v)}
                  className={`relative h-6 w-11 rounded-full transition-colors ${
                    autoRotate ? "bg-rose" : "bg-cream/20"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-cream shadow transition-transform ${
                      autoRotate ? "translate-x-5" : "translate-x-0.5"
                    }`}
                    aria-hidden
                  />
                </button>
              </label>
            </fieldset>

            {/* Specs */}
            <dl className="grid grid-cols-2 gap-y-3 text-sm border-t border-cream/15 pt-6">
              <dt className="text-cream/60">Dimensioni</dt>
              <dd className="text-right tabular-nums">10,5 × 21,5 × 0,5 cm</dd>
              <dt className="text-cream/60">Materiali</dt>
              <dd className="text-right">Pelle vegana · specchio acrilico</dd>
              <dt className="text-cream/60">Peso</dt>
              <dd className="text-right tabular-nums">~75 g</dd>
            </dl>

            <button
              type="button"
              onClick={downloadSnapshot}
              disabled={!snapshotReady || snapshotBusy}
              className="w-full inline-flex items-center justify-center gap-2 border border-cream/40 px-6 py-3 text-xs uppercase tracking-[0.22em] hover:bg-cream hover:text-charcoal transition-colors disabled:opacity-50"
            >
              {snapshotBusy ? "Esportando..." : "Scarica snapshot PNG"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}