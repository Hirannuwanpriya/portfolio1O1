---
name: seo-metadata
description: Use whenever creating or modifying a page in app/ — every page in this repo must export generateMetadata() and inject JSON-LD structured data matching the schema map. Also activates when the user mentions SEO, metadata, OpenGraph, Twitter cards, structured data, JSON-LD, canonical URLs, or sitemap entries.
---

# SEO Metadata & Structured Data

Every page on hirannuwanpriya.com must satisfy this checklist. SEO is the primary traffic source for the site.

## Per-page metadata (mandatory)

Every `page.tsx` exports:

```ts
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "...",
    description: "...",
    alternates: { canonical: "https://hirannuwanpriya.com/<path>" },
    openGraph: {
      title: "...",
      description: "...",
      url: "https://hirannuwanpriya.com/<path>",
      images: [{ url: "/og/<image>.png", width: 1200, height: 630 }],
      type: "website" | "article" | "profile",
    },
    twitter: {
      card: "summary_large_image",
      title: "...",
      description: "...",
      images: ["/og/<image>.png"],
    },
  };
}
```

Centralise this in `lib/seo.ts` so pages call a helper instead of duplicating literal objects.

## JSON-LD structured data

Inject a `<script type="application/ld+json">` element in the page body. Use `lib/structured-data.ts` to generate the JSON. Schema by page:

| Page                  | Schema type                              |
|-----------------------|------------------------------------------|
| `/`                   | `Person` + `WebSite`                     |
| `/about`              | `ProfilePage` + `Person`                 |
| `/experience`         | `ProfilePage`                            |
| `/projects`           | `CollectionPage`                         |
| `/projects/[slug]`    | `CreativeWork` or `SoftwareApplication`  |
| `/blog`               | `Blog`                                   |
| `/blog/[slug]`        | `BlogPosting`                            |
| `/resume`             | `ProfilePage`                            |
| `/contact`            | `ContactPage`                            |

## Sitemap & robots

- `app/sitemap.ts` — include every public page; for `/projects/[slug]` and `/blog/[slug]` enumerate slugs from MDX files.
- `app/robots.ts` — `Allow: /`, point `sitemap` at `https://hirannuwanpriya.com/sitemap.xml`.

## Verification before marking done

- View page source → confirm `<title>`, `<meta name="description">`, `<link rel="canonical">`, OG tags, Twitter tags, and JSON-LD all present.
- Validate JSON-LD at https://validator.schema.org/ if structure is non-trivial.
