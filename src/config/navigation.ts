/**
 * Navigation model.
 *
 * The header, footer and mobile disclosure all read from this file, so a
 * route change happens in exactly one place.
 *
 * P4: About and Contact are now real routes (/about, /contact). They were
 * previously reserved anchors (/#about, /#contact) pointing at sections that
 * did not exist, which meant both header links silently did nothing. Those
 * dead anchors are gone.
 */

export interface NavItem {
  label: string;
  href: string;
}

/** Primary header navigation. */
export const primaryNav: readonly NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/#work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

/** In-page section anchors that actually exist on the homepage. */
export const sectionIds = {
  home: "home",
  work: "work",
} as const;

export type SectionId = (typeof sectionIds)[keyof typeof sectionIds];

/** Header call-to-action. Points at the Contact route. */
export const primaryCta: NavItem = {
  label: "Let's Talk",
  href: "/contact",
};
