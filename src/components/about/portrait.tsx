import Image from "next/image";

import { PortraitFrame } from "@/components/about/portrait-frame";
import { cn } from "@/lib/cn";

/**
 * Professional portrait of the site owner.
 *
 * IMAGE INTEGRITY: the source file in /public/portrait is the supplied
 * original, byte for byte — no retouching, recolouring, cropping or
 * regeneration. Only delivery is optimised: next/image emits resized WebP
 * variants at request time and the original stays untouched on disk.
 *
 * The frame is driven by the real capture ratio (1086x1448 = 3:4) via
 * aspectRatio, and the image uses object-cover inside it. Because the box
 * ratio and the source ratio are identical, cover performs no crop and no
 * stretch — it is simply a safety net if the frame ratio is ever changed.
 */

/**
 * Intrinsic dimensions of the supplied file. Do not change independently.
 *
 * These MUST match the real file: the frame's aspectRatio is derived from
 * them, and object-cover would silently crop the portrait if they drifted.
 * The final portrait is 1122x1402 (~0.800), a different ratio from the
 * earlier 1086x1448 (0.750) image it replaces — so both values were
 * updated together with the filename.
 */
const PORTRAIT = {
  src: "/portrait/muhammad-saad-v2.png",
  width: 1122,
  height: 1402,
  alt: "Muhammad Saad, Mobile App Developer",
} as const;

interface PortraitProps {
  className?: string;
  /**
   * Eager-load the image. True on the About page, where the portrait is
   * above the fold and is the LCP candidate. The homepage teaser passes
   * false: that instance sits well below the fold, so preloading it would
   * compete with the hero for bandwidth and trigger an unused-preload
   * warning.
   */
  priority?: boolean;
  /** Responsive width hint; the teaser renders far smaller than About. */
  sizes?: string;
  /**
   * Renders the portrait in the dimensional mounted card: offset backing
   * plate, accent rim light and a small static angle, plus a restrained
   * pointer tilt on desktop.
   *
   * Opt-in rather than default, so the small homepage teaser keeps its
   * flat treatment — the effect needs room to read as premium, and at
   * 9rem it would only add noise.
   */
  dimensional?: boolean;
}

export function Portrait({
  className,
  priority = true,
  sizes = "(min-width: 1024px) 24rem, (min-width: 640px) 20rem, 80vw",
  dimensional = false,
}: PortraitProps) {
  /*
    The framed image is identical in both variants — same file, same
    intrinsic dimensions, same ratio-locked box, same object-cover, same
    alt text. Only what surrounds it differs.
  */
  const framed = (
    <div
      className={cn(
        "overflow-hidden rounded-lg border bg-elevated",
        dimensional
          ? // Premium mount: a brighter hairline plus an inset highlight
            // along the top edge, which is what reads as a glass bezel.
            "border-line-strong shadow-[0_28px_60px_-24px_rgb(0_0_0/0.85),0_0_0_1px_rgb(255_255_255/0.04),inset_0_1px_0_0_rgb(255_255_255/0.07)]"
          : "border-line-strong shadow-2xl shadow-black/50",
      )}
      style={{ aspectRatio: `${PORTRAIT.width} / ${PORTRAIT.height}` }}
    >
      <Image
        src={PORTRAIT.src}
        alt={PORTRAIT.alt}
        width={PORTRAIT.width}
        height={PORTRAIT.height}
        quality={90}
        priority={priority}
        sizes={sizes}
        className="h-full w-full object-cover"
      />
    </div>
  );

  if (dimensional) {
    return (
      <div className={cn("relative isolate w-full", className)}>
        <PortraitFrame>{framed}</PortraitFrame>
      </div>
    );
  }

  return (
    <div className={cn("relative isolate w-full", className)}>
      {/* Restrained accent wash, consistent with the case-study compositions. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-4 -z-10 [background:radial-gradient(closest-side,color-mix(in_oklab,var(--color-accent)_16%,transparent),transparent_75%)]"
      />

      {framed}
    </div>
  );
}
