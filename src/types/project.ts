/**
 * Project domain types.
 *
 * The shape is deliberately conservative: fields that would invite invented
 * marketing content (downloads, ratings, revenue, testimonials, awards) are
 * intentionally absent from the model. Fields reserved for future verified
 * content are optional so P1+ can populate them without a schema rewrite.
 */

/** Stable identifier used for routing (/work/[slug]) and React keys. */
export type ProjectSlug =
  | "electrician-simulator-app"
  | "mobile-cleaner"
  | "photo-recover";

export type ProjectStatus = "in-development" | "released";

export interface ProjectLinks {
  /** Public source repository. Verified. */
  github: string;
  /** Store listing — added only once verified. */
  store?: string;
  /** Marketing or landing page — added only once verified. */
  website?: string;
}

export interface Project {
  slug: ProjectSlug;
  /** Display name. Must match the confirmed project name exactly. */
  name: string;
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
  /**
   * Verified technologies only. Left empty in P0 rather than guessed.
   */
  technologies: readonly string[];
  /**
   * Verified feature highlights only. Left empty in P0 rather than guessed.
   */
  highlights: readonly string[];
  links: ProjectLinks;
  /** Ordering weight for the showcase grid; lower renders first. */
  order: number;
}
