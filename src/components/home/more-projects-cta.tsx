import Link from "next/link";

import { cn } from "@/lib/cn";

/**
 * More Projects CTA.
 *
 * Rendered on the homepage directly after the last Selected Work card. It is
 * a pointer to /projects only — the additional apps are never listed on the
 * homepage itself.
 *
 * The control reuses the exact primary button treatment of the project
 * cards ("View Case Study"), so it reads as part of the same system.
 */
export function MoreProjectsCta() {
  return (
    <div className="flex flex-col gap-6 rounded-lg border border-line bg-surface p-7 sm:p-9 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-col gap-3">
        <h3 className="text-h3 font-semibold text-ink">More Projects</h3>
        <p className="max-w-prose text-pretty text-lead text-ink-muted">
          Explore more mobile apps I&rsquo;ve built.
        </p>
      </div>

      <Link
        href="/projects"
        className={cn(
          "group inline-flex h-11 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md px-5",
          "bg-[var(--color-accent-solid)] text-[0.9375rem] font-medium text-white",
          "shadow-[0_1px_0_0_rgb(255_255_255/0.12)_inset]",
          "transition-colors duration-200 ease-[var(--ease-out-soft)]",
          "hover:bg-[var(--color-accent-hover)] active:translate-y-px",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]",
        )}
      >
        View More Projects
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          className="size-3.5 transition-transform duration-300 ease-[var(--ease-out-soft)] group-hover:translate-x-0.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 8h10M9 4l4 4-4 4" />
        </svg>
      </Link>
    </div>
  );
}
