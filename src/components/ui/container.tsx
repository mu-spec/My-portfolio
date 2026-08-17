import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/cn";

type ContainerWidth = "narrow" | "default" | "wide";

const widths: Record<ContainerWidth, string> = {
  narrow: "max-w-3xl",
  default: "max-w-6xl",
  wide: "max-w-[90rem]",
};

interface ContainerProps {
  children: ReactNode;
  /** Renders as a different element when the semantics call for it. */
  as?: ElementType;
  width?: ContainerWidth;
  className?: string;
}

/**
 * Horizontal layout primitive.
 *
 * Owns the responsive gutter so content never touches the viewport edge on
 * mobile, and scales the inset up on larger displays.
 */
export function Container({
  children,
  as: Component = "div",
  width = "default",
  className,
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "mx-auto w-full px-5 sm:px-8 lg:px-12",
        widths[width],
        className,
      )}
    >
      {children}
    </Component>
  );
}
