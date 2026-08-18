import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CleanerHeroVisual } from "@/components/case-study/cleaner-hero-visual";
import { FlowStep } from "@/components/case-study/flow-step";
import { SafetyGateDiagram } from "@/components/case-study/safety-gate-diagram";
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

const project = getProjectBySlug("mobile-cleaner");

/**
 * Positioning statement.
 *
 * Describes only what the supplied screenshots demonstrate: inspecting
 * storage, surfacing candidates for removal, and keeping the user in control
 * of what is actually deleted. No speed, no "boost", no invented metrics.
 */
const POSITIONING =
  "An Android storage cleaner that shows you exactly what is taking up space — duplicates, screenshots, large files, leftover installers — and leaves every deletion decision with you.";

export const metadata: Metadata = {
  title: "Mobile Cleaner — Mobile App Case Study",
  description:
    "Case study of Mobile Cleaner, an Android storage utility by Muhammad Saad that inspects photos and files, groups cleanup opportunities by category, and keeps deletion under explicit user review.",
  alternates: { canonical: "/work/mobile-cleaner" },
  openGraph: {
    title: "Mobile Cleaner — Mobile App Case Study",
    description:
      "An Android storage utility that surfaces duplicates, screenshots, large files and leftover installers, and keeps every deletion under explicit user review.",
    type: "article",
    images: [
      {
        url: "/screenshots/mobile-cleaner-photos.png",
        width: 720,
        height: 1432,
        alt: "Mobile Cleaner photo cleanup screen showing storage grouped by category.",
      },
    ],
  },
};

/**
 * Verified capabilities.
 *
 * Every entry is directly visible in a supplied screenshot. The `detail`
 * values are read from the app UI itself — they describe what the tool does,
 * not how much it recovers. The specific byte figures in the captures belong
 * to one test device and are never presented as product claims.
 */
const CAPABILITIES = [
  {
    group: "Photos",
    items: [
      {
        title: "Duplicate Photos",
        description: "Identical copies of the same image, grouped together.",
      },
      {
        title: "Screenshots",
        description: "Captures that have served their purpose and accumulate unnoticed.",
      },
      {
        title: "Large Photos",
        description: "The images consuming the most space, surfaced first.",
      },
      {
        title: "Similar Photos",
        description:
          "Near-identical shots of the same subject, reported as None when there is nothing to review.",
      },
    ],
  },
  {
    group: "Files",
    items: [
      {
        title: "Large Files",
        description: "The biggest space users across the device.",
      },
      {
        title: "Downloads Cleaner",
        description: "Old downloads that were never cleared out.",
      },
      {
        title: "APK Cleaner",
        description: "Leftover Android installers kept after the app was installed.",
      },
      {
        title: "Videos",
        description: "Reviewable by size, length or date.",
      },
      {
        title: "Duplicates",
        description: "Byte-identical copies found across the file system.",
      },
    ],
  },
] as const;

/**
 * Engineering notes.
 *
 * Each point is grounded either in a visible screen or in a property verified
 * from the shipped release binary (see the technologies comment in the
 * project data file). Nothing here is inferred from typical app behaviour.
 */
const ENGINEERING_POINTS = [
  {
    title: "Discovery separated from deletion",
    description:
      "Scanning, categorising and presenting candidates are distinct from the act of removing anything. Nothing is deleted as a side effect of looking.",
  },
  {
    title: "Categories before totals",
    description:
      "Storage is reported per category — duplicates, screenshots, large photos — rather than as one number, so a user can judge each group on its own terms.",
  },
  {
    title: "An explicit confirmation step",
    description:
      "Review Photos sits between finding files and deleting them. The destructive action is always a deliberate, separate tap.",
  },
  {
    title: "Reporting what actually happened",
    description:
      "The completion screen states files deleted, storage recovered and free storage remaining, so the outcome is verifiable rather than implied.",
  },
] as const;

