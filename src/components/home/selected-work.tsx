import { ProjectCard } from "@/components/projects/project-card";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { sectionIds } from "@/config/navigation";
import { getProjects } from "@/data/projects";

/**
 * Selected Work.
 *
 * The flagship project spans the full grid width on larger screens; the
 * remaining two sit side by side beneath it. This gives Electrician Simulator
 * App clear visual priority without needing a separate component.
 */
export function SelectedWork() {
  const projects = getProjects();
  const [flagship, ...supporting] = projects;

  return (
    <Section id={sectionIds.work} bordered spacing="default">
      <SectionHeading
        eyebrow="Selected Work"
        title="Applications I've designed and built"
        description="A focused selection of mobile applications, each taken from concept through to a working product."
      />

      <div className="mt-14 flex flex-col gap-5 sm:mt-16">
        {flagship ? (
          <ProjectCard
            project={flagship}
            emphasis
            className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-2"
          />
        ) : null}

        {supporting.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2">
            {supporting.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        ) : null}
      </div>
    </Section>
  );
}
