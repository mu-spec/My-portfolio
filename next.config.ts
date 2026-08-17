import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /**
     * The project screenshots contain fine UI text, so they are served at a
     * higher quality than the default 75. Next 16 requires every quality used
     * by next/image to be declared here.
     */
    qualities: [75, 90],
  },
};

export default nextConfig;
