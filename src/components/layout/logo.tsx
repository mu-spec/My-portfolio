import Link from "next/link";

import { siteConfig } from "@/config/site";

/** Wordmark linking back to the top of the site. */
export function Logo() {
  return (
    <Link
      href="/"
      className="group inline-flex min-h-11 items-center gap-2 rounded-xs focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-focus)]"
      aria-label={`${siteConfig.name} — home`}
    >
      <span className="text-[0.9375rem] font-semibold tracking-tight text-ink">
        {siteConfig.name}
      </span>
      <span
        aria-hidden="true"
        className="hidden text-eyebrow font-medium uppercase text-ink-subtle sm:inline"
      >
        {siteConfig.role}
      </span>
    </Link>
  );
}
