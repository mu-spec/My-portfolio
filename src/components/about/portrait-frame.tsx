"use client";

import { useEffect, useRef, type ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * Dimensional mount for the About portrait.
 *
 * Adds a pointer-responsive tilt on top of the static angle defined by
 * `.portrait-plate` in globals.css. The static presentation is CSS-only, so
 * it survives with JavaScript disabled, on touch devices and under
 * prefers-reduced-motion — this component only layers interactivity on top.
 *
 * The rotation is applied to the plate's own transform string rather than to
 * a wrapper, so the base angle composes with the pointer offset instead of
 * being replaced by it. Clearing the inline style hands control cleanly back
 * to the stylesheet.
 *
 * As in the hero <Tilt>, the measured element is never the transformed one:
 * the rect comes from the outer container, so the plate's rotation cannot
 * feed back into the next frame.
 *
 * IMAGE INTEGRITY: only rotateX/rotateY/translateZ are ever written — no
 * skew, no non-uniform scale, no filter. The portrait's aspect ratio and
 * proportions are mathematically unaffected, so the face cannot distort.
 */

/**
 * Static resting angle. Must match `.portrait-plate` in globals.css.
 * No perspective() here: the shared frustum lives on `.portrait-scene`,
 * so every layer is measured in the same 3D space.
 */
const BASE_TRANSFORM = "rotateY(-4deg) rotateX(1.2deg)";

/** Maximum additional rotation from pointer position, in degrees. */
const MAX_TILT = 3;

export function PortraitFrame({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const plateRef = useRef<HTMLDivElement>(null);
  const backingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    const plate = plateRef.current;
    const backing = backingRef.current;
    if (!scene || !plate || !backing) return;

    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let frame = 0;
    let enabled = finePointer.matches && !reducedMotion.matches;

    // Returning to the stylesheet's own values keeps the static card intact.
    const reset = () => {
      plate.style.transform = "";
      plate.style.transition = "";
      backing.style.transform = "";
      backing.style.transition = "";
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!enabled || event.pointerType !== "mouse") return;
      if (frame) return;

      frame = requestAnimationFrame(() => {
        frame = 0;
        const rect = scene.getBoundingClientRect();
        if (!rect.width || !rect.height) return;

        const px = (event.clientX - rect.left) / rect.width - 0.5;
        const py = (event.clientY - rect.top) / rect.height - 0.5;

        const rotY = (px * MAX_TILT).toFixed(2);
        const rotX = (-py * MAX_TILT).toFixed(2);

        // Shorter transition while tracking so the tilt feels attached to
        // the pointer; the CSS default handles the slow return on leave.
        plate.style.transition = "transform 180ms cubic-bezier(0.22,1,0.36,1)";
        plate.style.transform = `${BASE_TRANSFORM} rotateY(${rotY}deg) rotateX(${rotX}deg) translateZ(30px) translateY(-6px)`;

        // Backing drifts the opposite way and further back, which is what
        // reads as parallax depth between the two layers.
        backing.style.transition = "transform 180ms cubic-bezier(0.22,1,0.36,1)";
        backing.style.transform = `translateZ(-110px) rotateY(${(-px * MAX_TILT * 0.5).toFixed(2)}deg) rotateX(${(py * MAX_TILT * 0.5).toFixed(2)}deg)`;
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

    scene.addEventListener("pointermove", onPointerMove);
    scene.addEventListener("pointerleave", onPointerLeave);
    finePointer.addEventListener("change", onPreferenceChange);
    reducedMotion.addEventListener("change", onPreferenceChange);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      scene.removeEventListener("pointermove", onPointerMove);
      scene.removeEventListener("pointerleave", onPointerLeave);
      finePointer.removeEventListener("change", onPreferenceChange);
      reducedMotion.removeEventListener("change", onPreferenceChange);
    };
  }, []);

  return (
    <div ref={sceneRef} className={cn("portrait-tilt", className)}>
      <div className="portrait-scene">
        {/* Offset mount plate behind the portrait. */}
        <div ref={backingRef} aria-hidden="true" className="portrait-backing" />
        {/* Soft accent rim light. */}
        <div aria-hidden="true" className="portrait-glow" />

        <div ref={plateRef} className="portrait-plate">
          {children}
        </div>
      </div>
    </div>
  );
}
