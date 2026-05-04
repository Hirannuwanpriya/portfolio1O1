# SEO Rules

SEO is the primary traffic source. Every page must satisfy these rules.

## Required on every page
- Unique `<title>` and `<meta name="description">` (~150-160 chars).
- `alternates.canonical` set to the absolute URL.
- `openGraph` block: `title`, `description`, `url`, `images` (1200x630).
- `twitter` block: `card: "summary_large_image"`, `title`, `description`, `images`.
- JSON-LD `<script type="application/ld+json">` matching the page's schema type.

## Schema map
| Page                 | Schema                                  |
|----------------------|-----------------------------------------|
| `/`                  | `Person` + `WebSite`                    |
| `/about`             | `ProfilePage` + `Person`                |
| `/experience`        | `ProfilePage`                           |
| `/projects`          | `CollectionPage`                        |
| `/projects/[slug]`   | `CreativeWork` or `SoftwareApplication` |
| `/blog`              | `Blog`                                  |
| `/blog/[slug]`       | `BlogPosting`                           |
| `/resume`            | `ProfilePage`                           |
| `/contact`           | `ContactPage`                           |

## Centralisation
- Metadata helpers live in `lib/seo.ts` — pages call helpers, don't duplicate literal objects.
- JSON-LD generators live in `lib/structured-data.ts`.

## Site-wide
- `app/sitemap.ts` lists all public URLs (enumerate `/blog/[slug]` and `/projects/[slug]` from MDX).
- `app/robots.ts` allows indexing and points at `/sitemap.xml`.
- Verify Core Web Vitals stay green — no large unsized images, no render-blocking scripts, no heavy client bundles where server would do.
