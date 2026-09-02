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

type WishlistContextValue = {
  handles: string[];
  has: (handle: string) => boolean;
  toggle: (handle: string) => void;
  add: (handle: string) => void;
  remove: (handle: string) => void;
};

const WishlistContext = createContext<WishlistContextValue | null>(null);
const STORAGE_KEY = "caelia_wishlist_v1";

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [handles, setHandles] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setHandles(parsed);
      }
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(handles));
    } catch {
      // ignore
    }
  }, [handles, hydrated]);

  const has = useCallback((h: string) => handles.includes(h), [handles]);
  const add = useCallback((h: string) => {
    setHandles((cur) => (cur.includes(h) ? cur : [...cur, h]));
  }, []);
  const remove = useCallback((h: string) => {
    setHandles((cur) => cur.filter((x) => x !== h));
  }, []);
  const toggle = useCallback((h: string) => {
    setHandles((cur) =>
    cur.includes(h) ? cur.filter((x) => x !== h) : [...cur, h],
    );
  }, []);

  const value = useMemo(
    () => ({ handles, has, add, remove, toggle }),
    [handles, has, add, remove, toggle],
  );

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist(): WishlistContextValue {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
