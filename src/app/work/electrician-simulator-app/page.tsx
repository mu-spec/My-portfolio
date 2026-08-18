import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CaseStudyHeroVisual } from "@/components/case-study/case-study-hero-visual";
import { ScreenGroup } from "@/components/case-study/screen-group";
import {
  DistributionAction,
  DownloadIcon,
} from "@/components/projects/distribution-action";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { getProjectBySlug } from "@/data/projects";
import { cn } from "@/lib/cn";
import { requireMedia } from "@/lib/media";

const project = getProjectBySlug("electrician-simulator-app");

/**
 * Positioning statement, supplied and approved by the site owner.
 */
const POSITIONING =
  "A practical mobile toolkit designed to bring electrical learning, calculations, wiring references, and practice tools together in one application.";

export const metadata: Metadata = {
  // The layout template appends the site owner's name.
  title: "Electrician Simulator App — Mobile App Case Study",
  description:
    "Case study of Electrician Simulator App, an Android application by Muhammad Saad combining electrical theory articles, practical calculators, wiring diagrams and practice quizzes in one offline-first mobile toolkit.",
  alternates: { canonical: "/work/electrician-simulator-app" },
  openGraph: {
    title: "Electrician Simulator App — Mobile App Case Study",
    description:
      "An Android application combining electrical theory, calculators, wiring diagrams and practice quizzes in a single offline-first mobile toolkit.",
    type: "article",
    images: [
      {
        url: "/screenshots/electrician-simulator-home.png",
        width: 720,
        height: 1432,
        alt: "Electrician Simulator App home screen showing the Choose Module grid.",
      },
    ],
  },
};

/**
 * Verified application areas.
 *
 * Every entry below is visible in the supplied screenshots. Counts are read
 * directly from the app UI and are not estimates. "Jobs & Projects" was
 * omitted from the module grid at the owner's direction; Job Manager appears
 * under "Use it daily" because it is visible in the Settings screen.
 */
const APPLICATION_AREAS = [
  {
    title: "Theory Academy",
    detail: "59 articles",
    description:
      "Structured electrical reading organised by category, with difficulty labels and a reading time on every article.",
  },
  {
    title: "Calculators",
    detail: "50 practical tools",
    description:
      "Searchable, category-filtered calculators covering areas such as Ohm's Law, power and voltage drop.",
  },
  {
    title: "Wiring Diagrams",
    detail: "Visual references",
    description:
      "Labelled circuit diagrams with a components list, zoom and full-screen viewing for on-site reference.",
  },
  {
    title: "Quiz & Practice",
    detail: "200 questions · 8 categories",
    description:
      "Timed, multiple-choice practice grouped by topic and tagged by difficulty.",
  },
  {
    title: "Standards & Codes",
    detail: "IEC / NEC / PEC",
    description:
      "Reference-oriented standards content reachable from the main module grid.",
  },
  {
    title: "Global Search",
    detail: "Across the app",
    description:
      "One search entry point spanning articles, tools, diagrams, quizzes and standards.",
  },
  {
    title: "Bookmarks",
    detail: "Saved for later",
    description:
      "Articles and diagrams can be saved and managed from a single place.",
  },
] as const;

const ENGINEERING_POINTS = [
  {
    title: "Modular application structure",
    description:
      "Each area — theory, tools, diagrams, quizzes — is built as its own module behind a consistent navigation shell.",
  },
  {
    title: "Separated concerns",
    description:
      "Presentation, application logic and data access are kept apart, so a change in one layer does not ripple through the others.",
  },
  {
    title: "Offline-first data",
    description:
      "Content and calculation tools are held in local storage, so the app remains usable without a network connection.",
  },
  {
    title: "Reusable components",
    description:
      "Shared interface pieces keep cards, lists and result views consistent across every module.",
  },
] as const;

