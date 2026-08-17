import type { Project, ProjectSlug } from "@/types/project";

/**
 * Centralized project data — the single source of truth for the showcase,
 * case studies and any future project references.
 *
 * SCOPE: only projects currently showcased publicly are listed here. Projects
 * withdrawn from the portfolio are removed from this file entirely rather
 * than flagged, so nothing about them reaches the client bundle.
 *
 * PRIVACY RULE: application source code is private. Repository URLs are NOT
 * stored here and must not be added. The `Project` type has no repository
 * field, so this is enforced at compile time rather than by convention.
 * Project presentation is built from screenshots, features, technologies,
 * case studies and public store/demo links only.
 *
 * DISTRIBUTION RULE: `apk` and `googlePlay` are the only places a public
 * distribution destination is configured. Both model "no verified URL yet"
 * as an explicit variant, so a control can never link to a placeholder.
 * Google Play additionally records the track: a build in `testing` is not a
 * public production release and must never be presented as one.
 *
 * APK RULE: `apk` is the single place a downloadable Android build is
 * configured. All three projects are currently `{ status: "awaiting-url" }`
 * because no verified download URL has been supplied. To publish one, change
 * that entry to `{ status: "available", url: "..." }` — no component changes
 * are needed. Never substitute a placeholder, "#" or a repository URL.
 *
 * CONTENT RULE: only verified facts are recorded. Names are confirmed.
 * Taglines, summaries, technologies, highlights and media are intentionally
 * empty and will be filled with verified content in a later milestone. No
 * downloads, users, ratings, revenue, testimonials, clients, awards or
 * performance metrics are stored or displayed.
 */
export const projects: readonly Project[] = [
  {
    slug: "electrician-simulator-app",
    name: "Electrician Simulator App",
    category: "Mobile Utility / Educational App",
    tagline: "",
    summary: "",
    featured: true,
    status: "in-testing",
    technologies: [],
    highlights: [],
    media: [],
    caseStudyHref: "/work/electrician-simulator-app",
    apk: { status: "awaiting-url" },
    googlePlay: { track: "testing", status: "awaiting-url" },
    order: 1,
  },
  {
    slug: "mobile-cleaner",
    name: "Mobile Cleaner",
    category: "Mobile Utility App",
    tagline: "",
    summary: "",
    featured: false,
    status: "in-development",
    technologies: [],
    highlights: [],
    media: [],
    caseStudyHref: "/work/mobile-cleaner",
    apk: { status: "awaiting-url" },
    googlePlay: { track: "none" },
    order: 2,
  },
] as const;

/** Projects in display order. */
export function getProjects(): readonly Project[] {
  return [...projects].sort((a, b) => a.order - b.order);
}

/** Look up a single project, e.g. for a /work/[slug] case study page. */
export function getProjectBySlug(slug: ProjectSlug): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/** The flagship project highlighted in the showcase. */
export function getFeaturedProject(): Project | undefined {
  return projects.find((project) => project.featured);
}
