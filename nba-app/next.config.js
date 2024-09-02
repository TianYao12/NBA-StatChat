/** @type {import('next').NextConfig} */

module.exports = nextConfig = {
  reactStrictMode: true,
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    MONGO_LANG_URI: process.env.MONGO_LANG_URI,
  },
  images: {
    domains: ["ak-static.cms.nba.com", "storage.cloud.google.com", "a.espncdn.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ak-static.cms.nba.com",
      },
      {
        protocol: "https",
        hostname: "storage.cloud.google.com",
      },
      {
        protocol: "https",
        hostname: "a.espncdn.com"
      }
    ],
  },
  trailingSlash: true,
};
