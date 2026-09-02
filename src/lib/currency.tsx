"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Currency = "EUR" | "USD" | "GBP";

type Ctx = {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  rateFromEUR: Record<Currency, number>;
};

const RATES: Record<Currency, number> = {
  EUR: 1,
  USD: 1.08,
  GBP: 0.86,
};

const SYMBOL: Record<Currency, string> = {
  EUR: "€",
  USD: "$",
  GBP: "£",
};

const STORAGE_KEY = "caelia_currency_v1";

const CurrencyCtx = createContext<Ctx | null>(null);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>("EUR");

  useEffect(() => {
    try {
      const v = window.localStorage.getItem(STORAGE_KEY);
      if (v === "EUR" || v === "USD" || v === "GBP") setCurrencyState(v);
    } catch {
      // ignore
    }
  }, []);

  function setCurrency(c: Currency) {
    setCurrencyState(c);
    try {
      window.localStorage.setItem(STORAGE_KEY, c);
    } catch {
      // ignore
    }
  }

  return (
    <CurrencyCtx.Provider value={{ currency, setCurrency, rateFromEUR: RATES }}>
      {children}
    </CurrencyCtx.Provider>
  );
}

export function useCurrency(): Ctx {
  const ctx = useContext(CurrencyCtx);
  if (!ctx) {
    // Fallback when the provider is not mounted yet (server rendering).
    return { currency: "EUR", setCurrency: () => undefined, rateFromEUR: RATES };
  }
  return ctx;
}

export function convertFromEUR(amountEUR: number, target: Currency): number {
  return amountEUR * RATES[target];
}

export function currencySymbol(c: Currency): string {
  return SYMBOL[c];
}