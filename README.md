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

## Source-code privacy

Application source repositories are **private** and must never be exposed to
portfolio visitors.

- The `Project` type has **no repository field**, so a repo URL cannot be
  attached to a project and rendered. This is enforced by the compiler, not by
  convention.
- `ProjectLinks` models public destinations only: Play Store, App Store,
  website and demo.
- No "View source" / "GitHub" affordance exists in any component.
- Repository URLs are not stored anywhere in this repository, including
  metadata and comments.

Project presentation is built from screenshots, features, technologies, case
studies and public store/demo links.

Note: this repository is itself public, so anything committed here is visible.
Keep repository URLs and other private references out of the codebase.

## Deployment

Deploy to Vercel with default Next.js settings. Update `siteConfig.url` in
`src/config/site.ts` before the first production deploy.
