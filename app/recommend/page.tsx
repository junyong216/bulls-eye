"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import DarkModeToggle from "@/components/DarkModeToggle";

// --- 네비게이션용 공통 데이터 ---
const newsCategories = [
  { id: "market", name: "시장지표", query: "시장지표" },
  { id: "interest", name: "금리이슈", query: "금리전망" },
  { id: "stock", name: "주식뉴스", query: "주식시황" },
  { id: "crypto", name: "가상자산", query: "비트코인" },
  { id: "realestate", name: "부동산", query: "부동산전망" },
  { id: "global", name: "해외경제", query: "글로벌경제" },
];
const dictCategories = ["전체", "주식기초", "재무제표", "거시경제", "투자전략"];
const recommendTabs = [
  { name: "추천 도서", slug: "books" },
  { name: "추천 영상", slug: "videos" }
];

function RecommendContent() {
  const [activeTab, setActiveTab] = useState("books");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "books" || tab === "videos") {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const books = [
    { title: "돈의 속성", author: "김승호", desc: "최상위 부자가 말하는 돈에 대한 태도와 75가지 경제 철학을 담은 필독서입니다.", link: "https://product.kyobobook.co.kr/detail/S000001913217" },
    { title: "부자 아빠 가난한 아빠 1", author: "로버트 기요사키", desc: "자산과 부채의 차이를 명확히 하고 경제적 자유를 향한 로드맵을 제시합니다.", link: "https://product.kyobobook.co.kr/detail/S000001772245" },
    { title: "현명한 투자자", author: "벤자민 그레이엄", desc: "워런 버핏의 스승이자 가치 투자 원칙을 정립한 투자의 고전입니다.", link: "https://product.kyobobook.co.kr/detail/S000216669456" },
    { title: "자본주의 시대 최소한의 경제 공부", author: "백억남(김욱현)", desc: "프롤로그 경제를 이해하는 순간 선명한 기회가 보인다", link: "https://product.kyobobook.co.kr/detail/S000218687476" },
    { title: "시대예보: 핵개인의 시대", author: "송길영", desc: "변화하는 사회 속에서 경제적, 사회적 자립을 고민하는 이들을 위한 통찰.", link: "https://product.kyobobook.co.kr/detail/S000209151495" },
    { title: "EBS 다큐프라임 자본주의", author: "EBS 자본주의 제작팀", desc: "우리가 숨 쉬듯 살아가는 자본주의 시스템의 본질과 금융의 진실을 파헤칩니다.", link: "https://product.kyobobook.co.kr/detail/S000000848997" }
  ];

  const videos = [
    { title: "슈카월드", channel: "YouTube", desc: "어려운 경제 이슈를 유쾌하고 깊이 있게 풀어주는 국내 1위 경제 채널입니다.", link: "https://www.youtube.com/@syukaworld" },
    { title: "삼프로TV", channel: "YouTube", desc: "국내외 금융 전문가들의 시장 분석을 매일 만날 수 있습니다.", link: "https://www.youtube.com/@3protv" },
    { title: "월급쟁이부자들", channel: "YouTube", desc: "재테크와 내 집 마련을 위한 실질적인 노하우를 공유합니다.", link: "https://www.youtube.com/@weolbu" },
    { title: "소수몽키", channel: "YouTube", desc: "미국 주식과 배당주 투자를 쉽고 체계적으로 설명해 주는 채널입니다.", link: "https://www.youtube.com/@sosumonkey" },
    { title: "부사모", channel: "YouTube", desc: "거시 경제의 흐름과 부동산 시장의 변화를 예리하게 분석합니다.", link: "https://www.youtube.com/@user-qz7nd3wp2n" },
    { title: "내일은 투자왕", channel: "YouTube", desc: "투자 철학과 멘탈 관리, 시장을 보는 안목을 길러줍니다.", link: "https://www.youtube.com/@kimdanlee" }
  ];

  return (
    <div className="min-h-screen font-sans overflow-x-hidden transition-colors duration-300" style={{ backgroundColor: "var(--bg-color)", color: "var(--text-main)" }}>
      
      <nav className="h-16 border-b flex items-center justify-between px-4 md:px-8 sticky top-0 z-[100] shadow-sm transition-colors" 
           style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>
        
        <div className="flex items-center gap-4">
          <Link href="/" className="font-black text-xl md:text-2xl text-blue-600 tracking-tighter">ECO_CHECK</Link>
          <DarkModeToggle />
        </div>

        <div className="flex items-center h-full gap-4 md:gap-8 font-black text-base">
          <div className="hidden lg:flex gap-6 h-full">
            <div className="relative group flex items-center h-full px-1">
              <Link href="/news" className="group-hover:text-blue-600 transition flex items-center gap-1" style={{ color: "var(--text-main)" }}>뉴스 <span className="text-[10px] opacity-40 group-hover:rotate-180 transition-transform">▼</span></Link>
              <div className="absolute top-full left-1/2 -translate-x-1/2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all pt-2 z-[110]">
                <div className="w-44 rounded-2xl border shadow-2xl p-2 bg-white dark:bg-slate-900" style={{ borderColor: "var(--border-color)" }}>
                  {newsCategories.map((cat) => (
                    <a key={cat.id} href={`https://search.naver.com/search.naver?where=news&query=${encodeURIComponent(cat.query)}&sort=1`} target="_blank" rel="noopener noreferrer" className="block px-4 py-2.5 rounded-xl text-[13px] hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 transition" style={{ color: "var(--text-main)" }}>{cat.name}</a>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative group flex items-center h-full px-1">
              <Link href="/stock" className="group-hover:text-blue-600 transition flex items-center gap-1" style={{ color: "var(--text-main)" }}>증권 <span className="text-[10px] opacity-40 group-hover:rotate-180 transition-transform">▼</span></Link>
              <div className="absolute top-full left-1/2 -translate-x-1/2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all pt-2 z-[110]">
                <div className="w-40 rounded-2xl border shadow-2xl p-2 bg-white dark:bg-slate-900" style={{ borderColor: "var(--border-color)" }}>
                  <Link href="/stock?tab=list" className="block px-4 py-2.5 rounded-xl text-[13px] hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 transition" style={{ color: "var(--text-main)" }}>증권사 목록</Link>
                  <Link href="/stock?tab=guide" className="block px-4 py-2.5 rounded-xl text-[13px] hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 transition" style={{ color: "var(--text-main)" }}>계좌 가이드</Link>
                </div>
              </div>
            </div>

            <div className="relative group flex items-center h-full px-1">
              <Link href="/dictionary" className="group-hover:text-blue-600 transition flex items-center gap-1" style={{ color: "var(--text-main)" }}>용어사전 <span className="text-[10px] opacity-40 group-hover:rotate-180 transition-transform">▼</span></Link>
              <div className="absolute top-full left-1/2 -translate-x-1/2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all pt-2 z-[110]">
                <div className="w-40 rounded-2xl border shadow-2xl p-2 bg-white dark:bg-slate-900" style={{ borderColor: "var(--border-color)" }}>
                  {dictCategories.map((cat) => (
                    <Link key={cat} href={`/dictionary?cat=${cat}`} className="block px-4 py-2.5 rounded-xl text-[13px] hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 transition" style={{ color: "var(--text-main)" }}>{cat}</Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative group flex items-center h-full px-1">
              <Link href="/recommend" className="text-blue-600 flex items-center gap-1">추천 <span className="text-[10px] opacity-40 group-hover:rotate-180 transition-transform">▼</span></Link>
              <div className="absolute top-full left-1/2 -translate-x-1/2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all pt-2 z-[110]">
                <div className="w-40 rounded-2xl border shadow-2xl p-2 bg-white dark:bg-slate-900" style={{ borderColor: "var(--border-color)" }}>
                  {recommendTabs.map((tab) => (
                    <Link key={tab.slug} href={`/recommend?tab=${tab.slug}`} className="block px-4 py-2.5 rounded-xl text-[13px] hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 transition" style={{ color: "var(--text-main)" }}>{tab.name}</Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="w-10 h-10 flex flex-col justify-center items-center gap-1.5 focus:outline-none z-[120]">
            <div className={`w-6 h-0.5 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} style={{ backgroundColor: "var(--text-main)" }}></div>
            <div className={`w-6 h-0.5 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} style={{ backgroundColor: "var(--text-main)" }}></div>
            <div className={`w-6 h-0.5 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} style={{ backgroundColor: "var(--text-main)" }}></div>
          </button>
        </div>
        
        <div className={`absolute left-0 w-full transition-all duration-500 ease-in-out overflow-hidden shadow-2xl z-[90] ${isMenuOpen ? 'max-h-[100vh] border-b opacity-100' : 'max-h-0 opacity-0'}`}
             style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)", top: '64px' }}>
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 p-10">
            <div>
              <div className="text-blue-600 font-black text-xs mb-4 uppercase tracking-widest">뉴스</div>
              <div className="flex flex-col gap-3">
                {newsCategories.map((cat) => (
                  <a key={cat.id} href={`https://search.naver.com/search.naver?where=news&query=${encodeURIComponent(cat.query)}&sort=1`} target="_blank" className="text-[14px] font-bold" style={{ color: "var(--text-main)" }}>{cat.name}</a>
                ))}
              </div>
            </div>
            <div>
              <div className="text-blue-600 font-black text-xs mb-4 uppercase tracking-widest">증권</div>
              <div className="flex flex-col gap-3">
                <Link href="/stock?tab=list" onClick={() => setIsMenuOpen(false)} className="text-[14px] font-bold" style={{ color: "var(--text-main)" }}>증권사 목록</Link>
                <Link href="/stock?tab=guide" onClick={() => setIsMenuOpen(false)} className="text-[14px] font-bold" style={{ color: "var(--text-main)" }}>계좌 가이드</Link>
              </div>
            </div>
            <div>
              <div className="text-blue-600 font-black text-xs mb-4 uppercase tracking-widest">용어사전</div>
              <div className="flex flex-col gap-3">
                {dictCategories.map((cat) => (
                  <Link key={cat} href={`/dictionary?cat=${cat}`} onClick={() => setIsMenuOpen(false)} className="text-[14px] font-bold" style={{ color: "var(--text-main)" }}>{cat}</Link>
                ))}
              </div>
            </div>
            <div>
              <div className="text-blue-600 font-black text-xs mb-4 uppercase tracking-widest">추천</div>
              <div className="flex flex-col gap-3">
                {recommendTabs.map((tab) => (
                  <Link key={tab.slug} href={`/recommend?tab=${tab.slug}`} onClick={() => setIsMenuOpen(false)} className="text-[14px] font-bold" style={{ color: "var(--text-main)" }}>{tab.name}</Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* --- 메인 콘텐츠 (너비 확장: max-w-7xl) --- */}
      <main className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        <header className="mb-16 text-center md:text-left px-2">
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6" style={{ color: "var(--text-main)" }}>Recommended</h1>
          <p className="text-lg font-bold mb-10" style={{ color: "var(--text-sub)" }}>금융 지능을 높여줄 교보문고 베스트셀러와 인기 영상을 추천합니다.</p>
          <div className="flex gap-4 justify-center md:justify-start">
            <button onClick={() => setActiveTab("books")} className={`px-10 py-4 rounded-full font-black text-base transition-all ${activeTab === "books" ? "bg-blue-600 text-white shadow-xl scale-105" : "border"}`} style={{ backgroundColor: activeTab === "books" ? "" : "var(--card-bg)", color: activeTab === "books" ? "#ffffff" : "var(--text-sub)", borderColor: activeTab === "books" ? "transparent" : "var(--border-color)" }}>추천 도서</button>
            <button onClick={() => setActiveTab("videos")} className={`px-10 py-4 rounded-full font-black text-base transition-all ${activeTab === "videos" ? "bg-blue-600 text-white shadow-xl scale-105" : "border"}`} style={{ backgroundColor: activeTab === "videos" ? "" : "var(--card-bg)", color: activeTab === "videos" ? "#ffffff" : "var(--text-sub)", borderColor: activeTab === "videos" ? "transparent" : "var(--border-color)" }}>추천 영상</button>
          </div>
        </header>

        {/* 그리드 간격 및 너비 조정 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(activeTab === "books" ? books : videos).map((item, i) => (
            <a 
              key={i} 
              href={item.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-10 rounded-[40px] border shadow-sm hover:shadow-2xl hover:border-blue-500 transition-all group flex flex-col justify-between h-full min-h-[340px]" 
              style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <span className="text-[12px] font-black text-blue-500 uppercase tracking-[0.2em]">{"author" in item ? "KYOBO BOOK" : "YOUTUBE"}</span>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-500">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
                  </div>
                </div>
                <h4 className="font-black mb-3 text-2xl md:text-3xl group-hover:text-blue-600 transition-colors leading-tight break-keep" style={{ color: "var(--text-main)" }}>{item.title}</h4>
                <p className="text-[13px] font-black mb-6 uppercase tracking-wide" style={{ color: "var(--text-sub)" }}>{"author" in item ? item.author : item.channel}</p>
                <p className="text-[15px] font-bold leading-relaxed opacity-80" style={{ color: "var(--text-sub)" }}>{item.desc}</p>
              </div>
              <div className="mt-10 pt-6 border-t transition-colors group-hover:border-blue-200" style={{ borderColor: "var(--border-color)" }}>
                <span className="text-[12px] font-black group-hover:text-blue-600 transition uppercase" style={{ color: "var(--text-sub)" }}>상세보기 바로가기</span>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-24 pb-12">
          <Link href="/" className="inline-block px-14 py-6 bg-slate-800 text-white rounded-full font-black text-xl hover:bg-slate-900 transition shadow-2xl hover:-translate-y-1">홈으로 돌아가기</Link>
        </div>
      </main>

      <footer className="py-12 text-center text-[10px] font-bold tracking-widest border-t uppercase" style={{ color: "var(--text-sub)", borderColor: "var(--border-color)" }}>© 2026 ECO_CHECK. ALL RIGHTS RESERVED.</footer>
    </div>
  );
}

export default function RecommendPage() {
  return <Suspense fallback={<div className="p-20 text-center font-black">페이지 로드 중...</div>}><RecommendContent /></Suspense>;
}