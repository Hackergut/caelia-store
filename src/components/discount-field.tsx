"use client";

import { useState } from "react";

const KNOWN_CODES: Record<string, { percent: number; label: string }> = {
  CAELIA10: { percent: 10, label: "10% di benvenuta" },
  WELCOME: { percent: 10, label: "10% di benvenuta" },
  COMEBACK: { percent: 15, label: "15% bentornata" },
};

export type AppliedDiscount = {
  code: string;
  percent: number;
  label: string;
  amount: number;
};

export function DiscountField({
  subtotal,
  currencyCode,
  onApply,
}: {
  subtotal: number;
  currencyCode: "EUR" | "USD" | "GBP";
  onApply: (d: AppliedDiscount | null) => void;
}) {
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState<AppliedDiscount | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [shake, setShake] = useState(false);

  function apply(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const c = code.trim().toUpperCase();
    const match = KNOWN_CODES[c];
    if (!match) {
      setError("Codice non valido");
      setShake(true);
      window.setTimeout(() => setShake(false), 400);
      return;
    }
    const amount = Number((subtotal * match.percent / 100).toFixed(2));
    const d: AppliedDiscount = {
      code: c,
      percent: match.percent,
      label: match.label,
      amount,
    };
    setApplied(d);
    setError(null);
    onApply(d);
  }

  function remove() {
    setApplied(null);
    setCode("");
    setError(null);
    onApply(null);
  }

  return (
    <div>
      {applied ? (
        <div className="flex items-center justify-between border border-burgundy/40 bg-burgundy/5 rounded-md px-4 py-3 text-sm">
          <div>
            <p className="font-medium">{applied.code}</p>
            <p className="text-xs text-ink/60">{applied.label}</p>
          </div>
          <button
            type="button"
            onClick={remove}
            className="text-xs uppercase tracking-[0.18em] text-ink/60 hover:text-burgundy"
          >
            Rimuovi
          </button>
        </div>
      ) : (
        <form
          onSubmit={apply}
          className={`flex gap-2 ${shake ? "animate-[shake_0.4s_ease-in-out]" : ""}`}
        >
          <input
            type="text"
            placeholder="Codice sconto"
            value={code}
            onChange={(e) => { setCode(e.target.value); setError(null); }}
            className="flex-1 border border-mist rounded-md px-4 py-3 text-sm bg-cream focus:outline-none focus:border-burgundy uppercase tracking-wider"
          />
          <button
            type="submit"
            className="px-5 border border-burgundy text-burgundy text-xs uppercase tracking-[0.22em] hover:bg-burgundy hover:text-cream transition-colors"
          >
            Applica
          </button>
        </form>
      )}
      {error && (
        <p role="alert" className="mt-2 text-xs text-burgundy">
          {error}
        </p>
      )}
      <p className="mt-2 text-xs text-ink/40">
        Prova <code className="text-burgundy">CAELIA10</code> per il 10%.
      </p>
    </div>
  );
}
