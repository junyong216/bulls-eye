"use client";

import { useEffect } from "react";
import { App } from "@capacitor/app";
import Link from "next/link";
import "./globals.css";

function AppHandler() {
  useEffect(() => {
    const init = async () => {
      try {
        await App.addListener('backButton', ({ canGoBack }) => {
          if (canGoBack) {
            window.history.back();
          } else {
            App.exitApp();
          }
        });
      } catch (e) {
        console.log("Web environment: Capacitor not detected.");
      }
    };
    init();
    return () => { App.removeAllListeners(); };
  }, []);
  return null;
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <body className="antialiased transition-colors duration-300" style={{ backgroundColor: "var(--bg-color)", color: "var(--text-main)" }}>
      <AppHandler />
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow">
          {children}
        </main>

        <footer className="p-10 text-center opacity-50 text-[10px] font-bold tracking-widest uppercase border-t" style={{ borderColor: "var(--border-color)", backgroundColor: "var(--card-bg)" }}>
          <div className="max-w-6xl mx-auto">
            <p className="mb-4">© 2026 BULL'S EYE. ALL RIGHTS RESERVED.</p>
            <div className="flex justify-center gap-6 items-center">
              <Link href="/privacy" className="underline hover:text-red-600 transition">
                개인정보처리방침
              </Link>
              <Link href="/terms" className="underline hover:text-red-600 transition">
                이용약관
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </body>
  );
}