/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    output: "export",
    images: {
      unoptimized: true,
    },
  },
};

export default nextConfig;
