import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rds-ejerciciomauro.cjmo4gmwa7qa.us-west-1.rds.amazonaws.com",
        port: "5432",
        pathname: "/**",
      },
    ],
  },

  /* config options here */
};

export default nextConfig;
