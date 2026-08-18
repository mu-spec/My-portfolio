import { cn } from "@/lib/cn";

const STAGES = [
  { label: "Discover", note: "Scan and categorise" },
  { label: "Review", note: "You choose what goes" },
  { label: "Delete", note: "Only the confirmed set" },
] as const;

/**
 * Abstract diagram of the three-stage deletion pipeline.
 *
 * IMPORTANT: this is explicitly NOT an app screenshot and is captioned as
 * such in the UI. No screenshot of the review step was supplied, and
 * fabricating one would misrepresent the product. Instead this renders the
 * architectural idea in the portfolio's own visual language, so a reader can
 * see the safety model without ever being shown invented app UI.
 */
export function SafetyGateDiagram({ className }: { className?: string }) {
  return (
    <figure className={cn("w-full", className)}>
      <div
        className={cn(
          "flex flex-col gap-3 rounded-lg border border-line-strong bg-surface p-6 sm:p-7",
        )}
      >
        {STAGES.map((stage, i) => (
          <div key={stage.label} className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className={cn(
                  "size-2 shrink-0 rounded-full",
                  i === 1
                    ? "bg-[var(--cleaner-accent)]"
                    : "bg-line-strong",
                )}
              />
              <div className="min-w-0">
                <p
                  className={cn(
                    "text-[1.0625rem] font-medium",
                    i === 1 ? "text-[var(--cleaner-accent-text)]" : "text-ink",
                  )}
                >
                  {stage.label}
                </p>
                <p className="text-[0.9375rem] text-ink-subtle">{stage.note}</p>
              </div>
            </div>

            {i < STAGES.length - 1 ? (
              <span
                aria-hidden="true"
                className="ml-1 h-6 w-px bg-line-strong"
              />
            ) : null}
          </div>
        ))}
      </div>

      <figcaption className="mt-3 text-[0.9375rem] text-ink-subtle">
        Diagram of the deletion pipeline — not an app screen.
      </figcaption>
    </figure>
  );
}
