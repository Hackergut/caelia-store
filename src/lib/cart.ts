import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getProduct } from "./products";

export type CartLine = { handle: string; qty: number };

type CartState = {
  lines: CartLine[];
  add: (handle: string, qty?: number) => void;
  setQty: (handle: string, qty: number) => void;
  remove: (handle: string) => void;
  clear: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      add: (handle, qty = 1) => {
        const existing = get().lines.find((l) => l.handle === handle);
        if (existing) {
          set({
            lines: get().lines.map((l) =>
              l.handle === handle ? { ...l, qty: l.qty + qty } : l,
            ),
          });
        } else {
          set({ lines: [...get().lines, { handle, qty }] });
        }
      },
      setQty: (handle, qty) => {
        if (qty <= 0) {
          set({ lines: get().lines.filter((l) => l.handle !== handle) });
          return;
        }
        set({
          lines: get().lines.map((l) => (l.handle === handle ? { ...l, qty } : l)),
        });
      },
      remove: (handle) =>
        set({ lines: get().lines.filter((l) => l.handle !== handle) }),
      clear: () => set({ lines: [] }),
    }),
    { name: "caelia-cart" },
  ),
);

export function cartCount(lines: CartLine[]) {
  return lines.reduce((n, l) => n + l.qty, 0);
}

export function cartTotal(lines: CartLine[]) {
  return lines.reduce((n, l) => {
    const p = getProduct(l.handle);
    return n + (p ? p.price * l.qty : 0);
  }, 0);
}
