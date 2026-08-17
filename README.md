# Portfolio — Mobile App Developer

Personal portfolio site. Built with Next.js (App Router), TypeScript and Tailwind CSS v4.

## Status

**Milestone P0 — Premium Foundation.** This repository currently contains the
technical foundation, design system and reusable site structure only. The
homepage, project showcase, case studies, About, Skills and Contact sections
are built in later milestones.

`src/app/page.tsx` is a temporary design-system preview, not the final homepage.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript, no emit |

## Structure

```
src/
  app/            App Router entry, root layout, global styles
  components/
    layout/       Header, footer, navigation, wordmark
    projects/     Project card foundation
    ui/           Container, Section, SectionHeading, Button, Badge, Card
  config/         Site identity and navigation model
  data/           Centralized project data
  lib/            Small utilities
  types/          Domain types
```

## Design system

Design tokens are defined once in `src/app/globals.css` under `@theme` and are
consumed as Tailwind utilities (`bg-surface`, `text-ink-muted`, `text-h2`, …).

- Surfaces: `base`, `surface`, `elevated`, `overlay`
- Text: `ink`, `ink-muted`, `ink-subtle`
- Borders: `line`, `line-strong`
- Accent: a single restrained blue (`accent`)
- Type: fluid `display`, `h1`, `h2`, `h3`, `lead`, `eyebrow` scales

## Content policy

Only verified information is committed. No invented metrics, downloads,
ratings, testimonials, clients, employment history or unverified technologies.
Project fields awaiting verified content are intentionally left empty.

## Deployment

Deploy to Vercel with default Next.js settings. Update `siteConfig.url` in
`src/config/site.ts` before the first production deploy.
