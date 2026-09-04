import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, journalPosts } from "@/lib/journal";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return journalPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function JournalArticlePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  return (
    <article className="shell max-w-3xl pt-16 pb-24">
      <Link href="/journal" className="text-xs uppercase tracking-[0.22em] nav-link">
        ← Journal
      </Link>
      <p className="mt-8 text-xs uppercase tracking-[0.32em] text-ink/60">
        {post.date} · {post.readTime} · {post.city}
      </p>
      <h1 className="mt-4 font-serif fluid-h2">{post.title}</h1>
      <p className="mt-4 text-sm text-ink/60">{post.author}</p>
      <div className="mt-10 space-y-6 text-lg leading-relaxed text-ink/80">
        {post.body.map((para) => (
          <p key={para.slice(0, 32)}>{para}</p>
        ))}
      </div>
    </article>
  );
}
