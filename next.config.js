/** @type {import('next').NextConfig} */

const ContentSecurityPolicy = `
    default-src 'self' 'unsafe-eval';
    style-src 'self' 'unsafe-inline';
    img-src 'self' https: data:;
    connect-src https://${process.env.S3_UPLOAD_BUCKET}.s3.amazonaws.com https://${process.env.S3_UPLOAD_BUCKET}.s3.${process.env.S3_UPLOAD_REGION}.amazonaws.com http://localhost:3000 ws://localhost:3000/_next/webpack-hmr ws://rin-ten.vercel.app/_next/webpack-hmr https://rin-ten.vercel.app/_next/static/css/94b3dd3949a444d4.css https://rin-ten.vercel.app/api/auth/_log https://rin-ten.vercel.app/api/auth/session; 
`;

const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Server",
    value: "Apache", // phony server value
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "sameorigin",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "Referrer-Policy",
    value: "same-origin",
  },
  {
    key: "Permissions-Policy",
    value: "geolocation=*", // allow specified policies here
  },
  {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy.replace(/\s{2,}/g, " ").trim(),
  },
];

const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
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
