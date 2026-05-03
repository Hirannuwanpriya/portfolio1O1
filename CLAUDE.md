# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Stack

- **Next.js 16.2.4** with the App Router (`app/`) — newer than most training data; consult `node_modules/next/dist/docs/01-app/` before relying on remembered API behavior.
- **React 19.2.4**
- **Tailwind CSS v4** via `@tailwindcss/postcss` — no `tailwind.config.*`; theme tokens live in `app/globals.css` under `@theme inline { ... }` and are imported with `@import "tailwindcss";`.
- **TypeScript** with `strict: true` and the `@/*` path alias mapped to the project root.
- **ESLint flat config** (`eslint.config.mjs`) extending `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`.

## Commands

```bash
npm run dev      # next dev — local dev server on :3000
npm run build    # next build — production build
npm run start    # next start — serve the production build
npm run lint     # eslint (flat config; no path arg needed)
```

No test runner is configured.

## Architecture notes

- Root layout (`app/layout.tsx`) wires the Geist Sans/Mono fonts via `next/font/google` as CSS variables (`--font-geist-sans`, `--font-geist-mono`) referenced from `globals.css` via `@theme inline`. Adding fonts means updating both the layout and the theme block.
- Dark mode is handled with `prefers-color-scheme` in `globals.css` — there is no theme toggle / `class="dark"` strategy wired up.
- Import using `@/...` (e.g. `@/app/foo`) per the tsconfig path alias.
