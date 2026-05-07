import type { ExperienceEntry } from "@/lib/experience";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
import { SITE_CONTACT } from "@/lib/site-contact";

export interface JsonLdObject {
  "@context"?: string;
  "@type": string;
  [key: string]: unknown;
}

const PERSON_KNOWS_ABOUT = [
  "Laravel",
  "PHP",
  "Symfony",
  "Node.js",
  "React",
  "Next.js",
  "Vue.js",
  "TypeScript",
  "Tailwind CSS",
  "GraphQL",
  "AWS",
  "Docker",
  "Kubernetes",
  "PostgreSQL",
  "MySQL",
  "Redis",
  "MongoDB",
  "SaaS",
  "CRM",
  "ERP",
] as const;

const PERSON_SAME_AS = [SITE_CONTACT.linkedin, SITE_CONTACT.github] as const;

/**
 * Person JSON-LD reused across pages that describe Hiran personally.
 */
export function personSchema(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_NAME,
    jobTitle: "Full Stack Engineer",
    url: SITE_URL,
    email: SITE_CONTACT.email,
    telephone: SITE_CONTACT.phone,
    sameAs: [...PERSON_SAME_AS],
    knowsAbout: [...PERSON_KNOWS_ABOUT],
    address: {
      "@type": "PostalAddress",
      addressCountry: "AU",
      addressRegion: "TAS",
      addressLocality: "Hobart",
    },
  };
}

/**
 * WebSite JSON-LD for the site root.
 */
export function webSiteSchema(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "en-AU",
  };
}

export interface CollectionItem {
  name: string;
  url: string;
  description?: string;
}

/**
 * CollectionPage JSON-LD for `/projects` (and reusable for any list page).
 * The contained items are exposed as an `ItemList` so search engines can
 * understand the listing structure.
 */
export function collectionPageSchema(input: {
  name: string;
  description: string;
  path: string;
  items: CollectionItem[];
}): JsonLdObject {
  const url = `${SITE_URL}${input.path === "/" ? "" : input.path}`;
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: input.name,
    description: input.description,
    url,
    inLanguage: "en-AU",
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntity: {
      "@type": "ItemList",
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      numberOfItems: input.items.length,
      itemListElement: input.items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: item.url,
        name: item.name,
        ...(item.description ? { description: item.description } : {}),
      })),
    },
  };
}

/**
 * ProfilePage JSON-LD for `/experience` (and reusable for `/about`, `/resume`).
 *
 * Embeds a `Person` `mainEntity` with `hasOccupation` entries derived from the
 * canonical experience timeline so Google can map each role to its employer
 * and dates.
 */
export function profilePageSchema(input: {
  name: string;
  description: string;
  path: string;
  experience: readonly ExperienceEntry[];
}): JsonLdObject {
  const url = `${SITE_URL}${input.path === "/" ? "" : input.path}`;
  const occupations = input.experience.map((entry) => {
    const occupation: JsonLdObject = {
      "@type": "OrganizationRole",
      roleName: entry.role,
      startDate: entry.startYear,
      ...(entry.endYear ? { endDate: entry.endYear } : {}),
      worksFor: {
        "@type": "Organization",
        name: entry.company,
        ...(entry.location ? { address: entry.location } : {}),
      },
      description: entry.summary,
    };
    return occupation;
  });

  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: input.name,
    description: input.description,
    url,
    inLanguage: "en-AU",
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntity: {
      ...stripContext(personSchema()),
      hasOccupation: occupations,
    },
  };
}

export interface BlogListingItem {
  title: string;
  slug: string;
  description: string;
  date: string;
}

/**
 * `Blog` JSON-LD for `/blog`. Lists each post as a nested `BlogPosting`
 * stub so search engines can discover the full archive from a single page.
 */
export function blogListingSchema(input: {
  name: string;
  description: string;
  path: string;
  posts: BlogListingItem[];
}): JsonLdObject {
  const url = `${SITE_URL}${input.path === "/" ? "" : input.path}`;
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: input.name,
    description: input.description,
    url,
    inLanguage: "en-AU",
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
    author: stripContext(personSchema()),
    blogPost: input.posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      url: `${SITE_URL}/blog/${post.slug}`,
      author: {
        "@type": "Person",
        name: SITE_NAME,
        url: SITE_URL,
      },
    })),
  };
}

export interface BlogPostingSchemaInput {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  /** Optional last-updated date — falls back to `datePublished`. */
  dateModified?: string;
  tags?: readonly string[];
  /** Absolute or site-root-relative image URL. */
  image?: string;
}

