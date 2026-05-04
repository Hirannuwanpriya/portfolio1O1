# Content Rules (MDX)

- Blog posts: `content/blog/<slug>.mdx` — frontmatter: `title`, `date`, `description`, `tags`.
- Project case studies: `content/projects/<slug>.mdx` — frontmatter: `title`, `summary`, `techStack`, `liveUrl`, `githubUrl`.
- Slugs are kebab-case. Filename = URL slug.
- Parse MDX with `next-mdx-remote` (RSC) or `@next/mdx` — pick one and stick with it.
- Never hardcode blog/project data in page components — always read from MDX via `lib/content.ts` helpers.
- Use frontmatter to drive `generateMetadata()` — title, description, date.
