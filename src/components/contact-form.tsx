"use client";

import { useState } from "react";

type Status = "idle" | "ok";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // No backend wired yet: acknowledge locally so the form is usable.
    // Swap this for a POST to a route handler (or Resend) when available.
    setStatus("ok");
    e.currentTarget.reset();
  }

  if (status === "ok") {
    return (
      <div className="rounded-md bg-cream-deep p-8 text-center">
        <p className="font-serif text-2xl">Grazie per averci scritto.</p>
        <p className="mt-2 text-ink/70">
          Ti risponderemo entro 1–2 giorni lavorativi.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-xs uppercase tracking-[0.22em] text-burgundy hover:text-burgundy-deep"
        >
          Invia un altro messaggio
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className="text-xs uppercase tracking-[0.18em] text-ink/60">Nome</span>
          <input
            type="text"
            name="name"
            required
            className="mt-2 w-full border-b border-mist/60 bg-transparent py-2 text-sm focus:border-burgundy focus:outline-none"
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-[0.18em] text-ink/60">Email</span>
          <input
            type="email"
            name="email"
            required
            className="mt-2 w-full border-b border-mist/60 bg-transparent py-2 text-sm focus:border-burgundy focus:outline-none"
          />
        </label>
      </div>
      <label className="block">
        <span className="text-xs uppercase tracking-[0.18em] text-ink/60">Oggetto</span>
        <input
          type="text"
          name="subject"
          className="mt-2 w-full border-b border-mist/60 bg-transparent py-2 text-sm focus:border-burgundy focus:outline-none"
        />
      </label>
      <label className="block">
        <span className="text-xs uppercase tracking-[0.18em] text-ink/60">Messaggio</span>
        <textarea
          name="message"
          required
          rows={5}
          className="mt-2 w-full resize-none border-b border-mist/60 bg-transparent py-2 text-sm focus:border-burgundy focus:outline-none"
        />
      </label>
      <button
        type="submit"
        className="inline-flex items-center justify-center bg-burgundy text-cream px-7 py-3.5 text-xs uppercase tracking-[0.22em] hover:bg-burgundy-deep transition-colors btn-press"
      >
        Invia messaggio
      </button>
    </form>
  );
}
