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
    // Describes only what the captured screens show: Theory Academy,
    // Calculators, Wiring Diagrams and Quiz & Practice. No metrics.
    tagline:
      "Electrical theory, practical calculators, wiring references and quiz practice, together in one offline Android app.",
    summary: "",
    featured: true,
    // Confirmed by the project owner. Displayed on the case study only.
    technologies: [
      "Flutter",
      "Dart",
      "Material 3",
      "BLoC / Cubit",
      "SQLite",
      "Clean Architecture",
      "Offline-first",
    ],
    highlights: [],
    media: [
      {
        key: "home",
        src: "/screenshots/electrician-simulator-home.png",
        alt: "Electrician Simulator App home screen showing the Choose Module grid with Theory Academy, Calculators, Wiring Diagrams, Quiz & Practice, Standards & Codes and Find Videos.",
        width: 720,
        height: 1432,
      },
      {
        key: "theory-academy",
        src: "/screenshots/electrician-simulator-theory-academy.png",
        alt: "Theory Academy screen listing 59 articles with category filters and beginner-level articles such as What is Electricity? and Ohm's Law Explained, each showing a reading time.",
        width: 720,
        height: 1432,
      },
      {
        key: "calculators",
        src: "/screenshots/electrician-simulator-calculators.png",
        alt: "Calculators screen with a search field, category filters and tools including Ohm's Law, Power Calculator and Voltage Drop.",
        width: 720,
        height: 1432,
      },
      {
        key: "ohms-law",
        src: "/screenshots/electrician-simulator-ohms-law.png",
        alt: "Ohm's Law calculator with optional voltage, current and resistance inputs and a Calculate button, explaining that any two known values produce the rest.",
        width: 720,
        height: 1432,
      },
      {
        key: "wiring-diagram",
        src: "/screenshots/electrician-simulator-wiring-diagram.png",
        alt: "Single Pole Light Switch reference showing a labelled circuit diagram with bookmark, notes and share actions, plus a Components Needed list.",
        width: 720,
        height: 1432,
      },
      {
        key: "quiz-categories",
        src: "/screenshots/electrician-simulator-quiz-categories.png",
        alt: "Quiz & Practice screen showing 200 questions across 8 categories, including Electrical Basics, Safety & Codes and Circuits & Systems at 25 questions each.",
        width: 720,
        height: 1432,
      },
      {
        key: "quiz-question",
        src: "/screenshots/electrician-simulator-quiz-question.png",
        alt: "Electrical Basics quiz in progress, question 1 of 25 marked Beginner with a timer, asking for the SI unit of electrical current with four answer options.",
        width: 720,
        height: 1432,
      },
      {
        key: "settings",
        src: "/screenshots/electrician-simulator-settings.png",
        alt: "Settings screen showing Electrician Simulator App version 1.0.0, a dark mode toggle, and entries for Bookmarks, Saved Calculations, Job Manager and Global Search.",
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
    // The app sits in a PRIVATE/CLOSED Google Play testing track. Such a
    // listing is not reachable by the public — the store URL returns 404 to
    // anyone who is not an opted-in tester — and no public tester opt-in URL
    // exists. Rather than render a control that would dead-end visitors, no
    // Play presence is advertised at all. Do not guess or construct an
    // opt-in URL; set this to a `testing` track only once a verified,
    // publicly reachable opt-in link is supplied.
    googlePlay: { track: "none" },
    order: 1,
  },
  {
    slug: "mobile-cleaner",
    name: "Mobile Cleaner",
    category: "Mobile Utility App",
    // Mirrors the approved case-study flow: inspect, review, confirm,
    // then delete. Deliberately states that nothing is removed without
    // confirmation, which the Safety Gate section documents.
    tagline:
      "Inspect the files and photos on your phone, review what is worth removing, then delete only what you confirm.",
    summary: "",
    featured: false,
    // Verified by inspecting the shipped release binary itself, NOT copied
    // from the other project — the two apps genuinely differ (this one uses
    // Riverpod, the Electrician app uses BLoC/Cubit). Evidence, in order:
    // lib/*/libflutter.so + assets/flutter_assets  -> Flutter / Dart
    // NOTICES bundle lists flutter_riverpod, riverpod, state_notifier
    //                       go_router, shared_preferences, path_provider,
    //                       permission_handler, device_info_plus
    // kotlin-tooling-metadata.json (Gradle, KotlinAndroidPlugin) -> Kotlin
    // AndroidManifest declares NO android.permission.INTERNET, and no
    // analytics/ads SDKs are present -> fully on-device / offline.
    // sqflite is absent, so no SQLite claim is made.
    technologies: [
      "Flutter",
      "Dart",
      "Riverpod",
      "go_router",
      "Kotlin (Android layer)",
      "permission_handler",
      "shared_preferences",
      "Fully on-device",
    ],
    highlights: [],
    media: [
      {
        key: "photos",
        src: "/screenshots/mobile-cleaner-photos.png",
        alt: "Mobile Cleaner photos screen showing Photo Cleanup totalling 152.8 MB across 141 photos, broken down into duplicate, screenshot, large and similar photos.",
        width: 720,
        height: 1432,
      },
      {
        key: "files",
        src: "/screenshots/mobile-cleaner-files.png",
        alt: "Mobile Cleaner Files screen showing 868 files totalling 2.1 GB on the phone, with Large Files, Downloads Cleaner, APK Cleaner, Videos and Duplicates tools listed below.",
        width: 720,
        height: 1432,
      },
      {
        key: "cleanup-complete",
        src: "/screenshots/mobile-cleaner-cleanup-complete.png",
        alt: "Mobile Cleaner cleanup complete screen with a checkmark, confirming the number of files deleted, the storage recovered and the free storage remaining, above a Done button.",
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
