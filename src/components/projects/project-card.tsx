import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
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
 * Project card foundation.
 *
 * Renders only verified data. Optional fields (tagline, technologies) are
 * omitted entirely when empty rather than filled with placeholder copy, so
 * the layout stays honest until verified content lands in a later milestone.
 * The visual/media treatment is completed in the project-showcase milestone.
 */
export function ProjectCard({
  project,
  emphasis = false,
  className,
}: ProjectCardProps) {
  const { name, tagline, status, technologies, links } = project;
  const headingId = `project-${project.slug}-title`;

  return (
    <Card
      interactive
      className={cn("group flex flex-col p-6 sm:p-8", className)}
    >
      {/* Status sits on its own meta row so long project names never
          compete with the badge for horizontal space. */}
      <Badge variant={emphasis ? "accent" : "outline"} className="mb-5">
        {statusLabels[status]}
      </Badge>

      <h3
        id={headingId}
        className={cn(
          "text-balance font-semibold text-ink",
          emphasis ? "text-h3" : "text-lg",
        )}
      >
        {name}
      </h3>

      {tagline ? (
        <p className="mt-3 text-pretty text-ink-muted">{tagline}</p>
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

      <div className="mt-auto pt-8">
        <a
          href={links.github}
          target="_blank"
          rel="noreferrer noopener"
          className={cn(
            "inline-flex items-center gap-2 rounded-xs text-sm font-medium",
            "text-ink-muted transition-colors hover:text-ink",
            "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-focus)]",
          )}
          aria-label={`View ${name} source code on GitHub`}
        >
          View source
          <svg
            aria-hidden="true"
            viewBox="0 0 16 16"
            className={cn(
              "size-3.5 transition-transform duration-300 ease-[var(--ease-out-soft)]",
              "group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
            )}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" />
          </svg>
        </a>
      </div>
    </Card>
  );
}
