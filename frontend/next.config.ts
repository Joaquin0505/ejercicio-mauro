import type { NextConfig } from "next";

const nextConfig: NextConfig = {

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

  /* config options here */
};

export default nextConfig;
