"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/cn";

/**
 * Primary navigation link with an active state.
 *
 * Kept as a small client component so the header and footer can stay server
 * components — only the link itself needs the current pathname.
 *
 * Matching rules:
 * - "/" is active only on the homepage itself, never as a prefix.
 * - "/#work" is a homepage anchor, so it is treated as a homepage link and
 *   never marked active on its own (the Home link already covers that).
 * - Any other route is active on exact match or as a path prefix, so
 *   /work/mobile-cleaner keeps a "Work" style link highlighted if one exists.
 *
 * `aria-current="page"` is set alongside the visual treatment, so the state
 * is conveyed to assistive technology and not by colour alone.
 */
export function NavLink({
  href,
  children,
  className,
  activeClassName,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  onClick?: () => void;
}) {
  const pathname = usePathname();

  const [path] = href.split("#");
  const isAnchor = href.includes("#");
  const target = path || "/";

  const active = isAnchor
    ? false
    : target === "/"
      ? pathname === "/"
      : pathname === target || pathname.startsWith(`${target}/`);

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={cn(className, active && activeClassName)}
    >
      {children}
    </Link>
  );
}
