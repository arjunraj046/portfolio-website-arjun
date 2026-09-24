/** @type {import('next').NextConfig} */
const nextConfig = {
  // lets a verification build write somewhere other than `.next`,
  // so it can run while `npm run dev` is using `.next`
  distDir: process.env.NEXT_DIST_DIR || '.next',
  // serve AVIF where the browser supports it (smaller than WebP), else WebP
  images: { formats: ['image/avif', 'image/webp'] },
  poweredByHeader: false,
};

export default nextConfig;
