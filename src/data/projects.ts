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
 * configured. Both entries now carry verified direct release-asset URLs that
 * serve the compiled .apk binary. These are DOWNLOAD endpoints only — they
 * are not repository, source-browsing or clone URLs, and no application
 * source is reachable through them. Never substitute a placeholder, "#" or a
 * repository URL.
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
    technologies: [],
    highlights: [],
    media: [
      {
        src: "/screenshots/electrician-simulator-home.png",
        alt: "Electrician Simulator App home screen showing the Choose Module grid with Theory Academy, Calculators, Wiring Diagrams, Quiz & Practice, and Standards & Codes.",
        width: 720,
        height: 1432,
      },
      {
        src: "/screenshots/electrician-simulator-wiring-diagram.png",
        alt: "Electrician Simulator App single pole light switch screen showing a labelled circuit diagram with distribution board, switch and light.",
        width: 720,
        height: 1432,
      },
      {
        src: "/screenshots/electrician-simulator-calculators.png",
        alt: "Electrician Simulator App calculators screen listing Ohm's Law, Power Calculator and Voltage Drop tools with category filters.",
        width: 720,
        height: 1432,
      },
    ],
    caseStudyHref: "/work/electrician-simulator-app",
    apk: {
      status: "available",
      // Direct release asset. This is a compiled binary download, NOT a
      // source repository — visitors never reach any application source.
      url: "https://github.com/mu-spec/app-releases/releases/download/electrician-v1.0.0/Electrician-Simulator-App-v1.0.0.apk",
      version: "1.0.0",
      fileSizeLabel: "35.6 MB",
    },
    // Testing track, not a public production release. The action label and
    // the `track` value both keep that distinction explicit.
    googlePlay: {
      track: "testing",
      status: "available",
      url: "https://play.google.com/store/apps/details?id=com.koreappstek.ElectricianSimulatorApp",
    },
    order: 1,
  },
  {
    slug: "mobile-cleaner",
    name: "Mobile Cleaner",
    category: "Mobile Utility App",
    tagline: "",
    summary: "",
    featured: false,
    technologies: [],
    highlights: [],
    media: [
      {
        src: "/screenshots/mobile-cleaner-photos.png",
        alt: "Mobile Cleaner photos screen showing Photo Cleanup totalling 152.8 MB across 141 photos, broken down into duplicate, screenshot, large and similar photos.",
        width: 720,
        height: 1432,
      },
      {
        src: "/screenshots/mobile-cleaner-files.png",
        alt: "Mobile Cleaner files screen listing Large Files, Downloads Cleaner, APK Cleaner, Videos and Duplicates tools.",
        width: 720,
        height: 1432,
      },
      {
        src: "/screenshots/mobile-cleaner-cleanup-complete.png",
        alt: "Mobile Cleaner cleanup complete screen confirming files deleted, storage recovered and free storage remaining.",
        width: 720,
        height: 1432,
      },
    ],
    caseStudyHref: "/work/mobile-cleaner",
    apk: {
      status: "available",
      // Direct release asset — a compiled binary, not a source repository.
      url: "https://github.com/mu-spec/app-releases/releases/download/mobile-cleaner-v1.0.0/Mobile-Cleaner-v1.0.0.apk",
      version: "1.0.0",
      fileSizeLabel: "18.3 MB",
    },
    // No Google Play listing exists, so no Play control is rendered.
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
