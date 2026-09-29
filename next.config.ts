import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // Revisa que no falte la barra inclinada final en assetPrefix
  basePath: process.env.NODE_ENV === 'production' ? '/portfolio-jose' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/portfolio-jose/' : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
