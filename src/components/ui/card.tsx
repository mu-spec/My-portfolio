import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

interface CardProps {
  children: ReactNode;
  /** Enables the hover treatment used by interactive cards. */
  interactive?: boolean;
  className?: string;
}

/**
 * Elevated surface primitive. The shared base for project cards and any
 * other panel that needs to sit above the page background.
 */
export function Card({ children, interactive = false, className }: CardProps) {
  return (
    <div
      className={cn(
        "relative rounded-lg border border-line bg-surface",
        interactive && [
          "transition-colors duration-300 ease-[var(--ease-out-soft)]",
          "hover:border-line-strong hover:bg-elevated",
          "focus-within:border-line-strong",
        ],
        className,
      )}
    >
      {children}
    </div>
  );
}
