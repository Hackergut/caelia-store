import type { Metadata } from "next";
import Link from "next/link";
import { journalPosts } from "@/lib/journal";

export const metadata: Metadata = {
  title: "Journal",
  description: "Note di stile, rituali e pensieri da Carla e Giulia.",
};

export default function JournalPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 lg:px-10 pt-16 pb-24">
      <p className="text-xs uppercase tracking-[0.32em] text-ink/60">Journal</p>
      <h1 className="mt-4 font-serif text-5xl lg:text-6xl leading-[1.05]">
        Pensieri, rituali,
        <br />
        <span className="italic text-rose">dietro le quinte.</span>
      </h1>

      <div className="mt-16 divide-y divide-mist/60 border-t border-b border-mist/60">
        {journalPosts.map((p, i) => (
          <article
            key={p.slug}
            className="grid md:grid-cols-[1fr_3fr] gap-6 py-10 items-baseline"
          >
            <div className="text-xs uppercase tracking-[0.22em] text-ink/60">
              <p>{p.date}</p>
              <p className="mt-1 text-ink/40">{p.readTime}</p>
            </div>
            <div>
              <h2 className="font-serif text-2xl md:text-3xl leading-snug">
                <span className="text-ink/40 mr-3">0{i + 1}</span>
                {p.title}
              </h2>
              <p className="mt-3 text-ink/70 max-w-2xl">{p.excerpt}</p>
              <Link
                href={`/journal/${p.slug}`}
                className="mt-4 inline-block text-xs uppercase tracking-[0.22em] nav-link"
              >
                Continua a leggere →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
