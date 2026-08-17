import { DeviceFrame } from "@/components/projects/device-frame";
import { cn } from "@/lib/cn";
import type { ProjectMedia } from "@/types/project";

interface ScreenGroupProps {
  /** One or two real screenshots. The first is the lead screen. */
  screens: readonly ProjectMedia[];
  /** Mirrors the composition so alternating sections do not feel repetitive. */
  flip?: boolean;
  className?: string;
}

/**
 * Paired device composition for a case-study walkthrough section.
 *
 * A lead screen sits in front with an optional supporting screen stepped
 * behind it. Geometry is percentage-based so the group scales with its column
 * and can never overflow.
 *
 * On small screens the two screens sit side by side in a simple row instead of
 * overlapping: at phone widths a heavy overlap would hide most of the UI, and
 * readability of the real interface matters more than the flourish.
 */
export function ScreenGroup({
  screens,
  flip = false,
  className,
}: ScreenGroupProps) {
  const [lead, support] = screens;

  if (!lead) {
    return null;
  }

  const sizes = "(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 42vw";

  // Single screen: centred, no stacking needed.
  if (!support) {
    return (
      <div className={cn("relative isolate mx-auto w-full max-w-sm", className)}>
        <Glow />
        <DeviceFrame media={lead} sizes={sizes} className="w-[68%] mx-auto" />
      </div>
    );
  }

  return (
    <div className={cn("relative isolate w-full", className)}>
      <Glow />

      {/* Small screens: a plain, fully legible row. */}
      <div className="flex items-end justify-center gap-3 sm:hidden">
        <DeviceFrame
          media={support}
          sizes={sizes}
          className={cn("w-[43%]", flip && "order-last")}
        />
        <DeviceFrame media={lead} sizes={sizes} className="w-[48%]" />
      </div>

      {/* Larger screens: layered composition. */}
      <div className="relative hidden aspect-[5/4] sm:block">
        <DeviceFrame
          media={support}
          sizes={sizes}
          className={cn(
            "absolute top-[14%] z-10 w-[42%]",
            flip ? "right-[2%] rotate-[6deg]" : "left-[2%] rotate-[-6deg]",
          )}
        />
        <DeviceFrame
          media={lead}
          sizes={sizes}
          className={cn(
            "absolute top-0 z-20 w-[48%]",
            flip ? "left-[6%] rotate-[-2deg]" : "right-[6%] rotate-[2deg]",
          )}
        />
      </div>
    </div>
  );
}

function Glow() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 [background:radial-gradient(closest-side,color-mix(in_oklab,var(--color-focus)_14%,transparent),transparent_75%)]"
    />
  );
}
