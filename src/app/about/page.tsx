import type { Metadata } from "next";
import Link from "next/link";

import { Portrait } from "@/components/about/portrait";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/config/site";
import { getProjects } from "@/data/projects";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "About",
  description:
    "Muhammad Saad is a mobile app developer who takes Android applications from idea and interface design through development, testing and release.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About — Muhammad Saad",
    description:
      "Mobile app developer taking Android applications from idea and interface design through development, testing and release.",
    type: "profile",
    /* A page-level openGraph block replaces the inherited
       opengraph-image.tsx entry, so the generated card is referenced
       explicitly here to keep summary_large_image valid. */
    images: ["/opengraph-image"],
  },
};

/**
 * Capabilities.
 *
 * Every entry is demonstrated by something shipped in this portfolio — the
 * two Android builds and their case studies. Nothing here asserts years of
 * experience, employers, clients, education, certifications or metrics,
 * because none of that is verified.
 */
const CAPABILITIES = [
  {
    title: "Mobile application development",
    description:
      "Building Android applications in Flutter and Dart, structured so each area of an app can grow without destabilising the rest.",
  },
  {
    title: "UI/UX implementation",
    description:
      "Translating an interface design into a working product: consistent components, readable typography and layouts that hold up from small phones to large screens.",
  },
  {
    title: "Practical product thinking",
    description:
      "Deciding what an app should not do. Both projects here are shaped as much by what was deliberately left out as by what was built.",
  },
  {
    title: "Testing and iteration",
    description:
      "Exercising real builds on device, fixing what surfaces, and refining behaviour before a release rather than after it.",
  },
  {
    title: "Concept to working build",
    description:
      "Carrying an idea through design, implementation and packaging to an installable Android build that other people can actually run.",
  },
  {
    title: "Offline-first, on-device",
    description:
      "Designing applications that do their work locally, so they stay usable without a connection and keep user data on the device.",
  },
] as const;

export default function AboutPage() {
  const projects = getProjects();

  return (
    <>
      {/* ------------------------------------------------------------------ */}
      {/* Intro — portrait + content                                          */}
      {/* ------------------------------------------------------------------ */}
      <Section spacing="tight-lg" className="pt-14 sm:pt-20">
        {/*
          Desktop: a balanced two-column layout, portrait left / content right.
          The portrait column is capped at 24rem so it supports the copy rather
          than dominating the page.

          Mobile and tablet: the grid collapses to one column and the portrait
          renders first in source order, so it naturally stacks above the text
          without any order juggling.
        */}
        <div className="grid gap-12 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:items-start lg:gap-16 xl:grid-cols-[minmax(0,24rem)_minmax(0,1fr)]">
          <Portrait className="max-w-[17rem] sm:max-w-[20rem] lg:max-w-none" />

          <div>
            <span className="text-sm font-medium text-[var(--color-focus)]">
              About
            </span>
            <h1 className="mt-4 text-balance text-h1 font-semibold text-ink">
              {siteConfig.name}
            </h1>
            <p className="mt-4 text-h3 font-medium text-ink-muted">
              {siteConfig.role}
            </p>

            <div className="mt-8 flex flex-col gap-5 text-pretty text-lead text-ink-muted">
              <p>
                I build mobile applications, and I take them the whole way:
                from the initial idea and interface design, through development
                and testing, to a working Android build that can be installed
                and used.
              </p>
              <p>
                That end-to-end scope is deliberate. Deciding how a screen
                should behave, structuring the code behind it, and getting the
                result onto a real device are not separate problems — the
                decisions made in one constrain the others. Working across all
                of them means the product that ships is the product that was
                designed.
              </p>
              <p>
                The two applications in this portfolio were built that way.
                Each one is a complete Android build with its own interface,
                its own engineering decisions, and a case study explaining the
                reasoning rather than just showing the result.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* Capabilities                                                        */}
      {/* ------------------------------------------------------------------ */}
      <Section bordered spacing="tight-lg">
        <SectionHeading
          eyebrow="What I do"
          title="How I work on mobile products"
          description="Each of these is demonstrated by the applications in this portfolio."
        />

        <ul className="mt-14 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((item, i) => (
            <li
              key={item.title}
              className="flex flex-col gap-3 bg-surface p-7 transition-colors duration-300 ease-[var(--ease-out-soft)] hover:bg-elevated sm:p-8"
            >
              <span
                aria-hidden="true"
                className="font-mono text-sm text-[var(--color-focus)]"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-h3 font-semibold text-ink">{item.title}</h3>
              <p className="text-pretty text-[1.0625rem] leading-[1.6] text-ink-muted">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* Approach                                                            */}
      {/* ------------------------------------------------------------------ */}
      <Section bordered spacing="tight-lg">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <SectionHeading eyebrow="Approach" title="Build it, then justify it" />

          <div className="flex flex-col gap-5 text-pretty text-lead text-ink-muted">
            <p>
              A finished screen is easy to show and hard to explain. I care
              more about the second part — why a feature is structured the way
              it is, what it deliberately refuses to do, and what the tradeoff
              cost.
            </p>
            <p>
              In practice that means keeping presentation, logic and data
              separate so a change in one does not ripple through the others;
              preferring local, on-device behaviour so an app keeps working
              without a network; and treating destructive or irreversible
              actions as design problems rather than implementation details.
            </p>
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* Projects                                                            */}
      {/* ------------------------------------------------------------------ */}
      <Section bordered spacing="tight-lg">
        <SectionHeading
          eyebrow="Selected work"
          title="Two shipped Android applications"
        />

        <ul className="mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
          {projects.map((project) => (
            <li key={project.slug} className="bg-surface">
              <Link
                href={project.caseStudyHref}
                className={cn(
                  "flex h-full flex-col gap-3 p-8",
                  "transition-colors duration-300 ease-[var(--ease-out-soft)] hover:bg-elevated",
                  "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--color-focus)]",
                )}
              >
                <span className="text-sm text-ink-subtle">
                  {project.category}
                </span>
                <span className="text-h3 font-semibold text-ink">
                  {project.name}
                </span>
                <span className="mt-auto inline-flex items-center gap-2 pt-4 text-[0.9375rem] font-medium text-[var(--color-focus)]">
                  Read the case study
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 16 16"
                    className="size-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* CTA                                                                 */}
      {/* ------------------------------------------------------------------ */}
      <Section bordered spacing="tight">
        <Container className="px-0">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <p className="text-lead text-ink-muted">
              Interested in working together?
            </p>
            <Link
              href="/contact"
              className={cn(
                "inline-flex h-11 items-center gap-2 rounded-md border border-line-strong px-5",
                "text-[0.9375rem] font-medium text-ink transition-colors",
                "hover:border-ink-subtle hover:bg-elevated",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]",
              )}
            >
              Get in touch
              <svg
                aria-hidden="true"
                viewBox="0 0 16 16"
                className="size-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
