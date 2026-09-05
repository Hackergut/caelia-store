"use client";

import { useState } from "react";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatMoney } from "@/lib/format";

type Answer = "burgundy" | "cacao" | "crema" | "size_full" | "size_mini" | "either";

const QUESTIONS = [
  {
    key: "vibe",
    label: "Qual e il tuo stile?",
    options: [
      { value: "burgundy", label: "Burgundy Caelia — deciso, maison" },
      { value: "cacao", label: "Cacao Caelia — caldo, naturale" },
      { value: "crema", label: "Crema Caelia — luminoso, essenziale" },
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

const RECOMMENDATIONS: Record<
  string,
  {
    handle: string;
    variantId: string;
    reason: string;
  }
> = {
  burgundy_full: {
    handle: "burgundy-caelia",
    variantId: "burgundy-caelia",
    reason:
      "Il formato completo in Burgundy Caelia, il colore principale della maison.",
  },
  burgundy_mini: {
    handle: "burgundy-caelia",
    variantId: "burgundy-caelia",
    reason: "Il Mini in Burgundy Caelia: stesso carattere, formato pochette.",
  },
  cacao_full: {
    handle: "cacao-caelia",
    variantId: "cacao-caelia",
    reason: "Beauty Mirror Case in Cacao Caelia. Cuoio caldo, toscano.",
  },
  cacao_mini: {
    handle: "cacao-caelia",
    variantId: "cacao-caelia",
    reason: "Mini Cacao Caelia: stessa pelle, in formato tascabile.",
  },
  crema_full: {
    handle: "crema-caelia",
    variantId: "crema-caelia",
    reason: "Beauty Mirror Case in Crema Caelia. Luminoso, discreto.",
  },
  crema_mini: {
    handle: "crema-caelia",
    variantId: "crema-caelia",
    reason: "Mini Crema Caelia: la tonalità più chiara, per un dettaglio morbido.",
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

  const product = all.find(
    (p) =>
      p.handle ===
      RECOMMENDATIONS[recommendKey(vibe ?? "burgundy", carry ?? "size_full")].handle,
  );
  const recommendation =
    vibe && carry ? RECOMMENDATIONS[recommendKey(vibe, carry)] : null;

  function reset() {
    setVibe(null);
    setCarry(null);
    setStep(0);
  }

  return (
    <section className="shell max-w-5xl py-20">
      <p className="text-xs uppercase tracking-[0.32em] text-ink/60">
        Beauty Finder
      </p>
      <h2 className="mt-3 font-serif fluid-h2">
        Trova la tua CAELIA.
      </h2>
      <p className="mt-4 text-ink/70 max-w-2xl">
        Due domande. Ti consigliamo la tonalita e il formato: Burgundy, Cacao o
        Crema Caelia.
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
              <span className="text-2xl">
                {formatMoney(
                  product.variants.find((v) => v.id === recommendation.variantId)
                    ?.price ?? product.variants[0].price,
                )}
              </span>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/products/${product.handle}`}
                className="inline-flex items-center justify-center bg-burgundy text-cream px-8 py-4 text-xs uppercase tracking-[0.22em] hover:bg-burgundy-deep transition-colors"
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
                ? "border-burgundy bg-cream"
                : "border-mist hover:border-burgundy/40"
            }`}
          >
            <span className="block text-sm">{opt.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
