import Link from "next/link";

export interface BlogCardData {
  title: string;
  description: string;
  /** ISO date string (YYYY-MM-DD). */
  date: string;
  tags: string[];
  readingTime: string;
  href: string;
}

interface BlogCardProps {
  post: BlogCardData;
}

const DATE_FORMAT = new Intl.DateTimeFormat("en-AU", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

function formatDate(iso: string): string {
  return DATE_FORMAT.format(new Date(iso));
}

/**
 * Blog card for the `/blog` listing — editorial layout per design skill:
 * monospace meta row (date · reading time), large serif/sans title, short
 * excerpt, monospace tag chips, "Read article" link affordance.
 */
export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group flex h-full flex-col gap-4 rounded-lg border border-[var(--color-border)] bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md md:p-8">
      <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-wide text-[var(--color-text-secondary)]">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span aria-hidden="true">·</span>
        <span>{post.readingTime}</span>
      </div>

      <h2 className="text-2xl font-semibold leading-tight tracking-tight text-[var(--color-text-primary)] md:text-3xl">
        <Link
          href={post.href}
          className="transition-colors duration-150 hover:text-[var(--color-accent-blue)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent-blue)]"
        >
          {post.title}
        </Link>
      </h2>

      <p className="text-base leading-relaxed text-[var(--color-text-secondary)]">
        {post.description}
      </p>

      {post.tags.length > 0 ? (
        <ul className="mt-1 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <li
              key={tag}
              className="rounded border border-[var(--color-border)] bg-[var(--color-bg-soft)] px-2 py-0.5 font-mono text-xs text-[var(--color-text-primary)]"
            >
              {tag}
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-auto pt-2">
        <Link
          href={post.href}
          className="inline-flex items-center gap-1 rounded-sm text-sm text-[var(--color-text-primary)] underline-offset-4 transition-colors duration-150 hover:text-[var(--color-accent-blue)] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-blue)]"
        >
          Read article <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