export default function MobileCleanerCaseStudy() {
  if (!project) {
    notFound();
  }

  const photos = requireMedia(project, "photos");
  const files = requireMedia(project, "files");
  const complete = requireMedia(project, "cleanup-complete");

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
    /**
     * The teal identity is scoped to this page only, as two local custom
     * properties. The global accent tokens are untouched, so the homepage and
     * the Electrician case study keep the approved electric-blue system while
     * this page carries the app's own colour.
     *
     * --cleaner-accent      #0d7d6f  surfaces/buttons: 5.02:1 with white text
     * --cleaner-accent-text #2dd4bf  text on dark:   10.7:1 on --color-base
     * Both verified against WCAG AA before use.
     */
    <div
      style={
        {
          "--cleaner-accent": "#0d7d6f",
          "--cleaner-accent-text": "#2dd4bf",
          "--cleaner-accent-hover": "#0f8f7f",
        } as React.CSSProperties
      }
    >
      {/* ------------------------------------------------------------------ */}
      {/* Hero                                                                */}
      {/* ------------------------------------------------------------------ */}
      <Section spacing="compact" className="pt-10 sm:pt-14">
        <nav aria-label="Breadcrumb" className="mb-10">
          <Link
            href="/#work"
            className={cn(
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
            <span className="text-sm font-medium text-[var(--cleaner-accent-text)]">
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
                className="border-transparent bg-[var(--cleaner-accent)] text-white hover:border-transparent hover:bg-[var(--cleaner-accent-hover)]"
              />
            </div>
          </div>

          <CleanerHeroVisual
            primary={photos}
            behind={files}
            front={complete}
          />
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* Overview                                                            */}
      {/* ------------------------------------------------------------------ */}
      <Section bordered spacing="tight-lg">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <SectionHeading
            eyebrow="Overview"
            title="Know what is on your phone before you delete it."
          />
          <div className="flex flex-col gap-5 text-pretty text-lead text-ink-muted">
            <p>
              Storage fills up quietly. A few hundred screenshots, duplicate
              copies of the same photo, videos saved twice, installer files
              left behind after an app was installed — individually trivial,
              collectively gigabytes. The phone reports one number for
              &ldquo;other&rdquo; and offers no way to interrogate it.
            </p>
            <p>
              Mobile Cleaner takes the opposite position. It inspects photos
              and files, groups what it finds into categories a person can
              reason about, and shows the size of each group. The scan is the
              product; the deletion is a decision the user makes afterwards,
              with the evidence in front of them.
            </p>
            <p>
              That framing matters because file deletion is irreversible. An
              app in this category is trusted with the one operation that
              cannot be undone, so its job is to inform first and act second —
              never to clean automatically on the user&rsquo;s behalf.
            </p>
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* Core functionality                                                  */}
      {/* ------------------------------------------------------------------ */}
      <Section bordered spacing="tight-lg">
        <SectionHeading
          eyebrow="Core functionality"
          title="What it looks for"
          description="Every category below appears in the shipped Android build. Sizes shown in the screenshots come from one test device and are not product claims."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-2 lg:gap-10">
          {CAPABILITIES.map((section) => (
            <div key={section.group}>
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-px w-6 bg-[color-mix(in_oklab,var(--cleaner-accent)_60%,transparent)]"
                />
                <h3 className="text-h3 font-semibold text-ink">
                  {section.group}
                </h3>
              </div>

              <ul className="mt-6 grid gap-px overflow-hidden rounded-lg border border-line bg-line">
                {section.items.map((item) => (
                  <li
                    key={item.title}
                    className="flex flex-col gap-2 bg-surface p-6 transition-colors duration-300 ease-[var(--ease-out-soft)] hover:bg-elevated sm:p-7"
                  >
                    <h4 className="text-[1.0625rem] font-medium text-ink">
                      {item.title}
                    </h4>
                    {/* Bumped from the default 16px/1.5 so supporting copy is
                        comfortable at desktop scale without introducing a new
                        type token. */}
                    <p className="text-pretty text-[1.0625rem] leading-[1.6] text-ink-muted">
                      {item.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* Walkthrough — vertical flow                                         */}
      {/* ------------------------------------------------------------------ */}
      <Section bordered spacing="tight-lg">
        <SectionHeading
          eyebrow="The flow"
          title="Inspect, review, then clean"
          description="Real screens from the Android build, in the order a cleanup actually happens."
        />

        <ol className="mt-16 flex flex-col gap-16 lg:gap-20">
          <FlowStep
            index="01"
            title="Understand what is stored"
            body="The Files view opens with the whole picture: how many files are on the phone and what they add up to. From there, five tools narrow the search — biggest files first, old downloads, leftover installers, videos by size or date, and byte-identical duplicates."
            facts={["868 files · 2.1 GB on the test device", "5 file tools"]}
            screen={files}
          />

          <FlowStep
            index="02"
            title="Find cleanup opportunities"
            body="Photo Cleanup reports a single recoverable total, then immediately breaks it apart: duplicates, screenshots, large photos and similar shots, each with its own size. A category with nothing to clean reads None rather than zero, so an empty result is never mistaken for a broken scan."
            facts={["4 photo categories", "Per-category sizes"]}
            screen={photos}
          />

          <FlowStep
            index="03"
            title="Review before anything is removed"
            body="Review Photos is a deliberate gate rather than a formality. Discovery hands over a proposed set; the user confirms it. Because deletion cannot be undone, the app never treats finding a file as permission to remove it."
            placeholder={<SafetyGateDiagram />}
          />

          <FlowStep
            index="04"
            title="Confirm what actually changed"
            body="Cleanup finishes with a plain statement of outcome — files deleted, storage recovered, free storage now — and a single Done action. No animated score, no grade, no prompt to run it again."
            facts={["Reports outcome, not a score"]}
            screen={complete}
            last
          />
        </ol>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* UX / engineering                                                    */}
      {/* ------------------------------------------------------------------ */}
      <Section bordered spacing="tight-lg">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <SectionHeading
            eyebrow="UX & engineering"
            title="Designing around an irreversible action"
          />

          <div className="flex flex-col gap-5 text-pretty text-lead text-ink-muted">
            <p>
              Most of the engineering difficulty in a cleaner is not finding
              files — it is deciding what the app is allowed to do once it has
              found them. Deleting the wrong photo is not a recoverable error,
              so the interface has to make the destructive step slower and
              more explicit than the steps around it.
            </p>
            <p>
              The build keeps three responsibilities apart: discovery scans
              and classifies, review presents and lets the user select, and
              cleanup acts only on a confirmed set. Keeping those stages
              separate in the code is what makes it possible to keep them
              separate in the interface — a scan can never quietly become a
              deletion.
            </p>
          </div>
        </div>

        {/* Numbered, teal-marked cards so this block reads as intentionally
            composed rather than as a plain leftover grid. */}
        <ul className="mt-14 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
          {ENGINEERING_POINTS.map((point, i) => (
            <li
              key={point.title}
              className="flex flex-col gap-3 bg-surface p-7 transition-colors duration-300 ease-[var(--ease-out-soft)] hover:bg-elevated sm:p-8"
            >
              <span
                aria-hidden="true"
                className="font-mono text-sm text-[var(--cleaner-accent-text)]"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-h3 font-semibold text-ink">{point.title}</h3>
              <p className="text-pretty text-[1.0625rem] leading-[1.6] text-ink-muted">
                {point.description}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* Challenge / Approach / Result                                       */}
      {/* ------------------------------------------------------------------ */}
      <Section bordered spacing="tight-lg">
        <SectionHeading
          eyebrow="Product thinking"
          title="Challenge, approach, result"
        />

        <ol className="mt-14 grid gap-px overflow-hidden rounded-lg border border-line bg-line lg:grid-cols-3">
          {[
            {
              label: "Challenge",
              body: "Storage cleaners ask for trust with an irreversible operation, and usually repay it with a one-tap button and a number nobody can verify.",
            },
            {
              label: "Approach",
              body: "Make inspection the product. Group findings into categories with real sizes, put an explicit review step in front of deletion, and keep the whole scan on the device.",
            },
            {
              label: "Result",
              body: "An Android build where a user can see precisely what would be removed, choose what actually goes, and read a plain account of what changed.",
            },
          ].map((item, i) => (
            <li
              key={item.label}
              className="relative flex flex-col gap-4 bg-surface p-8 transition-colors duration-300 ease-[var(--ease-out-soft)] hover:bg-elevated lg:p-9"
            >
              {/* Teal rule ties the trio to the app identity; the middle card
                  carries the strongest one so the eye lands on the approach. */}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-x-0 top-0 h-px",
                  i === 1
                    ? "bg-[color-mix(in_oklab,var(--cleaner-accent)_70%,transparent)]"
                    : "bg-[color-mix(in_oklab,var(--cleaner-accent)_30%,transparent)]",
                )}
              />
              <span className="font-mono text-sm text-[var(--cleaner-accent-text)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-h3 font-semibold text-ink">{item.label}</h3>
              <p className="text-pretty text-[1.0625rem] leading-[1.6] text-ink-muted">
                {item.body}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* Technology                                                          */}
      {/* ------------------------------------------------------------------ */}
      <Section bordered spacing="tight-lg">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <SectionHeading
            eyebrow="Technology"
            title="Verified from the shipped build"
          />

          <div>
            <p className="max-w-xl text-pretty text-lead text-ink-muted">
              A Flutter codebase targeting Android, with a thin Kotlin layer
              for the platform work that storage inspection requires. The
              stack below was read from the released binary rather than
              carried over from another project — this app uses Riverpod for
              state, where the Electrician build uses BLoC.
            </p>

            {project.technologies.length > 0 ? (
              /* Teal-tinted badges so the stack reads as part of this
                 project's identity rather than as generic chips. */
              <ul className="mt-8 flex flex-wrap gap-2.5">
                {project.technologies.map((technology) => (
                  <li key={technology}>
                    <Badge className="border-[color-mix(in_oklab,var(--cleaner-accent)_30%,transparent)] bg-[color-mix(in_oklab,var(--cleaner-accent)_12%,transparent)] px-3 py-1.5 text-[0.875rem] text-[var(--cleaner-accent-text)]">
                      {technology}
                    </Badge>
                  </li>
                ))}
              </ul>
            ) : null}

            {/* The privacy property is the strongest verified claim on the
                page, so it gets a panel instead of a trailing sentence. */}
            <div className="mt-10 flex gap-4 rounded-lg border border-[color-mix(in_oklab,var(--cleaner-accent)_22%,transparent)] bg-[color-mix(in_oklab,var(--cleaner-accent)_7%,var(--color-surface))] p-6 sm:p-7">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="mt-0.5 size-5 shrink-0 text-[var(--cleaner-accent-text)]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3 4.5 6v5.5c0 4.4 3.1 8.4 7.5 9.5 4.4-1.1 7.5-5.1 7.5-9.5V6L12 3Z" />
                <path d="m9.2 12.1 2 2 3.6-3.8" />
              </svg>
              <p className="text-pretty text-[1.0625rem] leading-[1.6] text-ink-muted">
                The shipped manifest requests no internet permission and
                bundles no analytics or advertising SDK. Every scan runs on the
                device, and nothing about a user&rsquo;s files can leave it.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* Final CTA                                                           */}
      {/* ------------------------------------------------------------------ */}
      <Section bordered spacing="tight-lg">
        <div className="flex flex-col items-center gap-6 text-center">
          <SectionHeading
            align="center"
            eyebrow="Try it"
            title="Explore Mobile Cleaner"
            description="Install the Android build and inspect your own storage."
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
              className="h-12 border-transparent bg-[var(--cleaner-accent)] px-7 text-white hover:border-transparent hover:bg-[var(--cleaner-accent-hover)]"
            />
            {apkDetail ? (
              <p className="text-sm text-ink-subtle">Android APK · {apkDetail}</p>
            ) : null}
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* Project navigation                                                  */}
      {/* ------------------------------------------------------------------ */}
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
              href="/work/electrician-simulator-app"
              className={cn(
                "group inline-flex h-11 items-center gap-2 rounded-md px-5",
                "text-[0.9375rem] font-medium text-ink-muted transition-colors hover:text-ink",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]",
              )}
            >
              <span className="text-ink-subtle">Next project</span>
              Electrician Simulator App
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
    </div>
  );
}
