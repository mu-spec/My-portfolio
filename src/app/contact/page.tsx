import type { Metadata } from "next";
import Link from "next/link";

import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { getContactEmail, siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Muhammad Saad about mobile application development — Android apps taken from idea and interface design through to a released build.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — Muhammad Saad",
    description:
      "Get in touch about mobile application development and Android builds.",
    type: "website",
  },
};

/**
 * What I can help with.
 *
 * Scoped to work the portfolio actually evidences. No rates, availability
 * guarantees, turnaround times or client claims — none of that is verified.
 */
const SERVICES = [
  {
    title: "Android application development",
    description:
      "New Flutter applications built from a concept through to an installable release build.",
  },
  {
    title: "Interface implementation",
    description:
      "Turning an existing design into a working, responsive mobile interface.",
  },
  {
    title: "Existing app improvement",
    description:
      "Extending, restructuring or refining an Android application that already exists.",
  },
] as const;

export default function ContactPage() {
  const email = getContactEmail();

  return (
    <>
      {/* ------------------------------------------------------------------ */}
      {/* Hero                                                                */}
      {/* ------------------------------------------------------------------ */}
      <Section spacing="tight-lg" className="pt-14 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <span className="text-sm font-medium text-[var(--color-focus)]">
              Contact
            </span>
            <h1 className="mt-4 text-balance text-h1 font-semibold text-ink">
              Let&rsquo;s build something useful.
            </h1>
          </div>

          <div className="flex flex-col items-start gap-8">
            <p className="text-pretty text-lead text-ink-muted">
              I&rsquo;m open to mobile application work — a new Android build,
              an interface that needs implementing, or an existing app that
              needs to go further. If you have something in mind, tell me what
              you are trying to make and I will tell you honestly whether I am
              the right person to build it.
            </p>

            {email ? (
              <div className="flex flex-col items-start gap-4">
                <a
                  href={`mailto:${email}`}
                  className={cn(
                    "inline-flex h-12 items-center gap-2.5 rounded-md px-7",
                    "bg-accent text-[0.9375rem] font-medium text-white",
                    "transition-colors duration-200 ease-[var(--ease-out-soft)] hover:bg-[var(--color-accent-hover)]",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]",
                  )}
                >
                  <MailIcon />
                  Email me
                </a>
                <p className="text-[0.9375rem] text-ink-subtle">
                  Or write directly to{" "}
                  <a
                    href={`mailto:${email}`}
                    className="rounded-xs text-ink-muted underline decoration-line-strong underline-offset-4 transition-colors hover:text-ink hover:decoration-ink-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]"
                  >
                    {email}
                  </a>
                </p>
              </div>
            ) : (
              /**
               * No verified address is configured, so no control is rendered
               * that would dead-end a visitor. A fabricated or "#" mailto
               * would be worse than an honest note. Setting
               * siteConfig.contact to { status: "available", email } swaps
               * this for the real button automatically.
               */
              <div className="w-full rounded-lg border border-line-strong bg-surface p-6 sm:p-7">
                <p className="text-[1.0625rem] leading-[1.6] text-ink-muted">
                  A direct contact address is being finalised and will be
                  published here shortly. In the meantime, the applications
                  below are installable now — they are the clearest
                  demonstration of the work.
                </p>
              </div>
            )}
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* What I can help with                                                */}
      {/* ------------------------------------------------------------------ */}
      <Section bordered spacing="tight-lg">
        <SectionHeading
          eyebrow="What I can help with"
          title="Mobile work I take on"
        />

        <ul className="mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3">
          {SERVICES.map((service, i) => (
            <li
              key={service.title}
              className="flex flex-col gap-3 bg-surface p-7 sm:p-8"
            >
              <span
                aria-hidden="true"
                className="font-mono text-sm text-[var(--color-focus)]"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-h3 font-semibold text-ink">
                {service.title}
              </h3>
              <p className="text-pretty text-[1.0625rem] leading-[1.6] text-ink-muted">
                {service.description}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* See the work                                                        */}
      {/* ------------------------------------------------------------------ */}
      <Section bordered spacing="tight-lg">
        <div className="flex flex-col items-center gap-7 text-center">
          <SectionHeading
            align="center"
            eyebrow="Before you write"
            title="See what I have built"
            description="Both applications have a full case study and an installable Android build."
          />

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
            <Link
              href="/work/electrician-simulator-app"
              className={cn(
                "inline-flex h-11 items-center justify-center rounded-md border border-line-strong px-5",
                "text-[0.9375rem] font-medium text-ink transition-colors",
                "hover:border-ink-subtle hover:bg-elevated",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]",
              )}
            >
              Electrician Simulator App
            </Link>
            <Link
              href="/work/mobile-cleaner"
              className={cn(
                "inline-flex h-11 items-center justify-center rounded-md border border-line-strong px-5",
                "text-[0.9375rem] font-medium text-ink transition-colors",
                "hover:border-ink-subtle hover:bg-elevated",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]",
              )}
            >
              Mobile Cleaner
            </Link>
          </div>

          <p className="text-[0.9375rem] text-ink-subtle">
            {siteConfig.name} · {siteConfig.role}
          </p>
        </div>
      </Section>
    </>
  );
}

function MailIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-[1.05rem]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 6.5 8.5 6 8.5-6" />
    </svg>
  );
}
