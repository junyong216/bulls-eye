import { Metadata, Viewport } from "next";
import ClientLayout from "./layout-client"; 

export const metadata: Metadata = {
  title: {
    default: "불스아이 (BULL'S EYE) - 경제의 정곡을 찌르다",
    template: "%s | BULL'S EYE",
  },
  description: "실시간 경제 지표, 공포탐욕지수, 증권 시황 및 투자 인사이트 큐레이션 서비스",
  keywords: ["경제지표", "공포탐욕지수", "주식시황", "투자정보", "재테크", "불스아이"],
  authors: [{ name: "BULL'S EYE" }],
  manifest: "/manifest.json",
  icons: {
    apple: "/icon-192x192.png",
  },
  openGraph: {
    title: "불스아이 (BULL'S EYE) - 실시간 경제 지표 가이드",
    description: "성공적인 투자를 위한 데이터 시각화 및 경제 인사이트",
    url: "https://your-domain.com", 
    siteName: "BULL'S EYE",
    locale: "ko_KR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#e11d48",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3737116795159579"
          crossOrigin="anonymous"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <ClientLayout>{children}</ClientLayout>
    </html>
  );
}