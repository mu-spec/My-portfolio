import { DeviceFrame } from "@/components/projects/device-frame";
import { cn } from "@/lib/cn";
import type { ProjectMedia } from "@/types/project";

interface CleanerHeroVisualProps {
  /** The screen that should dominate the composition. */
  primary: ProjectMedia;
  /** Screen stepped in behind and above the primary. */
  behind: ProjectMedia;
  /** Small screen stepped in below and in front. */
  front: ProjectMedia;
  className?: string;
}

/**
 * Hero composition for the Mobile Cleaner case study.
 *
 * Deliberately NOT the symmetric three-screen arch used by the Electrician
 * case study. This is a descending diagonal cascade — behind / primary /
 * front reading top-left to bottom-right — which suits a product that is
 * itself a sequence: inspect, review, clean.
 *
 * All geometry is percentage-based inside a fixed-ratio box, so the cascade
 * holds its shape at any width and cannot overflow its column. Screenshots
 * are never stretched; DeviceFrame preserves the real capture ratio.
 *
 * On phones the supporting screens are dropped rather than shrunk into
 * illegibility — one clearly readable screen beats three unreadable ones.
 */
export function CleanerHeroVisual({
  primary,
  behind,
  front,
  className,
}: CleanerHeroVisualProps) {
  const sizes = "(min-width: 1024px) 28vw, (min-width: 640px) 38vw, 66vw";

  return (
    <div className={cn("relative isolate w-full", className)}>
      {/* Teal wash — the app's own identity, kept soft so the portfolio's
          dark system still reads as the dominant surface. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 [background:radial-gradient(closest-side,color-mix(in_oklab,var(--cleaner-accent)_22%,transparent),transparent_74%)]"
      />

      {/* Phone: primary screen only. */}
      <div className="mx-auto w-[64%] max-w-[16rem] sm:hidden">
        <DeviceFrame media={primary} sizes={sizes} priority />
      </div>

      {/* Tablet and up: diagonal cascade. */}
      <div className="relative hidden aspect-[6/5] sm:block">
        <DeviceFrame
          media={behind}
          sizes={sizes}
          className="absolute left-[1%] top-[2%] z-10 w-[36%] rotate-[-7deg]"
        />

        <DeviceFrame
          media={primary}
          sizes={sizes}
          priority
          className="absolute left-1/2 top-[12%] z-30 w-[43%] -translate-x-1/2 rotate-[1deg]"
        />

        <DeviceFrame
          media={front}
          sizes={sizes}
          className="absolute bottom-[2%] right-[1%] z-20 w-[34%] rotate-[7deg]"
        />
      </div>
    </div>
  );
}
