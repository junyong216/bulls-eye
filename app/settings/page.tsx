"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    darkMode: false, 
    marketAlert: false,
    newsLetter: false,
  });
  
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // 마운트 시점에 로컬스토리지 확인
    const savedTheme = localStorage.getItem("theme");
    const savedMarketAlert = localStorage.getItem("marketAlert");
    const savedNewsLetter = localStorage.getItem("newsLetter");

    // 시스템 테마 확인 (이게 모바일에서 가장 정확함)
    const isDark = document.documentElement.classList.contains("dark");

    setSettings({
      darkMode: savedTheme === "dark" || (savedTheme === null && isDark),
      marketAlert: savedMarketAlert !== "false",
      newsLetter: savedNewsLetter === "true",
    });

    setMounted(true);
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

  // ✅ 버튼 렌더링 전담 함수 (mounted 전에는 아예 빈 칸으로 둠)
  const renderToggleButton = (key: keyof typeof settings) => {
    if (!mounted) return <div className="w-14 h-8" />; // 자리만 차지하고 안 보여줌

    return (
      <button 
        onClick={() => toggleSetting(key)} 
        className={`w-14 h-8 rounded-full transition-all duration-200 flex items-center px-1 ${
          settings[key] ? 'bg-red-600 justify-end' : 'bg-gray-300 justify-start'
        }`}
      >
        <div className="w-6 h-6 bg-white rounded-full shadow-md" />
      </button>
    );
  };

  return (
    <div className="min-h-[100dvh] flex flex-col" style={{ backgroundColor: "var(--bg-color)", color: "var(--text-main)" }}>
      <main className="flex-1 max-w-3xl mx-auto px-6 py-16 md:py-24 w-full">
        <header className="mb-16">
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-4 italic uppercase text-red-600">Settings</h1>
          <p className="text-lg font-bold opacity-60" style={{ color: "var(--text-sub)" }}>로컬 투자 환경 설정</p>
        </header>

        <section className="mb-12">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-red-600 mb-6 border-b pb-2" style={{ borderColor: "var(--border-color)" }}>Visual</h2>
          <div className="flex items-center justify-between py-4">
            <div>
              <h3 className="text-xl font-bold">다크 모드</h3>
              <p className="text-sm opacity-50">어두운 테마 사용</p>
            </div>
            {renderToggleButton('darkMode')}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-red-600 mb-6 border-b pb-2" style={{ borderColor: "var(--border-color)" }}>Experience</h2>
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">시장 지표 요약 보기</h3>
                <p className="text-sm opacity-50">홈 화면 상단 지수 표시</p>
              </div>
              {renderToggleButton('marketAlert')}
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">전문가 가이드 우선 표시</h3>
                <p className="text-sm opacity-50">뉴스보다 가이드 버튼을 앞에 배치</p>
              </div>
              {renderToggleButton('newsLetter')}
            </div>
          </div>
        </section>

        {/* ... 나머지 Storage 섹션 및 하단 버튼 동일 ... */}
        <section className="mb-24">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-red-600 mb-6 border-b pb-2" style={{ borderColor: "var(--border-color)" }}>Storage</h2>
          <button onClick={() => { if(confirm("초기화할까요?")) { localStorage.clear(); window.location.reload(); }}} className="w-full text-left py-4 px-6 rounded-2xl border font-bold text-red-600/70 hover:text-red-600 hover:border-red-600 transition-colors" style={{ borderColor: "var(--border-color)" }}>캐시 및 설정 초기화</button>
        </section>

        <div className="text-center pb-12">
          <Link href="/" className="inline-block px-10 py-4 bg-red-600 text-white rounded-full font-black hover:bg-red-700 transition">적용 완료 및 홈으로</Link>
        </div>
      </main>
    </div>
  );
}