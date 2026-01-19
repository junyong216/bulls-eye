"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import DarkModeToggle from "@/components/DarkModeToggle";
import AdSense from "@/components/AdSense"; 

// --- 네비게이션용 공통 데이터 ---
const newsCategories = [
  { id: "market", name: "시장지표", query: "시장지표" },
  { id: "interest", name: "금리이슈", query: "금리전망" },
  { id: "stock", name: "주식뉴스", query: "주식시황" },
  { id: "crypto", name: "가상자산", query: "비트코인" },
  { id: "realestate", name: "부동산", query: "부동산전망" },
  { id: "global", name: "해외경제", query: "글로벌경제" },
];

const dictionaryCategories = ["전체", "주식기초", "재무제표", "거시경제", "투자전략"];

const recommendTabs = [
  { name: "추천 도서", slug: "books" },
  { name: "추천 영상", slug: "videos" }
];

function DictionaryContent() {
  const searchParams = useSearchParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("전체");

  const terms = [
    { category: "주식기초", word: "예수금", desc: "주식 거래를 위해 계좌에 넣어둔 현금입니다. 주식을 사기 전 대기 중인 돈이라고 보면 됩니다." },
    { category: "주식기초", word: "배당금", desc: "회사가 이익을 내서 주주들에게 그 결실을 나눠주는 현금 보너스입니다." },
    { category: "주식기초", word: "시가총액", desc: "주가에 총 발행 주식 수를 곱한 금액으로, 그 회사의 실제 시장 가치를 말합니다." },
    { category: "주식기초", word: "호가", desc: "주식을 팔거나 사고 싶은 가격을 시장에 미리 부르는 것을 말합니다." },
    { category: "재무제표", word: "PER", desc: "주가수익비율. 기업이 버는 돈에 비해 주가가 얼마나 높게 평가되었는지 보여주는 지표입니다." },
    { category: "재무제표", word: "ROE", desc: "자기자본이익률. 기업이 주주의 돈을 활용해 얼마나 효율적으로 이익을 냈는지 보여줍니다." },
    { category: "재무제표", word: "PBR", desc: "주가순자산비율. 주가가 기업이 가진 자산 가치에 비해 몇 배로 거래되는지 나타냅니다." },
    { category: "재무제표", word: "영업이익", desc: "기업이 순수하게 장사를 해서 남긴 이익입니다. 매출에서 모든 비용을 뺀 핵심 성적표입니다." },
    { category: "거시경제", word: "금리", desc: "돈의 가격입니다. 금리가 오르면 시장에 도는 돈이 줄어들어 보통 주가에는 악영향을 줍니다." },
    { category: "거시경제", word: "인플레이션", desc: "물가가 지속적으로 오르는 현상입니다. 내 돈의 구매력이 예전보다 낮아짐을 의미합니다." },
    { category: "거시경제", word: "환율", desc: "우리나라 돈과 다른 나라 돈의 교환 비율입니다. 수출입 기업의 이익에 직접적인 영향을 줍니다." },
    { category: "거시경제", word: "GDP", desc: "국내총생산. 일정 기간 동안 한 나라 안에서 만들어진 모든 서비스와 재화의 합계입니다." },
    { category: "투자전략", word: "분할매수", desc: "리스크를 줄이기 위해 주식을 한 번에 다 사지 않고, 여러 번에 나누어 담는 전략입니다." },
    { category: "투자전략", word: "포트폴리오", desc: "분산 투자를 위해 내 자산을 여러 종목이나 자산군(주식, 채권 등)에 나누어 담은 리스트입니다." },
    { category: "투자전략", word: "손절매", desc: "더 큰 손해를 막기 위해 내가 산 가격보다 낮은 가격이라도 과감히 주식을 파는 것입니다." },
    { category: "투자전략", word: "익절", desc: "수익이 난 상태에서 주식을 팔아 실제로 내 주머니에 이익을 확정 짓는 행위입니다." }
  ];

  useEffect(() => {
    const cat = searchParams.get("cat");
    if (cat && dictionaryCategories.includes(cat)) {
      setActiveCategory(cat);
    }
  }, [searchParams]);

  const filteredTerms = terms.filter(item => {
    const matchesSearch = item.word.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.desc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "전체" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen font-sans overflow-x-hidden transition-colors duration-300" style={{ backgroundColor: "var(--bg-color)", color: "var(--text-main)" }}>
      
      {/* --- 상단 네비게이션 --- */}
      <nav className="h-16 border-b flex items-center justify-between px-4 md:px-8 sticky top-0 z-[100] shadow-sm transition-colors" 
           style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>
        
        <div className="flex items-center gap-4">
          <Link href="/" className="font-black text-xl md:text-2xl text-red-600 tracking-tighter italic">BULL'S EYE</Link>
          <DarkModeToggle />
        </div>

        <div className="flex items-center h-full gap-4 md:gap-8">
          <div className="hidden lg:flex gap-6 text-base font-black h-full">
            <div className="relative group flex items-center h-full px-1">
              <Link href="/news" className="group-hover:text-red-600 transition flex items-center gap-1" style={{ color: "var(--text-main)" }}>뉴스 <span className="text-[10px] opacity-40 group-hover:rotate-180 transition-transform">▼</span></Link>
              <div className="absolute top-full left-1/2 -translate-x-1/2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all pt-2 z-[110]">
                <div className="w-44 rounded-2xl border shadow-2xl p-2 bg-white dark:bg-slate-900" style={{ borderColor: "var(--border-color)" }}>
                  {newsCategories.map((cat) => (
                    <a key={cat.id} href={`https://search.naver.com/search.naver?where=news&query=${encodeURIComponent(cat.query)}&sort=1`} target="_blank" rel="noopener noreferrer" className="block px-4 py-2.5 rounded-xl text-[13px] hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 transition" style={{ color: "var(--text-main)" }}>{cat.name}</a>
                  ))}
                </div>
              </div>
            </div>
            <div className="relative group flex items-center h-full px-1">
              <Link href="/stock" className="group-hover:text-red-600 transition flex items-center gap-1" style={{ color: "var(--text-main)" }}>증권 <span className="text-[10px] opacity-40 group-hover:rotate-180 transition-transform">▼</span></Link>
              <div className="absolute top-full left-1/2 -translate-x-1/2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all pt-2 z-[110]">
                <div className="w-40 rounded-2xl border shadow-2xl p-2 bg-white dark:bg-slate-900" style={{ borderColor: "var(--border-color)" }}>
                  <Link href="/stock?tab=list" className="block px-4 py-2.5 rounded-xl text-[13px] hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 transition" style={{ color: "var(--text-main)" }}>증권사 목록</Link>
                  <Link href="/stock?tab=guide" className="block px-4 py-2.5 rounded-xl text-[13px] hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 transition" style={{ color: "var(--text-main)" }}>계좌 가이드</Link>
                </div>
              </div>
            </div>
            <div className="relative group flex items-center h-full px-1">
              <Link href="/dictionary" className="text-red-600 flex items-center gap-1">용어사전 <span className="text-[10px] opacity-40 group-hover:rotate-180 transition-transform">▼</span></Link>
              <div className="absolute top-full left-1/2 -translate-x-1/2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all pt-2 z-[110]">
                <div className="w-40 rounded-2xl border shadow-2xl p-2 bg-white dark:bg-slate-900" style={{ borderColor: "var(--border-color)" }}>
                  {dictionaryCategories.map((cat) => (
                    <Link key={cat} href={`/dictionary?cat=${cat}`} className="block px-4 py-2.5 rounded-xl text-[13px] hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 transition" style={{ color: "var(--text-main)" }}>{cat}</Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="relative group flex items-center h-full px-1">
              <Link href="/recommend" className="group-hover:text-red-600 transition flex items-center gap-1" style={{ color: "var(--text-main)" }}>추천 <span className="text-[10px] opacity-40 group-hover:rotate-180 transition-transform">▼</span></Link>
              <div className="absolute top-full left-1/2 -translate-x-1/2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all pt-2 z-[110]">
                <div className="w-40 rounded-2xl border shadow-2xl p-2 bg-white dark:bg-slate-900" style={{ borderColor: "var(--border-color)" }}>
                  {recommendTabs.map((tab) => (
                    <Link key={tab.slug} href={`/recommend?tab=${tab.slug}`} className="block px-4 py-2.5 rounded-xl text-[13px] hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 transition" style={{ color: "var(--text-main)" }}>{tab.name}</Link>
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

        {/* 햄버거 메뉴 레이어 */}
        <div className={`absolute left-0 w-full transition-all duration-500 ease-in-out overflow-hidden shadow-2xl z-[90] ${isMenuOpen ? 'max-h-[100vh] border-b opacity-100' : 'max-h-0 opacity-0'}`}
             style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)", top: '64px' }}>
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 p-10">
            <div>
              <div className="text-red-600 font-black text-xs mb-4 uppercase tracking-widest">뉴스</div>
              <div className="flex flex-col gap-3">
                {newsCategories.map((cat) => (
                  <a key={cat.id} href={`https://search.naver.com/search.naver?where=news&query=${encodeURIComponent(cat.query)}`} target="_blank" className="text-[14px] font-bold" style={{ color: "var(--text-main)" }}>{cat.name}</a>
                ))}
              </div>
            </div>
            <div>
              <div className="text-red-600 font-black text-xs mb-4 uppercase tracking-widest">증권</div>
              <div className="flex flex-col gap-3">
                <Link href="/stock?tab=list" onClick={() => setIsMenuOpen(false)} className="text-[14px] font-bold" style={{ color: "var(--text-main)" }}>증권사 목록</Link>
                <Link href="/stock?tab=guide" onClick={() => setIsMenuOpen(false)} className="text-[14px] font-bold" style={{ color: "var(--text-main)" }}>계좌 가이드</Link>
              </div>
            </div>
            <div>
              <div className="text-red-600 font-black text-xs mb-4 uppercase tracking-widest">용어사전</div>
              <div className="flex flex-col gap-3">
                {dictionaryCategories.map((cat) => (
                  <Link key={cat} href={`/dictionary?cat=${cat}`} onClick={() => setIsMenuOpen(false)} className="text-[14px] font-bold" style={{ color: "var(--text-main)" }}>{cat}</Link>
                ))}
              </div>
            </div>
            <div>
              <div className="text-red-600 font-black text-xs mb-4 uppercase tracking-widest">추천</div>
              <div className="flex flex-col gap-3">
                {recommendTabs.map((tab) => (
                  <Link key={tab.slug} href={`/recommend?tab=${tab.slug}`} onClick={() => setIsMenuOpen(false)} className="text-[14px] font-bold" style={{ color: "var(--text-main)" }}>{tab.name}</Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-5 py-12">
        <header className="mb-10 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-black mb-10 tracking-tight italic">Bull's Dictionary</h1>
          <input 
            type="text" 
            placeholder="투자 용어를 검색하세요 (예: PER, 금리)" 
            className="w-full max-w-2xl h-16 px-8 rounded-full border-2 focus:border-red-500 focus:outline-none shadow-lg mb-10 transition-all" 
            style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)", color: "var(--text-main)" }} 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />

          {/* 📢 상단 검색바 아래 광고 */}
          <div className="mb-10">
            <AdSense slot="1122334455" format="fluid" />
          </div>

          <div className="flex flex-wrap gap-2">
            {dictionaryCategories.map((cat) => (
              <button 
                key={cat} 
                onClick={() => setActiveCategory(cat)} 
                className={`px-6 py-2 rounded-full font-black text-sm transition-all ${activeCategory === cat ? "bg-red-600 text-white shadow-md scale-105" : "border opacity-70 hover:opacity-100"}`} 
                style={{ backgroundColor: activeCategory === cat ? "" : "var(--card-bg)", color: activeCategory === cat ? "#fff" : "var(--text-sub)", borderColor: "var(--border-color)" }}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        {/* 용어 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {filteredTerms.map((item, i) => (
            <div key={i} className="p-7 rounded-[28px] border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group" style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>
              <span className="text-[12px] font-black text-red-600 mb-3 block uppercase tracking-widest">{item.category}</span>
              <h4 className="font-black mb-3 text-xl group-hover:text-red-600 transition-colors">{item.word}</h4>
              <p className="text-[13px] font-bold opacity-70 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* 📢 리스트 하단 광고 */}
        <div className="mt-16">
          <AdSense slot="5544332211" />
        </div>

        {filteredTerms.length === 0 && (
          <div className="text-center py-20 opacity-50 font-bold">검색 결과가 없습니다.</div>
        )}

        <div className="text-center py-20">
          <Link href="/" className="inline-block px-12 py-5 bg-red-600 text-white rounded-full font-black text-lg hover:bg-red-700 transition shadow-xl">홈으로 돌아가기</Link>
        </div>
      </main>

      <footer className="py-12 text-center text-[10px] font-bold tracking-widest border-t uppercase" style={{ color: "var(--text-sub)", borderColor: "var(--border-color)" }}>
        © 2026 BULL'S EYE. ALL RIGHTS RESERVED.
      </footer>
    </div>
  );
}

export default function DictionaryPage() {
  return (
    <Suspense fallback={<div className="p-20 text-center font-black animate-pulse text-red-600">데이터 로딩 중...</div>}>
      <DictionaryContent />
    </Suspense>
  );
}