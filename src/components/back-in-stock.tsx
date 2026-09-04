"use client";

import { useState } from "react";

export function BackInStockButton({
  sku,
  variantTitle,
}: {
  sku: string;
  variantTitle: string;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "ok" | "err">("idle");
  const [open, setOpen] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.includes("@")) {
      setStatus("err");
      return;
    }
    try {
      // Persist locally for the MVP. Wire to Klaviyo / Shopify Customer
      // Marketing in production.
      const raw = window.localStorage.getItem("caelia_back_in_stock_v1");
      const list: Array<{ sku: string; email: string; at: number }> = raw
        ? (JSON.parse(raw) as Array<{ sku: string; email: string; at: number }>)
        : [];
      list.push({ sku, email, at: Date.now() });
      window.localStorage.setItem(
        "caelia_back_in_stock_v1",
        JSON.stringify(list),
      );
      setStatus("ok");
      setEmail("");
      window.setTimeout(() => setOpen(false), 1800);
    } catch {
      setStatus("err");
    }
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-xs uppercase tracking-[0.22em] nav-link"
      >
        Avvisami quando torna disponibile
      </button>
    );
  }

  return (
    <form onSubmit={submit} className="mt-4 flex flex-col gap-2 max-w-sm">
      <p className="text-xs uppercase tracking-[0.22em] text-ink/60">
        Ti avvisiamo appena torna {variantTitle}
      </p>
      <div className="flex gap-2">
        <input
          type="email"
          required
          placeholder="email@esempio.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 border border-mist rounded-md px-3 py-2 text-sm bg-cream focus:outline-none focus:border-burgundy"
        />
        <button
          type="submit"
          className="px-4 border border-burgundy text-burgundy text-xs uppercase tracking-[0.22em] hover:bg-burgundy hover:text-cream transition-colors"
        >
          Avvisami
        </button>
      </div>
      {status === "ok" && (
        <p className="text-xs text-ink/60">Grazie. Ti scriviamo appena.</p>
      )}
      {status === "err" && (
        <p className="text-xs text-burgundy">Inserisci un indirizzo email valido.</p>
      )}
    </form>
  );
}
