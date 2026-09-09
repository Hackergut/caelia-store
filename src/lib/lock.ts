import { create } from "zustand";
import { persist } from "zustand/middleware";

export const PREVIEW_PASSWORD = "Tp299-5($&zj";

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
