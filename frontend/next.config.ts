import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: "dist",
  reactStrictMode: true,
  swcMinify: true,  
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rds-ejerciciomauro.cjmo4gmwa7qa.us-west-1.rds.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      path: false,
      os: false,
    };
    return config;
  },
};

export default nextConfig;