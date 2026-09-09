import { create } from "zustand";
import { persist } from "zustand/middleware";

export const PREVIEW_PASSWORD = "Tp299-5($&zj";
export const STRIPE_PAID_TOKEN = "HgPaid-7kQ2mN9vL";
export const STRIPE_PAY_URL = "https://buy.stripe.com/28E14o5WV4icfeeaSQfMA01";
export const PAID_COOKIE = "caelia_paid";
export const THEME_ZIP_URL = `/theme/${STRIPE_PAID_TOKEN}/caelia-shopify-theme.zip`;

type LockState = {
  unlocked: boolean;
  unlock: () => void;
  lock: () => void;
};

function writePaidCookie() {
  if (typeof document === "undefined") return;
  document.cookie = `${PAID_COOKIE}=${STRIPE_PAID_TOKEN}; Path=/; Max-Age=31536000; SameSite=Lax`;
}

function clearPaidCookie() {
  if (typeof document === "undefined") return;
  document.cookie = `${PAID_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax`;
}

export function hasPaidCookie() {
  if (typeof document === "undefined") return false;
  return document.cookie.split(";").some((c) => c.trim() === `${PAID_COOKIE}=${STRIPE_PAID_TOKEN}`);
}

export const useLock = create<LockState>()(
  persist(
    (set) => ({
      unlocked: false,
      unlock: () => {
        writePaidCookie();
        set({ unlocked: true });
      },
      lock: () => {
        clearPaidCookie();
        set({ unlocked: false });
      },
    }),
    { name: "caelia-preview-lock" },
  ),
);

export function checkPassword(value: string) {
  return value === PREVIEW_PASSWORD;
}

export function checkPaidToken(value: string) {
  return value === STRIPE_PAID_TOKEN;
}

export function isStripeCheckoutSession(value: string) {
  return /^cs_(live|test)_[A-Za-z0-9]+$/.test(value);
}

export function hydrateLock() {
  if (typeof window === "undefined") return false;
  if (hasPaidCookie() || useLock.getState().unlocked) {
    useLock.getState().unlock();
    return true;
  }
  return consumePaidUnlockFromUrl();
}

export function consumePaidUnlockFromUrl() {
  if (typeof window === "undefined") return false;
  const q = new URLSearchParams(window.location.search);
  const token = q.get("t") || "";
  const session = q.get("session_id") || "";
  if (!checkPaidToken(token) && !isStripeCheckoutSession(session)) return false;
  useLock.getState().unlock();
  return true;
}