/**
 * `BlogPosting` JSON-LD for `/blog/[slug]`. Wires the post to the canonical
 * `Person` author and back to the site, plus tags as `keywords` for topical
 * relevance.
 */
export function blogPostingSchema(input: BlogPostingSchemaInput): JsonLdObject {
  const url = `${SITE_URL}/blog/${input.slug}`;
  const image = input.image
    ? input.image.startsWith("http")
      ? input.image
      : `${SITE_URL}${input.image.startsWith("/") ? "" : "/"}${input.image}`
    : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: input.title,
    description: input.description,
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    url,
    inLanguage: "en-AU",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    author: stripContext(personSchema()),
    publisher: {
      "@type": "Person",
      name: SITE_NAME,
      url: SITE_URL,
    },
    isPartOf: {
      "@type": "Blog",
      name: `${SITE_NAME} — Blog`,
      url: `${SITE_URL}/blog`,
    },
    ...(image ? { image: [image] } : {}),
    ...(input.tags && input.tags.length > 0
      ? { keywords: input.tags.join(", ") }
      : {}),
  };
}

/**
 * `ContactPage` JSON-LD for `/contact`. Embeds a `ContactPoint` (email + phone)
 * plus the canonical `Person` as `mainEntity` so search engines can resolve
 * the site owner directly from the contact route.
 */
export function contactPageSchema(input: {
  name: string;
  description: string;
  path: string;
}): JsonLdObject {
  const url = `${SITE_URL}${input.path === "/" ? "" : input.path}`;
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: input.name,
    description: input.description,
    url,
    inLanguage: "en-AU",
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntity: {
      ...stripContext(personSchema()),
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "business",
        email: SITE_CONTACT.email,
        telephone: SITE_CONTACT.phone,
        areaServed: ["AU", "NZ", "Worldwide"],
        availableLanguage: ["English"],
      },
    },
  };
}

export interface ProjectSchemaInput {
  title: string;
  description: string;
  slug: string;
  /** "CreativeWork" (default) or "SoftwareApplication". */
  type?: "CreativeWork" | "SoftwareApplication";
  /** Required when `type === "SoftwareApplication"`. */
  applicationCategory?: string;
  techStack?: readonly string[];
  liveUrl?: string;
  /** Absolute or site-root-relative cover image URL. */
  image?: string;
  datePublished?: string;
}

/**
 * `CreativeWork` or `SoftwareApplication` JSON-LD for `/projects/[slug]`.
 * Per `.claude/rules/seo.md` schema map, project case-study pages emit one of
 * these two schema types — the choice is driven by the project frontmatter.
 */
export function projectSchema(input: ProjectSchemaInput): JsonLdObject {
  const url = `${SITE_URL}/projects/${input.slug}`;
  const image = input.image
    ? input.image.startsWith("http")
      ? input.image
      : `${SITE_URL}${input.image.startsWith("/") ? "" : "/"}${input.image}`
    : undefined;

  const type = input.type ?? "CreativeWork";

  const base: JsonLdObject = {
    "@context": "https://schema.org",
    "@type": type,
    name: input.title,
    headline: input.title,
    description: input.description,
    url,
    inLanguage: "en-AU",
    author: stripContext(personSchema()),
    creator: stripContext(personSchema()),
    ...(image ? { image: [image] } : {}),
    ...(input.datePublished ? { datePublished: input.datePublished } : {}),
    ...(input.techStack && input.techStack.length > 0
      ? { keywords: input.techStack.join(", ") }
      : {}),
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };

  if (type === "SoftwareApplication") {
    return {
      ...base,
      ...(input.applicationCategory
        ? { applicationCategory: input.applicationCategory }
        : {}),
      ...(input.liveUrl ? { installUrl: input.liveUrl } : {}),
      operatingSystem: "Web",
    };
  }

  return base;
}

/**
 * Remove the top-level `@context` so a schema can be safely embedded as a
 * nested entity inside another JSON-LD object.
 */
function stripContext(schema: JsonLdObject): JsonLdObject {
  const { "@context": _omit, ...rest } = schema;
  void _omit;
  return rest as JsonLdObject;
}

/**
 * Serialise one or more JSON-LD objects for inline `<script>` injection.
 * If a single schema is passed it is serialised directly; otherwise an array.
 */
export function serializeJsonLd(
  schema: JsonLdObject | JsonLdObject[],
): string {
  return JSON.stringify(schema);
}
