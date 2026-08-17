import { ProjectActions } from "@/components/projects/project-actions";
import { ProjectPreviewVisual } from "@/components/projects/project-preview-visual";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/cn";
import type { Project } from "@/types/project";

const statusLabels: Record<Project["status"], string> = {
  "in-development": "In development",
  "in-testing": "In testing",
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
 * Source repositories are private and are never linked.
 *
 * Actions are delegated to ProjectActions, which derives them from the
 * project's distribution data. Because a card can carry several distinct
 * destinations, each is its own labelled control rather than a whole-card
 * link that would swallow their clicks.
 */
export function ProjectCard({
  project,
  emphasis = false,
  className,
}: ProjectCardProps) {
  const { name, category, tagline, status, technologies } = project;

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

        <ProjectActions project={project} className="mt-auto pt-8" />
      </div>
    </article>
  );
}
