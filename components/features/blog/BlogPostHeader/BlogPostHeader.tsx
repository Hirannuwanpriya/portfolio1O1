import Link from "next/link";
import SectionLabel from "@/components/ui/SectionLabel";

export interface BlogPostHeaderData {
  title: string;
  description: string;
  /** ISO date string (YYYY-MM-DD). */
  date: string;
  tags: string[];
  readingTime: string;
}

interface BlogPostHeaderProps {
  post: BlogPostHeaderData;
}

const DATE_FORMAT = new Intl.DateTimeFormat("en-AU", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

function formatDate(iso: string): string {
  return DATE_FORMAT.format(new Date(iso));
}

/**
 * Article header for `/blog/[slug]`: back-to-blog crumb, label, large
 * editorial title, short lede, and a meta strip (date · reading time · tags).
 */
export default function BlogPostHeader({ post }: BlogPostHeaderProps) {
  return (
    <header className="mx-auto max-w-3xl">
      <div className="mb-6 flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-[var(--color-text-secondary)]">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 transition-colors duration-150 hover:text-[var(--color-accent-blue)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-blue)]"
        >
          <span aria-hidden="true">←</span> All articles
        </Link>
      </div>

      <SectionLabel className="mb-4">Article</SectionLabel>

      <h1 className="text-4xl font-bold leading-[1.1] tracking-[-0.03em] text-[var(--color-text-primary)] md:text-5xl lg:text-6xl">
        {post.title}
      </h1>

      <p className="mt-6 text-base leading-relaxed text-[var(--color-text-secondary)] md:text-lg">
        {post.description}
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-[var(--color-border)] pt-6 font-mono text-xs uppercase tracking-wide text-[var(--color-text-secondary)]">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span aria-hidden="true">·</span>
        <span>{post.readingTime}</span>
        {post.tags.length > 0 ? (
          <>
            <span aria-hidden="true">·</span>
            <ul className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded border border-[var(--color-border)] bg-[var(--color-bg-soft)] px-2 py-0.5 text-[var(--color-text-primary)]"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </div>
    </header>
  );
}
