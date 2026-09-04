import type { Money } from "./types";

const FORMATTERS: Record<Money["currencyCode"], Intl.NumberFormat> = {
  EUR: new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" }),
  USD: new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }),
  GBP: new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }),
};

export function formatMoney(money: Money, locale?: string): string {
  const formatter = FORMATTERS[money.currencyCode];
  const value = Number(money.amount);
  // For non-EUR we use the locale explicitly, otherwise the formatter's default
  if (locale) {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: money.currencyCode,
    }).format(value);
  }
  return formatter.format(value);
}
