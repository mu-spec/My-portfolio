import type { Project, ProjectSlug } from "@/types/project";

/**
 * Centralized project data — the single source of truth for the showcase,
 * case studies and any future project references.
 *
 * CONTENT RULE: only verified facts are recorded here. Names and repository
 * URLs are confirmed. Taglines, summaries, technologies and highlights are
 * intentionally left empty and will be filled with verified content in a
 * later milestone. No downloads, users, ratings, revenue, testimonials,
 * clients, awards or performance metrics are stored or displayed.
 */
export const projects: readonly Project[] = [
  {
    slug: "electrician-simulator-app",
    name: "Electrician Simulator App",
    tagline: "",
    summary: "",
    featured: true,
    status: "in-development",
    technologies: [],
    highlights: [],
    links: {
      github: "https://github.com/mu-spec/Electrician-Simulator-App",
    },
    order: 1,
  },
  {
    slug: "mobile-cleaner",
    name: "Mobile Cleaner",
    tagline: "",
    summary: "",
    featured: false,
    status: "in-development",
    technologies: [],
    highlights: [],
    links: {
      github: "https://github.com/mu-spec/Mobile-Cleaner",
    },
    order: 2,
  },
  {
    slug: "photo-recover",
    name: "Photo Recover",
    tagline: "",
    summary: "",
    featured: false,
    status: "in-development",
    technologies: [],
    highlights: [],
    links: {
      github: "https://github.com/mu-spec/photo_recover_ai",
    },
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
