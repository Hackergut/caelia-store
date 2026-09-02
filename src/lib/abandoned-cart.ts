"use client";

const STORAGE_KEY = "caelia_abandoned_cart_v1";

type Stored = {
  at: number;
  count: number;
  email?: string;
};

export function readAbandoned(): Stored | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Stored;
  } catch {
    return null;
  }
}

export function writeAbandoned(count: number, email?: string) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ at: Date.now(), count, email } satisfies Stored),
    );
  } catch {
    // ignore
  }
}

export function clearAbandoned() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

/**
 * Returns true if the stored abandoned cart was created more than `ttlMs`
 * milliseconds ago. Defaults to 30 minutes.
 */
export function isStale(stored: Stored | null, ttlMs = 30 * 60 * 1000): boolean {
  if (!stored) return false;
  return Date.now() - stored.at > ttlMs;
}