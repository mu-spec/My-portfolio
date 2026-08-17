import { Hero } from "@/components/home/hero";
import { SelectedWork } from "@/components/home/selected-work";

/**
 * Homepage.
 *
 * P1 implements the hero and the Selected Work showcase. About, Skills and
 * Contact are reserved sections added in later milestones.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <SelectedWork />
    </>
  );
}
