# Next.js 16 App Router Rules

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
