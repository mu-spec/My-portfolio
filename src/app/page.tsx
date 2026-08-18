import type { Metadata } from "next";

import { AboutTeaser } from "@/components/home/about-teaser";
import { Hero } from "@/components/home/hero";
import { SelectedWork } from "@/components/home/selected-work";
import { TechnologyStrip } from "@/components/home/technology-strip";

export const metadata: Metadata = {
  description:
    "Muhammad Saad is a mobile app developer building Android applications end to end — from idea and interface design through development, testing and release.",
  alternates: { canonical: "/" },
};

/**
 * Homepage.
 *
 * Hero, Selected Work, a compact technology strip and a short About teaser.
 * About and Contact remain dedicated routes — the teaser is a pointer to
 * /about, not a duplicate of it.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <TechnologyStrip />
      <AboutTeaser />
    </>
  );
}
