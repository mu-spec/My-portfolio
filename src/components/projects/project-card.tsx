import Link from "next/link";

import { ApkDownloadButton } from "@/components/projects/apk-download-button";
import { ProjectPreviewVisual } from "@/components/projects/project-preview-visual";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/cn";
import type { Project } from "@/types/project";

const statusLabels: Record<Project["status"], string> = {
  "in-development": "In development",
  released: "Released",
};

interface ProjectCardProps {
  project: Project;
  /** Larger treatment used for the flagship project. */
  emphasis?: boolean;
  className?: string;
}

/**
 * Project preview card.
 *
 * Shows only verified, public-facing information: name, category and status.
 * Source repositories are private and are never linked. The single CTA points
 * at the reserved case-study route, which is implemented in a later milestone.
 *
 * The card exposes two distinct actions — the case study and, when a verified
 * URL exists, an APK download — so each is a separate labelled control rather
 * than a whole-card link.
 */
export function ProjectCard({
  project,
  emphasis = false,
  className,
}: ProjectCardProps) {
  const { name, category, tagline, status, technologies, caseStudyHref, apk } =
    project;

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-lg border border-line bg-surface",
        "transition-colors duration-300 ease-[var(--ease-out-soft)]",
        "hover:border-line-strong hover:bg-elevated",
        "focus-within:border-line-strong",
        className,
      )}
    >
      <div className={cn("p-4 pb-0", emphasis && "sm:p-6 sm:pb-0")}>
        <ProjectPreviewVisual slug={project.slug} emphasis={emphasis} />
      </div>

      <div
        className={cn(
          "flex flex-1 flex-col p-6",
          emphasis && "sm:p-8 sm:pt-7",
        )}
      >
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="text-sm font-medium text-[var(--color-focus)]">
            {category}
          </span>
          {/* Hidden when the badge wraps to its own line, so the rule never
              dangles at the end of the category row. */}
          <span
            aria-hidden="true"
            className="hidden h-3 w-px bg-line-strong sm:block"
          />
          <Badge variant="outline">{statusLabels[status]}</Badge>
        </div>

        <h3
          className={cn(
            "mt-3 text-balance font-semibold text-ink",
            emphasis ? "text-h3" : "text-xl",
          )}
        >
          {name}
        </h3>

        {tagline ? (
          <p className="mt-3 text-pretty text-ink-muted">{tagline}</p>
        ) : null}

        {technologies.length > 0 ? (
          <ul className="mt-5 flex flex-wrap gap-2">
            {technologies.map((technology) => (
              <li key={technology}>
                <Badge>{technology}</Badge>
              </li>
            ))}
          </ul>
        ) : null}

        {/* Two distinct destinations, so each is its own control rather than
            a whole-card link. */}
        <div className="mt-auto flex flex-wrap items-center gap-3 pt-8">
          <Link
            href={caseStudyHref}
            className={cn(
              "inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-md px-5",
              "bg-accent text-[0.9375rem] font-medium text-white",
              "shadow-[0_1px_0_0_rgb(255_255_255/0.12)_inset]",
              "transition-colors duration-200 ease-[var(--ease-out-soft)]",
              "hover:bg-[var(--color-accent-hover)] active:translate-y-px",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]",
            )}
            aria-label={`View the ${name} case study`}
          >
            View Case Study
            <svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              className="size-3.5 transition-transform duration-300 ease-[var(--ease-out-soft)] group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Link>

          <ApkDownloadButton apk={apk} projectName={name} />
        </div>
      </div>
    </article>
  );
}
