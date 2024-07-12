/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");

const headers = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Cache-Control",
    value: "public, s-maxage=36000, stale-while-revalidate=36000",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
];

const nextConfig = {
  images: {
    domains: ["dev.qoobus.com", "qoobus.com"],
  },
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        "react/jsx-runtime.js": "preact/compat/jsx-runtime",
        react: "preact/compat",
        "react-dom/test-utils": "preact/test-utils",
        "react-dom": "preact/compat",
      });
    }
    return config;
  },
  env: {
    API: process.env.API,
    VERSION_NUMBER: process.env.VERSION_NUMBER,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers,
      },
    ];
  },
  i18n: i18n,
};

module.exports = nextConfig;
