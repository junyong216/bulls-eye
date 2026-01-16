/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',         // 정적 HTML 빌드를 활성화합니다.
  images: { 
    unoptimized: true       // 앱 환경에서는 Next.js 이미지 최적화 서버를 쓸 수 없으므로 true로 설정합니다.
  },
};

export default nextConfig;