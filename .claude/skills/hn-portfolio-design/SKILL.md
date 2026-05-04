---
name: hn-portfolio-design
description: >
  Use this skill for every page, component, and UI element built for
  hirannuwanpriya.com. It encodes all brand, colour, typography, spacing,
  motion, component, and SEO decisions so that every page is visually and
  technically consistent without re-reading the full project plan each time.
  Trigger whenever building or editing any part of the HN portfolio site.
---

# HN Portfolio — Design System & Skill Reference

This document is the single source of truth for all design decisions on
**hirannuwanpriya.com**. Read it entirely before writing any code, markup,
or copy for the site. Every decision here is intentional; do not override
without explicit instruction from the project owner.

---

## 1. Brand Overview

| Property | Value |
|---|---|
| Owner | Hiran Nuwanpriya |
| Domain | hirannuwanpriya.com |
| Site type | Professional software engineering portfolio |
| Core message | Full Stack Engineer building scalable Laravel, React & Next.js applications |
| Tone | Professional · Confident · Clear · Technical · Outcome-focused |
| Style | Minimal · Editorial · Premium · Spacious · Typography-led |

---

## 2. Logo System

The HN monogram is the primary brand mark.

| Variant | Usage |
|---|---|
| **Primary / Full Colour** | Header on white/light backgrounds — H in `#3498DB` (blue), N in `#111418` (charcoal) |
| **Monochrome Dark** | Dark or printed contexts — both letters in `#111418` |
| **Reversed / Light** | Dark backgrounds — white letters on `#111418` block |

Rules:
- Always render the logo as an SVG or high-resolution image; never rasterise at small sizes.
- Use as the favicon (32 × 32 and 180 × 180 Apple touch icon).
- Minimum clear space around the logo = one letter-height on all sides.
- Never stretch, recolour outside the three approved variants, or add drop shadows.

---

## 3. Colour Palette

### 3.1 Neutral Foundation

| Token | Hex | Usage |
|---|---|---|
| `--color-bg` | `#FFFFFF` | Primary page background |
| `--color-bg-soft` | `#FAFAFA` | Alternate section backgrounds, cards |
| `--color-text-primary` | `#111418` | Headings, body copy, nav links |
| `--color-text-secondary` | `#6B7280` | Captions, meta text, subtitles |
| `--color-border` | `#E5E7EB` | Dividers, card borders, input borders |

### 3.2 Accent Palette (use sparingly — never as backgrounds or large fills)

| Token | Hex | Name | Permitted usage |
|---|---|---|---|
| `--color-accent-sand` | `#F9D5A3` | Warm Sand | Highlight chips, soft tags, skill badges |
| `--color-accent-yellow` | `#F1C40F` | Sunshine | Small decorative icons, star ratings, emphasis dots |
| `--color-accent-blue` | `#3498DB` | Ocean Blue | Links, active nav indicator, tech highlights, logo H |
| `--color-accent-violet` | `#9B59B6` | Violet | Blog category labels |
| `--color-accent-purple` | `#7D3C98` | Royal Purple | Project badge accents |
| `--color-accent-crimson` | `#C0392B` | Crimson | Important CTA micro-details only |

### 3.3 Rules for Accent Usage

- No more than **two accents visible** in any single section.
- Accents appear on text labels, borders, underlines, dots, and small icons — never as full panel fills.
- The primary call-to-action button uses `#111418` background with white text; reserve accent colour for the arrow icon or hover underline only.
- Visited links: `#3498DB` with 60 % opacity.

---

## 4. Typography

### 4.1 Type Scale & Font Roles

| Role | Font family | Weight | Notes |
|---|---|---|---|
| **Heading / UI** | `Geist` (or `Manrope` fallback) | 400 – 700 | Clean geometric sans-serif; strong hierarchy |
| **Accent / Display** | `Cormorant Garamond` (or `Playfair Display` fallback) | 400 italic | High-contrast serif for hero pull-quotes and select hero words |
| **Body / Text** | `Geist` | 400 | Neutral, comfortable reading |
| **Monospace** | `Geist Mono` | 400 | Code snippets, tech stack labels, terminal-style elements |

