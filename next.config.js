/** @type {import('next').NextConfig} */
const nextConfig = {
  // Konfigurasi untuk production build static
  // Untuk development, gunakan mode server default
  experimental: {
    output: 'export', // Gunakan ini untuk build static
  },
  trailingSlash: true,
  images: {
    unoptimized: true, // Diperlukan untuk export statis
  },
};

// Jika NODE_ENV bukan production, jangan gunakan output export
if (process.env.NODE_ENV !== 'production') {
  delete nextConfig.experimental?.output;
  delete nextConfig.trailingSlash;
  delete nextConfig.images;
}

module.exports = nextConfig;