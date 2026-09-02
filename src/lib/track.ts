/**
 * Lightweight analytics tracker. Calls into Meta Pixel (fbq) when present.
 * No-ops gracefully if the pixel script is not loaded or consent is missing.
 */
type FbqArgs = unknown[];

declare global {
  interface Window {
    fbq?: (...args: FbqArgs) => void;
    dataLayer?: unknown[];
  }
}

function hasConsent(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem("caelia_cookie_consent_v1") === "all";
  } catch {
    return false;
  }
}

export function track(event: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  if (!hasConsent()) return;
  if (typeof window.fbq === "function") {
    window.fbq("track", event, params);
  }
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event, ...params });
  }
}

export const events = {
  viewItem: (p: { id: string; title: string; price: number; currency: string }) =>
    track("ViewContent", { content_ids: [p.id], content_name: p.title, value: p.price, currency: p.currency }),
  addToCart: (p: { id: string; title: string; price: number; currency: string; quantity: number }) =>
    track("AddToCart", { content_ids: [p.id], content_name: p.title, value: p.price * p.quantity, currency: p.currency, quantity: p.quantity }),
  initiateCheckout: (p: { value: number; currency: string; items: number }) =>
    track("InitiateCheckout", { value: p.value, currency: p.currency, num_items: p.items }),
  purchase: (p: { orderId: string; value: number; currency: string; items: number }) =>
    track("Purchase", { content_ids: [p.orderId], value: p.value, currency: p.currency, num_items: p.items }),
} as const;