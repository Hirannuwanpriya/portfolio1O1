import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_ROOT = path.join(process.cwd(), "content");
const PROJECTS_DIR = path.join(CONTENT_ROOT, "projects");

/** Hero band content for the project detail page. */
export interface ProjectHero {
  name: string;
  tagline: string;
}

/** A single stat card in the project detail page stats row. */
export interface ProjectStat {
  value: string;
  label: string;
}

/** A single delivery phase shown in the DELIVERY timeline. */
export interface ProjectPhase {
  title: string;
  description: string;
}

/** A single challenge / learning card. */
export interface ProjectChallenge {
  title: string;
  description: string;
}

/** A gallery image entry — preserved for future use. */
export interface ProjectGalleryItem {
  src: string;
  alt: string;
}

/** SEO override block (per-project). */
export interface ProjectSeo {
  title?: string;
  description?: string;
  ogImage?: string;
}

/** Structured-data hints for the JSON-LD generator. */
export interface ProjectStructuredData {
  /** `CreativeWork` or `SoftwareApplication`. Defaults to `CreativeWork`. */
  type?: "CreativeWork" | "SoftwareApplication";
  /** Used when `type === "SoftwareApplication"`. */
  applicationCategory?: string;
}

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

  /** Detail-page fields (all optional — page sections are conditional). */
  published?: boolean;
  featured?: boolean;
  clientName?: string;
  clientLocation?: string;
  role?: string;
  duration?: string;
  teamSize?: string;
  hero?: ProjectHero;
  stats?: ProjectStat[];
  phases?: ProjectPhase[];
  outcomes?: string[];
  challenges?: ProjectChallenge[];
  gallery?: ProjectGalleryItem[];
  seo?: ProjectSeo;
  structuredData?: ProjectStructuredData;
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
  published?: unknown;
  featured?: unknown;
  clientName?: unknown;
  clientLocation?: unknown;
  role?: unknown;
  duration?: unknown;
  teamSize?: unknown;
  hero?: unknown;
  stats?: unknown;
  phases?: unknown;
  outcomes?: unknown;
  challenges?: unknown;
  gallery?: unknown;
  seo?: unknown;
  structuredData?: unknown;
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

function asOptionalStringArray(value: unknown): string[] | undefined {
  if (value === undefined || value === null) return undefined;
  if (!Array.isArray(value)) return undefined;
  if (value.some((v) => typeof v !== "string")) return undefined;
  return value as string[];
}

function asOptionalNumber(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

function asOptionalBoolean(value: unknown): boolean | undefined {
  return typeof value === "boolean" ? value : undefined;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseHero(value: unknown): ProjectHero | undefined {
  if (!isRecord(value)) return undefined;
  const name = asOptionalString(value.name);
  const tagline = asOptionalString(value.tagline);
  if (!name || !tagline) return undefined;
  return { name, tagline };
}

function parseStats(value: unknown): ProjectStat[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const stats: ProjectStat[] = [];
  for (const item of value) {
    if (!isRecord(item)) continue;
    const v = asOptionalString(item.value);
    const label = asOptionalString(item.label);
    if (!v || !label) continue;
    stats.push({ value: v, label });
  }
  return stats.length > 0 ? stats : undefined;
}

function parsePhases(value: unknown): ProjectPhase[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const phases: ProjectPhase[] = [];
  for (const item of value) {
    if (!isRecord(item)) continue;
    const title = asOptionalString(item.title);
    const description = asOptionalString(item.description);
    if (!title || !description) continue;
    phases.push({ title, description });
  }
  return phases.length > 0 ? phases : undefined;
}

function parseChallenges(value: unknown): ProjectChallenge[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const items: ProjectChallenge[] = [];
  for (const item of value) {
    if (!isRecord(item)) continue;
    const title = asOptionalString(item.title);
    const description = asOptionalString(item.description);
    if (!title || !description) continue;
    items.push({ title, description });
  }
  return items.length > 0 ? items : undefined;
}

function parseGallery(value: unknown): ProjectGalleryItem[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const items: ProjectGalleryItem[] = [];
  for (const item of value) {
    if (!isRecord(item)) continue;
    const src = asOptionalString(item.src);
    const alt = asOptionalString(item.alt);
    if (!src || !alt) continue;
    items.push({ src, alt });
  }
  return items.length > 0 ? items : undefined;
}

function parseSeo(value: unknown): ProjectSeo | undefined {
  if (!isRecord(value)) return undefined;
  const seo: ProjectSeo = {
    title: asOptionalString(value.title),
    description: asOptionalString(value.description),
    ogImage: asOptionalString(value.ogImage),
  };
  if (!seo.title && !seo.description && !seo.ogImage) return undefined;
  return seo;
}

function parseStructuredData(
  value: unknown,
): ProjectStructuredData | undefined {
  if (!isRecord(value)) return undefined;
  const typeRaw = asOptionalString(value.type);
  const type =
    typeRaw === "CreativeWork" || typeRaw === "SoftwareApplication"
      ? typeRaw
      : undefined;
  const applicationCategory = asOptionalString(value.applicationCategory);
  if (!type && !applicationCategory) return undefined;
  return { type, applicationCategory };
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
    published: asOptionalBoolean(raw.published),
    featured: asOptionalBoolean(raw.featured),
    clientName: asOptionalString(raw.clientName),
    clientLocation: asOptionalString(raw.clientLocation),
    role: asOptionalString(raw.role),
    duration: asOptionalString(raw.duration),
    teamSize: asOptionalString(raw.teamSize),
    hero: parseHero(raw.hero),
    stats: parseStats(raw.stats),
    phases: parsePhases(raw.phases),
    outcomes: asOptionalStringArray(raw.outcomes),
    challenges: parseChallenges(raw.challenges),
    gallery: parseGallery(raw.gallery),
    seo: parseSeo(raw.seo),
    structuredData: parseStructuredData(raw.structuredData),
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
 *
 * Projects with `published: false` are excluded.
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

  const visible = entries.filter(
    (e) => e.frontmatter.published !== false,
  );

  return visible.sort((a, b) => {
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
