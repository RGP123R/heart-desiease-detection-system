/** Workspace-level Next config to point turbopack at the real project folder */
/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    // Ensure Turbopack/Next infers the correct project root when there are multiple lockfiles
    root: "./heart-frontend",
  },
};

export default nextConfig;
