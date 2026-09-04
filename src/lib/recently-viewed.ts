"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "caelia_recently_viewed_v1";
const MAX_ITEMS = 4;

type Stored = string[];

export function pushRecentlyViewed(handle: string) {
  if (typeof window === "undefined") return;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const list: Stored = raw ? (JSON.parse(raw) as Stored) : [];
    const next = [handle, ...list.filter((h) => h !== handle)].slice(0, MAX_ITEMS);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // ignore
  }
}

export function useRecentlyViewed(): string[] {
  const [handles, setHandles] = useState<string[]>([]);
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setHandles(JSON.parse(raw) as Stored);
    } catch {
      // ignore
    }
    function onChange(e: StorageEvent) {
      if (e.key === STORAGE_KEY && e.newValue) {
        try { setHandles(JSON.parse(e.newValue) as Stored); } catch { /* ignore */ }
      }
    }
    window.addEventListener("storage", onChange);
    return () => window.removeEventListener("storage", onChange);
  }, []);
  return handles;
}