Load via `next/font` for zero-layout-shift. Do not load from external CDNs.

### 4.2 Type Scale (rem, base 16 px)

| Step | rem | px equiv | Usage |
|---|---|---|---|
| `text-xs` | 0.75 | 12 | Meta labels, timestamps |
| `text-sm` | 0.875 | 14 | Captions, badge text |
| `text-base` | 1 | 16 | Body copy |
| `text-lg` | 1.125 | 18 | Lead paragraphs |
| `text-xl` | 1.25 | 20 | Card titles, sub-headings |
| `text-2xl` | 1.5 | 24 | Section headings (h3) |
| `text-3xl` | 1.875 | 30 | Page sub-headings (h2) |
| `text-4xl` | 2.25 | 36 | Page headings (h1 inner pages) |
| `text-5xl` | 3 | 48 | Hero heading medium |
| `text-6xl` | 3.75 | 60 | Hero heading large (desktop) |
| `text-7xl` | 4.5 | 72 | Hero display (desktop only) |

### 4.3 Line Height & Letter Spacing

| Context | Line height | Letter spacing |
|---|---|---|
| Display / hero | 1.1 | −0.03 em |
| Headings | 1.25 | −0.02 em |
| Body | 1.65 | 0 |
| Captions / labels | 1.4 | 0.03 em |
| Monospace | 1.6 | 0 |

### 4.4 Typographic Patterns

**Hero headline pattern** — mix Geist bold with Cormorant italic for select words:

```text
I'm Hiran,
a Full Stack Engineer
building scalable web products
with Laravel, React & Next.js.
```

The words "Full Stack Engineer" or a key descriptor word render in Cormorant Garamond italic to create editorial contrast.

**Section heading pattern:**

```text
LABEL    ← text-xs, tracking-widest, text-secondary, uppercase
Big Heading  ← text-3xl or text-4xl, font-bold, text-primary
Optional short description  ← text-lg, text-secondary, max-w-xl
```

---

## 5. Spacing & Layout

### 5.1 Spacing Scale

Use Tailwind's default 4 px base. Key custom tokens:

| Token | Value | Usage |
|---|---|---|
| Section vertical padding | `py-24` (96 px) desktop / `py-16` (64 px) mobile | All full-width sections |
| Container max width | `max-w-7xl` (1280 px) | All page content |
| Container horizontal padding | `px-6` mobile / `px-8` tablet / `px-12` desktop | Consistent gutters |
| Card padding | `p-6` (24 px) | Project cards, blog cards |
| Component gap | `gap-8` (32 px) | Grid gaps between cards |

### 5.2 Grid System

- **Default content**: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`
- **Featured / hero**: Full width, asymmetric two-column `grid-cols-5` (3 + 2 split) on desktop
- **Experience timeline**: Single column with left-border timeline accent
- **Stats row**: `grid grid-cols-2 md:grid-cols-4 gap-6`

### 5.3 Responsive Breakpoints

Follow Tailwind defaults: `sm` 640, `md` 768, `lg` 1024, `xl` 1280, `2xl` 1536. Design mobile-first.

---

## 6. Component Patterns

### 6.1 Header / Navigation

```
[HN logo]          Home  About  Experience  Projects  Blog  Resume  [Contact Me →]
```

- Fixed/sticky, `backdrop-blur-sm`, `bg-white/90`, bottom border `border-b border-border`
- Logo left; nav links centre (hidden on mobile → hamburger); CTA button right
- Active nav item: small `#3498DB` dot beneath the link (`::after` pseudo-element)
- Mobile: full-screen slide-in menu, black background, large white type
- CTA button style: outlined `border border-black text-black px-5 py-2 text-sm` with hover fill to black/white inversion

### 6.2 Hero Section

- Full viewport height on home (`min-h-screen`)
- Left-aligned text block (60 % width desktop); right side either empty (negative space) or a subtle geometric/abstract SVG illustration
- Headline: large Geist bold with one serif italic accent word
- Subheading: `text-lg text-secondary max-w-xl leading-relaxed`
- CTA row: primary button (black filled) + ghost button + optional text link
- Subtle animated background: very light grain texture `opacity-[0.03]` noise SVG overlay on `#FAFAFA`

