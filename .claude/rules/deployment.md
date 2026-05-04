# Deployment Rules

- Hosting: **Vercel**, auto-deploy on push to `main`.
- Run `npm run build` locally before pushing — must succeed.
- Custom domain (`hirannuwanpriya.com`) is wired via the Vercel dashboard. Do not modify `next.config.ts` for domain routing.
- Environment variables (Resend / Formspree keys, etc.) are managed in the Vercel project settings — do not commit them.
- The contact form route (`app/api/contact/route.ts`) must read keys from `process.env.*` and fail loudly if missing in dev.
