import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

/**
 * robots.txt
 *
 * The public pages are indexable. /design-system is an internal reference
 * and is disallowed here as well as being noindex in its own metadata.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/design-system"],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
