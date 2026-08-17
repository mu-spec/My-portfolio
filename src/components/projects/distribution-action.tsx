import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

interface DistributionActionProps {
  /** Visible label, e.g. "Download APK". */
  label: string;
  /** Full accessible label, e.g. "Download the Mobile Cleaner Android APK". */
  ariaLabel: string;
  icon: ReactNode;
  /** Verified destination. When undefined the action renders unavailable. */
  href?: string;
  /** Label shown while awaiting a verified URL, e.g. "APK coming soon". */
  pendingLabel: string;
  /** Adds the download attribute for file destinations. */
  download?: boolean;
  /** Small trailing detail, e.g. "v1.0.0 · 24 MB". */
  detail?: string;
  className?: string;
}

const base = [
  "inline-flex items-center justify-center gap-2 whitespace-nowrap",
  "h-11 rounded-md px-5 text-[0.9375rem] font-medium",
  "border transition-colors duration-200 ease-[var(--ease-out-soft)]",
].join(" ");

/**
 * Shared secondary distribution control (APK download, Google Play, …).
 *
 * When no verified URL exists it renders a non-interactive <span> with
 * aria-disabled and a "coming soon" label rather than a disabled anchor or an
 * href of "#". That keeps unavailable actions from looking or behaving like
 * broken links, and keeps them out of the keyboard tab order since there is
 * nothing to activate.
 */
export function DistributionAction({
  label,
  ariaLabel,
  icon,
  href,
  pendingLabel,
  download = false,
  detail,
  className,
}: DistributionActionProps) {
  if (!href) {
    return (
      <span
        aria-disabled="true"
        className={cn(
          base,
          "cursor-not-allowed border-line bg-transparent text-ink-subtle",
          className,
        )}
      >
        {icon}
        {pendingLabel}
      </span>
    );
  }

  const external = /^https?:\/\//.test(href);

  return (
    <a
      href={href}
      aria-label={ariaLabel}
      download={download || undefined}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer noopener" : undefined}
      className={cn(
        base,
        "border-line-strong bg-elevated text-ink",
        "hover:border-ink-subtle hover:bg-overlay",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]",
        "active:translate-y-px",
        className,
      )}
    >
      {icon}
      {label}
      {detail ? (
        <span className="text-sm font-normal text-ink-subtle">{detail}</span>
      ) : null}
    </a>
  );
}

export function DownloadIcon() {
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

export function GooglePlayIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    >
      <path d="M3 2.2v11.6a.6.6 0 0 0 .92.5l9.1-5.8a.6.6 0 0 0 0-1L3.92 1.7a.6.6 0 0 0-.92.5Z" />
      <path d="m3.3 2 7.2 6.5-7.2 5.5" />
    </svg>
  );
}
