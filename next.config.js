/** @type {import('next').NextConfig} */
const nextConfig = {};

// Hanya aktifkan static export di production
if (process.env.NODE_ENV === 'production') {
  Object.assign(nextConfig, {
    output: 'export', // ✅ resmi, bukan experimental
    trailingSlash: true,
    images: {
      unoptimized: true, // wajib untuk static export
    },
    // Opsional: agar asset (CSS/JS) pakai path relatif
    assetPrefix: './',
  });
}

module.exports = nextConfig;