import type { NextConfig } from "next";
const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
  buildExcludes: [/middleware-manifest\.json$/],
});

const nextConfig: NextConfig = {
  // 1. Capacitor(Android/iOS) 빌드를 위한 정적 내보내기 설정
  output: "export",
  
  // 2. 이미지 최적화 비활성화 (정적 내보내기 및 앱 환경 필수)
  images: {
    unoptimized: true,
  },
  
  // 3. 성능 최적화 및 에러 방지
  reactStrictMode: false,

  // 4. Turbopack 대신 Webpack을 강제 사용하도록 설정 (next-pwa 호환성)
  // Next.js 16에서는 기본이 Turbo이므로 이 설정이 중요합니다.
  webpack: (config: any) => {
    return config;
  },
};

export default withPWA(nextConfig);