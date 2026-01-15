"use client";

import Link from "next/link";

// 실제 뉴스 검색으로 연결되는 데이터입니다.
const newsItems = [
  { 
    id: 1,
    category: "Economy", 
    title: "오늘의 주요 경제 지표 뉴스", 
    desc: "금리, 물가, 고용 등 시장의 방향을 결정짓는 핵심 경제 지표 소식입니다.",
    // 네이버 뉴스 '경제 지표' 검색 결과 링크 (최신순)
    link: "https://search.naver.com/search.naver?where=news&query=경제지표&sm=tab_opt&sort=1"
  },
  { 
    id: 2, 
    category: "FX", 
    title: "실시간 원/달러 환율 전망 기사", 
    desc: "환율 변동의 원인과 전문가들의 향후 전망 리포트를 모아보세요.",
    // 네이버 뉴스 '원달러 환율' 검색 결과 링크 (최신순)
    link: "https://search.naver.com/search.naver?where=news&query=%EC%9B%90%EB%8B%AC%EB%9F%AC+%ED%99%98%EC%9C%A8&sm=tab_opt&sort=1"
  },
  { 
    id: 3, 
    category: "Crypto", 
    title: "비트코인·가상자산 최신 뉴스", 
    desc: "비트코인 시황과 공포 탐욕 지수 관련 최신 분석 기사를 확인하세요.",
    // 네이버 뉴스 '비트코인' 검색 결과 링크 (최신순)
    link: "https://search.naver.com/search.naver?where=news&query=%EB%B9%84%ED%8A%B8%EC%BD%94%EC%9D%B8&sm=tab_opt&sort=1"
  },
];

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* 상단 네비게이션 */}
      <nav className="bg-white border-b border-slate-200 h-16 flex items-center px-8 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto w-full flex justify-between items-center">
          <Link href="/" className="font-black text-xl text-blue-600 tracking-tighter">ECO_CHECK</Link>
          <div className="flex gap-8">
            <Link href="/news" className="text-sm font-bold text-blue-600">뉴스</Link>
            <Link href="/stock" className="text-sm font-bold text-slate-500 hover:text-blue-600 transition">증권</Link>
            <Link href="/dictionary" className="text-sm font-bold text-slate-500 hover:text-blue-600 transition">용어사전</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-8 py-24">
        <header className="mb-16">
          <h1 className="text-5xl font-black text-slate-900 tracking-tight mb-4">Market News</h1>
          <p className="text-slate-400 text-xl font-medium italic">실시간 시장 트렌드 분석</p>
        </header>

        <div className="space-y-6">
          {newsItems.map((item) => (
            <a 
              key={item.id} 
              href={item.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all group"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                  {item.category}
                </span>
                <span className="text-blue-500 text-xs font-bold group-hover:underline">실시간 뉴스 보기 →</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition tracking-tight">
                {item.title}
              </h2>
              <p className="text-slate-500 leading-relaxed font-light">{item.desc}</p>
            </a>
          ))}
        </div>

        {/* 하단 버튼 */}
        <div className="mt-20 text-center">
          <Link href="/" className="inline-block px-10 py-4 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition shadow-lg">
            홈으로 돌아가기
          </Link>
        </div>
        
        <footer className="mt-24 text-center text-slate-300 text-xs">
          클릭 시 외부 뉴스 페이지(네이버)로 연결되어 최신 정보를 확인하실 수 있습니다.
        </footer>
      </main>
    </div>
  );
}