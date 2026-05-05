import type { ComponentPropsWithoutRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";

interface MdxContentProps {
  source: string;
}

const SITE_HOST = "hirannuwanpriya.com";

function isInternalHref(href: string): boolean {
  if (href.startsWith("/")) return true;
  if (href.startsWith("#")) return true;
  try {
    const url = new URL(href);
    return url.hostname === SITE_HOST || url.hostname === `www.${SITE_HOST}`;
  } catch {
    return false;
  }
}

/**
 * Component map handed to `<MDXRemote />` so prose elements get the project's
 * editorial typography and `[link](url)` / `![alt](src)` use `next/link` and
 * `next/image` respectively.
 *
 * Returning `null` for a link without `href` keeps TypeScript happy while
 * matching MDX's loose anchor signature.
 */
const mdxComponents = {
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2
      {...props}
      className="mt-12 text-2xl font-semibold leading-tight tracking-tight text-[var(--color-text-primary)] md:text-3xl"
    />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3
      {...props}
      className="mt-10 text-xl font-semibold leading-snug tracking-tight text-[var(--color-text-primary)] md:text-2xl"
    />
  ),
  h4: (props: ComponentPropsWithoutRef<"h4">) => (
    <h4
      {...props}
      className="mt-8 text-lg font-semibold leading-snug tracking-tight text-[var(--color-text-primary)]"
    />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p
      {...props}
      className="mt-5 text-base leading-relaxed text-[var(--color-text-primary)] md:text-lg"
    />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul
      {...props}
      className="mt-5 list-disc space-y-2 pl-6 text-base leading-relaxed text-[var(--color-text-primary)] md:text-lg"
    />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol
      {...props}
      className="mt-5 list-decimal space-y-2 pl-6 text-base leading-relaxed text-[var(--color-text-primary)] md:text-lg"
    />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => (
    <li {...props} className="pl-1" />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      {...props}
      className="mt-6 border-l-2 border-[var(--color-accent-blue)] bg-[var(--color-bg-soft)] px-5 py-3 text-base italic leading-relaxed text-[var(--color-text-primary)] md:text-lg"
    />
  ),
  hr: (props: ComponentPropsWithoutRef<"hr">) => (
    <hr {...props} className="my-10 border-[var(--color-border)]" />
  ),
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong {...props} className="font-semibold text-[var(--color-text-primary)]" />
  ),
  em: (props: ComponentPropsWithoutRef<"em">) => (
    <em {...props} className="font-[var(--font-serif)] italic" />
  ),
  code: (props: ComponentPropsWithoutRef<"code">) => (
    <code
      {...props}
      className="rounded border border-[var(--color-border)] bg-[var(--color-bg-soft)] px-1.5 py-0.5 font-mono text-[0.875em] text-[var(--color-text-primary)] [pre_&]:border-0 [pre_&]:bg-transparent [pre_&]:p-0"
    />
  ),
  pre: (props: ComponentPropsWithoutRef<"pre">) => (
    <pre
      {...props}
      className="mt-6 overflow-x-auto rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-soft)] p-5 font-mono text-sm leading-relaxed text-[var(--color-text-primary)]"
    />
  ),
  a: ({ href, children, ...rest }: ComponentPropsWithoutRef<"a">) => {
    if (!href) {
      return <a {...rest}>{children}</a>;
    }
    if (isInternalHref(href)) {
      return (
        <Link
          href={href}
          className="text-[var(--color-accent-blue)] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-blue)]"
        >
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        {...rest}
        className="text-[var(--color-accent-blue)] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-blue)]"
      >
        {children}
      </a>
    );
  },
  img: ({ src, alt }: ComponentPropsWithoutRef<"img">) => {
    if (typeof src !== "string" || src === "") return null;
    return (
      <span className="mt-8 block overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-soft)]">
        <Image
          src={src}
          alt={alt ?? ""}
          width={1280}
          height={720}
          className="h-auto w-full"
        />
      </span>
    );
  },
};

/**
 * Server component that renders MDX source for a blog post with the project's
 * editorial typography. Stays on the server — no `"use client"` — so it
 * doesn't ship the MDX runtime to the browser.
 */
export default function MdxContent({ source }: MdxContentProps) {
  return (
    <div className="mx-auto max-w-3xl">
      <MDXRemote source={source} components={mdxComponents} />
    </div>
  );
}
