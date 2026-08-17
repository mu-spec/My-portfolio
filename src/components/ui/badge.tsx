import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type BadgeVariant = "default" | "accent" | "outline";

const variants: Record<BadgeVariant, string> = {
  default: "border-line-strong bg-elevated text-ink-muted",
  accent:
    "border-transparent bg-[var(--color-accent-soft)] text-[var(--color-focus)]",
  outline: "border-line-strong bg-transparent text-ink-subtle",
};

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

/** Compact label for tags, technologies and project status. */
export function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        // w-fit/self-start keep the badge hugging its content inside flex columns
        "inline-flex w-fit self-start items-center rounded-sm border px-2.5 py-1",
        "text-[0.8125rem] font-medium tracking-wide",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
