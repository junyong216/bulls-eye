"use client";

import { useEffect } from "react";
import { App } from "@capacitor/app";
import Link from "next/link"; // Link 컴포넌트 추가
import "./globals.css";

function AppHandler() {
  useEffect(() => {
    const init = async () => {
      await App.addListener('backButton', ({ canGoBack }) => {
        if (canGoBack) {
          window.history.back();
        } else {
          App.exitApp();
        }
      });
    };
    init();
    return () => { App.removeAllListeners(); };
  }, []);
  return null;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
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
        <AppHandler />
        
        {/* 콘텐츠 영역 */}
        {children}

        {/* [추가] 하단 푸터 영역: 구글 애드센스 승인용 링크 */}
        <footer className="p-10 text-center opacity-50 text-[10px] font-bold tracking-widest uppercase border-t mt-20">
          <p>© 2026 ECO_CHECK. ALL RIGHTS RESERVED.</p>
          <Link href="/privacy" className="underline mt-3 inline-block hover:text-blue-600 transition">
            개인정보처리방침 (Privacy Policy)
          </Link>
        </footer>
      </body>
    </html>
  );
}