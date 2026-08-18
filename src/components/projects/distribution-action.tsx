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
  /**
   * Visible label while awaiting a verified URL. Often identical to `label`
   * when the action is a confirmed part of the project presentation and only
   * its destination is pending.
   */
  pendingLabel: string;
  /**
   * Accessible name for the pending state. Should make the unavailability
   * explicit, since the visible label alone may not.
   */
  pendingAriaLabel: string;
  /**
   * Marks the destination as a file download. Adds the `download` attribute
   * and keeps navigation in the same tab: the server responds with
   * Content-Disposition: attachment, so the page is never actually left.
   */
  download?: boolean;
  /**
   * Opens the destination in a new tab. Used for external site navigation
   * (e.g. a store listing) rather than for file downloads.
   */
  newTab?: boolean;
  /** Small trailing detail, e.g. "v1.0.0 · 24 MB". */
  detail?: string;
  className?: string;
}

const base = [
  // max-w-full keeps the control inside its card at very narrow viewports:
  // at 320px the label plus the version detail exceeded the card width and
  // was clipped by the card's overflow-hidden. The label itself still never
  // wraps — only the optional detail is allowed to drop away.
  "inline-flex max-w-full items-center justify-center gap-2",
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
  pendingAriaLabel,
  download = false,
  newTab = false,
  detail,
  className,
}: DistributionActionProps) {
  if (!href) {
    return (
      <span
        role="button"
        aria-disabled="true"
        aria-label={pendingAriaLabel}
        className={cn(
          base,
          // Present enough to read as part of the project presentation,
          // clearly inactive enough not to look like a working link.
          "cursor-not-allowed border-line-strong border-dashed",
          "bg-transparent text-ink-muted",
          className,
        )}
      >
        {icon}
        <span className="truncate whitespace-nowrap">{pendingLabel}</span>
      </span>
    );
  }

  // A plain anchor: no JavaScript is involved in the download, so it works
  // with scripting disabled and stays fully keyboard accessible.
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      // Ignored by browsers for cross-origin URLs; the release host sends
      // Content-Disposition: attachment, which is what forces the download.
      download={download || undefined}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noreferrer noopener" : undefined}
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
      <span className="truncate whitespace-nowrap">{label}</span>
      {detail ? (
        <span className="hidden truncate text-sm font-normal text-ink-subtle min-[360px]:inline">
          {detail}
        </span>
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
