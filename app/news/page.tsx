"use client";

import Link from "next/link";
import AdSense from "@/components/AdSense";

// --- 데이터 퀄리티 및 쿼리 최적화 ---
const newsCategories = [
  {
    id: "market",
    name: "시장지표",
    query: "시장지표 전망", // '전망'을 붙여 분석 기사 유도
    category: "Market"
  },
  {
    id: "interest",
    name: "금리이슈",
    query: "미국 기준금리 전망 FOMC", // FOMC 등 핵심 키워드 추가
    category: "Interest"
  },
  {
    id: "stock",
    name: "주식뉴스",
    query: "주식시황 브리핑",
    category: "Stock"
  },
  {
    id: "crypto",
    name: "가상자산",
    query: "비트코인 시황 이더리움",
    category: "Crypto"
  },
  {
    id: "realestate",
    name: "부동산",
    query: "부동산 시장 전망 금리",
    category: "Estate"
  },
  {
    id: "global",
    name: "해외경제",
    query: "미국증시 마감시황 나스닥", // 해외 경제는 나스닥/미국증시 중심
    category: "Global"
  },
];

export default function NewsPage() {
  return (
    <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: "var(--bg-color)", color: "var(--text-main)" }}>
      <main className="max-w-5xl mx-auto px-6 py-16 md:py-24">

        {/* --- 헤더 섹션 --- */}
        <header className="mb-16 text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-6 italic uppercase leading-none">
            Bull's Eye <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">News</span>
          </h1>
          <p className="font-bold text-base md:text-lg italic opacity-70 max-w-2xl" style={{ color: "var(--text-sub)" }}>
            노이즈를 걷어내고 시장의 본질을 꿰뚫는 <span className="text-red-600 underline underline-offset-4">핵심 맥락</span>만 전달합니다.
          </p>
        </header>

        {/* --- 상단 광고 --- */}
        <div className="mb-16 rounded-2xl overflow-hidden border border-neutral-100 dark:border-neutral-800">
          <AdSense slot="5987734246" format="auto" />
        </div>

        {/* --- 뉴스 카드 그리드 --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {newsCategories.map((cat, index) => (
            <div key={cat.id} className="contents">
              <a
                href={`https://search.naver.com/search.naver?where=news&query=${encodeURIComponent(cat.name)}&nso=so:r,p:all,a:all`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-10 md:p-12 rounded-[40px] shadow-sm border-2 hover:border-red-600 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group flex flex-col justify-between h-full min-h-[320px] relative overflow-hidden"
                style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}
              >
                {/* 배경 장식 텍스트 (옵션) */}
                <div className="absolute -right-4 -bottom-4 text-6xl font-black italic opacity-[0.03] select-none uppercase group-hover:opacity-[0.07] transition-opacity">
                  {cat.category}
                </div>

                <div>
                  <div className="flex justify-between items-start mb-10">
                    <span className="bg-red-600 text-white text-[10px] font-black uppercase tracking-[0.2em] px-5 py-2 rounded-full shadow-lg shadow-red-600/20">
                      {cat.category}
                    </span>
                    <div className="w-10 h-10 rounded-full border-2 border-red-600/20 flex items-center justify-center text-red-600 opacity-40 group-hover:opacity-100 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7H7M17 7V17" /></svg>
                    </div>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black mb-5 tracking-tighter leading-tight" style={{ color: "var(--text-main)" }}>
                    {cat.name} <br /><span className="text-red-600">핵심 브리핑</span>
                  </h2>
                  <p className="text-[16px] font-bold opacity-60 mb-8 break-keep leading-relaxed" style={{ color: "var(--text-sub)" }}>
                    불스아이가 필터링한 {cat.name} 관련 최신 흐름을 실시간으로 파악하고 투자의 힌트를 얻으세요.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-[1px] w-8 bg-red-600/30"></div>
                  <div className="text-[11px] font-black font-mono text-red-600/50 uppercase tracking-[0.2em]">
                    BULL'S EYE CURATION
                  </div>
                </div>
              </a>

              {/* 4번째 카드(index 3) 이후 중간 광고 삽입 */}
              {index === 3 && (
                <div className="col-span-1 md:col-span-2 my-10 px-4">
                  <div className="relative">
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-black tracking-[0.3em] text-neutral-400 uppercase">Sponsored</div>
                    <AdSense slot="5987734246" format="fluid" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* --- 하단 광고 --- */}
        <div className="mt-20 border-t pt-20" style={{ borderColor: "var(--border-color)" }}>
          <AdSense slot="5987734246" format="auto" />
        </div>

        {/* --- 하단 버튼 --- */}
        <div className="text-center mt-24 pb-12">
          <Link href="/" className="group inline-flex items-center gap-4 px-16 py-7 bg-red-600 text-white rounded-full font-black text-2xl hover:bg-red-700 transition shadow-[0_20px_50px_rgba(220,38,38,0.3)] hover:-translate-y-2 active:scale-95">
            홈으로 돌아가기
            <span className="group-hover:translate-x-2 transition-transform">→</span>
          </Link>
        </div>
      </main>

      {/* --- 푸터 --- */}
      <footer className="py-16 border-t text-center bg-black/5 dark:bg-white/5" style={{ borderColor: "var(--border-color)" }}>
        <div className="flex justify-center gap-8 mb-6 text-[11px] font-black text-red-600/60 uppercase tracking-widest">
          <Link href="/privacy" className="hover:text-red-600 transition underline underline-offset-4 decoration-red-600/20">개인정보 처리방침</Link>
          <Link href="/terms" className="hover:text-red-600 transition underline underline-offset-4 decoration-red-600/20">이용약관</Link>
        </div>
        <div className="text-[10px] font-bold tracking-[0.5em] uppercase opacity-40">
          © 2026 BULL'S EYE. ALL RIGHTS RESERVED.
        </div>
      </footer>
    </div>
  );
}