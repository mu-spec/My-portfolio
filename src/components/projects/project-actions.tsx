import Link from "next/link";

import {
  DistributionAction,
  DownloadIcon,
  GooglePlayIcon,
} from "@/components/projects/distribution-action";
import { cn } from "@/lib/cn";
import type { Project } from "@/types/project";

/**
 * Action row for a project: the case study plus any public distribution
 * destinations, derived entirely from the project data.
 *
 * Source repositories are never represented here.
 */
export function ProjectActions({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  const { name, caseStudyHref, apk, googlePlay } = project;

  const apkDetail = [
    apk.status === "available" && apk.version ? `v${apk.version}` : undefined,
    apk.status === "available" ? apk.fileSizeLabel : undefined,
  ]
    .filter(Boolean)
    .join(" · ");

  // A build in a testing track is not a public release, so the label says so
  // explicitly rather than reading as a general "Get it on Google Play".
  const playLabel =
    googlePlay.track === "testing" ? "Google Play — Testing" : "Google Play";
  const playAriaLabel =
    googlePlay.track === "testing"
      ? `${name} on Google Play — currently in testing, opens in a new tab`
      : `${name} on Google Play, opens in a new tab`;

  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      <Link
        href={caseStudyHref}
        aria-label={`View the ${name} case study`}
        className={cn(
          "inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-md px-5",
          "bg-accent text-[0.9375rem] font-medium text-white",
          "shadow-[0_1px_0_0_rgb(255_255_255/0.12)_inset]",
          "transition-colors duration-200 ease-[var(--ease-out-soft)]",
          "hover:bg-[var(--color-accent-hover)] active:translate-y-px",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]",
        )}
      >
        View Case Study
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          className="size-3.5 transition-transform duration-300 ease-[var(--ease-out-soft)] group-hover:translate-x-0.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 8h10M9 4l4 4-4 4" />
        </svg>
      </Link>

      {/* The APK is offered whenever the project has one, independently of any
          Google Play presence — a testing-track listing is not a substitute
          for a direct download. */}
      <DistributionAction
        label="Download APK"
        ariaLabel={`Download the ${name} Android APK${
          apkDetail ? ` (${apkDetail})` : ""
        }`}
        pendingLabel="APK coming soon"
        icon={<DownloadIcon />}
        href={apk.status === "available" ? apk.url : undefined}
        detail={apkDetail || undefined}
        download
      />

      {googlePlay.track !== "none" ? (
        <DistributionAction
          label={playLabel}
          ariaLabel={playAriaLabel}
          pendingLabel={
            googlePlay.track === "testing"
              ? "Google Play — Testing"
              : "Google Play — coming soon"
          }
          icon={<GooglePlayIcon />}
          href={googlePlay.status === "available" ? googlePlay.url : undefined}
        />
      ) : null}
    </div>
  );
}