**Primary button:**
```css
bg-[#111418] text-white px-7 py-3.5 text-sm font-medium
hover:bg-[#2d2d2d] transition-colors duration-200
```

**Ghost / secondary button:**
```css
border border-[#E5E7EB] text-[#111418] px-7 py-3.5 text-sm font-medium
hover:border-[#111418] transition-colors duration-200
```

### 6.3 Section Heading Block

```tsx
<div className="mb-12">
  <p className="text-xs uppercase tracking-widest text-secondary mb-3">Label</p>
  <h2 className="text-3xl md:text-4xl font-bold text-primary">Big Heading</h2>
  <p className="mt-4 text-lg text-secondary max-w-xl">Optional description.</p>
</div>
```

### 6.4 Project Card

```
┌──────────────────────────────┐
│  [Screenshot / placeholder]  │  ← aspect-video, bg-soft, object-cover
├──────────────────────────────┤
│  SaaS · CRM                  │  ← text-xs accent chip
│  Project Title               │  ← text-xl font-semibold
│  One-line description        │  ← text-sm text-secondary
│  Laravel · React · Tailwind  │  ← monospace text-xs chips
│                              │
│  View Case Study  →          │  ← text-sm underline on hover, blue
└──────────────────────────────┘
```

- Border: `border border-border rounded-lg overflow-hidden`
- Hover: `hover:shadow-md hover:-translate-y-0.5 transition-all duration-200`
- Category chip: `bg-[#F9D5A3] text-[#111418] text-xs px-2 py-0.5 rounded-full font-medium`
- Tech tag: `bg-[#F8F8F6] border border-border font-mono text-xs px-2 py-0.5 rounded`

### 6.5 Experience Timeline Item

```
│  ●  Job Title                 ← font-semibold text-xl
│     Company Name · Location   ← text-secondary text-sm
│     Jan 2022 – Present        ← text-xs monospace, accent-blue
│
│     Summary paragraph         ← text-base leading-relaxed
│
│     • Achievement 1
│     • Achievement 2
│
│     [Laravel] [React] [MySQL] ← tech tags
```

- Vertical line: `border-l-2 border-border ml-3 pl-6`
- Active dot: `w-3 h-3 rounded-full bg-[#111418] -ml-[1.4375rem]`
- Past role dot: `w-3 h-3 rounded-full border-2 border-border bg-white -ml-[1.4375rem]`

### 6.6 Skill / Technology Badge

```css
/* Standard tech badge */
border border-border bg-white font-mono text-xs px-3 py-1.5 rounded
text-[#111418] hover:border-[#3498DB] hover:text-[#3498DB] transition-colors

/* Category accent badge (blog/projects) */
text-xs px-2.5 py-1 rounded-full font-medium
```

Colour assignments for category badges:
- Laravel / PHP → `bg-[#F9D5A3]` (warm sand)
- React / Next.js → `bg-[#DBEAFE]` (light blue)
- Vue.js → `bg-[#DCFCE7]` (light green)
- SaaS → `bg-[#EDE9FE]` (light violet)
- CRM / ERP → `bg-[#FEE2E2]` (light crimson)
- Blog / Writing → `bg-[#F3E8FF]` (light purple)

### 6.7 Blog Card

```
┌───────────────────────────────┐
│  [Category chip]              │
│  Article Title                │  ← text-xl font-semibold line-clamp-2
│  Short excerpt                │  ← text-sm text-secondary line-clamp-3
│  ─────────────────────────    │
│  12 May 2025  ·  5 min read   │  ← text-xs text-secondary monospace
│  Read Article  →              │
└───────────────────────────────┘
```

- No image by default (typography-led); optional cover image with `aspect-[16/9]`
- Hover: `hover:shadow-sm` + title colour changes to `#3498DB`

### 6.8 Stats / Metrics Row

