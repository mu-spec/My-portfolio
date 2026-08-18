import { Tilt } from "@/components/motion/tilt";
import { cn } from "@/lib/cn";

/**
 * Abstract mobile-product composition for the hero.
 *
 * Built entirely from layout primitives and inline SVG — no imagery, no
 * dependencies. The panels are deliberately abstract (bars, blocks, a simple
 * chart) so nothing here can be mistaken for a real screenshot of any of the
 * three applications. Real screenshots replace this in a later milestone.
 *
 * Decorative by definition, so the whole composition is aria-hidden and
 * carries no semantic weight for screen readers.
 *
 * DEPTH: the composition itself is unchanged — same devices, same offsets,
 * same rotations. It is wrapped in <Tilt>, and each element is assigned a
 * Z depth so the layers parallax against one another under a shared
 * perspective. The two floating animations use different periods so the
 * group never moves in lockstep. All of it is inert on touch devices and
 * under prefers-reduced-motion.
 */
export function HeroVisual({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("relative select-none", className)}
    >
      {/* Soft accent wash behind the devices, kept low-contrast so the
          composition reads as depth rather than a glow effect. */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-full w-full max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side at 50% 50%, rgb(61 125 250 / 0.16), transparent 100%)",
        }}
      />

      <Tilt max={5}>
        <div className="relative mx-auto flex aspect-4/5 w-full max-w-[26rem] items-center justify-center">
          {/* Secondary device — furthest back, drifts most under rotation */}
          <div className="tilt-layer tilt-layer-back absolute left-0 top-8 w-[52%] float-slower">
            <DeviceFrame
              className="w-full rotate-[-6deg] opacity-70"
              tone="muted"
            >
              <PanelLines />
            </DeviceFrame>
          </div>

          {/* Primary device — the focal point */}
          <div className="tilt-layer tilt-layer-mid relative z-10 w-[62%] translate-y-2">
            <DeviceFrame className="w-full" tone="primary">
              <PanelPrimary />
            </DeviceFrame>
          </div>

          {/* Floating detail card — nearest the viewer */}
          <div className="tilt-layer tilt-layer-front absolute -right-1 bottom-10 z-20 w-[46%] float-slow sm:right-2">
            <FloatingCard className="w-full" />
          </div>
        </div>
      </Tilt>
    </div>
  );
}

/** Rounded device outline with a screen surface inside. */
function DeviceFrame({
  children,
  className,
  tone = "primary",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "primary" | "muted";
}) {
  return (
    <div
      className={cn(
        "rounded-[1.75rem] border p-2 shadow-2xl shadow-black/40",
        tone === "primary"
          ? "border-line-strong bg-elevated"
          : "border-line bg-surface",
        className,
      )}
    >
      <div className="relative aspect-9/19 overflow-hidden rounded-[1.25rem] border border-line bg-base">
        {/* Speaker pill */}
        <div className="absolute left-1/2 top-2 h-1 w-8 -translate-x-1/2 rounded-full bg-line-strong" />
        <div className="h-full px-3 pb-3 pt-6">{children}</div>
      </div>
    </div>
  );
}

/** Abstract interface content for the focal device. */
function PanelPrimary() {
  return (
    <div className="flex h-full flex-col gap-2.5">
      <div className="h-1.5 w-10 rounded-full bg-line-strong" />
      <div className="h-1.5 w-16 rounded-full bg-[var(--color-accent)]/70" />

      {/* Abstract metric block — bars sit on a shared baseline */}
      <div className="mt-0.5 rounded-lg border border-line bg-surface p-2.5">
        <div className="flex h-14 items-end gap-1.5">
          {[42, 66, 50, 82, 58, 94].map((height, index) => (
            <div
              key={index}
              className={cn(
                "flex-1 rounded-[3px]",
                index === 5 ? "bg-[var(--color-accent)]/80" : "bg-line-strong",
              )}
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>

      {/* Abstract list rows — flex-1 so content reaches the bottom bezel */}
      <div className="flex flex-1 flex-col gap-2">
        {[0, 1, 2, 3].map((row) => (
          <div
            key={row}
            className="flex flex-1 items-center gap-2 rounded-md border border-line bg-surface/60 px-2"
          >
            <div className="size-4 shrink-0 rounded-[4px] bg-line-strong" />
            <div className="flex w-full flex-col gap-1">
              <div className="h-1 w-3/4 rounded-full bg-line-strong" />
              <div className="h-1 w-1/2 rounded-full bg-line" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Simpler abstract content for the background device. */
function PanelLines() {
  return (
    <div className="flex h-full flex-col gap-2.5">
      <div className="h-1.5 w-8 rounded-full bg-line-strong" />
      <div className="h-14 rounded-lg border border-line bg-surface" />
      {[0, 1, 2, 3].map((row) => (
        <div key={row} className="flex flex-col gap-1">
          <div className="h-1 w-full rounded-full bg-line-strong" />
          <div className="h-1 w-2/3 rounded-full bg-line" />
        </div>
      ))}
    </div>
  );
}

/** Small elevated card that breaks the device silhouette for depth. */
function FloatingCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-lg border border-line-strong bg-overlay/95 p-3 shadow-xl shadow-black/50 backdrop-blur-sm",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <span className="inline-flex size-6 items-center justify-center rounded-md bg-[var(--color-accent-soft)]">
          <svg
            viewBox="0 0 16 16"
            className="size-3.5 text-[var(--color-focus)]"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 8.5 6.5 12 13 4.5" />
          </svg>
        </span>
        <div className="flex w-full flex-col gap-1">
          <div className="h-1.5 w-full rounded-full bg-line-strong" />
          <div className="h-1.5 w-2/3 rounded-full bg-line" />
        </div>
      </div>
    </div>
  );
}
