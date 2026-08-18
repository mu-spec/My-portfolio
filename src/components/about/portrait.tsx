import Image from "next/image";

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

/** Intrinsic dimensions of the supplied file. Do not change independently. */
const PORTRAIT = {
  src: "/portrait/muhammad-saad.png",
  width: 1086,
  height: 1448,
  alt: "Muhammad Saad, Mobile App Developer",
} as const;

export function Portrait({ className }: { className?: string }) {
  return (
    <div className={cn("relative isolate w-full", className)}>
      {/* Restrained accent wash, consistent with the case-study compositions. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-4 -z-10 [background:radial-gradient(closest-side,color-mix(in_oklab,var(--color-accent)_16%,transparent),transparent_75%)]"
      />

      <div
        className={cn(
          "overflow-hidden rounded-lg border border-line-strong bg-elevated",
          "shadow-2xl shadow-black/50",
        )}
        style={{ aspectRatio: `${PORTRAIT.width} / ${PORTRAIT.height}` }}
      >
        <Image
          src={PORTRAIT.src}
          alt={PORTRAIT.alt}
          width={PORTRAIT.width}
          height={PORTRAIT.height}
          quality={90}
          priority
          sizes="(min-width: 1024px) 24rem, (min-width: 640px) 20rem, 80vw"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
