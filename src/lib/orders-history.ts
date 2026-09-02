"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "caelia_orders_v1";

export type OrderSummary = {
  orderId: string;
  total: number;
  currencyCode: "EUR" | "USD" | "GBP";
  placedAt: number;
  items: number;
};

export function recordOrder(summary: OrderSummary) {
  if (typeof window === "undefined") return;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const list: OrderSummary[] = raw ? (JSON.parse(raw) as OrderSummary[]) : [];
    const next = [summary, ...list.filter((o) => o.orderId !== summary.orderId)].slice(0, 12);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // ignore
  }
}

export function useOrders(): OrderSummary[] {
  const [orders, setOrders] = useState<OrderSummary[]>([]);
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setOrders(JSON.parse(raw) as OrderSummary[]);
    } catch {
      // ignore
    }
    function onChange(e: StorageEvent) {
      if (e.key === STORAGE_KEY && e.newValue) {
        try { setOrders(JSON.parse(e.newValue) as OrderSummary[]); } catch { /* ignore */ }
      }
    }
    window.addEventListener("storage", onChange);
    return () => window.removeEventListener("storage", onChange);
  }, []);
  return orders;
}