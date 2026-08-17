import { ProjectActions } from "@/components/projects/project-actions";
import { ProjectPreviewVisual } from "@/components/projects/project-preview-visual";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/cn";
import type { Project } from "@/types/project";

const statusLabels: Record<NonNullable<Project["status"]>, string> = {
  "in-development": "In development",
  "in-testing": "In testing",
  released: "Released",
};

interface ProjectCardProps {
  project: Project;
  /** Stronger treatment for the flagship project. */
  emphasis?: boolean;
  /** 1-based position, rendered as an index like "01". */
  index?: number;
  className?: string;
}

/**
 * Project card.
 *
 * Shows only verified, public-facing information: index, category, status and
 * name. Source repositories are private and are never linked.
 *
 * Actions are delegated to ProjectActions, which derives them from the
 * project's distribution data. Because a card can carry several distinct
 * destinations, each is its own labelled control rather than a whole-card
 * link that would swallow their clicks.
 */
export function ProjectCard({
  project,
  emphasis = false,
  index,
  className,
}: ProjectCardProps) {
  const { name, category, tagline, status, technologies } = project;

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-lg border border-line bg-surface",
        "transition-colors duration-300 ease-[var(--ease-out-soft)]",
        "hover:border-line-strong hover:bg-elevated",
        "focus-within:border-line-strong",
        // Two-column on large screens; the flagship gets the wider visual.
        "lg:grid lg:items-center",
        // The flagship carries three actions, so its text column gets more
        // room to keep them on one row at wide sizes.
        emphasis ? "lg:grid-cols-[1fr_1.1fr]" : "lg:grid-cols-2",
        className,
      )}
    >
      <div className={cn("p-4 pb-0 lg:pb-4", emphasis && "sm:p-6 sm:pb-0 lg:sm:pb-6")}>
        <ProjectPreviewVisual slug={project.slug} emphasis={emphasis} />
      </div>

      <div
        className={cn(
          "flex flex-col p-6",
          emphasis ? "sm:p-8 lg:p-10" : "sm:p-8",
        )}
      >
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          {index !== undefined ? (
            <>
              <span className="font-mono text-sm text-ink-subtle">
                {String(index).padStart(2, "0")}
              </span>
              <span
                aria-hidden="true"
                className="h-3 w-px bg-line-strong"
              />
            </>
          ) : null}

          <span className="text-sm font-medium text-[var(--color-focus)]">
            {category}
          </span>

          {/* Rendered only when a verified status adds information the
              distribution actions do not already convey. */}
          {status ? (
            <Badge variant="outline">{statusLabels[status]}</Badge>
          ) : null}
        </div>

        <h3
          className={cn(
            "mt-4 text-balance font-semibold text-ink",
            emphasis ? "text-h2" : "text-h3",
          )}
        >
          {name}
        </h3>

        {tagline ? (
          <p className="mt-4 max-w-prose text-pretty text-lead text-ink-muted">
            {tagline}
          </p>
        ) : null}

        {technologies.length > 0 ? (
          <ul className="mt-6 flex flex-wrap gap-2">
            {technologies.map((technology) => (
              <li key={technology}>
                <Badge>{technology}</Badge>
              </li>
            ))}
          </ul>
        ) : null}

        <ProjectActions project={project} className="mt-8" />
      </div>
    </article>
  );
}
