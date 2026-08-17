import Image from "next/image";

import { cn } from "@/lib/cn";
import type { ProjectMedia } from "@/types/project";

interface DeviceFrameProps {
  media: ProjectMedia;
  /** Rendered width hint passed to next/image for correct srcset selection. */
  sizes: string;
  /** Load the primary screen eagerly; secondary screens stay lazy. */
  priority?: boolean;
  className?: string;
}

/**
 * A single phone frame wrapping an authentic app screenshot.
 *
 * The screenshot is never stretched: the frame is driven by the real capture
 * aspect ratio (720x1432 after removing the OS navigation bar) and the image
 * fills it with object-contain, so proportions are preserved at every size.
 */
export function DeviceFrame({
  media,
  sizes,
  priority = false,
  className,
}: DeviceFrameProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[1.4rem] border border-line-strong bg-elevated p-1.5",
        "shadow-2xl shadow-black/60",
        className,
      )}
    >
      <div
        className="relative overflow-hidden rounded-[1.05rem] bg-base"
        style={{ aspectRatio: `${media.width} / ${media.height}` }}
      >
        <Image
          src={media.src}
          alt={media.alt}
          fill
          sizes={sizes}
          priority={priority}
          quality={90}
          className="object-contain"
        />
      </div>
    </div>
  );
}
