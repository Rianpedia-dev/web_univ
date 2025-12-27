import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cloudflare-ipfs.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

// Hanya aktifkan static export di production jika diinginkan
if (process.env.NODE_ENV === 'production') {
  Object.assign(nextConfig, {
    output: 'export',
    trailingSlash: true,
    images: {
      ...nextConfig.images,
      unoptimized: true, // Wajib untuk static export
    },
  });
}

export default nextConfig;
