import type { Project, ProjectMedia, ProjectMediaKey } from "@/types/project";

/**
 * Look a project screenshot up by its role key.
 *
 * Case studies reference screens by name ("quiz-question") rather than by
 * array position, so reordering the media list can never silently swap the
 * image attached to a section of copy.
 */
export function getMedia(
  project: Project,
  key: ProjectMediaKey,
): ProjectMedia | undefined {
  return project.media.find((item) => item.key === key);
}

/**
 * Same lookup, but throws when the screen is missing.
 *
 * Used where a section is meaningless without its screenshot: failing the
 * build is better than shipping a case study with a hole in it.
 */
export function requireMedia(
  project: Project,
  key: ProjectMediaKey,
): ProjectMedia {
  const found = getMedia(project, key);
  if (!found) {
    throw new Error(
      `Missing screenshot "${key}" for project "${project.slug}".`,
    );
  }
  return found;
}
