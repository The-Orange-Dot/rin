/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "romand.co.kr",
      "kao-h.assetsadobe3.com",
      "www.threecosmetics.com",
      "d31pc8y2j50o7q.cloudfront.net",
      "shiro-shiro.jp",
      "m.media-amazon.com",
      "cf-simple-s3-origin-rin-cloudfront-s3-994834096994.s3.amazonaws.com",
    ],
  },
};

module.exports = nextConfig;
