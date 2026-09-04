import type { Review } from "@/lib/types";

export function StarRating({ value, className = "" }: { value: number; className?: string }) {
  return (
    <div className={`inline-flex items-center gap-0.5 ${className}`} aria-label={`${value} su 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className={`h-4 w-4 ${i < value ? "text-burgundy" : "text-mist"}`}
          aria-hidden="true"
        >
          <path
            d="M12 2l2.9 6.9L22 10l-5.5 4.8 1.7 7.2L12 18.5 5.8 22l1.7-7.2L2 10l7.1-1.1z"
            fill="currentColor"
          />
        </svg>
      ))}
    </div>
  );
}

export function ProductReviews({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) return null;
  const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  return (
    <section className="mx-auto max-w-7xl px-6 lg:px-10 py-16">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-ink/60">Recensioni</p>
          <h2 className="mt-3 font-serif text-4xl leading-tight">
            Cosa dicono le nostre clienti.
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <StarRating value={Math.round(avg)} />
          <span className="text-sm">
            <strong>{avg.toFixed(1)}</strong> su 5 · {reviews.length} recensioni
          </span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {reviews.map((r) => (
          <article
            key={r.id}
            className="rounded-md bg-cream-deep p-6"
          >
            <div className="flex items-center justify-between">
              <StarRating value={r.rating} />
              {r.verified && (
                <span className="text-xs uppercase tracking-[0.18em] text-ink/60">
                  Acquisto verificato
                </span>
              )}
            </div>
            <h3 className="mt-4 font-serif text-xl leading-tight">{r.title}</h3>
            <p className="mt-3 text-ink/80 leading-relaxed">{r.body}</p>
            <p className="mt-4 text-xs uppercase tracking-[0.18em] text-ink/60">
              {r.author} · {r.location} · {new Date(r.date).toLocaleDateString("it-IT", { year: "numeric", month: "long" })}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
