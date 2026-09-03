import Image from "next/image";

import { GooglePlayIcon } from "@/components/projects/distribution-action";
import { cn } from "@/lib/cn";
import type { MoreProject } from "@/types/more-project";

interface MoreProjectCardProps {
  project: MoreProject;
  className?: string;
}

/**
 * Card for the More Projects grid (/projects).
 *
 * Shows exactly five things, all from data: a consistent 3:2 image area,
 * the category label, the app name, a two-sentence description and the
 * Google Play CTA.
 *
 * The image is always object-contain inside the fixed-ratio area, so a
 * supplied portfolio image is never stretched or aggressively cropped —
 * images with other proportions simply letterbox on the surface.
 *
 * Presentation only. Adding an app is a data change in
 * `@/data/more-projects`, not a layout change.
 */
export function MoreProjectCard({ project, className }: MoreProjectCardProps) {
  const { name, category, description, image, googlePlayUrl } = project;

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-lg border border-line bg-surface",
        "transition-colors duration-300 ease-[var(--ease-out-soft)]",
        "hover:border-line-strong hover:bg-elevated",
        "focus-within:border-line-strong",
        className,
      )}
    >
      {/* Consistent image area: fixed 3:2 at every viewport width. */}
      <div className="relative aspect-[3/2] shrink-0 overflow-hidden border-b border-line bg-elevated">
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes="(min-width: 1024px) 29vw, (min-width: 640px) 45vw, 100vw"
          className="h-full w-full object-contain transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:scale-[1.02]"
        />
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <span className="text-sm font-medium text-[var(--color-focus)]">
          {category}
        </span>

        <h3 className="mt-3 text-balance text-h3 font-semibold text-ink">
          {name}
        </h3>

        <p className="mt-3 text-pretty text-[0.9375rem] leading-[1.65] text-ink-muted">
          {description}
        </p>

        {/* mt-auto pins the CTA to the card bottom, so cards with different
            description lengths stay aligned in the grid. */}
        <div className="mt-auto pt-6">
          <a
            href={googlePlayUrl}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`View ${name} on Google Play, opens in a new tab`}
            className={cn(
              "inline-flex h-11 w-full items-center justify-center gap-2 rounded-md border border-line-strong bg-elevated px-4",
              "text-[0.9375rem] font-medium text-ink",
              "transition-colors duration-200 ease-[var(--ease-out-soft)]",
              "hover:border-ink-subtle hover:bg-overlay",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]",
              "active:translate-y-px",
            )}
          >
            <GooglePlayIcon />
            <span className="whitespace-nowrap">View on Google Play</span>
            <ExternalIcon />
          </a>
        </div>
      </div>
    </article>
  );
}

/** Small trailing "opens externally" arrow, matching the 16px icon set. */
function ExternalIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="size-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.5 2.5h4v4" />
      <path d="M13.5 2.5 7.5 8.5" />
      <path d="M13.5 9.5v2.5a1.5 1.5 0 0 1-1.5 1.5H4a1.5 1.5 0 0 1-1.5-1.5V4A1.5 1.5 0 0 1 4 2.5h2.5" />
    </svg>
  );
}
