import type { MetadataRoute } from "next";
import { getAllPostSlugs, getPostBySlug } from "@/lib/blog";
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/content";
import { SITE_URL } from "@/lib/seo";

interface StaticEntry {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}

const STATIC_ENTRIES: StaticEntry[] = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },
  { path: "/experience", changeFrequency: "monthly", priority: 0.8 },
  { path: "/projects", changeFrequency: "monthly", priority: 0.9 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.9 },
  { path: "/resume", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.6 },
];

function absolute(path: string): string {
  return `${SITE_URL}${path === "/" ? "" : path}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticUrls: MetadataRoute.Sitemap = STATIC_ENTRIES.map((entry) => ({
    url: absolute(entry.path),
    lastModified: now,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));

  const blogSlugs = await getAllPostSlugs();
  const blogUrls: MetadataRoute.Sitemap = await Promise.all(
    blogSlugs.map(async (slug) => {
      const post = await getPostBySlug(slug);
      return {
        url: absolute(`/blog/${slug}`),
        lastModified: post ? new Date(post.frontmatter.date) : now,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      };
    }),
  );

  const projectSlugs = await getAllProjectSlugs();
  const projectUrls: MetadataRoute.Sitemap = await Promise.all(
    projectSlugs.map(async (slug) => {
      const project = await getProjectBySlug(slug);
      const lastModified = project?.frontmatter.date
        ? new Date(project.frontmatter.date)
        : now;
      return {
        url: absolute(`/projects/${slug}`),
        lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      };
    }),
  );

  return [...staticUrls, ...blogUrls, ...projectUrls];
}
