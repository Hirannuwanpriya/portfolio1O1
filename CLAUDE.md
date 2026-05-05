# CLAUDE.md

> Project context file for Claude Code. Keep this file updated as the project evolves.

---

## 0. Agent Workflow (MANDATORY — READ FIRST)

**Every request on this codebase MUST be executed through the agent chain. The main thread is a router and orchestrator only — it does NOT write code, edit files, or run tests directly for any task that touches the project domain.**

### The Locked Agent Chain

```
developer → frontend (if UI work) → qa → reviewer
```

This chain is non-negotiable. The main thread's job is to:

1. Identify the request type and entry agent
2. Delegate via the `Agent` tool with full context
3. Hand off between agents in the correct order
4. Surface the final reviewer summary back to the user

### Entry Agent Selection

| Request type | Entry agent |
|---|---|
| Any Next.js page / API route / lib utility / SEO logic / structured data / sitemap / MDX content pipeline | `developer` |
| Frontend-only UI / React component / Tailwind / accessibility / layout / animation (no data/logic change) | `frontend` |
| Writing or auditing tests for an existing feature | `qa` |
| Final review of completed work | `reviewer` |
| Commit and push completed, reviewed work | `git-commit-push` |
| Codebase exploration / research-only questions (no code change) | `Explore` |
| Implementation planning before a large change | `Plan` |

If the request involves both backend and frontend, **always start with `developer`** — `developer` will hand off to `frontend` when UI work is required.

### Mandatory Handoff Order

1. **`developer`** scaffolds/modifies Next.js pages, API routes, `lib/` utilities, SEO helpers, structured data, and MDX content pipeline.
2. **`frontend`** is invoked by `developer` (or main thread on UI-only work) when React components or Tailwind layout work is needed.
3. **`qa`** is invoked after every code change — writes/updates tests and runs `npm run lint` + `npx tsc --noEmit` + any component tests.
4. **`reviewer`** is the final gate — performs senior-level review against the original requirement, delegates fixes back to `developer` / `frontend` if issues are found, and prints the formatted delivery summary.
5. **`git-commit-push`** runs only after `reviewer` approves AND the user explicitly asks to commit.

Skipping `qa` or `reviewer` is forbidden. Even for trivial backend changes, `qa` confirms test coverage and `reviewer` confirms requirement match.

### When the Main Thread May Act Directly

The main thread may act WITHOUT delegating only for:

- Reading files purely to answer a user question (no code change)
- Updating `CLAUDE.md`, `MEMORY.md`, `.claude/` config files, or other meta/harness files
- Trivial single-line edits to non-domain files (typos, comments, formatting) where the agent chain clearly does not apply
- Invoking skills (e.g., `update-config`, `init`, `review`) that are explicitly user-triggered

For everything else, delegate. When in doubt, delegate.

### Activating the Project Core Skill

At the START of any domain task, review this `CLAUDE.md` before delegating. It defines the locked tech stack, sitemap, component conventions, and SEO rules that every agent must respect.

### Where agents, skills, and rules live

All agents, skills, and rules referenced in this file are defined under `.claude/` in the repo:

```
.claude/
├── agents/
│   ├── developer.md
│   ├── frontend.md
│   ├── qa.md
│   ├── reviewer.md
│   └── git-commit-push.md
├── skills/
│   ├── hn-portfolio-design/SKILL.md   ← SOURCE OF TRUTH for all design decisions
│   ├── nextjs-development/SKILL.md
│   ├── seo-metadata/SKILL.md
│   ├── mdx-content/SKILL.md
│   └── tailwind-design-system/SKILL.md
└── rules/
    ├── typescript.md
    ├── nextjs.md
    ├── seo.md
    ├── content.md
    └── deployment.md
```

