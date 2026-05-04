---
name: tailwind-design-system
description: Use when writing or editing Tailwind classes, building responsive layouts, applying brand colors/typography, or modifying theme tokens in app/globals.css. Triggers on mentions of Tailwind, design system, brand colors, typography, responsive, mobile-first, or @theme.
---

# Tailwind v4 + Brand Design System

This project uses **Tailwind CSS v4** via `@tailwindcss/postcss`. There is **no `tailwind.config.*`**. All theme tokens live in `app/globals.css` inside an `@theme inline { ... }` block, imported with `@import "tailwindcss";`.

## Adding a design token
Edit `app/globals.css`:
```css
@theme inline {
  --color-accent-blue: #3498DB;
  --font-display: var(--font-playfair-display);
}
```
Then use it as `bg-accent-blue` or `font-display` in JSX.

## Brand palette (CLAUDE.md §5)

| Purpose          | Class / value             |
|------------------|---------------------------|
| Background       | `bg-white` (`#FFFFFF`)    |
| Soft background  | `bg-[#F8F8F6]`            |
| Primary text     | `text-[#111111]`          |
| Secondary text   | `text-gray-500`           |
| Border           | `border-gray-200`         |
| Accent beige     | `#F9D5A3`                 |
| Accent blue      | `#3498DB`                 |
| Accent yellow    | `#F1C40F`                 |

Accents are for small details (badges, icons, link underlines) — never large color blocks.

## Typography

- Body: Inter / Geist (Geist Sans wired via `--font-geist-sans`).
- Hero/serif accent: Playfair Display or Cormorant Garamond — wire via `next/font/google` and a CSS variable in `globals.css`.
- Headings: large, editorial, generous `leading-tight` to `leading-snug`.

## Layout principles

- White-dominant; soft section breaks via `bg-[#F8F8F6]` rather than borders.
- Spacious padding — section vertical rhythm `py-20 md:py-28`.
- Strong typographic hierarchy. Avoid heavy dividers.
- Subtle motion only (`transition-colors`, `hover:opacity-80`); no parallax, no autoplaying anims.

## Mobile-first

Always start with mobile classes, layer up:
```jsx
<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
```
Test at 320px, 768px, 1024px, 1440px before marking done.

## Dark mode

Handled via `prefers-color-scheme` in `globals.css`. There is no `class="dark"` toggle. Don't introduce one without approval.
