---
name: mdx-content
description: Use when adding, editing, or wiring the MDX content pipeline for blog posts (content/blog/) or project case studies (content/projects/). Activates on mentions of MDX, blog post, case study, frontmatter, next-mdx-remote, or @next/mdx.
---

# MDX Content Pipeline

All long-form content (blog posts, project case studies) lives in `content/` as MDX files. **Never hardcode post or project data in page components** — always read from MDX.

## File locations & frontmatter

### Blog posts — `content/blog/<slug>.mdx`
```yaml
---
title: "How to Build an SEO-Friendly Developer Portfolio with Next.js"
date: "2026-01-15"
description: "Concise meta description, ~150-160 chars, used for OG and SEO."
tags: ["nextjs", "seo", "portfolio"]
---
```

### Project case studies — `content/projects/<slug>.mdx`
```yaml
---
title: "Project Name"
summary: "One-sentence elevator pitch."
techStack: ["Next.js", "Laravel", "PostgreSQL"]
liveUrl: "https://..."
githubUrl: "https://github.com/..."
---
```

## Pipeline

- Use `next-mdx-remote` (RSC-compatible) or `@next/mdx` — pick one and stick with it.
- Read MDX files at build time from a helper in `lib/content.ts` (not directly in `page.tsx`). Helper exports: `getAllPosts()`, `getPostBySlug(slug)`, `getAllProjects()`, `getProjectBySlug(slug)`.
- Use the helper inside `generateStaticParams()` for `/blog/[slug]` and `/projects/[slug]`.
- Frontmatter feeds `generateMetadata()` — title → `<title>`, description → `<meta description>`, date → `<meta property="article:published_time">`.
- Single blog page emits `BlogPosting` JSON-LD; single project emits `CreativeWork` or `SoftwareApplication`.

## Slugs

- File `content/blog/my-post.mdx` → URL `/blog/my-post`.
- Slugs are kebab-case. The filename IS the slug.
