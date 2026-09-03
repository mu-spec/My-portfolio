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
  {
    slug: "my-study-life",
    name: "My Study Life",
    category: "Education & Productivity",
    description:
      "A student planning app that brings classes, homework, exams and study schedules together in one organized experience. It helps students stay on top of academic responsibilities with structured planning, reminders and study-management tools.",
    image: {
      src: "/images/my-study-life.png",
      alt: "My Study Life portfolio image: three Android phones showing the home screen with a morning greeting and Add task and Add class actions, the day planner timeline for Thursday, 3 September with the Class, Exam, Task, Holiday and Activity legend, and the New Task form with subject, due date, recurrence and details fields.",
      width: 1536,
      height: 1024,
    },
    googlePlayUrl:
      "https://play.google.com/store/apps/details?id=com.virblue.mystudylife&hl=en",
    order: 2,
  },
  {
    slug: "home-workout-app",
    name: "Home Workout App",
    category: "Health & Fitness",
    description:
      "Personalized home workout plans make it easy to train, build strength and stay active without gym equipment. Guided exercises and progress tracking help users follow structured fitness routines and stay consistent.",
    image: {
      src: "/images/home-workout-app.png",
      alt: "Home Workout App portfolio image: three Android phones showing the personalized 4-week plan with weekly workout grids, the guided Donkey Kicks exercise with a follow-along timer, and the target key area screen with Full Body, Arm, Butt, Abs, Leg and Back options.",
      width: 1536,
      height: 1024,
    },
    googlePlayUrl:
      "https://play.google.com/store/apps/details?id=homeworkoutapp.homeworkout.fitness.workout.loseweight&hl=en",
    order: 3,
  },
  {
    slug: "medicare",
    name: "MEDiCARE",
    category: "Health, Beauty & Shopping",
    description:
      "An integrated health and beauty shopping experience that helps users discover products, exclusive offers and member benefits in one place. A built-in loyalty system lets customers earn points and access personalized rewards and promotions.",
    image: {
      src: "/images/medicare.png",
      alt: "MEDiCARE portfolio image: three Android phones showing the welcome screen with the Love Your Life Club membership promotion, the home screen with loyalty points, a coupon card, a deals carousel and shopping categories, and the member price list with health and beauty products priced in Vietnamese dong.",
      width: 1536,
      height: 1024,
    },
    googlePlayUrl:
      "https://play.google.com/store/apps/details?id=vn.medicare.crmapp&hl=en",
    order: 4,
  },
] as const;

/** Projects in display order. */
export function getMoreProjects(): readonly MoreProject[] {
  return [...moreProjects].sort((a, b) => a.order - b.order);
}
