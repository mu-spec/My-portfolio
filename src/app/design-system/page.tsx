import type { Metadata } from "next";

import { ProjectCard } from "@/components/projects/project-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { getProjects } from "@/data/projects";
import { siteConfig } from "@/config/site";

/**
 * Internal design-system reference.
 *
 * Not part of the public site: it documents the tokens and primitives so
 * future sections stay consistent. Excluded from search indexing.
 */
export const metadata: Metadata = {
  title: "Design system",
  robots: { index: false, follow: false },
};

export default function DesignSystemPage() {
  const projects = getProjects();

  return (
    <>
      <Section spacing="default">
        <div className="flex flex-col gap-8">
          <Badge variant="accent">Internal reference</Badge>

          <h1 className="max-w-4xl text-balance text-display font-semibold text-ink">
            Design system foundation
          </h1>

          <p className="max-w-xl text-pretty text-lead text-ink-muted">
            Tokens, layout primitives, typography scale and interactive
            states used across the {siteConfig.role.toLowerCase()} portfolio.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button href="#controls" size="lg">
              Primary action
            </Button>
            <Button href="#surfaces" size="lg" variant="secondary">
              Secondary action
            </Button>
          </div>
        </div>
      </Section>

      <Section id="typography" bordered spacing="compact">
        <SectionHeading
          eyebrow="Type scale"
          title="Typography"
          description="A fluid scale that adapts from small phones to large desktop displays without manual breakpoints."
        />

        <div className="mt-12 flex flex-col divide-y divide-[var(--color-line)]">
          {[
            { label: "Display", className: "text-display", sample: "Aa" },
            { label: "Heading 1", className: "text-h1", sample: "Aa" },
            { label: "Heading 2", className: "text-h2", sample: "Aa" },
            { label: "Heading 3", className: "text-h3", sample: "Aa" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-baseline justify-between gap-8 py-6"
            >
              <span className={`${item.className} font-semibold text-ink`}>
                {item.sample}
              </span>
              <span className="shrink-0 font-mono text-xs uppercase tracking-widest text-ink-subtle">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <p className="text-lead text-ink-muted">
            Lead paragraph — used for section introductions and supporting
            statements where readability matters most.
          </p>
          <p className="text-ink-muted">
            Body text — the default measure for longer passages, set at a
            comfortable line height with restrained contrast.
          </p>
        </div>
      </Section>

      <Section id="controls" bordered spacing="compact">
        <SectionHeading
          eyebrow="Controls"
          title="Buttons and tags"
          description="Every interactive control has a visible focus state and a refined hover transition."
        />

        <div className="mt-12 flex flex-col gap-10">
          <div className="flex flex-wrap items-center gap-3">
            <Button size="lg">Primary</Button>
            <Button size="lg" variant="secondary">
              Secondary
            </Button>
            <Button size="lg" variant="ghost">
              Ghost
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="accent">Accent</Badge>
            <Badge>Default</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
        </div>
      </Section>

      <Section id="surfaces" bordered spacing="compact">
        <SectionHeading
          eyebrow="Surfaces"
          title="Elevation"
          description="Four background levels keep depth consistent without relying on heavy shadows or glass effects."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { name: "Base", className: "bg-base" },
            { name: "Surface", className: "bg-surface" },
            { name: "Elevated", className: "bg-elevated" },
            { name: "Overlay", className: "bg-overlay" },
          ].map((surface) => (
            <div
              key={surface.name}
              className={`flex h-28 items-end rounded-lg border border-line p-4 ${surface.className}`}
            >
              <span className="font-mono text-xs uppercase tracking-widest text-ink-subtle">
                {surface.name}
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section id="project-cards" bordered spacing="compact">
        <SectionHeading
          eyebrow="Data architecture"
          title="Project records"
          description="The three confirmed projects, rendered from centralized data. Descriptions, technologies and screenshots stay empty until verified content is supplied. Source repositories are private and are never linked."
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              emphasis={project.featured}
            />
          ))}
        </div>
      </Section>

      <Section id="structure" bordered spacing="compact">
        <SectionHeading
          eyebrow="Next milestone"
          title="Reserved sections"
          description="Routes and anchors are already defined so these sections can be added without restructuring."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {["Home", "Work", "About", "Skills", "Contact"].map((section) => (
            <Card key={section} className="flex items-center justify-between p-5">
              <span className="font-medium text-ink">{section}</span>
              <span className="font-mono text-xs text-ink-subtle">P1</span>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
