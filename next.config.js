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
      `${process.env.S3_UPLOAD_BUCKET}.s3.amazonaws.com`,
      `${process.env.S3_UPLOAD_BUCKET}.s3.${process.env.S3_UPLOAD_REGION}.amazonaws.com`,
    ],
  },
};

module.exports = nextConfig;