- **Agents** are invoked via the `Agent` tool with `subagent_type: <agent-name>` (e.g. `developer`).
- **Skills** auto-activate when their `description` matches the task — they encode the *how* for a domain (Next.js, SEO, MDX, Tailwind).
- **Rules** are short reference files for stable conventions; agents read them on demand. The most important rules are also summarised inline in §3, §4, §8, and §13 below.

### Source of truth for design

`.claude/skills/hn-portfolio-design/SKILL.md` is the **single source of truth** for every visual and UX decision on hirannuwanpriya.com — brand, colour, typography, spacing, motion, component patterns, page-level SEO copy, JSON-LD schemas, accessibility, and performance budgets. **Every page, component, or UI edit MUST consult this skill first.** Where this `CLAUDE.md` and `hn-portfolio-design` disagree on visual specifics (colours, type scale, component patterns), `hn-portfolio-design` wins — update CLAUDE.md to match, never the reverse. Do not introduce new colours, fonts, or component shapes that aren't defined there without explicit approval from the project owner.

### Failure Mode to Avoid

Do NOT write code in the main thread "just this once" because the change feels small. The agent chain exists to enforce SEO metadata rules, TypeScript correctness, mobile responsiveness, and review gates that are easy to bypass when working solo. Every bypass becomes an undocumented exception that breaks future work.

---

## 1. Project Overview

**Name:** hirannuwanpriya.com
**Type:** Professional portfolio website for a Full Stack Software Engineer.
**Goal:** Showcase Hiran Nuwanpriya's skills, experience, and projects to attract job opportunities in Australia, New Zealand, and remote teams. Serve as a strong personal-branding and SEO asset.

**Primary traffic source:** Organic SEO + name/keyword searches from recruiters and hiring managers.
**Primary conversion goals:**
- Contact form submissions (job, freelance, contract enquiries)
- Resume PDF downloads
- LinkedIn profile visits from the site

**Content hierarchy:**
`Home → About | Experience | Projects | Blog | Resume | Contact`

**Target audience:**
- Recruiters in Australia and New Zealand
- Hiring managers and technical leads
- Startup founders and SMB owners
- Remote-first companies seeking full stack developers
- Potential freelance/contract clients

---

## 2. Tech Stack

### Phase 1 (MVP — current)
- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Content:** Markdown / MDX (blog posts, project case studies)
- **Deployment:** Vercel
- **Forms:** Resend, Formspree, or Next.js API route
- **Analytics:** Google Search Console + Vercel Analytics / Google Analytics
- **Resume:** Static downloadable PDF (`/public/resume/hiran-nuwanpriya-resume.pdf`)

### Phase 2 (Future — do not build yet)
- **Backend:** Laravel API
- **CMS:** Filament Admin Panel
- **Database:** MySQL or PostgreSQL
- **Frontend:** Next.js consuming Laravel API

### Quality & Tooling
- **ESLint + Prettier** — JS/TS linting & formatting
- **TypeScript** — strict mode preferred
- **Lighthouse / Core Web Vitals** — performance baseline before launch

---

## 3. Coding Conventions

### General Principles
- Prefer **server components** for static or SEO-critical content; use client components only when interactivity is needed.
- Keep pages in `app/` directory using the Next.js App Router pattern.
- Centralise reusable UI in `components/`; data helpers in `lib/`.
- Every page exports a `generateMetadata()` function for SEO.

### Naming
- **Pages:** lowercase directory with `page.tsx` (e.g. `app/about/page.tsx`)
- **Components:** PascalCase (`HeroSection.tsx`, `ProjectCard.tsx`)
- **Utilities:** camelCase (`lib/seo.ts`, `lib/structured-data.ts`)
- **Content files:** kebab-case slug (`content/blog/my-article.mdx`)
- **Types/interfaces:** PascalCase with descriptive suffix (`ProjectData`, `BlogMeta`)

### SEO Rules (every page)
Every page must export `generateMetadata()` returning:
`title`, `description`, `canonical`, `openGraph` (title, description, image), `twitter` (card, title, description, image), plus a `<script type="application/ld+json">` structured data block.

