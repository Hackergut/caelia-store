"use client";

import { useState } from "react";

export type CheckoutExtras = {
  giftWrap: boolean;
  giftMessage: string;
  notes: string;
};

export function CheckoutExtrasForm({
  value,
  onChange,
}: {
  value: CheckoutExtras;
  onChange: (v: CheckoutExtras) => void;
}) {
  const [open, setOpen] = useState(
    value.giftWrap || value.giftMessage !== "" || value.notes !== "",
  );

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between w-full text-left"
        aria-expanded={open}
      >
        <span className="font-serif text-2xl">Regalo e note</span>
        <span className="text-xs uppercase tracking-[0.22em] text-ink/60">
          {open ? "Chiudi" : "Aggiungi"}
        </span>
      </button>

      {open && (
        <div className="mt-6 space-y-5">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={value.giftWrap}
              onChange={(e) => onChange({ ...value, giftWrap: e.target.checked })}
              className="mt-1 h-4 w-4 rounded border-mist"
            />
            <div>
              <p className="font-medium">Confezione regalo · € 4,90</p>
              <p className="text-sm text-ink/60">
                Astuccio CAELIA chiuso con nastro di raso e biglietto
                personalizzato.
              </p>
            </div>
          </label>

          <label className="block">
            <span className="block text-xs uppercase tracking-[0.22em] text-ink/60 mb-1">
              Biglietto (opzionale, max 200 caratteri)
            </span>
            <textarea
              value={value.giftMessage}
              maxLength={200}
              onChange={(e) => onChange({ ...value, giftMessage: e.target.value })}
              rows={3}
              placeholder="A chi lo regali? Cosa vuoi dirgli?"
              className="w-full border border-mist rounded-md px-4 py-3 text-sm bg-cream focus:outline-none focus:border-charcoal"
            />
            <p className="mt-1 text-xs text-ink/40 text-right">
              {value.giftMessage.length}/200
            </p>
          </label>

          <label className="block">
            <span className="block text-xs uppercase tracking-[0.22em] text-ink/60 mb-1">
              Note ordine (opzionale)
            </span>
            <textarea
              value={value.notes}
              onChange={(e) => onChange({ ...value, notes: e.target.value })}
              rows={2}
              placeholder="Istruzioni di consegna, citofono, orari preferiti..."
              className="w-full border border-mist rounded-md px-4 py-3 text-sm bg-cream focus:outline-none focus:border-charcoal"
            />
          </label>
        </div>
      )}
    </div>
  );
}