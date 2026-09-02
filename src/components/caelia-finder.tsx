"use client";

import { useState } from "react";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatMoney } from "@/lib/format";

type Answer = "rose" | "noir" | "ivory" | "size_full" | "size_mini" | "either";

const QUESTIONS = [
  {
    key: "vibe",
    label: "Qual e il tuo stile?",
    options: [
      { value: "rose", label: "Caldo, naturale, luminoso" },
      { value: "ivory", label: "Pulito, essenziale, nordico" },
      { value: "noir", label: "Deciso, notturno, deciso" },
    ] as { value: Answer; label: string }[],
  },
  {
    key: "carry",
    label: "Dove lo porti?",
    options: [
      { value: "size_full", label: "Borsa grande, sempre con me" },
      { value: "either", label: "Pochette da sera, alternate" },
      { value: "size_mini", label: "Tasca della giacca, solo l essenziale" },
    ] as { value: Answer; label: string }[],
  },
] as const;

const RECOMMENDATIONS: Record<string, {
  handle: string;
  variantId: string;
  reason: string;
}> = {
  rose_full: {
    handle: "beauty-mirror-case",
    variantId: "beauty-case-rose",
    reason: "Il formato completo con specchio, matita e gloss nella tonalita Rose. Pensato per chi porta sempre con se tutto cio che serve.",
  },
  rose_mini: {
    handle: "beauty-mirror-case-mini",
    variantId: "beauty-case-mini-rose",
    reason: "Il mini in Rose entra in ogni pochette. Specchio e gloss, perfetto per la sera.",
  },
  noir_full: {
    handle: "beauty-mirror-case",
    variantId: "beauty-case-noir",
    reason: "Beauty Mirror Case in Noir. Deciso, elegante, si abbina a tutto.",
  },
  noir_mini: {
    handle: "beauty-mirror-case-mini",
    variantId: "beauty-case-mini-noir",
    reason: "Mini Noir: stessa eleganza, in formato tascabile.",
  },
  ivory_full: {
    handle: "beauty-mirror-case",
    variantId: "beauty-case-ivory",
    reason: "Beauty Mirror Case in Ivory. Pulito, essenziale, si abbina a tutto.",
  },
  ivory_mini: {
    handle: "beauty-mirror-case-mini",
    variantId: "beauty-case-mini-ivory",
    reason: "Mini Ivory: la tonalita piu chiara, luminosa, per chi cerca un dettaglio discreto.",
  },
};

function recommendKey(vibe: Answer, carry: Answer): keyof typeof RECOMMENDATIONS {
  if (carry === "size_mini") {
    return `${vibe}_mini` as const;
  }
  return `${vibe}_full` as const;
}

export function CaeliaFinder({ all }: { all: Product[] }) {
  const [vibe, setVibe] = useState<Answer | null>(null);
  const [carry, setCarry] = useState<Answer | null>(null);
  const [step, setStep] = useState<0 | 1 | 2>(0);

  const product = all.find((p) =>
    p.handle === RECOMMENDATIONS[recommendKey(vibe ?? "rose", carry ?? "size_full")].handle,
  );
  const recommendation =
    vibe && carry
      ? RECOMMENDATIONS[recommendKey(vibe, carry)]
      : null;

  function reset() {
    setVibe(null);
    setCarry(null);
    setStep(0);
  }

  return (
    <section className="mx-auto max-w-5xl px-6 lg:px-10 py-20">
      <p className="text-xs uppercase tracking-[0.32em] text-ink/60">
        Beauty Finder
      </p>
      <h2 className="mt-3 font-serif text-4xl lg:text-5xl leading-[1.05]">
        Trova la tua CAELIA.
      </h2>
      <p className="mt-4 text-ink/70 max-w-2xl">
        Due domande. Ti consigliamo la tonalita e il formato.
      </p>

      <div className="mt-10 rounded-md bg-cream-deep p-8 lg:p-12">
        {step === 0 && (
          <Question
            number="01"
            question={QUESTIONS[0].label}
            value={vibe}
            onChange={(v) => {
              setVibe(v);
              setStep(1);
            }}
            options={QUESTIONS[0].options}
          />
        )}
        {step === 1 && (
          <Question
            number="02"
            question={QUESTIONS[1].label}
            value={carry}
            onChange={(c) => {
              setCarry(c);
              setStep(2);
            }}
            options={QUESTIONS[1].options}
          />
        )}
        {step === 2 && recommendation && product && (
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-ink/60">
              La tua CAELIA
            </p>
            <h3 className="mt-3 font-serif text-3xl">
              {product.variants.find((v) => v.id === recommendation.variantId)?.title}
            </h3>
            <p className="mt-4 text-ink/80 leading-relaxed max-w-2xl">
              {recommendation.reason}
            </p>
            <div className="mt-6 flex items-baseline gap-3">
              <span className="font-serif text-2xl">
                {formatMoney(
                  product.variants.find((v) => v.id === recommendation.variantId)
                    ?.price ?? product.variants[0].price,
                )}
              </span>
              <span className="text-xs uppercase tracking-[0.18em] text-ink/60">
                spedizione gratuita sopra € 60
              </span>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/products/${product.handle}`}
                className="inline-flex items-center justify-center bg-charcoal text-cream px-8 py-4 text-xs uppercase tracking-[0.22em] hover:bg-rose transition-colors"
              >
                Scopri
              </Link>
              <button
                type="button"
                onClick={reset}
                className="text-xs uppercase tracking-[0.22em] nav-link"
              >
                Ricomincia
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function Question({
  number,
  question,
  value,
  onChange,
  options,
}: {
  number: string;
  question: string;
  value: Answer | null;
  onChange: (v: Answer) => void;
  options: { value: Answer; label: string }[];
}) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.22em] text-ink/60">
        Domanda {number}
      </p>
      <p className="mt-2 font-serif text-2xl lg:text-3xl leading-tight">{question}</p>
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            aria-pressed={value === opt.value}
            className={`text-left rounded-md border p-4 transition-colors ${
              value === opt.value
                ? "border-charcoal bg-cream"
                : "border-mist hover:border-charcoal/40"
            }`}
          >
            <span className="block text-sm">{opt.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}