import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  /** Small uppercase label above the title. */
  eyebrow?: string;
  title: ReactNode;
  /** Supporting sentence below the title. */
  description?: ReactNode;
  /** Heading level — keeps the document outline correct per page. */
  as?: "h1" | "h2" | "h3";
  align?: "start" | "center";
  className?: string;
}

/**
 * Standard section header: eyebrow, title and optional description,
 * with consistent measure and spacing.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  as: Heading = "h2",
  align = "start",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        centered && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <span className="inline-flex items-center gap-2.5 text-eyebrow font-medium uppercase text-ink-subtle">
          <span aria-hidden="true" className="h-px w-6 bg-line-strong" />
          {eyebrow}
        </span>
      ) : null}

      <Heading
        className={cn(
          "text-balance font-semibold text-ink",
          Heading === "h1" ? "text-h1" : "text-h2",
        )}
      >
        {title}
      </Heading>

      {description ? (
        <p
          className={cn(
            "max-w-2xl text-pretty text-lead text-ink-muted",
            centered && "mx-auto",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
