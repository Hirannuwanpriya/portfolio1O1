import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_ROOT = path.join(process.cwd(), "content");
const BLOG_DIR = path.join(CONTENT_ROOT, "blog");

/** Average adult silent-reading speed (words per minute). */
const WORDS_PER_MINUTE = 220;

/**
 * Frontmatter contract for blog post MDX files
 * (`content/blog/<slug>.mdx`). Mandatory: title, date, description, tags.
 * Optional: coverImage, coverAlt, readingTime (auto-derived if absent).
 */
export interface BlogFrontmatter {
  title: string;
  /** ISO date string (YYYY-MM-DD). */
  date: string;
  description: string;
  tags: string[];
  coverImage?: string;
  coverAlt?: string;
  /** Override for the auto-derived "X min read" estimate. */
  readingTime?: string;
}

/**
 * Parsed blog post — frontmatter + slug + raw MDX body. The body is exposed
 * as a string so the `[slug]` page can hand it to `next-mdx-remote/rsc`
 * without re-reading the file.
 */
export interface BlogPost {
  slug: string;
  frontmatter: BlogFrontmatter;
  body: string;
  /** Derived reading-time estimate (e.g. "5 min read"). */
  readingTime: string;
}

interface RawBlogFrontmatter {
  title?: unknown;
  date?: unknown;
  description?: unknown;
  tags?: unknown;
  coverImage?: unknown;
  coverAlt?: unknown;
  readingTime?: unknown;
}

function asString(value: unknown, field: string, slug: string): string {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(
      `Blog post "${slug}": frontmatter field "${field}" must be a non-empty string.`,
    );
  }
  return value;
}

function asOptionalString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() !== "" ? value : undefined;
}

function asStringArray(value: unknown, field: string, slug: string): string[] {
  if (!Array.isArray(value) || value.some((v) => typeof v !== "string")) {
    throw new Error(
      `Blog post "${slug}": frontmatter field "${field}" must be an array of strings.`,
    );
  }
  return value as string[];
}

function asIsoDate(value: unknown, slug: string): string {
  if (typeof value !== "string" || Number.isNaN(Date.parse(value))) {
    throw new Error(
      `Blog post "${slug}": frontmatter field "date" must be a valid ISO date string.`,
    );
  }
  // gray-matter may yield a Date when YAML auto-parses — coerce to ISO date.
  return new Date(value).toISOString().slice(0, 10);
}

function normaliseFrontmatter(
  raw: RawBlogFrontmatter,
  slug: string,
): BlogFrontmatter {
  return {
    title: asString(raw.title, "title", slug),
    date: asIsoDate(raw.date, slug),
    description: asString(raw.description, "description", slug),
    tags: asStringArray(raw.tags, "tags", slug),
    coverImage: asOptionalString(raw.coverImage),
    coverAlt: asOptionalString(raw.coverAlt),
    readingTime: asOptionalString(raw.readingTime),
  };
}

/** Slug = filename without `.mdx` / `.md`. */
function slugFromFilename(filename: string): string {
  return filename.replace(/\.mdx?$/i, "");
}

function deriveReadingTime(body: string): string {
  const wordCount = body
    .replace(/```[\s\S]*?```/g, " ") // strip fenced code blocks
    .replace(/`[^`]*`/g, " ") // strip inline code
    .replace(/[#>*_\-[\]()!]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  const minutes = Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE));
  return `${minutes} min read`;
}

async function readBlogFile(filename: string): Promise<BlogPost> {
  const slug = slugFromFilename(filename);
  const filePath = path.join(BLOG_DIR, filename);
  const raw = await fs.readFile(filePath, "utf8");
  const parsed = matter(raw);
  const frontmatter = normaliseFrontmatter(
    parsed.data as RawBlogFrontmatter,
    slug,
  );
  const readingTime = frontmatter.readingTime ?? deriveReadingTime(parsed.content);
  return { slug, frontmatter, body: parsed.content, readingTime };
}

/**
 * Read every `*.mdx` file under `content/blog/`, sorted newest-first by `date`
 * with `title` as a deterministic tiebreaker.
 */
export async function getAllPosts(): Promise<BlogPost[]> {
  let files: string[];
  try {
    files = await fs.readdir(BLOG_DIR);
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }
    throw err;
  }

  const mdxFiles = files.filter((f) => /\.mdx?$/i.test(f));
  const posts = await Promise.all(mdxFiles.map(readBlogFile));

  return posts.sort((a, b) => {
    if (a.frontmatter.date !== b.frontmatter.date) {
      return a.frontmatter.date < b.frontmatter.date ? 1 : -1;
    }
    return a.frontmatter.title.localeCompare(b.frontmatter.title);
  });
}

/**
 * Read a single blog post by slug, or `null` if no matching file exists.
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const candidates = [`${slug}.mdx`, `${slug}.md`];
  for (const filename of candidates) {
    try {
      return await readBlogFile(filename);
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code === "ENOENT") continue;
      throw err;
    }
  }
  return null;
}

/** Return every blog post slug — used by `generateStaticParams()`. */
export async function getAllPostSlugs(): Promise<string[]> {
  const posts = await getAllPosts();
  return posts.map((p) => p.slug);
}
