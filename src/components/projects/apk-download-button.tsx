import { cn } from "@/lib/cn";
import type { ProjectApk } from "@/types/project";

interface ApkDownloadButtonProps {
  apk: ProjectApk;
  /** Project name, used to build an unambiguous accessible label. */
  projectName: string;
  className?: string;
}

const base = [
  "inline-flex items-center justify-center gap-2 whitespace-nowrap",
  "h-11 rounded-md px-5 text-[0.9375rem] font-medium",
  "border transition-colors duration-200 ease-[var(--ease-out-soft)]",
].join(" ");

/**
 * "Download APK" action.
 *
 * Renders an enabled download link only when a verified URL exists. While the
 * project data says `awaiting-url`, it renders a non-interactive element
 * instead of a disabled anchor — a disabled <a> is not a real thing, and an
 * href of "#" would be a broken promise to the visitor.
 *
 * The unavailable state is announced to assistive technology via
 * aria-disabled plus a visible explanatory label, and is skipped by the
 * keyboard tab order since there is nothing to activate.
 */
export function ApkDownloadButton({
  apk,
  projectName,
  className,
}: ApkDownloadButtonProps) {
  if (apk.status !== "available") {
    return (
      <span
        aria-disabled="true"
        className={cn(
          base,
          "cursor-not-allowed border-line bg-transparent text-ink-subtle",
          className,
        )}
      >
        <DownloadIcon />
        APK coming soon
      </span>
    );
  }

  const detail = [apk.version && `v${apk.version}`, apk.fileSizeLabel]
    .filter(Boolean)
    .join(" · ");

  return (
    <a
      href={apk.url}
      download
      className={cn(
        base,
        "border-line-strong bg-elevated text-ink",
        "hover:border-ink-subtle hover:bg-overlay",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]",
        "active:translate-y-px",
        className,
      )}
      aria-label={`Download the ${projectName} Android APK${
        detail ? ` (${detail})` : ""
      }`}
    >
      <DownloadIcon />
      Download APK
      {detail ? (
        <span className="text-sm font-normal text-ink-subtle">{detail}</span>
      ) : null}
    </a>
  );
}

function DownloadIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2.5v7.5M4.5 7 8 10.5 11.5 7M2.5 12.5h11" />
    </svg>
  );
}
