import { create } from "zustand";
import { persist } from "zustand/middleware";

export const PREVIEW_PASSWORD = "Tp299-5($&zj";
export const STRIPE_PAID_TOKEN = "HgPaid-7kQ2mN9vL";
export const STRIPE_PAY_URL = "https://buy.stripe.com/28E8wQ2KJ9Cw7LM0ecfMA00";

type LockState = {
  unlocked: boolean;
  unlock: () => void;
  lock: () => void;
};

export const useLock = create<LockState>()(
  persist(
    (set) => ({
      unlocked: false,
      unlock: () => set({ unlocked: true }),
      lock: () => set({ unlocked: false }),
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

export function consumePaidUnlockFromUrl() {
  if (typeof window === "undefined") return false;
  const q = new URLSearchParams(window.location.search);
  const token = q.get("t") || "";
  if (!checkPaidToken(token)) return false;
  useLock.getState().unlock();
  return true;
}
