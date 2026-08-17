import { ProjectCard } from "@/components/projects/project-card";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { sectionIds } from "@/config/navigation";
import { getProjects } from "@/data/projects";

/**
 * Selected Work.
 *
 * With a short, curated list every project gets a full-width row rather than
 * a grid cell, so two projects read as a deliberate selection instead of a
 * three-column grid with an empty slot. The flagship keeps the strongest
 * emphasis via a larger frame and heavier type.
 */
export function SelectedWork() {
  const projects = getProjects();

  return (
    <Section id={sectionIds.work} bordered spacing="default">
      <SectionHeading
        eyebrow="Selected Work"
        title="Applications I've designed and built"
        description="A focused selection of mobile applications, each taken from concept through to a working product."
      />

      <ol className="mt-14 flex flex-col gap-6 sm:mt-16 sm:gap-8">
        {projects.map((project, index) => (
          <li key={project.slug}>
            <ProjectCard
              project={project}
              emphasis={project.featured}
              index={index + 1}
            />
          </li>
        ))}
      </ol>
    </Section>
  );
}
