const KEY = "caelia-consent";

export type Consent = "pending" | "accepted" | "rejected";

export function getConsent(): Consent {
  if (typeof window === "undefined") return "pending";
  const v = window.localStorage.getItem(KEY);
  if (v === "accepted" || v === "rejected") return v;
  return "pending";
}

export function setConsent(value: Exclude<Consent, "pending">) {
  window.localStorage.setItem(KEY, value);
  window.dispatchEvent(new CustomEvent("caelia-consent", { detail: value }));
}
