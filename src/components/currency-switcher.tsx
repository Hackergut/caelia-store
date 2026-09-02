"use client";

import { useCurrency, type Currency } from "@/lib/currency";

export function CurrencySwitcher() {
  const { currency, setCurrency } = useCurrency();
  const options: Currency[] = ["EUR", "USD", "GBP"];

  return (
    <label className="hidden md:inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-ink/70">
      <span className="text-ink/50">Valuta</span>
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value as Currency)}
        className="border border-mist rounded-md bg-cream px-2 py-1 text-xs normal-case tracking-normal"
        aria-label="Cambia valuta"
      >
        {options.map((c) => (
          <option key={c} value={c}>
            {c === "EUR" ? "€ EUR" : c === "USD" ? "$ USD" : "£ GBP"}
          </option>
        ))}
      </select>
    </label>
  );
}