### Structured Data by Page
| Page | Schema Type |
|---|---|
| Home | `Person` + `WebSite` |
| About | `ProfilePage` + `Person` |
| Experience | `ProfilePage` |
| Projects | `CollectionPage` |
| Single Project | `CreativeWork` or `SoftwareApplication` |
| Blog | `Blog` |
| Single Blog Post | `BlogPosting` |
| Resume | `ProfilePage` |
| Contact | `ContactPage` |

---

## 4. Sitemap & Pages (MVP)

```
hirannuwanpriya.com
├── /                  → Home
├── /about             → About
├── /experience        → Experience
├── /projects          → Projects listing
│   └── /projects/[slug]  → Single project case study
├── /blog              → Blog listing
│   └── /blog/[slug]      → Single blog post
├── /resume            → Resume page + PDF download
└── /contact           → Contact page + form
```

### Per-Page Requirements
Every page must have:
- Unique `<title>` and `<meta description>`
- Canonical URL
- Open Graph tags (title, description, image)
- Twitter Card tags
- JSON-LD structured data
- Mobile-responsive layout
- Fast load (Core Web Vitals green)

---

## 5. Brand & Design System

### Colour Palette
| Purpose | Token | Value |
|---|---|---|
| Background | `bg-white` | `#FFFFFF` |
| Soft background | `bg-[#F8F8F6]` | `#F8F8F6` |
| Primary text | `text-[#111111]` | `#111111` |
| Secondary text | `text-gray-500` | `#4B5563` |
| Border | `border-gray-200` | `#E5E7EB` |
| Accent beige | — | `#F9D5A3` |
| Accent blue | — | `#3498DB` |
| Accent yellow | — | `#F1C40F` |

### Typography
- **Sans-serif body:** Inter, Geist, or Manrope
- **Serif accent (hero only):** Playfair Display or Cormorant Garamond
- Headings: large, editorial, generous line-height
- Body: clean, readable, minimal decoration

### Design Principles
- Minimal, premium, editorial
- White-dominant with soft section breaks
- Strong typographic hierarchy — no heavy colour blocks
- Spacious padding — never cramped
- Accent colours for small details only (badges, icons, links)
- Subtle animations only; no excessive motion
- **Dark feature sections (Footer, Core Skills) are explicit, documented exceptions** — see design skill §6.10 (Footer) and §6.12 (Core Skills variant). No new dark fills without project-owner sign-off.

### Logo
- HN monogram, rounded/geometric, minimal
- Black primary version; accent-colour variants for special use
- Used in header, favicon, and resume PDF branding

---

## 6. Reusable Components

Build these components and use them consistently across all pages:

```
components/
  Header.tsx           # Nav: HN logo + links + mobile menu
  Footer.tsx           # Links, copyright, socials
  HeroSection.tsx      # Large heading + subtext + CTA buttons
  SectionHeading.tsx   # Consistent H2 style for each section
  ProjectCard.tsx      # Title, description, tech stack, link
  BlogCard.tsx         # Title, date, excerpt, read more
  ExperienceTimeline.tsx  # Role, company, period, bullet points
  SkillChip.tsx           # Mono pill primitive (light + dark tones) — see design skill §6.12
  CoreSkillsSection.tsx   # Dark feature section, 6 skill categories — see design skill §6.12
  TechnologyStack.tsx     # Grid of skill chips
  CTASection.tsx          # Full-width call-to-action block
  ContactForm.tsx      # Name, email, message, submit
  ResumeButton.tsx     # Download PDF CTA
  SEOHead.tsx          # generateMetadata helper
  StructuredData.tsx   # JSON-LD script injector
```

Every component must be mobile-responsive from day one.

---

## 7. Folder Structure

