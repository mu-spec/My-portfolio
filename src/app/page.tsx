import type { Metadata } from "next";

import { Hero } from "@/components/home/hero";
import { SelectedWork } from "@/components/home/selected-work";

export const metadata: Metadata = {
  description:
    "Muhammad Saad is a mobile app developer building Android applications end to end — from idea and interface design through development, testing and release.",
  alternates: { canonical: "/" },
};

/**
 * Homepage.
 *
 * The hero and the Selected Work showcase. About and Contact are dedicated
 * routes (/about, /contact) rather than homepage sections.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <SelectedWork />
    </>
  );
}
