import { DeviceFrame } from "@/components/projects/device-frame";
import { cn } from "@/lib/cn";
import type { ProjectMedia } from "@/types/project";

interface CaseStudyHeroVisualProps {
  /** The screen that should dominate — Home / Choose Module. */
  primary: ProjectMedia;
  /** Two supporting screens layered behind and beside the primary. */
  supporting: readonly ProjectMedia[];
  className?: string;
}

/**
 * Hero product composition for a case study.
 *
 * The primary screen is deliberately much larger than the supporting screens
 * so the application dominates the section. All geometry is percentage-based
 * against a fixed-ratio box, so the arrangement holds at every width without
 * overflowing.
 *
 * On phones the supporting screens are dropped entirely rather than shrunk to
 * illegibility: showing one real screen clearly beats showing three badly.
 */
export function CaseStudyHeroVisual({
  primary,
  supporting,
  className,
}: CaseStudyHeroVisualProps) {
  const [left, right] = supporting;
  const sizes = "(min-width: 1024px) 30vw, (min-width: 640px) 40vw, 70vw";

  return (
    <div className={cn("relative isolate w-full", className)}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 [background:radial-gradient(closest-side,color-mix(in_oklab,var(--color-focus)_20%,transparent),transparent_72%)]"
      />

      {/* Phone: the primary screen only, at a comfortable reading size. */}
      <div className="mx-auto w-[64%] max-w-[16rem] sm:hidden">
        <DeviceFrame media={primary} sizes={sizes} priority />
      </div>

      {/* Tablet and up: layered three-screen composition. */}
      <div className="relative hidden aspect-[6/5] sm:block">
        {left ? (
          <DeviceFrame
            media={left}
            sizes={sizes}
            className="absolute left-[0%] top-[20%] z-10 w-[34%] rotate-[-8deg]"
          />
        ) : null}

        {right ? (
          <DeviceFrame
            media={right}
            sizes={sizes}
            className="absolute right-[0%] top-[20%] z-10 w-[34%] rotate-[8deg]"
          />
        ) : null}

        <DeviceFrame
          media={primary}
          sizes={sizes}
          priority
          className="absolute left-1/2 top-0 z-30 w-[42%] -translate-x-1/2"
        />
      </div>
    </div>
  );
}