```
hirannuwanpriya.com/
├── app/
│   ├── page.tsx                  # Home
│   ├── about/page.tsx
│   ├── experience/page.tsx
│   ├── projects/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── blog/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── resume/page.tsx
│   ├── contact/page.tsx
│   ├── layout.tsx
│   └── globals.css
├── components/                   # All reusable UI components
├── content/
│   ├── projects/                 # MDX project case studies
│   └── blog/                     # MDX blog articles
├── public/
│   ├── images/
│   ├── resume/hiran-nuwanpriya-resume.pdf
│   └── favicon.ico
├── lib/
│   ├── seo.ts                    # generateMetadata helpers
│   └── structured-data.ts        # JSON-LD generators
├── package.json
├── tailwind.config.ts
└── next.config.ts
```

---

## 8. SEO Strategy

### Primary Target Keywords
- Hiran Nuwanpriya
- Full Stack Engineer Australia
- Laravel Developer Australia
- React Developer Australia
- Next.js Developer Australia
- Software Engineer Hobart / Tasmania
- Remote Full Stack Developer Australia

### Secondary Keywords
- SaaS Developer, CRM Developer, ERP Developer
- PHP Laravel Developer, Vue.js Developer
- Business Automation Developer
- SEO Friendly Web Developer
- Software Engineer New Zealand

### Technical SEO Checklist (every page)
- [ ] Unique `title` and `meta description`
- [ ] `canonical_url` set
- [ ] Open Graph tags: `og:title`, `og:description`, `og:image`
- [ ] Twitter Card tags
- [ ] JSON-LD structured data (see §3 for page-to-type map)
- [ ] `sitemap.xml` includes page
- [ ] `robots.txt` allows indexing
- [ ] Mobile usability passes
- [ ] Core Web Vitals green

### Blog SEO Plan
First 5 articles to publish:
1. How to Build an SEO-Friendly Developer Portfolio with Next.js
2. Why Laravel and React Are a Strong Stack for Business Applications
3. How CRM Systems Help Small Businesses Automate Their Workflows
4. Building Scalable SaaS Applications with Laravel
5. How AI Tools Can Improve Software Development Productivity

---

## 9. Development Phases

### Phase 1 — MVP (current)
Build and launch with static Next.js + Vercel:
- Home, About, Experience, Projects (3 case studies), Blog (3 posts), Resume, Contact
- SEO metadata + structured data on all pages
- Downloadable PDF resume
- Contact form (Resend or Formspree)
- Sitemap, robots.txt, Google Search Console setup

**Do not overbuild. Launch fast, then iterate.**

### Phase 2 — Future (do not build yet)
- Laravel + Filament CMS backend
- Admin dashboard for projects/blog/SEO fields
- Newsletter integration
- Case study filters + tags
- Dark mode
- Testimonials section
- AI-powered blog idea generator
- Multilingual support

---

## 10. Success Metrics

Track these via Google Search Console + Analytics:
- Google indexing status per page
- Organic impressions and clicks
- Contact form submissions
- Resume PDF downloads
- LinkedIn profile visits from site
- Project page views
- Blog article traffic
- Average engagement time
- Core Web Vitals scores

---

## 11. Common Commands

### Setup
```bash
npm install
npm run dev
```

### Build & Check
```bash
npm run build          # production build
npm run lint           # ESLint
npm run format         # Prettier
npx tsc --noEmit       # TypeScript check
```

### Content
Blog posts → `content/blog/[slug].mdx`
Project case studies → `content/projects/[slug].mdx`

### Deploy
Push to `main` → Vercel auto-deploys.
Custom domain connected via Vercel dashboard.

---

## 12. Critical Reminders for Claude

When working on this codebase:

