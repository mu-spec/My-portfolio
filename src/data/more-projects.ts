import type { MoreProject } from "@/types/more-project";

/**
 * More Projects — the lightweight collection behind the /projects page.
 *
 * ADDING A PROJECT: append one record to `moreProjects`. The page, grid and
 * cards are fully data-driven, so no component changes are needed. The same
 * rules as `projects.ts` apply: only verified facts, a real image asset in
 * /public, and a real Google Play URL.
 */
export const moreProjects: readonly MoreProject[] = [
  {
    slug: "smart-app-lock",
    name: "Smart App Lock",
    category: "Privacy & Security",
    description:
      "Protect selected Android apps from unauthorized access while keeping privacy controls simple and easy to manage. The app also includes useful device-management tools such as junk cleaning and application management.",
    image: {
      src: "/images/smart-app-lock.png",
      alt: "Smart App Lock portfolio image: three Android phones showing the home screen with the App Lock toggle, the App Lock screen protecting Messages, WhatsApp, Facebook and other apps, and the Junk Clean screen listing 1.1 GB of cleanable cache, ad junk and residual files.",
      width: 1536,
      height: 1024,
    },
    googlePlayUrl:
      "https://play.google.com/store/apps/details?id=com.thinkyeah.smartlockfree&pcampaignid=web_share",
    order: 1,
  },
] as const;

/** Projects in display order. */
export function getMoreProjects(): readonly MoreProject[] {
  return [...moreProjects].sort((a, b) => a.order - b.order);
}
