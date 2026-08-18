import type { ReactNode } from "react";

import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";

type SectionSpacing = "compact" | "default" | "spacious" | "tight" | "tight-lg";

/**
 * NOTE: `cn` is a plain joiner, not a tailwind-merge. Passing a conflicting
 * padding utility via `className` will NOT override these — both classes are
 * emitted and CSS source order decides. Pick the right `spacing` variant
 * instead of trying to override it downstream.
 *
 * `tight` / `tight-lg` were added for the Mobile Cleaner case study, whose
 * sections are denser than the marketing pages. The existing three variants
 * are untouched so the homepage and the Electrician case study keep their
 * approved rhythm exactly.
 */
const spacings: Record<SectionSpacing, string> = {
  compact: "py-16 sm:py-20",
  default: "py-20 sm:py-28 lg:py-36",
  spacious: "py-28 sm:py-36 lg:py-48",
  tight: "py-16 sm:py-20 lg:py-24",
  "tight-lg": "py-20 sm:py-24 lg:py-28",
};

interface SectionProps {
  children: ReactNode;
  /** Anchor target, e.g. "work" — enables /#work deep links. */
  id?: string;
  spacing?: SectionSpacing;
  /** Adds a hairline rule above the section. */
  bordered?: boolean;
  /** Set false to control the inner layout manually. */
  contained?: boolean;
  /** Accessible label when the section has no visible heading. */
  ariaLabel?: string;
  className?: string;
}

/**
 * Vertical rhythm primitive. Every page section renders through this so
 * spacing stays consistent across the whole site.
 */
export function Section({
  children,
  id,
  spacing = "default",
  bordered = false,
  contained = true,
  ariaLabel,
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn(
        spacings[spacing],
        bordered && "border-t border-line",
        // Offsets the sticky header when jumping to an anchor
        id && "scroll-mt-20",
        className,
      )}
    >
      {contained ? <Container>{children}</Container> : children}
    </section>
  );
}
