import { HeroVisual } from "@/components/home/hero-visual";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { sectionIds } from "@/config/navigation";
import { siteConfig } from "@/config/site";

/**
 * Homepage hero.
 *
 * Content is limited to verified facts: name, role and a statement about the
 * work itself. No experience claims, employers, metrics or credentials.
 */
export function Hero() {
  return (
    <section
      id={sectionIds.home}
      aria-labelledby="hero-heading"
      className="relative overflow-hidden scroll-mt-20"
    >
      {/* Single restrained gradient anchoring the top of the page. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[42rem] opacity-80"
        style={{
          background:
            "radial-gradient(60rem 32rem at 68% -10%, rgb(61 125 250 / 0.10), transparent 70%)",
        }}
      />

      <Container>
        <div className="grid items-center gap-14 py-20 sm:py-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-16 lg:py-32 xl:grid-cols-[minmax(0,1fr)_minmax(0,30rem)]">
          {/* Left column — identity, statement, actions */}
          <div className="flex flex-col items-start">
            <p className="inline-flex items-center gap-2.5 text-sm font-medium text-ink-muted">
              <span
                aria-hidden="true"
                className="inline-block size-1.5 rounded-full bg-[var(--color-accent)]"
              />
              Available for remote and freelance work
            </p>

            <h1
              id="hero-heading"
              className="mt-6 text-balance text-display font-semibold text-ink"
            >
              {siteConfig.name}
            </h1>

            <p className="mt-4 text-h3 font-medium text-ink-muted">
              {siteConfig.role}
            </p>

            <p className="mt-7 max-w-xl text-pretty text-lead text-ink-muted">
              I build polished mobile applications from idea to production —
              from the first interface sketch through to a released, maintained
              app.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button href={`/#${sectionIds.work}`} size="lg">
                View My Work
              </Button>
              <Button
                href={`/#${sectionIds.contact}`}
                size="lg"
                variant="secondary"
              >
                Let&apos;s Talk
              </Button>
            </div>
          </div>

          {/* Right column — abstract product composition */}
          <HeroVisual className="w-full max-w-md justify-self-center lg:max-w-none" />
        </div>
      </Container>
    </section>
  );
}
