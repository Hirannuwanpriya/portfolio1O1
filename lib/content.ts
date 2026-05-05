import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_ROOT = path.join(process.cwd(), "content");
const PROJECTS_DIR = path.join(CONTENT_ROOT, "projects");

/**
 * Frontmatter contract for project case-study MDX files
 * (`content/projects/<slug>.mdx`).
 */
export interface ProjectFrontmatter {
  title: string;
  summary: string;
  category?: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  coverImage?: string;
  coverAlt?: string;
  date?: string;
  /** Optional explicit ordering — lower = earlier in the listing. */
  order?: number;
}

/**
 * A parsed project case study, frontmatter + slug + raw MDX body. The body is
 * deliberately exposed as a string so the (future) `[slug]` page can render it
 * with `next-mdx-remote` without re-reading the file.
 */
export interface ProjectEntry {
  slug: string;
  frontmatter: ProjectFrontmatter;
  body: string;
}

interface RawProjectFrontmatter {
  title?: unknown;
  summary?: unknown;
  category?: unknown;
  techStack?: unknown;
  liveUrl?: unknown;
  githubUrl?: unknown;
  coverImage?: unknown;
  coverAlt?: unknown;
  date?: unknown;
  order?: unknown;
}

function asString(value: unknown, field: string, slug: string): string {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(
      `Project "${slug}": frontmatter field "${field}" must be a non-empty string.`,
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
      `Project "${slug}": frontmatter field "${field}" must be an array of strings.`,
    );
  }
  return value as string[];
}

function asOptionalNumber(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

function normaliseFrontmatter(
  raw: RawProjectFrontmatter,
  slug: string,
): ProjectFrontmatter {
  return {
    title: asString(raw.title, "title", slug),
    summary: asString(raw.summary, "summary", slug),
    category: asOptionalString(raw.category),
    techStack: asStringArray(raw.techStack, "techStack", slug),
    liveUrl: asOptionalString(raw.liveUrl),
    githubUrl: asOptionalString(raw.githubUrl),
    coverImage: asOptionalString(raw.coverImage),
    coverAlt: asOptionalString(raw.coverAlt),
    date: asOptionalString(raw.date),
    order: asOptionalNumber(raw.order),
  };
}

/** Slug = filename without `.mdx`. */
function slugFromFilename(filename: string): string {
  return filename.replace(/\.mdx?$/i, "");
}

async function readProjectFile(filename: string): Promise<ProjectEntry> {
  const slug = slugFromFilename(filename);
  const filePath = path.join(PROJECTS_DIR, filename);
  const raw = await fs.readFile(filePath, "utf8");
  const parsed = matter(raw);
  const frontmatter = normaliseFrontmatter(
    parsed.data as RawProjectFrontmatter,
    slug,
  );
  return { slug, frontmatter, body: parsed.content };
}

/**
 * Read every `*.mdx` file under `content/projects/`, sorted for the listing
 * page. Sort order:
 *   1. Explicit `order` (ascending) when present
 *   2. `date` descending (newest first) as a fallback
 *   3. Title ascending as a final tiebreaker
 */
export async function getAllProjects(): Promise<ProjectEntry[]> {
  let files: string[];
  try {
    files = await fs.readdir(PROJECTS_DIR);
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }
    throw err;
  }

  const mdxFiles = files.filter((f) => /\.mdx?$/i.test(f));
  const entries = await Promise.all(mdxFiles.map(readProjectFile));

  return entries.sort((a, b) => {
    const ao = a.frontmatter.order;
    const bo = b.frontmatter.order;
    if (ao !== undefined && bo !== undefined && ao !== bo) return ao - bo;
    if (ao !== undefined && bo === undefined) return -1;
    if (ao === undefined && bo !== undefined) return 1;

    const ad = a.frontmatter.date ?? "";
    const bd = b.frontmatter.date ?? "";
    if (ad !== bd) return ad < bd ? 1 : -1;

    return a.frontmatter.title.localeCompare(b.frontmatter.title);
  });
}

/**
 * Read a single project case study by slug, or `null` if no matching file
 * exists. The future `/projects/[slug]` page will use this.
 */
export async function getProjectBySlug(
  slug: string,
): Promise<ProjectEntry | null> {
  const candidates = [`${slug}.mdx`, `${slug}.md`];
  for (const filename of candidates) {
    try {
      return await readProjectFile(filename);
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code === "ENOENT") continue;
      throw err;
    }
  }
  return null;
}

/** Return every project slug — used by `generateStaticParams()`. */
export async function getAllProjectSlugs(): Promise<string[]> {
  const entries = await getAllProjects();
  return entries.map((e) => e.slug);
}