1. **This is a Next.js TypeScript project — not Laravel.** Do not suggest PHP, Artisan, or Filament for Phase 1 work.
2. **Every page must export `generateMetadata()`** — SEO metadata is non-negotiable.
3. **All structured data must match the schema type** defined in §3 for that page.
4. **Mobile-first always** — test responsive layout before marking any component done.
5. **Static content via MDX** — blog posts and project case studies live in `content/`, not in a database.
6. **Contact form submissions go via Resend or Formspree API route** — no backend database needed in Phase 1.
7. **Resume PDF is a static file** at `/public/resume/hiran-nuwanpriya-resume.pdf`.
8. **Do not add Phase 2 (Laravel/Filament) features to Phase 1.** Keep MVP lean.
9. **Run `npm run lint` and `npx tsc --noEmit`** before marking any PR ready.
10. **Core Web Vitals must stay green** — avoid heavy animations, large images without `next/image`, or render-blocking scripts.

---

## 13. Linting & Formatting

### JS / TS / React
```bash
npm run lint           # ESLint check
npm run lint:fix       # ESLint autofix
npm run format         # Prettier
npx tsc --noEmit       # TypeScript type check
```

### Pre-commit
Run `eslint` + `prettier` + `tsc --noEmit` before pushing.

<laravel-boost-guidelines>
=== foundation rules ===

# Laravel Boost Guidelines

The Laravel Boost guidelines are specifically curated by Laravel maintainers for this application. These guidelines should be followed closely to ensure the best experience when building Laravel applications.

## Foundational Context

This application is a Laravel application and its main Laravel ecosystems package & versions are below. You are an expert with them all. Ensure you abide by these specific packages & versions.

- php - 8.4
- filament/filament (FILAMENT) - v4
- inertiajs/inertia-laravel (INERTIA_LARAVEL) - v3
- laravel/ai (AI) - v0
- laravel/fortify (FORTIFY) - v1
- laravel/framework (LARAVEL) - v13
- laravel/prompts (PROMPTS) - v0
- laravel/wayfinder (WAYFINDER) - v0
- livewire/livewire (LIVEWIRE) - v3
- larastan/larastan (LARASTAN) - v3
- laravel/boost (BOOST) - v2
- laravel/mcp (MCP) - v0
- laravel/pail (PAIL) - v1
- laravel/pint (PINT) - v1
- laravel/sail (SAIL) - v1
- pestphp/pest (PEST) - v4
- phpunit/phpunit (PHPUNIT) - v12
- @inertiajs/react (INERTIA_REACT) - v3
- react (REACT) - v19
- tailwindcss (TAILWINDCSS) - v4
- @laravel/vite-plugin-wayfinder (WAYFINDER_VITE) - v0
- eslint (ESLINT) - v9
- prettier (PRETTIER) - v3

## Skills Activation

This project has domain-specific skills available. You MUST activate the relevant skill whenever you work in that domain—don't wait until you're stuck.

