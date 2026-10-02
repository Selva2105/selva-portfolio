# Selva portfolio

Production portfolio for Selvaganapathi Kanakaraj, built with the Next.js App Router, React, and plain CSS. It includes six long-form case studies, interactive product demonstrations, theme-aware imagery, SEO metadata, accessibility support, and Vercel Analytics.

## Requirements

- Node.js 22
- npm 10+

## Local setup

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. `SITE_URL` should be the public production origin without a trailing slash; Vercel deployment URLs are detected automatically when it is omitted.

## Quality checks

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

Run all checks with `npm run check`. CI executes the same sequence for pull requests and pushes to `main`.

## Structure

- `app/` — routes, metadata, sitemap/robots, and route-level error states
- `components/` — server and interactive client components
- `lib/` — project, journey, contact, and site metadata
- `public/` — portraits, case-study media, résumé, and static assets
- `tests/` — content integrity tests

## Deployment

The app is ready for Vercel. Configure `SITE_URL` to the final canonical origin. Vercel Analytics records page traffic, custom Web Vitals, and handled route errors. Security headers are defined in `next.config.mjs`.
