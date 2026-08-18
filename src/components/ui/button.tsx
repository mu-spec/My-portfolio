import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const base = [
  "inline-flex items-center justify-center gap-2 whitespace-nowrap",
  "rounded-md font-medium",
  "transition-[background-color,border-color,color,transform] duration-200 ease-[var(--ease-out-soft)]",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]",
  "disabled:pointer-events-none disabled:opacity-50",
  "active:translate-y-px",
].join(" ");

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--color-accent-solid)] text-white hover:bg-[var(--color-accent-solid-hover)] shadow-[0_1px_0_0_rgb(255_255_255/0.12)_inset]",
  secondary:
    "border border-line-strong bg-elevated text-ink hover:border-ink-subtle hover:bg-overlay",
  ghost: "text-ink-muted hover:bg-elevated hover:text-ink",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-13 px-7 text-base",
};

interface BaseProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

interface ButtonAsButton
  extends BaseProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> {
  href?: undefined;
}

interface ButtonAsLink extends BaseProps {
  /** Renders an anchor instead of a button. */
  href: string;
  /** External links open in a new tab with safe rel attributes. */
  external?: boolean;
  /** Useful for side effects on navigation, e.g. closing a mobile menu. */
  onClick?: () => void;
  "aria-label"?: string;
}

export type ButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * Primary interactive control.
 *
 * Renders a real <button> or a Next <Link> depending on props, so semantics
 * and keyboard behaviour are always correct without extra wiring.
 */
export function Button(props: ButtonProps) {
  const classes = cn(
    base,
    variants[props.variant ?? "primary"],
    sizes[props.size ?? "md"],
    props.className,
  );

  if (props.href !== undefined) {
    const { href, children, external, onClick } = props;
    const isExternal = external ?? /^https?:\/\//.test(href);

    if (isExternal) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noreferrer noopener"
          onClick={onClick}
          aria-label={props["aria-label"]}
        >
          {children}
        </a>
      );
    }

    return (
      <Link
        href={href}
        className={classes}
        onClick={onClick}
        aria-label={props["aria-label"]}
      >
        {children}
      </Link>
    );
  }

  // Strip the presentational props so only native attributes reach the DOM.
  const {
    children,
    variant: _variant,
    size: _size,
    className: _className,
    href: _href,
    ...buttonProps
  } = props;

  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
