import { Section } from "@/components/ui/section";
import { getProjects } from "@/data/projects";

/**
 * Compact technology strip.
 *
 * The list is DERIVED from the technologies already recorded on the two
 * projects — it is not a hand-written list. That guarantees the homepage can
 * never advertise a technology the case studies do not evidence, and adding
 * or removing one in the project data updates this automatically.
 *
 * The two apps genuinely differ (BLoC/Cubit vs Riverpod), so the union is
 * shown rather than a single stack, ordered by how many projects use it so
 * the shared foundations read first.
 *
 * Deliberately plain text: no percentages, progress bars, proficiency scores
 * or logos. Recruiters scan this in a second; anything heavier would compete
 * with the work itself.
 */
function getTechnologies(): string[] {
  const counts = new Map<string, number>();

  for (const project of getProjects()) {
    for (const tech of project.technologies) {
      counts.set(tech, (counts.get(tech) ?? 0) + 1);
    }
  }

  // Shared technologies first, then first-appearance order within each group.
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([tech]) => tech);
}

export function TechnologyStrip() {
  const technologies = getTechnologies();

  if (technologies.length === 0) return null;

  return (
    <Section bordered spacing="compact" ariaLabel="Technologies">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-baseline lg:gap-12">
        <h2 className="shrink-0 text-eyebrow font-medium uppercase text-ink-subtle">
          Built with
        </h2>

        {/*
          A wrapping list rather than a horizontal scroller: with this many
          short items it fits on two lines even at 320px, and wrapping keeps
          every item reachable without a scroll gesture.
        */}
        <ul className="flex flex-wrap items-center gap-x-3 gap-y-2.5">
          {technologies.map((tech, index) => (
            <li key={tech} className="flex items-center gap-x-3">
              {index > 0 ? (
                <span
                  aria-hidden="true"
                  className="hidden size-1 rounded-full bg-line-strong sm:inline-block"
                />
              ) : null}
              <span className="text-[0.9375rem] text-ink-muted">{tech}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