```
┌────────────┬────────────┬────────────┬────────────┐
│  10+       │  50+       │  15+       │  5+        │
│  Years Exp │  Projects  │  Tech Stack│  Industries│
└────────────┴────────────┴────────────┴────────────┘
```

- Number: `text-5xl font-bold text-primary`
- Label: `text-sm text-secondary mt-1`
- Each cell: `border-r border-border last:border-r-0 px-8 py-6 text-center`

### 6.9 Contact Form

Fields: Name · Email · Subject · Message · Send button

- Inputs: `border border-border rounded-md px-4 py-3 text-base w-full focus:outline-none focus:border-[#111418] transition-colors`
- Textarea: minimum `rows={5}`
- Submit: primary button style (black filled)
- Success state: replace form with a confirmation card

### 6.10 Footer

```
[HN logo]                    GitHub · LinkedIn · Email

© 2025 Hiran Nuwanpriya      Home · About · Projects · Contact
Built with Next.js & Tailwind
```

- Background: `#111418` (charcoal)
- Text: `#FFFFFF` primary, `#6B7280` secondary
- Top border accent: 1 px `#3498DB` line
- Two-column layout; single-column stacked on mobile

### 6.11 CTA Section (end of most pages)

```
Let's build something useful.

Available for roles, contract work, and freelance projects
in Australia, New Zealand, and remote teams.

[Contact Me →]   [View Projects]
```

- Background: `#FAFAFA`
- Top/bottom: `border-t border-b border-border`
- Heading: `text-3xl md:text-4xl font-bold`

---

## 7. Motion & Interaction

Use CSS transitions only; no heavy JS animation libraries on first load.

| Element | Animation |
|---|---|
| Page entry | `opacity-0 → opacity-100`, `translateY(16px) → translateY(0)`, duration 400 ms, ease-out |
| Staggered section items | Add `animation-delay` in 80 ms increments per card (max 5 items) |
| Button hover | `transition-colors duration-200` |
| Card hover | `transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md` |
| Nav link hover | colour shift + dot indicator, `duration-150` |
| Link underline | `hover:underline underline-offset-4` on text links |

No parallax. No auto-playing video. No scroll-jacking. Respect `prefers-reduced-motion` — wrap all motion in `@media (prefers-reduced-motion: no-preference)`.

---

## 8. Page-by-Page SEO Metadata

Every page must export metadata using Next.js App Router's `generateMetadata`.

### Home `/`
```ts
title: "Hiran Nuwanpriya | Full Stack Engineer | Laravel, React & Next.js Developer"
description: "Portfolio of Hiran Nuwanpriya, a full stack engineer specialising in Laravel, React, Next.js, Vue.js, SaaS platforms, CRM systems and scalable web applications."
h1: "Full Stack Engineer Building Scalable Web Applications"
```

### About `/about`
```ts
title: "About Hiran Nuwanpriya | Full Stack Software Engineer"
description: "Learn about Hiran Nuwanpriya, a full stack software engineer experienced in Laravel, React, Next.js, Vue.js, SaaS applications, CRM systems and business automation."
h1: "About Hiran Nuwanpriya"
```

### Experience `/experience`
```ts
title: "Experience | Hiran Nuwanpriya | Full Stack Engineer"
description: "Explore Hiran Nuwanpriya's software engineering experience across Laravel, PHP, React, Next.js, Vue.js, SaaS, CRM, e-commerce and business automation projects."
h1: "Professional Experience"
```

### Projects `/projects`
```ts
title: "Projects | Laravel, React, Next.js and SaaS Development Portfolio"
description: "View software engineering projects by Hiran Nuwanpriya, including SaaS applications, CRM systems, e-commerce platforms, ERP/POS solutions and full stack web applications."
h1: "Projects"
```

### Blog `/blog`
```ts
title: "Blog | Full Stack Development, Laravel, React and Next.js Articles"
description: "Read articles by Hiran Nuwanpriya on full stack development, Laravel, React, Next.js, SaaS applications, CRM systems, SEO-friendly websites and AI-assisted software engineering."
h1: "Articles & Insights"
```

