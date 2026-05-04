# Next.js 16 App Router Rules

## App Router & APIs

- App Router only (`app/`) — no Pages Router.
- This is Next.js **16** with breaking changes vs older versions. Consult `node_modules/next/dist/docs/01-app/` before relying on remembered API behavior.
- Server components by default. Add `"use client"` only when interactivity (state, effects, browser APIs, event handlers) requires it.
- Every `page.tsx` exports `generateMetadata()` returning title, description, canonical, openGraph, twitter.
- Dynamic routes (`[slug]`) export `generateStaticParams()` for static generation.
- Use `next/image` (with explicit `width`, `height`, `alt`) — never raw `<img>`.
- Use `next/link` for internal navigation — never raw `<a href="/...">`.
- Use `next/font/google` — never `<link>` to Google Fonts in HTML.
- API routes: `app/api/<name>/route.ts` exporting named HTTP method handlers (`GET`, `POST`, ...).
- Use `app/sitemap.ts` and `app/robots.ts` for sitemap and robots — don't hand-write XML.

## Component folder structure

Guiding principle: *Locality of relevance* — things that change together should live together. Group by feature/domain, not by file type.

### Top-level layout
- `app/` — route segments + page-level Server Components.
- `components/` — reusable components (server or client), grouped by domain.
- `lib/` — utilities, helpers, API clients.
- `hooks/` — global custom hooks.
- `types/` — global TypeScript types.

### Component-only-used-in-one-route
- If a component is used by only one route, **colocate it under that `app/<route>/` folder** instead of pushing it into `components/`. Don't centralise prematurely.

### Inside `components/` — group by feature/domain
- `components/ui/` — reusable, domain-agnostic primitives (Button, Input, Modal).
- `components/layout/` — structural shell (Header, Footer, Sidebar, MobileMenu).
- `components/features/<feature>/` — feature/domain-specific (e.g. `features/home/Hero.tsx`, `features/blog/BlogCard.tsx`).
- `components/common/` — cross-feature helpers (SEO, ErrorBoundary).
- Avoid one giant flat `components/` folder with 50+ files.
- Avoid nesting deeper than 3-4 levels.

### Colocate per component
- Each component owns its own folder containing implementation, tests, stories, and scoped styles.
- Use `index.tsx` as a re-export so imports stay short: `import Button from '@/components/ui/Button'`.

### Barrel exports
- Use `index.ts` barrels at the **group** level (`components/ui/`, `components/features/blog/`) for clean grouped imports: `import { Button, Modal } from '@/components/ui'`.
- Don't add a root `components/index.ts` — it defeats tree-shaking on large surfaces.

### Server vs client naming
- This repo's convention: explicit `"use client"` directive at the top of client component files (no `.client.tsx` / `.server.tsx` suffixes).
- If a feature folder ever needs to make the boundary visible at a glance, the team-wide alternative is the `Component.client.tsx` / `Component.server.tsx` suffix — but pick one convention per feature folder and stick to it.

### Naming conventions
- Component files: **PascalCase** (`UserCard.tsx`).
- Component folders: PascalCase (`UserCard/`) or kebab-case (`user-card/`) — pick one and stay consistent.
- Feature folders: **kebab-case** (`features/blog/`).
- Component-local hooks: camelCase (`useUserCard.ts`).
- Types files: PascalCase with suffix (`UserCard.types.ts`).
