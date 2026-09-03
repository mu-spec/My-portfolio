/**
 * Domain model for the "More Projects" collection rendered on /projects.
 *
 * These are intentionally lightweight entries: a public portfolio image,
 * display copy and a verified Google Play listing. Unlike `Project`, they
 * carry no case-study route, no APK distribution and no per-screen media —
 * the heavier model in `@/types/project` stays reserved for the two
 * featured applications, whose case studies remain the detailed showcase.
 *
 * The same content rules apply as to `projects.ts`: only verified facts,
 * real assets under /public, and real store URLs. No invented descriptions,
 * metrics or placeholder destinations.
 */

/** A portfolio image for a card. Rendered contained, never stretched. */
export interface MoreProjectImage {
  /** Path to an asset in /public. */
  src: string;
  /** Meaningful alternative text. Required for accessibility. */
  alt: string;
  /** Intrinsic width in pixels, for correct next/image srcset selection. */
  width: number;
  /** Intrinsic height in pixels, for correct next/image srcset selection. */
  height: number;
}

export interface MoreProject {
  /** Stable identifier for React keys and future expansion. */
  slug: string;
  /** Display name. Must match the published app name exactly. */
  name: string;
  /** Small label shown above the name, e.g. "Privacy & Security". */
  category: string;
  /** Two-sentence display description. */
  description: string;
  /** Card image. */
  image: MoreProjectImage;
  /** Verified Google Play listing. Opens in a new tab. */
  googlePlayUrl: string;
  /** Ordering weight for the grid; lower renders first. */
  order: number;
}
