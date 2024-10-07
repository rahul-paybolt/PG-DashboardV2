/** @type {import('next').NextConfig} */

const path = require("path");
require('dotenv').config();

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  async redirects() {
    return [
      // Basic redirect
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },
  env: {
    NEXT_PUBLIC_DEV_PB_BASE_URL: process.env.DEV_PB_BASE_URL,
  },
};

module.exports = nextConfig;