export default function ElectricianSimulatorCaseStudy() {
  if (!project) {
    notFound();
  }

  const home = requireMedia(project, "home");
  const theory = requireMedia(project, "theory-academy");
  const calculators = requireMedia(project, "calculators");
  const ohmsLaw = requireMedia(project, "ohms-law");
  const wiring = requireMedia(project, "wiring-diagram");
  const quizCategories = requireMedia(project, "quiz-categories");
  const quizQuestion = requireMedia(project, "quiz-question");
  const settings = requireMedia(project, "settings");

  const apkHref = project.apk.status === "available" ? project.apk.url : undefined;
  const apkDetail =
    project.apk.status === "available"
      ? [
          project.apk.version ? `v${project.apk.version}` : undefined,
          project.apk.fileSizeLabel,
        ]
          .filter(Boolean)
          .join(" · ")
      : "";

  const apkAriaLabel = `Download the ${project.name} Android APK file${
    apkDetail ? `, ${apkDetail.replace(" · ", ", ")}` : ""
  }`;

  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/* Hero                                                              */}
      {/* ---------------------------------------------------------------- */}
      <Section spacing="compact" className="pt-10 sm:pt-14">
        <nav aria-label="Breadcrumb" className="mb-10">
          <Link
            href="/#work"
            className={cn(
              // -ml-2 px-2 keeps the text optically aligned with the grid
              // while giving the control a comfortable 44px tap height.
              "inline-flex h-11 items-center gap-2 -ml-2 px-2 rounded-md text-sm font-medium",
              "text-ink-muted transition-colors hover:text-ink",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]",
            )}
          >
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
              <path d="M13 8H3M7 4 3 8l4 4" />
            </svg>
            Back to Work
          </Link>
        </nav>

        <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <div>
            <span className="text-sm font-medium text-[var(--color-focus)]">
              {project.category}
            </span>

            <h1 className="mt-4 text-balance text-h1 font-semibold text-ink">
              {project.name}
            </h1>

            <p className="mt-6 max-w-xl text-pretty text-lead text-ink-muted">
              {POSITIONING}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <DistributionAction
                label="Download APK"
                ariaLabel={apkAriaLabel}
                pendingLabel="Download APK"
                pendingAriaLabel={`Download the ${project.name} Android APK — link coming soon`}
                icon={<DownloadIcon />}
                href={apkHref}
                detail={apkDetail || undefined}
                download
                className="border-transparent bg-[var(--color-accent-solid)] text-white hover:border-transparent hover:bg-[var(--color-accent-solid-hover)]"
              />
            </div>
          </div>

          <CaseStudyHeroVisual
            primary={home}
            supporting={[calculators, wiring]}
          />
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Overview                                                          */}
      {/* ---------------------------------------------------------------- */}
      <Section bordered>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <SectionHeading
            eyebrow="Overview"
            title="One app. Multiple electrical tools."
          />
          <div className="flex flex-col gap-5 text-pretty text-lead text-ink-muted">
            <p>
              Electrical work draws on several different kinds of material at
              once: the theory behind a circuit, the arithmetic that sizes it,
              a diagram that shows how it is wired, and practice to keep the
              knowledge current. Those normally live in separate books, sites
              and apps.
            </p>
            <p>
              Electrician Simulator App gathers them into a single Android
              application. Reading, calculating, checking a diagram and testing
              yourself all happen behind one navigation bar, so moving between
              them takes a tap instead of switching tools.
            </p>
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Application areas                                                 */}
      {/* ---------------------------------------------------------------- */}
      <Section bordered>
        <SectionHeading
          eyebrow="Core areas"
          title="What the application covers"
          description="Every area below is part of the shipped Android build."
        />

        <ul className="mt-14 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {APPLICATION_AREAS.map((area) => (
            <li
              key={area.title}
              className="flex flex-col gap-3 bg-surface p-7 transition-colors duration-300 ease-[var(--ease-out-soft)] hover:bg-elevated"
            >
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <h3 className="text-h3 font-semibold text-ink">{area.title}</h3>
              </div>
              <Badge variant="accent">{area.detail}</Badge>
              <p className="text-pretty text-ink-muted">{area.description}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Walkthrough                                                       */}
      {/* ---------------------------------------------------------------- */}
      <Section bordered spacing="spacious">
        <SectionHeading
          eyebrow="Inside the app"
          title="Learn, calculate, reference, practise"
          description="Real screens from the Android build, grouped by the way the application is actually used."
        />

        <div className="mt-20 flex flex-col gap-24 lg:gap-32">
          <WalkthroughRow
            index="01"
            title="Learn"
            body="Theory Academy organises 59 articles into categories, each labelled with a difficulty and a reading time, so a topic can be picked up in a few minutes or followed in sequence."
            screens={[theory]}
          />

          <WalkthroughRow
            index="02"
            title="Calculate"
            body="Fifty calculators sit behind one searchable, filterable list. Individual tools — Ohm's Law here — take any two known values and derive the rest, with results saved to a calculation history."
            screens={[ohmsLaw, calculators]}
            flip
          />

          <WalkthroughRow
            index="03"
            title="Reference"
            body="Wiring diagrams are labelled and zoomable, with the components a circuit needs listed underneath. Each one can be bookmarked, annotated or shared while working."
            screens={[wiring]}
          />

          <WalkthroughRow
            index="04"
            title="Practise"
            body="Two hundred questions across eight categories, tagged by difficulty and timed as you answer, turn passive reading into something you can check yourself against."
            screens={[quizQuestion, quizCategories]}
            flip
          />

          <WalkthroughRow
            index="05"
            title="Use it daily"
            body="Bookmarks, saved calculations, a job manager for client and site notes, and a global search across articles, tools, diagrams, quizzes and standards — plus a dark theme for working in low light."
            screens={[settings]}
          />
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Technology                                                        */}
      {/* ---------------------------------------------------------------- */}
      <Section bordered>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <SectionHeading
            eyebrow="Technology"
            title="Built as a real mobile product"
          />

          <div>
            <p className="max-w-xl text-pretty text-lead text-ink-muted">
              A single Flutter codebase targeting Android, structured so that
              each area of the app can grow without destabilising the rest.
            </p>

            {project.technologies.length > 0 ? (
              <ul className="mt-8 flex flex-wrap gap-2.5">
                {project.technologies.map((technology) => (
                  <li key={technology}>
                    <Badge>{technology}</Badge>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>

        <ul className="mt-16 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
          {ENGINEERING_POINTS.map((point) => (
            <li key={point.title} className="flex flex-col gap-3 bg-surface p-7">
              <h3 className="text-h3 font-semibold text-ink">{point.title}</h3>
              <p className="text-pretty text-ink-muted">{point.description}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Challenge / Approach / Result                                     */}
      {/* ---------------------------------------------------------------- */}
      <Section bordered>
        <SectionHeading eyebrow="Product thinking" title="Challenge, approach, result" />

        <ol className="mt-14 grid gap-px overflow-hidden rounded-lg border border-line bg-line lg:grid-cols-3">
          {[
            {
              label: "Challenge",
              body: "Electrical information, formulas, diagrams and practice resources are spread across different tools and references.",
            },
            {
              label: "Approach",
              body: "Bring learning content, calculation tools, visual wiring references and practice workflows into one mobile experience.",
            },
            {
              label: "Result",
              body: "A single application where users move between learning, calculating, referencing diagrams and practising without leaving the app.",
            },
          ].map((item, i) => (
            <li key={item.label} className="flex flex-col gap-4 bg-surface p-8">
              <span className="font-mono text-sm text-ink-subtle">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-h3 font-semibold text-ink">{item.label}</h3>
              <p className="text-pretty text-ink-muted">{item.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Final CTA                                                         */}
      {/* ---------------------------------------------------------------- */}
      <Section bordered spacing="spacious">
        <div className="flex flex-col items-center gap-6 text-center">
          <SectionHeading
            align="center"
            eyebrow="Try it"
            title="Explore the app"
            description="Install the Android build and explore the application directly."
          />

          <div className="mt-2 flex flex-col items-center gap-4">
            <DistributionAction
              label="Download APK"
              ariaLabel={apkAriaLabel}
              pendingLabel="Download APK"
              pendingAriaLabel={`Download the ${project.name} Android APK — link coming soon`}
              icon={<DownloadIcon />}
              href={apkHref}
              download
              className="h-12 border-transparent bg-[var(--color-accent-solid)] px-7 text-white hover:border-transparent hover:bg-[var(--color-accent-solid-hover)]"
            />
            {apkDetail ? (
              <p className="text-sm text-ink-subtle">Android APK · {apkDetail}</p>
            ) : null}
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Page navigation                                                   */}
      {/* ---------------------------------------------------------------- */}
      <Section bordered spacing="compact">
        <Container className="px-0">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <Link
              href="/#work"
              className={cn(
                "inline-flex h-11 items-center gap-2 rounded-md border border-line-strong px-5",
                "text-[0.9375rem] font-medium text-ink transition-colors",
                "hover:border-ink-subtle hover:bg-elevated",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]",
              )}
            >
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
                <path d="M13 8H3M7 4 3 8l4 4" />
              </svg>
              Back to Selected Work
            </Link>

            <Link
              href="/"
              className={cn(
                "inline-flex h-11 items-center rounded-md px-5 text-[0.9375rem] font-medium",
                "text-ink-muted transition-colors hover:text-ink",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]",
              )}
            >
              Return home
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}

/** One walkthrough step: numbered copy beside its real screenshots. */
function WalkthroughRow({
  index,
  title,
  body,
  screens,
  flip = false,
}: {
  index: string;
  title: string;
  body: string;
  screens: Parameters<typeof ScreenGroup>[0]["screens"];
  flip?: boolean;
}) {
  return (
    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
      <div className={cn(flip && "lg:order-last")}>
        <span className="font-mono text-sm text-ink-subtle">{index}</span>
        <h3 className="mt-4 text-h2 font-semibold text-ink">{title}</h3>
        <p className="mt-5 max-w-lg text-pretty text-lead text-ink-muted">
          {body}
        </p>
      </div>

      <ScreenGroup screens={screens} flip={flip} />
    </div>
  );
}
