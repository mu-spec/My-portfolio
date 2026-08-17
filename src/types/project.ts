/**
 * Project domain types.
 *
 * PRIVACY RULE: application source repositories are private and must never be
 * exposed to portfolio visitors. There is deliberately no repository field on
 * this model — the type system itself prevents a repo URL from being attached
 * to a project and rendered. Repository locations are development-only
 * information and are not stored in this codebase.
 *
 * The shape is otherwise conservative: fields that would invite invented
 * marketing content (downloads, ratings, revenue, testimonials, awards) are
 * intentionally absent. Fields reserved for future verified content are
 * optional so later milestones can populate them without a schema rewrite.
 */

/**
 * Stable identifier used for routing (/work/[slug]) and React keys.
 *
 * Only currently-showcased projects are listed. Adding a project back to the
 * portfolio means adding its slug here and a record in the data file.
 */
export type ProjectSlug = "electrician-simulator-app" | "mobile-cleaner";

/**
 * Optional lifecycle label.
 *
 * Only set when the state is verified AND adds information the distribution
 * actions do not already convey. A project on a Google Play testing track,
 * for example, is described precisely by its "Google Play — Testing" action,
 * so a generic badge alongside it would be redundant and less accurate.
 */
export type ProjectStatus = "in-development" | "in-testing" | "released";

/**
 * Public, visitor-facing destinations only.
 *
 * Every link here is safe to render in the UI. Source repositories are
 * intentionally not representable. Google Play is modelled separately by
 * `ProjectGooglePlay` because its track (testing vs production) is
 * meaningful and must not be blurred into a generic store link.
 */
export interface ProjectLinks {
  /** Apple App Store listing — added only once verified and live. */
  appStore?: string;
  /** Product or landing page — added only once verified. */
  website?: string;
  /** Public demo or video walkthrough — added only once verified. */
  demo?: string;
}

/**
 * Shared shape for any distribution destination.
 *
 * "No verified URL yet" is a distinct variant rather than an empty string,
 * so the UI can never render an enabled control pointing nowhere.
 */
export type DistributionLink =
  | { status: "awaiting-url" }
  | { status: "available"; url: string };

/**
 * Google Play presence.
 *
 * The track is deliberately explicit. A build sitting in a testing track is
 * NOT a public production release, and the UI must say so — collapsing both
 * into one "Google Play" link would overstate the app's availability.
 */
export type ProjectGooglePlay =
  /** Not published to Google Play at all. */
  | { track: "none" }
  /** Uploaded and in a testing track (internal/closed/open testing). */
  | ({ track: "testing" } & DistributionLink)
  /** Live, publicly available production release. */
  | ({ track: "production" } & DistributionLink);

/**
 * Downloadable Android build.
 *
 * Modelled as a discriminated union so "no URL yet" is an explicit, typed
 * state rather than an empty string or a placeholder href. A URL can only
 * exist on the "available" variant, which means the UI cannot render an
 * enabled download control without a real destination.
 *
 * The url may point at a file in /public (e.g. "/downloads/app.apk") or at
 * an external host. Never a repository URL.
 */
export type ProjectApk =
  | {
      status: "available";
      /** Verified, working download URL. */
      url: string;
      /** Release version, e.g. "1.2.0". Only when verified. */
      version?: string;
      /** Human-readable size, e.g. "24 MB". Only when verified. */
      fileSizeLabel?: string;
    }
  | {
      /** No verified APK URL yet — the download control renders disabled. */
      status: "awaiting-url";
    };

/**
 * Stable role identifier for a screenshot, so a case study can request a
 * specific screen by name instead of a fragile array index.
 */
export type ProjectMediaKey =
  | "home"
  | "theory-academy"
  | "calculators"
  | "ohms-law"
  | "wiring-diagram"
  | "quiz-categories"
  | "quiz-question"
  | "settings"
  | "photos"
  | "files"
  | "cleanup-complete";

/** A screenshot or capture used by the showcase and case-study pages. */
export interface ProjectMedia {
  /** Role identifier used to look this screen up by name. */
  key?: ProjectMediaKey;
  /** Path to an asset in /public. */
  src: string;
  /** Meaningful alternative text. Required for accessibility. */
  alt: string;
  width: number;
  height: number;
}

export interface Project {
  slug: ProjectSlug;
  /** Display name. Must match the confirmed project name exactly. */
  name: string;
  /**
   * High-level classification, e.g. "Mobile Utility App".
   * Confirmed by the site owner — safe to display.
   */
  category: string;
  /**
   * One-line positioning statement.
   * Empty until verified copy is supplied in a later milestone.
   */
  tagline: string;
  /**
   * Longer description used by the case-study pages.
   * Empty until verified copy is supplied in a later milestone.
   */
  summary: string;
  /** Marks the single flagship project for emphasis in the showcase. */
  featured: boolean;
  status?: ProjectStatus;
  /**
   * Verified technology stack, confirmed by the project owner.
   *
   * Rendered on the case study only. The homepage card deliberately does not
   * display these, so the approved homepage layout stays unchanged.
   */
  technologies: readonly string[];
  /** Verified feature highlights only. Left empty in P0 rather than guessed. */
  highlights: readonly string[];
  /** Screenshots for the showcase. Populated in a later milestone. */
  media: readonly ProjectMedia[];
  /**
   * Case-study route. The page itself is built in a later milestone; the
   * path is reserved now so the showcase CTA stays stable.
   */
  caseStudyHref: string;
  /**
   * Downloadable Android build. Centralized here so adding a real APK later
   * is a one-line data change with no component edits.
   */
  apk: ProjectApk;
  /**
   * Google Play presence and track. Centralized alongside `apk` so all
   * distribution URLs live in one place.
   */
  googlePlay: ProjectGooglePlay;
  /** Public destinations only. Omitted entirely when none are live yet. */
  links?: ProjectLinks;
  /** Ordering weight for the showcase grid; lower renders first. */
  order: number;
}
