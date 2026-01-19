import type { NextConfig } from "next";
const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
  buildExcludes: [/middleware-manifest\.json$/],
});

const nextConfig: NextConfig = {
  // Capacitor 앱 배포를 위한 정적 추출 설정
  output: "export",
  images: {
    unoptimized: true,
  },
  reactStrictMode: false,
  // Next.js 16 Turbopack 대신 Webpack 엔진 강제 사용 (PWA 호환성)
  webpack: (config: any) => {
    return config;
  },
};

export default withPWA(nextConfig);