"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function SettingsPage() {
  // 1. 초기값을 null로 설정해서 '데이터 로딩 중'임을 명시
  const [settings, setSettings] = useState<{
    darkMode: boolean | null;
    marketAlert: boolean | null;
    newsLetter: boolean | null;
  }>({
    darkMode: null, 
    marketAlert: null,
    newsLetter: null,
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const savedMarketAlert = localStorage.getItem("marketAlert");
    const savedNewsLetter = localStorage.getItem("newsLetter");
    const isDark = document.documentElement.classList.contains("dark");

    setSettings({
      darkMode: savedTheme === "dark" || (savedTheme === null && isDark),
      marketAlert: savedMarketAlert !== "false",
      newsLetter: savedNewsLetter === "true",
    });
  }, []);

  const toggleSetting = (key: keyof typeof settings) => {
    const newValue = !settings[key];
    setSettings((prev) => ({ ...prev, [key]: newValue }));

    if (key === "darkMode") {
      const theme = newValue ? "dark" : "light";
      localStorage.setItem("theme", theme);
      document.documentElement.classList.toggle("dark", newValue);
    } else {
      localStorage.setItem(key, String(newValue));
    }
  };

  // ✅ 핵심: 데이터가 오기 전(null)에는 무조건 무채색으로 강제
  const getToggleStyle = (value: boolean | null) => {
    if (value === null) return "bg-gray-200 justify-start opacity-50"; // 로딩 중 상태
    return value ? "bg-red-600 justify-end" : "bg-gray-300 justify-start";
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-color)", color: "var(--text-main)" }}>
      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-5xl font-black italic uppercase text-red-600 mb-16">Settings</h1>

        <section className="space-y-12">
          {/* 다크모드 */}
          <div className="flex items-center justify-between py-4">
            <div>
              <h3 className="text-xl font-bold">다크 모드</h3>
              <p className="text-sm opacity-50">어두운 테마 사용</p>
            </div>
            <button 
              onClick={() => settings.darkMode !== null && toggleSetting('darkMode')}
              className={`w-14 h-8 rounded-full transition-all duration-200 flex items-center px-1 ${getToggleStyle(settings.darkMode)}`}
            >
              <div className="w-6 h-6 bg-white rounded-full shadow-md" />
            </button>
          </div>

          {/* 시장 지표 */}
          <div className="flex items-center justify-between py-4">
            <div>
              <h3 className="text-xl font-bold">시장 지표 요약 보기</h3>
              <p className="text-sm opacity-50">홈 화면 상단 지수 표시</p>
            </div>
            <button 
              onClick={() => settings.marketAlert !== null && toggleSetting('marketAlert')}
              className={`w-14 h-8 rounded-full transition-all duration-200 flex items-center px-1 ${getToggleStyle(settings.marketAlert)}`}
            >
              <div className="w-6 h-6 bg-white rounded-full shadow-md" />
            </button>
          </div>
        </section>

        <div className="text-center mt-24">
          <Link href="/" className="inline-block px-10 py-4 bg-red-600 text-white rounded-full font-black">적용 완료</Link>
        </div>
      </main>
    </div>
  );
}