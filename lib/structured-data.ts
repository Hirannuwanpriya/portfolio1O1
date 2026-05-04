import { SITE_NAME, SITE_URL } from "@/lib/seo";

export interface JsonLdObject {
  "@context"?: string;
  "@type": string;
  [key: string]: unknown;
}

const PERSON_KNOWS_ABOUT = [
  "Laravel",
  "PHP",
  "React",
  "Next.js",
  "Vue.js",
  "TypeScript",
  "Tailwind CSS",
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

/**
 * Serialise one or more JSON-LD objects for inline `<script>` injection.
 * If a single schema is passed it is serialised directly; otherwise an array.
 */
export function serializeJsonLd(
  schema: JsonLdObject | JsonLdObject[],
): string {
  return JSON.stringify(schema);
}
