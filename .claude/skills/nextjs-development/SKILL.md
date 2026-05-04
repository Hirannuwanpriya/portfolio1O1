---
name: nextjs-development
description: Use when building or modifying Next.js 16 App Router code in this repo — pages, layouts, API routes, metadata, dynamic routes, server/client component boundaries, sitemap.ts, robots.ts, or anything under app/. Triggers on mentions of Next.js, App Router, generateMetadata, generateStaticParams, route handlers, or files like page.tsx / layout.tsx / route.ts.
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

## Verification

After any change in `app/`: `npm run lint && npx tsc --noEmit && npm run build`.