- `ai-sdk-development` — TRIGGER when working with ai-sdk which is Laravel official first-party AI SDK. Activate when building, editing AI agents, chatbots, text generation, image generation, audio/TTS, transcription/STT, embeddings, RAG, vector stores, reranking, structured output, streaming, conversation memory, tools, queueing, broadcasting, and provider failover across OpenAI, Anthropic, Gemini, Azure, Groq, xAI, DeepSeek, Mistral, Ollama, ElevenLabs, Cohere, Jina, and VoyageAI. Invoke when the user references ai-sdk, the `Laravel\Ai\` namespace, or this project's AI features — not for other AI packages used directly.
- `fortify-development` — ACTIVATE when the user works on authentication in Laravel. This includes login, registration, password reset, email verification, two-factor authentication (2FA/TOTP/QR codes/recovery codes), profile updates, password confirmation, or any auth-related routes and controllers. Activate when the user mentions Fortify, auth, authentication, login, register, signup, forgot password, verify email, 2FA, or references app/Actions/Fortify/, CreateNewUser, UpdateUserProfileInformation, FortifyServiceProvider, config/fortify.php, or auth guards. Fortify is the frontend-agnostic authentication backend for Laravel that registers all auth routes and controllers. Also activate when building SPA or headless authentication, customizing login redirects, overriding response contracts like LoginResponse, or configuring login throttling. Do NOT activate for Laravel Passport (OAuth2 API tokens), Socialite (OAuth social login), or non-auth Laravel features.
- `laravel-best-practices` — Apply this skill whenever writing, reviewing, or refactoring Laravel PHP code. This includes creating or modifying controllers, models, migrations, form requests, policies, jobs, scheduled commands, service classes, and Eloquent queries. Triggers for N+1 and query performance issues, caching strategies, authorization and security patterns, validation, error handling, queue and job configuration, route definitions, and architectural decisions. Also use for Laravel code reviews and refactoring existing Laravel code to follow best practices. Covers any task involving Laravel backend PHP code patterns.
- `wayfinder-development` — Use this skill for Laravel Wayfinder which auto-generates typed functions for Laravel controllers and routes. ALWAYS use this skill when frontend code needs to call backend routes or controller actions. Trigger when: connecting any React/Vue/Svelte/Inertia frontend to Laravel controllers, routes, building end-to-end features with both frontend and backend, wiring up forms or links to backend endpoints, fixing route-related TypeScript errors, importing from @/actions or @/routes, or running wayfinder:generate. Use Wayfinder route functions instead of hardcoded URLs. Covers: wayfinder() vite plugin, .url()/.get()/.post()/.form(), query params, route model binding, tree-shaking. Do not use for backend-only task
- `pest-testing` — Use this skill for Pest PHP testing in Laravel projects only. Trigger whenever any test is being written, edited, fixed, or refactored — including fixing tests that broke after a code change, adding assertions, converting PHPUnit to Pest, adding datasets, and TDD workflows. Always activate when the user asks how to write something in Pest, mentions test files or directories (tests/Feature, tests/Unit, tests/Browser), or needs browser testing, smoke testing multiple pages for JS errors, or architecture tests. Covers: test()/it()/expect() syntax, datasets, mocking, browser testing (visit/click/fill), smoke testing, arch(), Livewire component tests, RefreshDatabase, and all Pest 4 features. Do not use for factories, seeders, migrations, controllers, models, or non-test PHP code.
- `inertia-react-development` — Develops Inertia.js v3 React client-side applications. Activates when creating React pages, forms, or navigation; using <Link>, <Form>, useForm, useHttp, setLayoutProps, or router; working with deferred props, prefetching, optimistic updates, instant visits, or polling; or when user mentions React with Inertia, React pages, React forms, or React navigation.
- `tailwindcss-development` — Always invoke when the user's message includes 'tailwind' in any form. Also invoke for: building responsive grid layouts (multi-column card grids, product grids), flex/grid page structures (dashboards with sidebars, fixed topbars, mobile-toggle navs), styling UI components (cards, tables, navbars, pricing sections, forms, inputs, badges), adding dark mode variants, fixing spacing or typography, and Tailwind v3/v4 work. The core use case: writing or fixing Tailwind utility classes in HTML templates (Blade, JSX, Vue). Skip for backend PHP logic, database queries, API routes, JavaScript with no HTML/CSS component, CSS file audits, build tool configuration, and vanilla CSS.

## Conventions

- You must follow all existing code conventions used in this application. When creating or editing a file, check sibling files for the correct structure, approach, and naming.
- Use descriptive names for variables and methods. For example, `isRegisteredForDiscounts`, not `discount()`.
- Check for existing components to reuse before writing a new one.

## Verification Scripts

- Do not create verification scripts or tinker when tests cover that functionality and prove they work. Unit and feature tests are more important.

## Application Structure & Architecture

- Stick to existing directory structure; don't create new base folders without approval.
- Do not change the application's dependencies without approval.

## Frontend Bundling

- If the user doesn't see a frontend change reflected in the UI, it could mean they need to run `npm run build`, `npm run dev`, or `composer run dev`. Ask them.

## Documentation Files

- You must only create documentation files if explicitly requested by the user.

## Replies

- Be concise in your explanations - focus on what's important rather than explaining obvious details.

=== boost rules ===

# Laravel Boost

## Tools

- Laravel Boost is an MCP server with tools designed specifically for this application. Prefer Boost tools over manual alternatives like shell commands or file reads.
- Use `database-query` to run read-only queries against the database instead of writing raw SQL in tinker.
- Use `database-schema` to inspect table structure before writing migrations or models.
- Use `get-absolute-url` to resolve the correct scheme, domain, and port for project URLs. Always use this before sharing a URL with the user.
- Use `browser-logs` to read browser logs, errors, and exceptions. Only recent logs are useful, ignore old entries.

## Searching Documentation (IMPORTANT)

- Always use `search-docs` before making code changes. Do not skip this step. It returns version-specific docs based on installed packages automatically.
- Pass a `packages` array to scope results when you know which packages are relevant.
- Use multiple broad, topic-based queries: `['rate limiting', 'routing rate limiting', 'routing']`. Expect the most relevant results first.
- Do not add package names to queries because package info is already shared. Use `test resource table`, not `filament 4 test resource table`.

### Search Syntax

1. Use words for auto-stemmed AND logic: `rate limit` matches both "rate" AND "limit".
2. Use `"quoted phrases"` for exact position matching: `"infinite scroll"` requires adjacent words in order.
3. Combine words and phrases for mixed queries: `middleware "rate limit"`.
4. Use multiple queries for OR logic: `queries=["authentication", "middleware"]`.

## Artisan

- Run Artisan commands directly via the command line (e.g., `php artisan route:list`). Use `php artisan list` to discover available commands and `php artisan [command] --help` to check parameters.
- Inspect routes with `php artisan route:list`. Filter with: `--method=GET`, `--name=users`, `--path=api`, `--except-vendor`, `--only-vendor`.
- Read configuration values using dot notation: `php artisan config:show app.name`, `php artisan config:show database.default`. Or read config files directly from the `config/` directory.
- To check environment variables, read the `.env` file directly.

## Tinker

- Execute PHP in app context for debugging and testing code. Do not create models without user approval, prefer tests with factories instead. Prefer existing Artisan commands over custom tinker code.
- Always use single quotes to prevent shell expansion: `php artisan tinker --execute 'Your::code();'`
  - Double quotes for PHP strings inside: `php artisan tinker --execute 'User::where("active", true)->count();'`

=== typescript rules ===

# TypeScript

- Always use explicit types for function parameters and return values.
- Prefer `interface` for object shapes, `type` for unions and aliases.
- Use `next/image` for all images — never raw `<img>` tags.
- Use `next/link` for all internal navigation — never raw `<a>` tags.
- Server components are the default; add `"use client"` only when interactivity requires it.

=== deployment rules ===

# Deployment

- This project deploys to **Vercel** automatically on push to `main`.
- Always run `npm run build` locally to verify no build errors before pushing.
- Custom domain is connected via Vercel dashboard — do not modify `next.config.ts` for domain routing.

=== nextjs rules ===

# Next.js App Router

- Use the App Router (`app/` directory) — not Pages Router.
- Every page exports a `generateMetadata()` function for SEO.
- Use `generateStaticParams()` for dynamic routes with MDX content (`/projects/[slug]`, `/blog/[slug]`).
- Use `next/font` for font loading — do not load Google Fonts via `<link>` in HTML.
- Use `next/image` with correct `width`, `height`, and `alt` for every image.
- API routes live in `app/api/` (e.g. `app/api/contact/route.ts` for the contact form).

=== content rules ===

# MDX Content

- Blog posts: `content/blog/[slug].mdx` — frontmatter: `title`, `date`, `description`, `tags`
- Project case studies: `content/projects/[slug].mdx` — frontmatter: `title`, `summary`, `techStack`, `liveUrl`, `githubUrl`
- Parse MDX with `next-mdx-remote` or `@next/mdx`.
- Never hardcode blog or project data in page components — always read from MDX files.
