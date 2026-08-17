import { DeviceFrame } from "@/components/projects/device-frame";
import { cn } from "@/lib/cn";
import type { Project } from "@/types/project";

interface ProjectShowcaseProps {
  project: Project;
  className?: string;
}

/**
 * Layered screenshot composition for a project card.
 *
 * The screenshots are the real, unmodified app captures. Only presentation is
 * authored here: scale, position, layering, a slight tilt and a soft accent
 * glow behind the stack.
 *
 * Geometry is expressed in percentages of the container, and each frame keeps
 * the capture's own aspect ratio, so the composition scales fluidly and can
 * never overflow its column at any viewport width.
 *
 * The two projects deliberately use different arrangements:
 *  - electrician-simulator-app: a centred hero screen with two tilted screens
 *    fanned out behind it.
 *  - mobile-cleaner: an ascending left-to-right cascade with a uniform tilt.
 */
export function ProjectShowcase({ project, className }: ProjectShowcaseProps) {
  const [primary, secondary, supporting] = project.media;

  if (!primary) {
    return null;
  }

  const isCascade = project.slug === "mobile-cleaner";

  // Rendered width of the largest frame, used for srcset selection.
  const sizes =
    "(min-width: 1024px) 26vw, (min-width: 640px) 32vw, 55vw";

  return (
    <div
      className={cn(
        "relative isolate w-full",
        // Square at every size: the frame geometry below is expressed in
        // percentages tuned to fill this box without dead space.
        "aspect-square",
        className,
      )}
    >
      {/* Decorative accent wash behind the devices. */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 -z-10",
          isCascade
            ? "[background:radial-gradient(closest-side,color-mix(in_oklab,var(--color-focus)_16%,transparent),transparent_78%)]"
            : "[background:radial-gradient(closest-side,color-mix(in_oklab,var(--color-focus)_22%,transparent),transparent_72%)]",
        )}
      />

      {isCascade ? (
        <>
          {/* Supporting — Cleanup Complete, furthest back. */}
          {supporting ? (
            <DeviceFrame
              media={supporting}
              sizes={sizes}
              className="absolute left-[0%] top-[21%] z-10 w-[39%] rotate-[-4deg]"
            />
          ) : null}

          {/* Secondary — Files. */}
          {secondary ? (
            <DeviceFrame
              media={secondary}
              sizes={sizes}
              className="absolute left-[30%] top-[11%] z-20 w-[41%] rotate-[-4deg]"
            />
          ) : null}

          {/* Primary — Photo Cleanup, front and largest. */}
          <DeviceFrame
            media={primary}
            sizes={sizes}
            priority
            className="absolute left-[57%] top-[1%] z-30 w-[43%] rotate-[-4deg]"
          />
        </>
      ) : (
        <>
          {/* Supporting — Calculators, fanned left. */}
          {supporting ? (
            <DeviceFrame
              media={supporting}
              sizes={sizes}
              className="absolute left-[0%] top-[15%] z-10 w-[41%] rotate-[-8deg]"
            />
          ) : null}

          {/* Secondary — Circuit diagram, fanned right. */}
          {secondary ? (
            <DeviceFrame
              media={secondary}
              sizes={sizes}
              className="absolute right-[0%] top-[15%] z-10 w-[41%] rotate-[8deg]"
            />
          ) : null}

          {/* Primary — Home / Choose Module, centred and in front. */}
          <DeviceFrame
            media={primary}
            sizes={sizes}
            priority
            className="absolute left-1/2 top-[1%] z-30 w-[46%] -translate-x-1/2"
          />
        </>
      )}
    </div>
  );
}
