import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { getProjects } from "@/data/projects";

/**
 * Sitemap for the public site.
 *
 * Case-study entries are derived from the project data rather than hardcoded,
 * so adding or removing a project keeps the sitemap correct automatically.
 *
 * /design-system is deliberately excluded: it is an internal reference page
 * and already carries robots: { index: false }.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const lastModified = new Date();

  const staticRoutes = [
    { path: "/", priority: 1 },
    { path: "/about", priority: 0.8 },
    { path: "/contact", priority: 0.8 },
    { path: "/projects", priority: 0.8 },
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${base}${route.path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: route.priority,
    })),
    ...getProjects().map((project) => ({
      url: `${base}${project.caseStudyHref}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];
}
