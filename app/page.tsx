"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  // 로딩 상태 관리
  const [isLoading, setIsLoading] = useState(true);
  
  const [exchangeRate, setExchangeRate] = useState({ rate: "---", change: "0.0" });
  const [fearGreed, setFearGreed] = useState({ value: 0, label: "" });

  useEffect(() => {
    fetchMarketData();
  }, []);

  const fetchMarketData = async () => {
    setIsLoading(true); // 로딩 시작
    try {
      const exResponse = await fetch("https://open.er-api.com/v6/latest/USD");
      const exData = await exResponse.json();
      const krwRate = exData.rates.KRW.toFixed(1);
      setExchangeRate({ rate: krwRate, change: "+2.5" });

      const fgResponse = await fetch("https://api.alternative.me/fng/");
      const fgData = await fgResponse.json();
      const value = parseInt(fgData.data[0].value);
      
      let label = "중립";
      if (value <= 25) label = "극단적 공포";
      else if (value <= 45) label = "공포";
      else if (value <= 55) label = "중립";
      else if (value <= 75) label = "탐욕";
      else label = "극단적 탐욕";

      setFearGreed({ value: value, label: label });
    } catch (error) {
      console.error("데이터 로드 실패:", error);
    } finally {
      // 데이터 로드 완료 후 0.5초 정도 부드럽게 전환되도록 설정
      setTimeout(() => setIsLoading(false), 500);
    }
  };

  const executeSearch = (keyword: string) => {
    const searchUrl = `https://search.naver.com/search.naver?query=${encodeURIComponent(keyword + " 주가")}`;
    window.open(searchUrl, "_blank");
  };

  // 스켈레톤 컴포넌트
  const SkeletonCard = () => (
    <div className="p-12 bg-white rounded-[40px] border border-slate-200 shadow-lg flex flex-col justify-center min-h-[250px] animate-pulse">
      <div className="h-3 w-24 bg-slate-200 rounded mb-6"></div>
      <div className="h-16 w-48 bg-slate-200 rounded mb-4"></div>
      <div className="h-4 w-32 bg-slate-100 rounded"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-slate-900 font-sans">
      <nav className="h-16 border-b bg-white flex items-center justify-between px-8 sticky top-0 z-50 shadow-sm">
        <Link href="/" className="font-black text-xl text-blue-600 tracking-tighter">ECO_CHECK</Link>
        <div className="flex gap-8 text-sm font-bold text-slate-500">
          <Link href="/news" className="hover:text-blue-600 transition">뉴스</Link>
          <Link href="/stock" className="hover:text-blue-600 transition">증권</Link>
          <Link href="/dictionary" className="hover:text-blue-600 transition">용어사전</Link>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-20">
        {/* 검색 섹션 */}
        <section className="text-center mb-24">
          <h2 className="text-5xl md:text-6xl font-black mb-10 tracking-tighter leading-tight text-slate-800">
            성공적인 투자를 위한<br/>
            <span className="text-blue-600">스마트한 경제 지표.</span>
          </h2>
          
          <div className="max-w-2xl mx-auto">
            <form onSubmit={(e) => { e.preventDefault(); executeSearch(searchTerm); }} className="relative mb-6">
              <input 
                type="text" 
                placeholder="종목명을 검색하세요 (예: 삼성전자)"
                className="w-full h-20 px-10 rounded-full border-2 border-slate-200 focus:border-blue-500 focus:outline-none text-xl font-medium shadow-xl bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="absolute right-4 top-4 h-12 px-8 bg-blue-600 text-white rounded-full font-bold">검색</button>
            </form>
            <div className="flex flex-wrap justify-center gap-2 px-4">
              <span className="text-slate-400 text-xs font-bold mr-2 self-center uppercase tracking-widest">Trending</span>
              {["삼성전자", "엔비디아", "테슬라", "애플", "비트코인"].map((item) => (
                <button key={item} onClick={() => executeSearch(item)} className="px-4 py-1.5 bg-white border border-slate-200 rounded-full text-[13px] font-bold text-slate-500 hover:text-blue-600 transition-all">{item}</button>
              ))}
            </div>
          </div>
        </section>

        {/* 지표 섹션: 로딩 중에는 스켈레톤, 완료되면 실제 데이터 표시 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {isLoading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : (
            <>
              {/* 환율 카드 */}
              <div className="p-12 bg-white rounded-[40px] border border-slate-200 shadow-lg flex flex-col justify-center min-h-[250px] transition-all duration-500">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-6 font-mono">USD / KRW (실시간)</h3>
                <div className="flex items-baseline gap-3">
                  <span className="text-7xl font-black text-blue-600 tracking-tighter">{exchangeRate.rate}</span>
                  <span className="text-slate-800 font-bold text-3xl">원</span>
                </div>
                <div className="flex items-center gap-2 mt-4 text-red-500 font-bold text-lg">전일대비 변동중</div>
              </div>

              {/* 공포탐욕 카드 */}
              <div className="p-12 bg-white rounded-[40px] border border-slate-200 shadow-lg flex flex-col justify-center min-h-[250px] transition-all duration-500">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-6 font-mono">FEAR & GREED (실시간)</h3>
                <div className="flex items-baseline gap-4">
                  <span className="text-7xl font-black text-slate-800 tracking-tighter">{fearGreed.value}</span>
                  <span className="text-orange-500 font-black text-3xl italic">{fearGreed.label}</span>
                </div>
                <div className="h-4 w-full bg-slate-100 rounded-full mt-8 overflow-hidden">
                  <div className="h-full bg-orange-500" style={{ width: `${fearGreed.value}%` }}></div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* 격언 섹션 (디자인 유지) */}
        <section className="py-24 border-t border-slate-300 text-center relative overflow-hidden">
          <div className="text-[120px] font-serif text-black absolute top-0 left-1/2 -translate-x-1/2 select-none">“</div>
          <div className="relative z-10">
            <p className="text-2xl md:text-3xl font-serif italic text-black mb-10 px-4 leading-snug font-bold">
              투자의 제1원칙은 결코 돈을 잃지 않는 것이다.<br/>
              제2원칙은 제1원칙을 잊지 않는 것이다.
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="h-[1px] w-12 bg-black opacity-30"></div>
              <span className="font-black text-black uppercase tracking-widest text-xs">워런 버핏 (Warren Buffett)</span>
              <div className="h-[1px] w-12 bg-black opacity-30"></div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-16 bg-slate-200/50 border-t border-slate-300 mt-20">
        <div className="max-w-6xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-slate-500 text-[10px] font-bold tracking-[0.2em] uppercase">© 2026 ECO_CHECK. ALL RIGHTS RESERVED.</div>
            <div className="flex gap-10">
              <Link href="/privacy" className="text-slate-500 text-[11px] font-bold hover:text-black uppercase tracking-widest transition">개인정보처리방침</Link>
              <Link href="/terms" className="text-slate-500 text-[11px] font-bold hover:text-black uppercase tracking-widest transition">이용약관</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}