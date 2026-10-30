import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  ...(process.env.JMG_VERCEL_BUILD === "1" ? {
    env: { JMG_VERCEL_BUILD: "1" },
    outputFileTracingRoot: process.cwd(),
    // Native D1 handlers are lazy and never loaded by the Vercel API bridge.
    webpack(config, { isServer }) {
      if (isServer) {
        config.externals = [...(config.externals || []), "cloudflare:workers"];
      }
      return config;
    },
  } satisfies NextConfig : {}),
};

export default nextConfig;
