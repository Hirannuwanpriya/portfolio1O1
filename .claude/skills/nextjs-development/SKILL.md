---
name: nextjs-development
description: Use when building or modifying Next.js 16 App Router code in this repo — pages, layouts, API routes, metadata, dynamic routes, server/client component boundaries, sitemap.ts, robots.ts, component folder structure, barrel exports, or anything under app/ and components/. Triggers on mentions of Next.js, App Router, generateMetadata, generateStaticParams, route handlers, or files like page.tsx / layout.tsx / route.ts, plus component organisation, colocation, and feature/domain grouping.
---

# Next.js 16 App Router Development

This project runs Next.js 16 with breaking changes vs older versions. Before relying on remembered API behavior, read `node_modules/next/dist/docs/01-app/` for the relevant topic.

## Conventions

- All routes live under `app/`. A page is `app/<route>/page.tsx`. A layout is `app/<route>/layout.tsx`. An API route is `app/api/<name>/route.ts`.
- **Server components by default.** Add `"use client"` only when the component needs state, effects, browser APIs, or event handlers.
- Every `page.tsx` exports `generateMetadata()` returning `title`, `description`, `alternates: { canonical }`, `openGraph`, and `twitter`.
- Dynamic routes (`[slug]`) export `generateStaticParams()` to enable static generation from MDX content.
- Use `next/image` for images (with `width`, `height`, `alt`).
- Use `next/link` for internal navigation.
- Use `next/font/google` for fonts (already wired for Geist Sans/Mono in `app/layout.tsx` + `globals.css`).
- Path alias: import as `@/...` (e.g. `@/lib/seo`, `@/components/Header`).

## SEO helpers

Centralise metadata generation in `lib/seo.ts` and JSON-LD generation in `lib/structured-data.ts`. Pages should call helpers, not hand-roll metadata objects.

## Sitemap & robots

Use the App Router file conventions: `app/sitemap.ts` exports a default function returning `MetadataRoute.Sitemap`; `app/robots.ts` exports a default function returning `MetadataRoute.Robots`. Do not hand-write XML.

## API routes

`app/api/contact/route.ts` exports named HTTP handlers (`export async function POST(req: Request) { ... }`). Validate input, return `NextResponse.json(...)`. For the contact form: integrate Resend or Formspree — no database in Phase 1.

## Component folder structure

> **Guiding principle:** *Locality of relevance* — things that change together should live together. Group by feature/domain, not by file type.

### Top-level layout

```
app/                   # Route segments + page-level Server Components
components/            # Reusable components (server or client)
lib/                   # Utilities, helpers, API clients
hooks/                 # Global custom hooks
types/                 # Global TypeScript types
```

If a component is used by **only one route**, colocate it inside that route's folder under `app/` instead of pushing it into `components/`. Don't centralise things prematurely.

### Inside `components/` — group by feature/domain

```
components/
├── ui/                 # Reusable, domain-agnostic primitives
│   ├── Button/
│   ├── Input/
│   └── Modal/
├── layout/             # Structural shell (Header, Footer, MobileMenu, etc.)
│   ├── Header/
│   ├── Footer/
│   └── Sidebar/
├── features/           # Feature/domain-specific components
│   ├── projects/
│   │   ├── ProjectCard.tsx
│   │   └── ProjectGrid.tsx
│   ├── blog/
│   │   ├── BlogCard.tsx
│   │   └── BlogList.tsx
│   └── home/
│       ├── Hero.tsx
│       ├── AboutSection.tsx
│       └── LatestWorksSection.tsx
└── common/             # Cross-feature helpers (SEO, ErrorBoundary, etc.)
    ├── SEO.tsx
    └── ErrorBoundary.tsx
```

Avoid one giant flat `components/` folder with 50+ files. Avoid nesting deeper than 3-4 levels.

### Colocate per component

Each component owns its own folder, with everything it needs colocated:

```
components/ui/Button/
├── index.tsx          # Re-export of Button (clean imports)
├── Button.tsx         # Implementation
├── Button.test.tsx    # Unit test (if/when a runner is added)
├── Button.stories.tsx # Storybook (optional)
└── button.module.css  # Scoped styles when not using Tailwind
```

The `index.tsx` re-export pattern keeps imports tidy:

```ts
// Instead of: import Button from '@/components/ui/Button/Button'
import Button from '@/components/ui/Button'
```

### Barrel `index.ts` files for groups

```ts
// components/ui/index.ts
export { default as Button } from './Button';
export { default as Input } from './Input';
export { default as Modal } from './Modal';

// Usage anywhere
import { Button, Modal } from '@/components/ui';
```

Use barrels at the *group* level (`components/ui/`, `components/features/blog/`), not at the project root — root barrels defeat tree-shaking on large surfaces.

### Server vs client component naming

When the boundary is non-obvious from context, suffix the file:

```
components/features/dashboard/
├── StatsCard.server.tsx   # Server Component
└── Chart.client.tsx       # Client Component (uses hooks/browser APIs)
```

In this repo we currently rely on the explicit `"use client"` directive at the top of the file rather than suffixes — pick one convention and stick to it within a feature folder.

### Naming conventions

| Type             | Convention                  | Example                |
|------------------|-----------------------------|------------------------|
| Component file   | PascalCase                  | `UserCard.tsx`         |
| Component folder | PascalCase or kebab-case    | `UserCard/` / `user-card/` |
| Component-local hook | camelCase               | `useUserCard.ts`       |
| Types file       | PascalCase                  | `UserCard.types.ts`    |
| Feature folder   | kebab-case                  | `features/blog/`       |

Pick one and stay consistent across the project.

### Migration guidance for this repo

The current `components/` directory is a flat folder. When it grows past ~15 files, migrate to the structure above incrementally:

1. Move structural shell → `components/layout/` (`Header/`, `Footer/`, `MobileMenu/`, `HeaderClock/`).
2. Move generic primitives → `components/ui/` (`ArrowButton/`, `SectionLabel/`, `StatBlock/`).
3. Move home-page sections → `components/features/home/` (`Hero/`, `AboutSection/`, `LatestWorksSection/`, `CTASection/`, `OpenForProjectsBadge/`).
4. Move project/blog cards → `components/features/projects/` and `components/features/blog/` once those features grow.
5. Add `index.ts` barrels per group.
6. Update `@/components/...` imports in one pass — don't half-migrate.

## Verification

After any change in `app/` or `components/`: `npm run lint && npx tsc --noEmit && npm run build`.
