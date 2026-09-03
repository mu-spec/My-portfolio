import type { Metadata } from "next";

import { MoreProjectCard } from "@/components/projects/more-project-card";
import { Section } from "@/components/ui/section";
import { getMoreProjects } from "@/data/more-projects";

export const metadata: Metadata = {
  title: "More Projects",
  description:
    "More mobile applications designed and developed by Muhammad Saad, across privacy, productivity, utilities and everyday Android experiences.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "More Projects — Muhammad Saad",
    description:
      "More mobile applications across privacy, productivity, utilities and everyday Android experiences.",
    type: "website",
    /* A page-level openGraph block replaces the inherited
       opengraph-image.tsx entry, so the generated card is referenced
       explicitly here to keep summary_large_image valid. */
    images: ["/opengraph-image"],
  },
};

/**
 * More Projects.
 *
 * A responsive grid of lightweight project cards (1 column on mobile, 2 on
 * tablet, 3 on desktop) rendered entirely from `moreProjects` data. These
 * cards deliberately carry no case-study route — the two featured
 * applications on the homepage keep their full case studies.
 */
export default function MoreProjectsPage() {
  const projects = getMoreProjects();

  return (
    <>
      {/* ------------------------------------------------------------------ */}
      {/* Header                                                              */}
      {/* ------------------------------------------------------------------ */}
      <Section spacing="tight-lg" className="pt-14 sm:pt-20">
        <div>
          <span className="text-sm font-medium text-[var(--color-focus)]">
            More Projects
          </span>
          <h1 className="mt-4 text-balance text-h1 font-semibold text-ink">
            More apps I&rsquo;ve built.
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-lead text-ink-muted">
            A collection of mobile applications I&rsquo;ve designed and
            developed across privacy, productivity, utilities, and everyday
            Android experiences.
          </p>
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* Project grid                                                        */}
      {/* ------------------------------------------------------------------ */}
      <Section bordered spacing="tight-lg">
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <li key={project.slug} className="h-full">
              <MoreProjectCard project={project} />
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
