"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "ok" | "err";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as {
          error?: string;
        };
        throw new Error(body.error ?? "Errore di iscrizione");
      }
      setStatus("ok");
      setEmail("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Errore");
      setStatus("err");
    }
  }

  if (status === "ok") {
    return (
      <p className="mt-4 text-sm text-cream">
        Grazie. Ti abbiamo aggiunto alla newsletter.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-4 flex border-b border-mist/60 pb-2">
      <input
        type="email"
        required
        placeholder="email@esempio.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={status === "loading"}
        className="flex-1 bg-transparent text-sm placeholder:text-cream/40 focus:outline-none disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="text-xs uppercase tracking-[0.18em] text-cream/80 hover:text-cream disabled:opacity-50"
      >
        {status === "loading" ? "..." : "Iscriviti"}
      </button>
      {status === "err" && error && (
        <p role="alert" className="ml-3 text-xs text-rose">
          {error}
        </p>
      )}
    </form>
  );
}
