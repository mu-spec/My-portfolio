import Link from "next/link";

import { Portrait } from "@/components/about/portrait";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/config/site";

/**
 * Compact About teaser.
 *
 * A short pointer to /about, not a second copy of it. The three lines are
 * condensed from the existing About page prose — no new biography, claims,
 * experience or credentials are introduced here.
 *
 * The portrait is deliberately small and sits in a narrow column (max 13rem,
 * 15rem at xl) so it reads as a supporting detail after the work rather than
 * competing with the hero. It reuses the approved <Portrait> component
 * unchanged, so the image, its ratio and its alt text are identical to the
 * About page.
 */
export function AboutTeaser() {
  return (
    <Section bordered spacing="compact" ariaLabel={`About ${siteConfig.name}`}>
      <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:gap-10 lg:gap-14">
        {/* Below the fold on the homepage, so it loads lazily and requests
            a much smaller source than the About page instance. */}
        <Portrait
          className="w-36 shrink-0 sm:w-40 xl:w-[15rem]"
          priority={false}
          sizes="(min-width: 1280px) 15rem, (min-width: 640px) 10rem, 9rem"
        />

        <div className="min-w-0">
          <h2 className="text-h3 font-semibold text-ink">{siteConfig.name}</h2>
          <p className="mt-1.5 text-[0.9375rem] font-medium text-[var(--color-focus)]">
            {siteConfig.role}
          </p>

          <div className="mt-5 flex max-w-2xl flex-col gap-3 text-pretty text-[1.0625rem] leading-[1.6] text-ink-muted">
            <p>
              I build mobile applications and take them the whole way: from the
              initial idea and interface design, through development and
              testing, to a working Android build.
            </p>
            <p>
              That end-to-end scope is deliberate — the decisions made in
              design constrain the engineering, so working across both means
              the product that ships is the product that was designed.
            </p>
          </div>

          <Link
            href="/about"
            className="group mt-7 inline-flex min-h-11 items-center gap-2 rounded-xs text-[0.9375rem] font-medium text-ink transition-colors hover:text-[var(--color-focus)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-focus)]"
          >
            More About Me
            <span
              aria-hidden="true"
              className="transition-transform duration-200 ease-[var(--ease-out-soft)] group-hover:translate-x-0.5"
            >
              &rarr;
            </span>
          </Link>
        </div>
      </div>
    </Section>
  );
}
