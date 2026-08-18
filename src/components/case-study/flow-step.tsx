import type { ReactNode } from "react";

import { DeviceFrame } from "@/components/projects/device-frame";
import { cn } from "@/lib/cn";
import type { ProjectMedia } from "@/types/project";

interface FlowStepProps {
  /** Step number, e.g. "01". */
  index: string;
  title: string;
  body: string;
  /** Short verified facts read directly from the screen. */
  facts?: readonly string[];
  /** The real screenshot for this step. Omitted when no capture exists. */
  screen?: ProjectMedia;
  /** Shown in place of a screenshot when none was supplied. */
  placeholder?: ReactNode;
  /** Hides the connecting rail on the final step. */
  last?: boolean;
}

/**
 * One step of the Mobile Cleaner walkthrough.
 *
 * The Electrician case study alternates full-width left/right rows. This is a
 * different structure on purpose: a single vertical rail runs down the page
 * with numbered nodes, because Mobile Cleaner's story is strictly sequential
 * — understand storage, find opportunities, review, clean. A reader should
 * feel the order rather than just see four sections.
 *
 * The rail is decorative and hidden from assistive tech; the semantic order
 * comes from the surrounding ordered list.
 */
export function FlowStep({
  index,
  title,
  body,
  facts,
  screen,
  placeholder,
  last = false,
}: FlowStepProps) {
  return (
    /**
     * The screenshot column is a fixed track (not `auto`) so the real screens
     * render at a consistent, inspectable size rather than shrinking to their
     * content box. Aspect ratio is still owned by DeviceFrame, so enlarging
     * the column scales the capture without distorting it.
     */
    <li className="relative grid gap-10 pl-12 sm:pl-16 lg:grid-cols-[minmax(0,1fr)_21rem] lg:items-start lg:gap-14">
      {/* Node + connecting rail */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 flex h-full w-8 flex-col items-center sm:w-10"
      >
        <span
          className={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-full sm:size-10",
            "border border-[color-mix(in_oklab,var(--cleaner-accent)_45%,transparent)]",
            "bg-[color-mix(in_oklab,var(--cleaner-accent)_14%,var(--color-surface))]",
            "font-mono text-xs font-medium text-[var(--cleaner-accent-text)] sm:text-sm",
          )}
        >
          {index}
        </span>

        {!last ? (
          <span className="mt-3 w-px flex-1 bg-[linear-gradient(to_bottom,color-mix(in_oklab,var(--cleaner-accent)_40%,transparent),transparent)]" />
        ) : null}
      </div>

      <div className="lg:max-w-xl">
        <h3 className="text-h3 font-semibold text-ink">{title}</h3>
        <p className="mt-4 text-pretty text-lead text-ink-muted">{body}</p>

        {facts && facts.length > 0 ? (
          <ul className="mt-6 flex flex-wrap gap-2">
            {facts.map((fact) => (
              <li
                key={fact}
                className={cn(
                  "inline-flex items-center rounded-sm border px-2.5 py-1",
                  "border-[color-mix(in_oklab,var(--cleaner-accent)_28%,transparent)]",
                  "bg-[color-mix(in_oklab,var(--cleaner-accent)_10%,transparent)]",
                  "text-[0.8125rem] font-medium tracking-wide text-[var(--cleaner-accent-text)]",
                )}
              >
                {fact}
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <div className="w-full max-w-[17rem] justify-self-start sm:max-w-[19rem] lg:w-full lg:max-w-none lg:justify-self-end lg:self-center">
        {screen ? (
          <div className="relative isolate">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10 [background:radial-gradient(closest-side,color-mix(in_oklab,var(--cleaner-accent)_18%,transparent),transparent_72%)]"
            />
            <DeviceFrame
              media={screen}
              sizes="(min-width: 1024px) 21rem, (min-width: 640px) 19rem, 70vw"
            />
          </div>
        ) : (
          placeholder
        )}
      </div>
    </li>
  );
}
