import type { ReactNode } from "react";

import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";

type SectionSpacing = "compact" | "default" | "spacious";

const spacings: Record<SectionSpacing, string> = {
  compact: "py-16 sm:py-20",
  default: "py-20 sm:py-28 lg:py-36",
  spacious: "py-28 sm:py-36 lg:py-48",
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
