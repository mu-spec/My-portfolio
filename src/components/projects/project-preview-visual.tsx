import { cn } from "@/lib/cn";
import type { ProjectSlug } from "@/types/project";

/**
 * Abstract preview artwork for a project card.
 *
 * Each project gets a distinct geometric motif so the three cards are
 * visually differentiated without implying anything about the actual
 * applications. These are clearly abstract placeholders, never mock
 * screenshots. When real screenshots arrive they replace this component's
 * output inside the same fixed-aspect frame, so no layout work is needed.
 */

interface ProjectPreviewVisualProps {
  slug: ProjectSlug;
  /** Flagship cards get a taller frame. */
  emphasis?: boolean;
  className?: string;
}

export function ProjectPreviewVisual({
  slug,
  emphasis = false,
  className,
}: ProjectPreviewVisualProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative overflow-hidden rounded-md border border-line bg-base",
        emphasis ? "aspect-16/10" : "aspect-16/11",
        className,
      )}
    >
      {/* Technical grid — very low contrast, adds product texture */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-line) 1px, transparent 1px), linear-gradient(to bottom, var(--color-line) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(closest-side at 70% 20%, rgb(61 125 250 / 0.12), transparent 100%)",
        }}
      />

      <div className="absolute inset-0 flex items-center justify-center p-6">
        <Motif slug={slug} />
      </div>
    </div>
  );
}

function Motif({ slug }: { slug: ProjectSlug }) {
  const common = "h-full w-auto max-h-32 text-line-strong";

  if (slug === "electrician-simulator-app") {
    // Circuit-node motif
    return (
      <svg
        viewBox="0 0 120 80"
        className={common}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10 40h22M52 40h16M88 40h22" />
        <path d="M32 40V18h20M68 40v22H48" />
        <circle cx="42" cy="40" r="10" className="text-[var(--color-accent)]" />
        <path
          d="M43 34l-5 7h4l-1 5 5-7h-4z"
          className="fill-[var(--color-accent)] stroke-[var(--color-accent)]"
        />
        <circle cx="78" cy="40" r="6" />
        <circle cx="10" cy="40" r="2.5" className="fill-current" />
        <circle cx="110" cy="40" r="2.5" className="fill-current" />
        <circle cx="52" cy="18" r="2.5" className="fill-current" />
        <circle cx="48" cy="62" r="2.5" className="fill-current" />
      </svg>
    );
  }

  // Mobile Cleaner — concentric sweep motif
  return (
    <svg
      viewBox="0 0 120 80"
      className={common}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <circle cx="60" cy="40" r="28" />
      <circle cx="60" cy="40" r="18" strokeDasharray="4 5" />
      <path
        d="M60 12a28 28 0 0 1 24 14"
        className="text-[var(--color-accent)]"
        strokeWidth="2.5"
      />
      <circle cx="60" cy="40" r="5" className="fill-[var(--color-accent)] stroke-none" />
      <path d="M60 40 78 26" strokeWidth="2" />
    </svg>
  );
}
