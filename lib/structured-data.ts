import { SITE_NAME, SITE_URL } from "@/lib/seo";

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

const PERSON_SAME_AS = [
  "https://linkedin.com/in/hirannuwanpriya",
  "https://github.com/hirannuwanpriya",
] as const;

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
    sameAs: [...PERSON_SAME_AS],
    knowsAbout: [...PERSON_KNOWS_ABOUT],
    address: {
      "@type": "PostalAddress",
      addressCountry: "AU",
      addressRegion: "TAS",
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
 * Serialise one or more JSON-LD objects for inline `<script>` injection.
 * If a single schema is passed it is serialised directly; otherwise an array.
 */
export function serializeJsonLd(
  schema: JsonLdObject | JsonLdObject[],
): string {
  return JSON.stringify(schema);
}
