"use client";

import { useEffect, useState } from "react";

export interface SectionNavItem {
  id: string;
  label: string;
}

/**
 * Sticky in-page navigator for a case study.
 *
 * Real anchors (`<a href="#id">`), so it works before hydration, is keyboard
 * navigable by default, and supports open-in-new-tab and copy-link. No
 * scroll hijacking: smooth scrolling and the header offset come from CSS
 * (`scroll-behavior` and `scroll-mt-20`), which also means the OS
 * reduced-motion setting is honoured automatically.
 *
 * The active item is tracked with an IntersectionObserver rather than a
 * scroll handler, so there is no per-frame work on the main thread.
 *
 * Layout: sticky under the header. It is a slim horizontal bar, so it never
 * covers content — the page simply scrolls beneath it. The bar itself is
 * full-bleed while its list matches the site container, so it aligns with
 * page content without negative margins (those escaped the viewport and
 * caused horizontal overflow). Below `lg` it scrolls horizontally rather
 * than wrapping, keeping it one line tall on phones.
 */
export function CaseStudySectionNav({ items }: { items: SectionNavItem[] }) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    // Trigger band sits just under the sticky header, so a section counts as
    // active once its heading reaches the top of the readable area.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 },
    );

    for (const section of sections) observer.observe(section);
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="Case study sections"
      className="sticky top-16 z-30 border-y border-line bg-base/85 backdrop-blur-md lg:top-20"
    >
      <ul
        className="mx-auto flex w-full max-w-6xl snap-x gap-1 overflow-x-auto px-5 py-2 sm:px-8 lg:justify-center lg:px-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => {
          const isActive = item.id === activeId;

          return (
            <li key={item.id} className="snap-start">
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "true" : undefined}
                className={[
                  "inline-flex min-h-9 items-center whitespace-nowrap rounded-md px-3",
                  "text-sm transition-colors duration-200",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]",
                  isActive
                    ? "bg-elevated text-ink"
                    : "text-ink-subtle hover:text-ink-muted",
                ].join(" ")}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
