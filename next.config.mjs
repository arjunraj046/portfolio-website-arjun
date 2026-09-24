/** @type {import('next').NextConfig} */
const nextConfig = {
  // lets a verification build write somewhere other than `.next`,
  // so it can run while `npm run dev` is using `.next`
  distDir: process.env.NEXT_DIST_DIR || '.next',
};

export default nextConfig;
