import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  BlogPostHeader,
  MdxContent,
} from "@/components/features/blog";
import CTASection from "@/components/features/home/CTASection";
import {
  getAllPostSlugs,
  getPostBySlug,
} from "@/lib/blog";
import { buildArticleMetadata } from "@/lib/seo";
import {
  blogPostingSchema,
  serializeJsonLd,
} from "@/lib/structured-data";

interface BlogPostPageParams {
  slug: string;
}

interface BlogPostPageProps {
  params: Promise<BlogPostPageParams>;
}

export async function generateStaticParams(): Promise<BlogPostPageParams[]> {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return {
      title: "Article not found",
      description: "The article you’re looking for could not be found.",
    };
  }
  return buildArticleMetadata({
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    path: `/blog/${post.slug}`,
    ogImage: post.frontmatter.coverImage,
    publishedTime: post.frontmatter.date,
    tags: post.frontmatter.tags,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const jsonLd = serializeJsonLd(
    blogPostingSchema({
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      slug: post.slug,
      datePublished: post.frontmatter.date,
      tags: post.frontmatter.tags,
      image: post.frontmatter.coverImage,
    }),
  );

  return (
    <>
      <script
        type="application/ld+json"
        // JSON.stringify output is safe for inline JSON-LD here.
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      <article>
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 pt-20 pb-10 md:px-8 md:pt-28 md:pb-14 lg:px-12">
            <BlogPostHeader
              post={{
                title: post.frontmatter.title,
                description: post.frontmatter.description,
                date: post.frontmatter.date,
                tags: post.frontmatter.tags,
                readingTime: post.readingTime,
              }}
            />
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 pb-20 md:px-8 md:pb-28 lg:px-12">
            <MdxContent source={post.body} />
          </div>
        </section>
      </article>

      <CTASection />
    </>
  );
}
