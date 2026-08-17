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

/** Stable identifier used for routing (/work/[slug]) and React keys. */
export type ProjectSlug =
  | "electrician-simulator-app"
  | "mobile-cleaner"
  | "photo-recover";

export type ProjectStatus = "in-development" | "released";

/**
 * Public, visitor-facing destinations only.
 *
 * Every link here is safe to render in the UI. Source repositories are
 * intentionally not representable.
 */
export interface ProjectLinks {
  /** Google Play listing — added only once verified and live. */
  playStore?: string;
  /** Apple App Store listing — added only once verified and live. */
  appStore?: string;
  /** Product or landing page — added only once verified. */
  website?: string;
  /** Public demo or video walkthrough — added only once verified. */
  demo?: string;
}

/** A screenshot or capture used by the showcase and case-study pages. */
export interface ProjectMedia {
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
  status: ProjectStatus;
  /** Verified technologies only. Left empty in P0 rather than guessed. */
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
  /** Public destinations only. Omitted entirely when none are live yet. */
  links?: ProjectLinks;
  /** Ordering weight for the showcase grid; lower renders first. */
  order: number;
}
