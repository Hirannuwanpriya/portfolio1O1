import type { Metadata } from "next";
import SectionLabel from "@/components/ui/SectionLabel";
import {
  BlogCard,
  type BlogCardData,
} from "@/components/features/blog";
import CTASection from "@/components/features/home/CTASection";
import { getAllPosts, type BlogPost } from "@/lib/blog";
import { buildPageMetadata } from "@/lib/seo";
import {
  blogListingSchema,
  serializeJsonLd,
} from "@/lib/structured-data";

const PAGE_PATH = "/blog";
const PAGE_TITLE =
  "Blog | Notes on Laravel, React, Next.js and SaaS Engineering";
const PAGE_DESCRIPTION =
  "Articles by Hiran Nuwanpriya on full stack engineering — Laravel, React, Next.js, scalable SaaS architecture, CRM and ERP development, and SEO-friendly developer tooling.";

export function generateMetadata(): Metadata {
  return buildPageMetadata({
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    path: PAGE_PATH,
  });
}

function toCardData(post: BlogPost): BlogCardData {
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    date: post.frontmatter.date,
    tags: post.frontmatter.tags,
    readingTime: post.readingTime,
    href: `/blog/${post.slug}`,
  };
}

export default async function BlogPage() {
  const posts = await getAllPosts();

  const jsonLd = serializeJsonLd(
    blogListingSchema({
      name: `${PAGE_TITLE.split(" | ")[0]} — Hiran Nuwanpriya`,
      description: PAGE_DESCRIPTION,
      path: PAGE_PATH,
      posts: posts.map((p) => ({
        title: p.frontmatter.title,
        slug: p.slug,
        description: p.frontmatter.description,
        date: p.frontmatter.date,
      })),
    }),
  );

  return (
    <>
      <script
        type="application/ld+json"
        // JSON.stringify output is safe for inline JSON-LD here.
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-28 lg:px-12">
          <div className="mb-12 max-w-3xl md:mb-16">
            <SectionLabel className="mb-4">Blog</SectionLabel>
            <h1 className="text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-[var(--color-text-primary)] md:text-6xl lg:text-7xl">
              Notes on{" "}
              <em className="inline-block font-[var(--font-serif)] font-normal italic">
                shipping software
              </em>
              .
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--color-text-secondary)] md:text-lg">
              Field notes, patterns and opinions from a decade of building
              SaaS, CRM and ERP platforms with Laravel, React, Next.js and
              Vue.js — written for engineers and the people who hire them.
            </p>
          </div>

          {posts.length === 0 ? (
            <p className="text-base text-[var(--color-text-secondary)]">
              New articles are being drafted — check back soon.
            </p>
          ) : (
            <ul
              role="list"
              className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8"
            >
              {posts.map((post) => (
                <li key={post.slug} className="contents">
                  <BlogCard post={toCardData(post)} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}
