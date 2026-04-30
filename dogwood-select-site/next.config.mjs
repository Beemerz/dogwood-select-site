/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: [],
  },
  experimental: {
    serverActions: true,
  },
  // Enable strict mode for React
  reactStrictMode: true,
};

export default nextConfig;