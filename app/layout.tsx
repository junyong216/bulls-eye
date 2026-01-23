import "./globals.css";
import { Inter } from "next/font/google";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

// --- SEO 및 메타데이터 설정 ---
export const metadata: Metadata = {
  title: {
    default: "BULL'S EYE - 스마트 경제 지표 & 투자 가이드",
    template: "%s | BULL'S EYE",
  },
  description: "실시간 금융 지표, 경제 뉴스, 주식 용어사전 및 투자 가이드를 제공합니다. 성공 투자의 과녁을 명중시키세요.",
  keywords: ["경제지표", "실시간환율", "주식뉴스", "금리전망", "재무제표공부", "부동산전망"],
  manifest: "/manifest.json",
  
  metadataBase: new URL('https://bullseye-check.vercel.app'),
  alternates: {
    canonical: '/',
  },

  // 3. Open Graph (카톡, 페이스북 공유 시 최적화)
  openGraph: {
    title: "BULL'S EYE - 스마트 경제 데이터 허브",
    description: "투자자를 위한 실시간 경제 지표와 쉬운 용어사전",
    url: "https://bullseye-check.vercel.app",
    siteName: "BULL'S EYE",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png", // public 폴더에 넣어둔 파일명과 동일해야 함
        width: 1200,
        height: 630,
        alt: "BULL'S EYE 메인 미리보기",
      },
    ],
  },

  // 4. Twitter (X) 카드 설정
  twitter: {
    card: "summary_large_image",
    title: "BULL'S EYE - 스마트 경제 데이터 허브",
    description: "차트를 꿰뚫는 황소의 통찰력",
    images: ["/opengraph-image.png"],
  },

  verification: {
    google: "l-yo6JfY6p6TB-5Hg2rN9VjGa8oU6LehgDM3caKaycY",
  },

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