### Resume `/resume`
```ts
title: "Resume | Hiran Nuwanpriya | Full Stack Engineer"
description: "Download the resume of Hiran Nuwanpriya, a full stack engineer experienced in Laravel, PHP, React, Next.js, Vue.js, SaaS platforms, CRM systems and web applications."
h1: "Resume"
```

### Contact `/contact`
```ts
title: "Contact Hiran Nuwanpriya | Full Stack Engineer"
description: "Contact Hiran Nuwanpriya for software engineering roles, Laravel development, React and Next.js projects, SaaS platforms, CRM systems and web application development."
h1: "Contact Hiran Nuwanpriya"
```

### Shared Open Graph defaults (override per page)
```ts
og: {
  type: "website",
  siteName: "Hiran Nuwanpriya",
  locale: "en_AU",
  images: [{ url: "/og-default.png", width: 1200, height: 630 }]
}
twitter: { card: "summary_large_image" }
```

---

## 9. Structured Data (JSON-LD)

Add inline `<script type="application/ld+json">` in each page's `<head>`.

| Page | Schema type |
|---|---|
| `/` | `Person` + `WebSite` |
| `/about` | `ProfilePage` + `Person` |
| `/experience` | `ProfilePage` |
| `/projects` | `CollectionPage` |
| `/projects/[slug]` | `SoftwareApplication` or `CreativeWork` |
| `/blog` | `Blog` |
| `/blog/[slug]` | `BlogPosting` |
| `/resume` | `ProfilePage` |
| `/contact` | `ContactPage` |

**Person schema** (reuse across pages):
```json
{
  "@type": "Person",
  "name": "Hiran Nuwanpriya",
  "jobTitle": "Full Stack Engineer",
  "url": "https://hirannuwanpriya.com",
  "sameAs": [
    "https://linkedin.com/in/hirannuwanpriya",
    "https://github.com/hirannuwanpriya"
  ],
  "knowsAbout": ["Laravel", "PHP", "React", "Next.js", "Vue.js", "TypeScript", "Tailwind CSS", "SaaS", "CRM", "ERP"],
  "address": { "@type": "PostalAddress", "addressCountry": "AU", "addressRegion": "TAS" }
}
```

---

## 10. Technical Stack Decisions

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js 14+ App Router | SEO, SSG/SSR, Metadata API |
| Language | TypeScript | Code quality, maintainability |
| Styling | Tailwind CSS | Fast, consistent, utility-first |
| Fonts | `next/font` (Geist + Cormorant Garamond) | Zero layout shift |
| Content | MDX files in `/content` | Simple, git-managed blog & projects |
| Deployment | Vercel | Edge, analytics, zero config |
| Forms | Resend API via Next.js API route | Reliable transactional email |
| Analytics | Vercel Analytics + Google Search Console | Core Web Vitals + SEO monitoring |
| Resume | Static PDF at `/public/resume/hiran-nuwanpriya-resume.pdf` | Direct download |

### CSS Variables Setup

Add to `globals.css`:

```css
:root {
  --color-bg: #FFFFFF;
  --color-bg-soft: #FAFAFA;
  --color-text-primary: #111418;
  --color-text-secondary: #6B7280;
  --color-border: #E5E7EB;
  --color-accent-sand: #F9D5A3;
  --color-accent-yellow: #F1C40F;
  --color-accent-blue: #3498DB;
  --color-accent-violet: #9B59B6;
  --color-accent-purple: #7D3C98;
  --color-accent-crimson: #C0392B;
  --font-sans: 'Geist', 'Manrope', sans-serif;
  --font-serif: 'Cormorant Garamond', 'Playfair Display', serif;
  --font-mono: 'Geist Mono', monospace;
}
```

### Tailwind Config Extensions

```ts
// tailwind.config.ts
extend: {
  colors: {
    primary: '#111418',
    secondary: '#6B7280',
    border: '#E5E7EB',
    'bg-soft': '#FAFAFA',
    'accent-blue': '#3498DB',
    'accent-sand': '#F9D5A3',
    'accent-yellow': '#F1C40F',
    'accent-violet': '#9B59B6',
    'accent-purple': '#7D3C98',
    'accent-crimson': '#C0392B',
  },
  fontFamily: {
    sans: ['var(--font-geist-sans)', 'Manrope', 'sans-serif'],
    serif: ['var(--font-cormorant)', 'Playfair Display', 'serif'],
    mono: ['var(--font-geist-mono)', 'monospace'],
  },
}
```

