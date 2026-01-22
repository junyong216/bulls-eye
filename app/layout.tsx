import "./globals.css";
import { Inter } from "next/font/google";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

// --- SEO 및 메타데이터 설정 ---
export const metadata: Metadata = {
  // 1. 타이틀 템플릿: 하위 페이지에서 제목을 넣으면 자동으로 "페이지명 | BULL'S EYE"가 됩니다.
  title: {
    default: "BULL'S EYE - 스마트 경제 지표 & 투자 가이드",
    template: "%s | BULL'S EYE",
  },
  description: "실시간 금융 지표, 경제 뉴스, 주식 용어사전 및 투자 가이드를 제공합니다. 성공 투자의 과녁을 명중시키세요.",
  keywords: ["경제지표", "실시간환율", "주식뉴스", "금리전망", "재무제표공부", "부동산전망"],
  manifest: "/manifest.json",
  
  // 2. 표준 URL 설정 (중복 콘텐츠 방지)
  metadataBase: new URL('https://bullseye-check.vercel.app'),
  alternates: {
    canonical: '/',
  },

  // 3. Open Graph (카톡, 페이스북, 블로그 공유 시 최적화)
  openGraph: {
    title: "BULL'S EYE - 스마트 경제 데이터 허브",
    description: "투자자를 위한 실시간 경제 지표와 쉬운 용어사전",
    url: "https://bullseye-check.vercel.app",
    siteName: "BULL'S EYE",
    locale: "ko_KR",
    type: "website",
    // images: [{ url: '/og-image.png' }], // 공유 시 뜰 이미지가 있다면 추가
  },

  // 4. 검색 엔진 소유권 인증
  verification: {
    google: "l-yo6JfY6p6TB-5Hg2rN9VjGa8oU6LehgDM3caKaycY",
    // naver: "네이버코드가있다면여기에추가",
  },

  // 5. 기타 설정
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={inter.className}>
        {children}

        {/* --- 서비스 워커 등록 스크립트 (PWA) --- */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(function(reg) {
                    console.log('Service Worker registered');
                  }).catch(function(err) {
                    console.log('Service Worker registration failed: ', err);
                  });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}