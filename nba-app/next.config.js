/** @type {import('next').NextConfig} */

module.exports = nextConfig = {
  reactStrictMode: true,
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    MONGO_LANG_URI: process.env.MONGO_LANG_URI,
  },
  images: {
    domains: ['*'],
  },
  trailingSlash: true,
};

