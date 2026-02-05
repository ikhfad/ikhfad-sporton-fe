import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "be-sporton.agunacourse.com",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "ikhfad-sporton-be-production.up.railway.app",
        pathname: "/transactions/**",
      },
      {
        protocol: "https",
        hostname: "ikhfad-sporton-be-production.up.railway.app",
        pathname: "/products/**",
      },
      {
        protocol: "https",
        hostname: "ikhfad-sporton-be-production.up.railway.app",
        pathname: "/categories/**",
      },
    ],
  },
};

export default nextConfig;
