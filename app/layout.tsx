import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ECO_CHECK | 스마트한 경제 지표 대시보드",
  description: "실시간 환율, 주가 지수, 공포와 탐욕 지수를 한눈에 확인하는 경제 인사이트 플랫폼",
  openGraph: {
    title: "ECO_CHECK",
    description: "성공적인 투자를 위한 실시간 경제 지표",
    url: "https://your-domain.vercel.app", 
    siteName: "ECO_CHECK",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        {/* 다크 모드 깜빡임 방지 스크립트 */}
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
      <body className="antialiased transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}