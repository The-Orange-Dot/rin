/** @type {import('next').NextConfig} */

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self';
  child-src example.com;
  style-src 'self' example.com;
  font-src 'self';  
`;

const nextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: ContentSecurityPolicy.replace(/\s{2,}/g, " ").trim(),
          },
        ],
      },
    ];
  },
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
