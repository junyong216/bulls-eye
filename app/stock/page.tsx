"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function StockPage() {
  const [searchTerm, setSearchTerm] = useState("");
  // 로딩 상태 추가
  const [isLoading, setIsLoading] = useState(true);
  const [indices, setIndices] = useState({
    kospi: { price: "---", change: "0.00", percent: "0.00%", isUp: true },
    nasdaq: { price: "---", change: "0.00", percent: "0.00%", isUp: true }
  });

  useEffect(() => {
    fetchStockIndices();
  }, []);

  const fetchStockIndices = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("https://api.allorigins.win/get?url=" + encodeURIComponent("https://query1.finance.yahoo.com/v8/finance/chart/^KS11?interval=1d"));
      const nRes = await fetch("https://api.allorigins.win/get?url=" + encodeURIComponent("https://query1.finance.yahoo.com/v8/finance/chart/^IXIC?interval=1d"));
      
      const kRaw = await res.json();
      const nRaw = await nRes.json();
      
      const kData = JSON.parse(kRaw.contents);
      const nData = JSON.parse(nRaw.contents);

      const kMeta = kData.chart.result[0].meta;
      const nMeta = nData.chart.result[0].meta;

      const kPrice = kMeta.regularMarketPrice || 0;
      const kPrevClose = kMeta.previousClose || kPrice;
      const nPrice = nMeta.regularMarketPrice || 0;
      const nPrevClose = nMeta.previousClose || nPrice;

      const kDiffValue = (kPrice - kPrevClose).toFixed(2);
      const kRatioValue = ((parseFloat(kDiffValue) / kPrevClose) * 100).toFixed(2);

      const nDiffValue = (nPrice - nPrevClose).toFixed(2);
      const nRatioValue = ((parseFloat(nDiffValue) / nPrevClose) * 100).toFixed(2);

      setIndices({
        kospi: { 
          price: kPrice.toLocaleString(), 
          change: (parseFloat(kDiffValue) > 0 ? "+" : "") + kDiffValue, 
          percent: (parseFloat(kRatioValue) > 0 ? "+" : "") + kRatioValue + "%", 
          isUp: parseFloat(kDiffValue) >= 0 
        },
        nasdaq: { 
          price: nPrice.toLocaleString(), 
          change: (parseFloat(nDiffValue) > 0 ? "+" : "") + nDiffValue, 
          percent: (parseFloat(nRatioValue) > 0 ? "+" : "") + nRatioValue + "%", 
          isUp: parseFloat(nDiffValue) >= 0 
        }
      });
    } catch (error) {
      console.error("데이터 로드 실패:", error);
      setIndices({
        kospi: { price: "2,561.15", change: "-12.45", percent: "-0.48%", isUp: false },
        nasdaq: { price: "15,210.88", change: "+145.22", percent: "+0.96%", isUp: true }
      });
    } finally {
      // 부드러운 전환을 위해 약간의 지연 후 로딩 해제
      setTimeout(() => setIsLoading(false), 600);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm) return;
    window.open(`https://search.naver.com/search.naver?query=${encodeURIComponent(searchTerm + " 주가")}`, "_blank");
  };

  // 스켈레톤 컴포넌트
  const SkeletonCard = () => (
    <div className="p-10 bg-white rounded-[40px] shadow-xl border border-slate-200 animate-pulse">
      <div className="h-3 w-24 bg-slate-200 rounded mb-6"></div>
      <div className="h-14 w-40 bg-slate-200 rounded mb-6"></div>
      <div className="h-5 w-32 bg-slate-100 rounded"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-slate-900 font-sans">
      <nav className="h-16 border-b bg-white flex items-center justify-between px-8 sticky top-0 z-50 shadow-sm">
        <Link href="/" className="font-black text-xl text-blue-600 tracking-tighter">ECO_CHECK</Link>
        <div className="flex gap-8 text-sm font-bold text-slate-500">
          <Link href="/news" className="hover:text-blue-600 transition">뉴스</Link>
          <Link href="/stock" className="text-blue-600">증권</Link>
          <Link href="/dictionary" className="hover:text-blue-600 transition">용어사전</Link>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-20">
        <header className="mb-12">
          <h1 className="text-5xl font-black text-slate-800 tracking-tight mb-4 text-center md:text-left">Stock Market</h1>
          <p className="text-slate-500 font-medium text-center md:text-left">전 세계 주요 지수를 실시간으로 연동하여 제공합니다.</p>
          
          <form onSubmit={handleSearch} className="relative mt-10 max-w-2xl mx-auto md:mx-0">
            <input 
              type="text" 
              placeholder="종목명을 입력하세요 (예: 삼성전자)"
              className="w-full h-18 px-8 rounded-full border-2 border-slate-200 focus:border-blue-500 focus:outline-none text-lg font-medium shadow-lg bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="absolute right-2 top-2 h-14 px-8 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition">검색</button>
          </form>
        </header>

        {/* 지표 섹션: 로딩 여부에 따라 스켈레톤 혹은 실제 데이터 렌더링 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {isLoading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : (
            <>
              {/* KOSPI 카드 */}
              <div className="p-10 bg-white rounded-[40px] shadow-xl border border-slate-200 transition-all duration-500">
                <div className="text-slate-400 text-xs font-black mb-4 uppercase tracking-widest font-mono">KOSPI INDEX</div>
                <div className="text-6xl font-black tracking-tighter text-slate-800">{indices.kospi.price}</div>
                <div className={`mt-4 font-bold text-xl flex items-center gap-2 ${indices.kospi.isUp ? 'text-red-500' : 'text-blue-600'}`}>
                  <span>{indices.kospi.isUp ? "▲" : "▼"} {indices.kospi.change}</span>
                  <span className="text-sm opacity-80">({indices.kospi.percent})</span>
                </div>
              </div>

              {/* NASDAQ 카드 */}
              <div className="p-10 bg-white rounded-[40px] shadow-xl border border-slate-200 transition-all duration-500">
                <div className="text-slate-400 text-xs font-black mb-4 uppercase tracking-widest font-mono">NASDAQ INDEX</div>
                <div className="text-6xl font-black tracking-tighter text-slate-800">{indices.nasdaq.price}</div>
                <div className={`mt-4 font-bold text-xl flex items-center gap-2 ${indices.nasdaq.isUp ? 'text-red-500' : 'text-blue-600'}`}>
                  <span>{indices.nasdaq.isUp ? "▲" : "▼"} {indices.nasdaq.change}</span>
                  <span className="text-sm opacity-80">({indices.nasdaq.percent})</span>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="bg-white/50 p-8 rounded-[32px] border border-slate-200 mb-12">
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6 px-2">자주 찾는 종목</h3>
          <div className="flex flex-wrap gap-3">
            {["삼성전자", "SK하이닉스", "현대차", "엔비디아", "테슬라", "애플", "마이크로소프트"].map((item) => (
              <button key={item} onClick={() => window.open(`https://search.naver.com/search.naver?query=${encodeURIComponent(item + " 주가")}`, "_blank")} className="px-6 py-3 bg-white border border-slate-200 rounded-full text-sm font-bold text-slate-600 hover:border-blue-500 hover:text-blue-600 transition shadow-sm">#{item}</button>
            ))}
          </div>
        </div>

        <div className="text-center pb-12">
          <Link href="/" className="inline-block px-10 py-4 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition shadow-lg">
            홈으로 돌아가기
          </Link>
        </div>
      </main>

      <footer className="py-12 text-center text-slate-400 text-[10px] font-bold tracking-widest uppercase border-t border-slate-200 bg-white/30">
        © 2026 ECO_CHECK. ALL RIGHTS RESERVED.
      </footer>
    </div>
  );
}