/**
 * Central site configuration.
 *
 * Everything identity-related lives here so it can be updated in one place.
 * Values are intentionally factual only — no invented biography, experience,
 * statistics or credentials.
 */

/**
 * Contact destination.
 *
 * Modelled as a discriminated union, mirroring `ProjectApk`, so "no verified
 * address yet" is an explicit typed state rather than an empty string or a
 * fabricated placeholder. The UI cannot render an enabled mailto control
 * without a real address, and no invented address can slip into the build.
 *
 * A verified address is configured, so the Contact page renders a real
 * "Email Me" control and shows the address, and the footer links to it.
 * Changing the address here updates every one of those places at once —
 * no component edits required.
 */
export type SiteContact =
  | { status: "awaiting-address" }
  | { status: "available"; email: string };

const contact: SiteContact = {
  status: "available",
  email: "saaddkhan99@gmail.com",
};

export const siteConfig = {
  /** Wordmark shown in the header and footer. */
  name: "Muhammad Saad",
  /** Short role descriptor. Verified and self-declared. */
  role: "Mobile App Developer",
  /** Used for <title> templates and metadata. */
  title: "Muhammad Saad — Mobile App Developer",
  /**
   * Metadata description. Factual: describes what the portfolio contains
   * without asserting experience levels, client work or statistics.
   */
  description:
    "Portfolio of Muhammad Saad, a mobile app developer who takes Android applications from idea and interface design through development, testing and release.",
  /**
   * Canonical production URL — the live Vercel deployment. Used as the
   * metadataBase so every canonical and Open Graph URL resolves absolutely.
   */
  url: "https://my-portfolio123-navy.vercel.app",
  /**
   * Verified contact destination. Typed as the full union (not narrowed by
   * `as const`) so switching to the "available" variant is a one-line edit
   * that type-checks without touching any component.
   */
  contact: contact as SiteContact,
  /**
   * Public profile links.
   *
   * PRIVACY RULE: application source repositories are private and must never
   * be linked from the portfolio. A general GitHub profile link is only added
   * here on explicit approval — a public profile can surface those
   * repositories, so their visibility must be confirmed first. The owner
   * chose "email only" for P4, so this stays empty by instruction.
   */
  links: {},
} as const;

export type SiteConfig = typeof siteConfig;

/** Convenience: the verified email, or undefined when none is configured. */
export function getContactEmail(): string | undefined {
  return siteConfig.contact.status === "available"
    ? siteConfig.contact.email
    : undefined;
}
