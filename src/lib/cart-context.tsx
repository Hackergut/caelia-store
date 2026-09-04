"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartLine, Money, Product, ProductVariant } from "./types";

type CartContextValue = {
  lines: CartLine[];
  itemCount: number;
  subtotal: Money;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (product: Product, variant: ProductVariant, quantity?: number) => void;
  remove: (variantId: string) => void;
  setQuantity: (variantId: string, quantity: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "caelia_cart_v1";

function toMoney(amount: number, currencyCode: Money["currencyCode"]): Money {
  return {
    amount: amount.toFixed(2),
    currencyCode,
  };
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage once on mount
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartLine[];
        if (Array.isArray(parsed)) setLines(parsed);
      }
    } catch {
      // ignore corrupt storage
    }
    setHydrated(true);
  }, []);

  // Abandoned-cart telemetry: persist a lightweight signal whenever the
  // cart has items but the user closes the tab / navigates without checking
  // out. The signal is consumed by the recovered-cart banner on next visit.
  useEffect(() => {
    if (!hydrated) return;
    if (typeof window === "undefined") return;
    if (lines.length === 0) return;
    const total = lines.reduce((n, l) => n + l.quantity, 0);
    try {
      window.localStorage.setItem(
        "caelia_abandoned_cart_v1",
        JSON.stringify({ at: Date.now(), count: total }),
      );
    } catch {
      // ignore
    }
  }, [lines, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // ignore quota errors
    }
  }, [lines, hydrated]);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const add = useCallback(
    (product: Product, variant: ProductVariant, quantity = 1) => {
      setLines((current) => {
        const idx = current.findIndex((l) => l.variantId === variant.id);
        if (idx >= 0) {
          const next = [...current];
          next[idx] = { ...next[idx], quantity: next[idx].quantity + quantity };
          return next;
        }
        return [
          ...current,
          {
            productHandle: product.handle,
            productTitle: product.title,
            variantId: variant.id,
            variantTitle: variant.title,
            price: variant.price,
            quantity,
            image: product.images[0]?.src ?? "/products/beauty-case-burgundy-front.jpg",
          },
        ];
      });
      setIsOpen(true);
    },
    [],
  );

  const remove = useCallback((variantId: string) => {
    setLines((current) => current.filter((l) => l.variantId !== variantId));
  }, []);

  const setQuantity = useCallback((variantId: string, quantity: number) => {
    setLines((current) => {
      if (quantity <= 0) return current.filter((l) => l.variantId !== variantId);
      return current.map((l) =>
        l.variantId === variantId ? { ...l, quantity } : l,
      );
    });
  }, []);

  const clear = useCallback(() => {
    setLines([]);
    try { window.localStorage.removeItem("caelia_abandoned_cart_v1"); } catch { /* ignore */ }
  }, []);

  const itemCount = useMemo(
    () => lines.reduce((sum, l) => sum + l.quantity, 0),
    [lines],
  );

  const subtotal = useMemo(() => {
    const amount = lines.reduce(
      (sum, l) => sum + Number(l.price.amount) * l.quantity,
      0,
    );
    const currencyCode = lines[0]?.price.currencyCode ?? "EUR";
    return toMoney(amount, currencyCode);
  }, [lines]);

  const value: CartContextValue = {
    lines,
    itemCount,
    subtotal,
    isOpen,
    open,
    close,
    add,
    remove,
    setQuantity,
    clear,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
