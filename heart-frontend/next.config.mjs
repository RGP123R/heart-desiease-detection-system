/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Allow local LAN origins (useful when accessing the dev server from other devices)
  allowedDevOrigins: [
    "http://192.168.31.137:3000",
    "http://192.168.13.175:3000",
    "http://localhost:3000",
  ],
};

export default nextConfig;
