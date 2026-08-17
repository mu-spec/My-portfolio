"use client";

import { useEffect, useId, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { primaryCta, primaryNav } from "@/config/navigation";
import { cn } from "@/lib/cn";

/**
 * Mobile navigation disclosure.
 *
 * Accessibility behaviour:
 * - the trigger is a real button with aria-expanded / aria-controls
 * - Escape closes the panel and returns focus to the trigger
 * - background scroll is locked while open
 * - the panel is removed from the tree when closed, so no hidden tab stops
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        className={cn(
          "inline-flex size-10 items-center justify-center rounded-md",
          "border border-line-strong bg-elevated text-ink",
          "transition-colors hover:bg-overlay",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]",
        )}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className="size-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        >
          {open ? (
            <path d="M5 5l10 10M15 5L5 15" />
          ) : (
            <path d="M3.5 7h13M3.5 13h13" />
          )}
        </svg>
      </button>

      {open ? (
        <div
          id={panelId}
          // Positioned against the header rather than the viewport: the
          // header's backdrop-filter makes it the containing block for any
          // fixed-position descendant, which would collapse this panel.
          className="absolute inset-x-0 top-full z-40 max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-base"
        >
          <nav aria-label="Mobile" className="px-5 py-6">
            <ul className="flex flex-col">
              {primaryNav.map((item) => (
                <li key={item.href} className="border-b border-line last:border-0">
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block rounded-xs py-4 text-lg font-medium text-ink-muted",
                      "transition-colors hover:text-ink",
                      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]",
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Closing on navigation keeps the panel from covering the target */}
            <Button
              href={primaryCta.href}
              size="lg"
              className="mt-6 w-full"
              onClick={() => setOpen(false)}
            >
              {primaryCta.label}
            </Button>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
