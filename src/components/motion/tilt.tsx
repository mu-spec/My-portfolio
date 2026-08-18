"use client";

import { useEffect, useRef, type ReactNode } from "react";

import { cn } from "@/lib/cn";

interface TiltProps {
  children: ReactNode;
  /**
   * Maximum rotation in degrees at the very edge of the element.
   * Deliberately small — this is a depth cue, not an effect.
   */
  max?: number;
  className?: string;
}

/**
 * Pointer-follow tilt with layered depth.
 *
 * Structure is two elements on purpose:
 *
 *   outer  — holds the listener and the perspective, and is NEVER transformed
 *   inner  — carries the rotation
 *
 * Measuring the outer element keeps `getBoundingClientRect()` free of the
 * rotation this component applies. Reading the rect of a rotated element
 * would feed its own transform back into the next frame and produce a wobble.
 *
 * Depth comes from `translateZ` on descendants (see `.tilt-layer` in
 * globals.css) rather than from per-layer JavaScript. Under a shared
 * perspective, layers at different Z genuinely parallax against each other
 * as the parent rotates, which is both cheaper and smoother than animating
 * each layer individually.
 *
 * Disabled entirely when the pointer is not fine (touch) or the visitor
 * prefers reduced motion. Both are re-evaluated on change, so plugging in a
 * mouse or flipping the OS setting takes effect without a reload.
 *
 * Only `transform` is animated, so this never triggers layout or paint and
 * cannot cause layout shift.
 */
export function Tilt({ children, max = 5, className }: TiltProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let frame = 0;
    let enabled = finePointer.matches && !reducedMotion.matches;

    const reset = () => {
      inner.style.transform = "";
      inner.dataset.tracking = "false";
    };

    const onPointerMove = (event: PointerEvent) => {
      // Ignore coarse pointers even if the media query is briefly stale.
      if (!enabled || event.pointerType !== "mouse") return;
      if (frame) return;

      frame = requestAnimationFrame(() => {
        frame = 0;
        const rect = outer.getBoundingClientRect();
        if (!rect.width || !rect.height) return;

        // Normalised to -0.5..0.5 from the centre of the element.
        const px = (event.clientX - rect.left) / rect.width - 0.5;
        const py = (event.clientY - rect.top) / rect.height - 0.5;

        inner.dataset.tracking = "true";
        inner.style.transform = `rotateX(${(-py * max).toFixed(3)}deg) rotateY(${(px * max).toFixed(3)}deg)`;
      });
    };

    const onPointerLeave = () => {
      if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
      reset();
    };

    const onPreferenceChange = () => {
      enabled = finePointer.matches && !reducedMotion.matches;
      if (!enabled) reset();
    };

    outer.addEventListener("pointermove", onPointerMove);
    outer.addEventListener("pointerleave", onPointerLeave);
    finePointer.addEventListener("change", onPreferenceChange);
    reducedMotion.addEventListener("change", onPreferenceChange);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      outer.removeEventListener("pointermove", onPointerMove);
      outer.removeEventListener("pointerleave", onPointerLeave);
      finePointer.removeEventListener("change", onPreferenceChange);
      reducedMotion.removeEventListener("change", onPreferenceChange);
    };
  }, [max]);

  return (
    <div ref={outerRef} className={cn("tilt-stage", className)}>
      <div ref={innerRef} className="tilt-inner" data-tracking="false">
        {children}
      </div>
    </div>
  );
}
