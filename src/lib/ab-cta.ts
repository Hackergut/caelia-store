const KEY = "caelia_cta_ab";

export const CTA = {
  A: "Aggiungi al carrello",
  B: "Acquista ora",
} as const;

export type CtaVariant = keyof typeof CTA;

export function getCtaVariant(): CtaVariant {
  if (typeof window === "undefined") return "A";
  try {
    const stored = localStorage.getItem(KEY);
    if (stored === "A" || stored === "B") return stored;
    const next: CtaVariant = Math.random() < 0.5 ? "A" : "B";
    localStorage.setItem(KEY, next);
    return next;
  } catch {
    return "A";
  }
}

export function trackCta(action: "view" | "click", variant: CtaVariant) {
  if (typeof window === "undefined") return;
  const payload = { event: `cta_ab_${action}`, variant, experiment: "buy_button" };
  const w = window as Window & { dataLayer?: Record<string, unknown>[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push(payload);
}
