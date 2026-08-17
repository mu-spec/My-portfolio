/**
 * Central site configuration.
 *
 * Everything identity-related lives here so it can be updated in one place.
 * Values are intentionally factual only — no invented biography, experience,
 * statistics or credentials. Verified copy arrives in later milestones.
 */

export const siteConfig = {
  /** Wordmark shown in the header and footer. */
  name: "Muhammad Saad",
  /** Short role descriptor. Verified and self-declared. */
  role: "Mobile App Developer",
  /** Used for <title> templates and metadata. */
  title: "Muhammad Saad — Mobile App Developer",
  /**
   * Metadata description. Deliberately factual and generic for P0;
   * final SEO copy is a later milestone.
   */
  description:
    "Portfolio of Muhammad Saad, a mobile app developer building Android applications.",
  /** Canonical production URL. Update before deploying to Vercel. */
  url: "https://example.com",
  /**
   * Public profile links.
   *
   * PRIVACY RULE: application source repositories are private and must never
   * be linked from the portfolio. A general GitHub profile link is only added
   * here on explicit approval — note that a public profile can surface those
   * repositories, so confirm their visibility first.
   */
  links: {},
} as const;

export type SiteConfig = typeof siteConfig;
