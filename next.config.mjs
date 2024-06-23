/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cloudinary.com",
        port: "",
        pathname: "/media-explorer/dating-app-demo/*",
      },
    ],
  },
};

export default nextConfig;
