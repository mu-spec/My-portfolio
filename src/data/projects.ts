import type { Project, ProjectSlug } from "@/types/project";

/**
 * Centralized project data — the single source of truth for the showcase,
 * case studies and any future project references.
 *
 * PRIVACY RULE: application source code is private. Repository URLs are NOT
 * stored here and must not be added. The `Project` type has no repository
 * field, so this is enforced at compile time rather than by convention.
 * Project presentation is built from screenshots, features, technologies,
 * case studies and public store/demo links only.
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
    status: "in-development",
    technologies: [],
    highlights: [],
    media: [],
    caseStudyHref: "/work/electrician-simulator-app",
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
    order: 2,
  },
  {
    slug: "photo-recover",
    name: "Photo Recover",
    category: "Photo Recovery Utility",
    tagline: "",
    summary: "",
    featured: false,
    status: "in-development",
    technologies: [],
    highlights: [],
    media: [],
    caseStudyHref: "/work/photo-recover",
    order: 3,
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