> **Note for this repo:** the project uses **Tailwind CSS v4** with no `tailwind.config.*`. Translate the `extend` block above into `@theme inline { ... }` tokens inside `app/globals.css` instead.

---

## 11. Folder Structure

```
hirannuwanpriya.com/
├── app/
│   ├── layout.tsx              ← Root layout: fonts, metadata defaults, Header, Footer
│   ├── globals.css             ← CSS variables, base styles
│   ├── page.tsx                ← Home
│   ├── about/page.tsx
│   ├── experience/page.tsx
│   ├── projects/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── blog/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── resume/page.tsx
│   └── contact/page.tsx
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── HeroSection.tsx
│   ├── SectionHeading.tsx
│   ├── ProjectCard.tsx
│   ├── BlogCard.tsx
│   ├── ExperienceTimeline.tsx
│   ├── SkillBadge.tsx
│   ├── TechnologyStack.tsx
│   ├── StatsRow.tsx
│   ├── ContactForm.tsx
│   └── CTASection.tsx
├── content/
│   ├── projects/               ← .mdx files per project
│   └── blog/                  ← .mdx files per article
├── lib/
│   ├── seo.ts                  ← generateMetadata helpers
│   └── structured-data.ts     ← JSON-LD builder functions
└── public/
    ├── images/
    ├── resume/hiran-nuwanpriya-resume.pdf
    └── favicon.ico
```

---

## 12. Content Tone Rules

When writing any copy for this site:

- Write in first person ("I build…", "My experience includes…")
- Lead with outcomes, not task lists ("Reduced page load by 60 %" not "Optimised performance")
- Keep sentences short; max 20 words per sentence in hero and CTA sections
- Use technical keywords naturally — do not stuff
- Avoid filler words: "passionate", "dynamic", "synergy", "leverage"
- Every section should answer: "Why does this matter to a recruiter or client?"
- End every inner page with a CTA directing to Contact or Projects

---

## 13. Accessibility Rules

- All images: meaningful `alt` text or `alt=""` for decorative images
- Colour contrast: minimum 4.5:1 for body text, 3:1 for large text
- All interactive elements: visible focus ring (`focus-visible:ring-2 ring-accent-blue`)
- Keyboard navigable: skip-to-content link at top of every page
- Semantic HTML: `<header>`, `<main>`, `<nav>`, `<article>`, `<section>`, `<footer>`
- No colour-only information conveyance

---

## 14. Performance Rules

- Images: use `next/image` with explicit `width` and `height`; serve WebP
- Fonts: `display: swap`; subset to Latin only
- No third-party scripts in `<head>` except Google Search Console verification meta tag
- Analytics script: load with `strategy="afterInteractive"`
- Aim for Lighthouse score ≥ 95 on Performance, Accessibility, Best Practices, SEO

---

## 15. Quick Reference Checklist (use before marking any page done)

- [ ] CSS variables and Tailwind tokens used (no hardcoded hex in JSX)
- [ ] Correct fonts applied: Geist for UI, Cormorant for display accents, Geist Mono for code
- [ ] `generateMetadata` exported with page-specific title, description, OG data
- [ ] JSON-LD structured data included in `<head>`
- [ ] H1 is unique, present exactly once, matches the plan
- [ ] `canonical` URL set
- [ ] All images use `next/image` with alt text
- [ ] Focus rings on all interactive elements
- [ ] Mobile layout tested at 375 px, 768 px, 1280 px
- [ ] CTA section at bottom of page
- [ ] Accents used sparingly (max 2 per section)
- [ ] No generic AI-slop aesthetics: no purple gradients, no Inter/Roboto, no cookie-cutter layouts
- [ ] `prefers-reduced-motion` respected for all animations
