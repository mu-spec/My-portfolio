/**
 * Navigation model.
 *
 * Section routes are declared here so the header, footer and future in-page
 * navigation all read from one source. Sections are implemented in later
 * milestones; the routes are reserved now so the structure stays stable.
 */

export interface NavItem {
  label: string;
  href: string;
}

/** Primary header navigation. */
export const primaryNav: readonly NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
] as const;

/**
 * Reserved section anchors for the future single-page structure.
 * Skills is not in the header nav but is part of the planned page structure.
 */
export const sectionIds = {
  home: "home",
  work: "work",
  about: "about",
  skills: "skills",
  contact: "contact",
} as const;

export type SectionId = (typeof sectionIds)[keyof typeof sectionIds];

/** Header call-to-action. Wired to the contact section in a later milestone. */
export const primaryCta: NavItem = {
  label: "Let's Talk",
  href: "/#contact",
};
