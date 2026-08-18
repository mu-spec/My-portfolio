import { ImageResponse } from "next/og";

import { siteConfig } from "@/config/site";

/**
 * Default social preview card.
 *
 * Rendered at build time from the design tokens, so the social card matches
 * the site rather than being a separately maintained asset. Content is
 * limited to verified facts: name, role and the two shipped project names.
 * No metrics, claims or achievements.
 *
 * This is the site-wide default; individual case studies already declare
 * their own openGraph.images (real app screenshots), which take precedence.
 */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${siteConfig.name} — ${siteConfig.role}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#08090b",
          padding: 80,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              color: "#7aa8ff",
              fontSize: 26,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            <div style={{ width: 44, height: 3, background: "#3d7dfa" }} />
            Portfolio
          </div>

          <div
            style={{
              marginTop: 28,
              color: "#f2f4f8",
              fontSize: 96,
              fontWeight: 700,
              letterSpacing: -3,
            }}
          >
            {siteConfig.name}
          </div>

          <div style={{ marginTop: 10, color: "#a8b0bf", fontSize: 42 }}>
            {siteConfig.role}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #2a303b",
            paddingTop: 30,
            color: "#6d7686",
            fontSize: 26,
          }}
        >
          <div style={{ display: "flex" }}>
            Electrician Simulator App · Mobile Cleaner
          </div>
          <div style={{ display: "flex", color: "#a8b0bf" }}>Android</div>
        </div>
      </div>
    ),
    size,
  );
}
