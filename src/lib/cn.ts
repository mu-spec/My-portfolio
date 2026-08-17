type ClassValue = string | number | null | undefined | false | ClassValue[];

/**
 * Minimal class-name joiner.
 *
 * Kept dependency-free on purpose: the component API below never emits
 * conflicting utilities for the same CSS property, so full class merging
 * (clsx + tailwind-merge) would be unnecessary weight.
 */
export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];

  for (const input of inputs) {
    if (!input) continue;
    if (Array.isArray(input)) {
      const nested = cn(...input);
      if (nested) out.push(nested);
    } else {
      out.push(String(input));
    }
  }

  return out.join(" ");
}
