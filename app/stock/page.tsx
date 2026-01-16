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

function StockContent() {
  const searchParams = useSearchParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [myList, setMyList] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("brokers");
  const [lastUpdated, setLastUpdated] = useState<string>("");

  const [indices, setIndices] = useState({
    kospi: { price: "---", change: "0.00", percent: "0.00%", isUp: true },
    nasdaq: { price: "---", change: "0.00", percent: "0.00%", isUp: true }
  });

  // 지수 페칭 함수 (1분마다 반복 호출됨)
  const fetchStockIndices = async () => {
    try {
      const res = await fetch("https://api.allorigins.win/get?url=" + encodeURIComponent("https://query1.finance.yahoo.com/v8/finance/chart/^KS11?interval=1d&range=1d"));
      const nRes = await fetch("https://api.allorigins.win/get?url=" + encodeURIComponent("https://query1.finance.yahoo.com/v8/finance/chart/^IXIC?interval=1d&range=1d"));
      const kRaw = await res.json();
      const nRaw = await nRes.json();
      const kData = JSON.parse(kRaw.contents);
      const nData = JSON.parse(nRaw.contents);

      if (kData.chart?.result && nData.chart?.result) {
        const kMeta = kData.chart.result[0].meta;
        const nMeta = nData.chart.result[0].meta;
        const kPrice = kMeta.regularMarketPrice || 0;
        const kPrev = kMeta.previousClose || kMeta.chartPreviousClose || kPrice;
        const kDiff = kPrice - kPrev;
        const kPercent = kPrev !== 0 ? (kDiff / kPrev) * 100 : 0;
        const nPrice = nMeta.regularMarketPrice || 0;
        const nPrev = nMeta.previousClose || nMeta.chartPreviousClose || nPrice;
        const nDiff = nPrice - nPrev;
        const nPercent = nPrev !== 0 ? (nDiff / nPrev) * 100 : 0;

        setIndices({
          kospi: { price: kPrice === 0 ? "---" : kPrice.toLocaleString(undefined, { minimumFractionDigits: 2 }), change: (kDiff > 0 ? "+" : "") + kDiff.toFixed(2), percent: (kDiff > 0 ? "+" : "") + kPercent.toFixed(2) + "%", isUp: kDiff >= 0 },
          nasdaq: { price: nPrice === 0 ? "---" : nPrice.toLocaleString(undefined, { minimumFractionDigits: 2 }), change: (nDiff > 0 ? "+" : "") + nDiff.toFixed(2), percent: (nDiff > 0 ? "+" : "") + nPercent.toFixed(2) + "%", isUp: nDiff >= 0 }
        });

        const now = new Date();
        setLastUpdated(`${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`);
      }
    } catch (e) { 
      console.error(e); 
    } finally { 
      setIsLoading(false); 
    }
  };

  useEffect(() => {
    const savedList = localStorage.getItem("ecoCheck_myList");
    if (savedList) setMyList(JSON.parse(savedList));
    
    // 최초 실행
    fetchStockIndices();

    // 1분(60,000ms)마다 자동 갱신
    const intervalId = setInterval(fetchStockIndices, 60000);

    const tab = searchParams.get("tab");
    if (tab === "guide") setActiveTab("accounts");
    else if (tab === "list") setActiveTab("brokers");

    // 컴포넌트 언마운트 시 타이머 종료
    return () => clearInterval(intervalId);
  }, [searchParams]);

  const brokers = [
    { name: "미래에셋증권", link: "https://securities.miraeasset.com/", desc: "국내 최대 자기자본 보유" },
    { name: "한국투자증권", link: "https://www.truefriend.com/", desc: "국내외 투자금융 강자" },
    { name: "NH투자증권", link: "https://www.nhqv.com/", desc: "나무증권 등 편리한 플랫폼" },
    { name: "KB증권", link: "https://www.kbsec.com/", desc: "금융그룹 연계 서비스 강점" },
    { name: "메리츠증권", link: "https://www.meritzsec.com/", desc: "높은 수익률 및 기업금융 특화" },
    { name: "삼성증권", link: "https://www.samsungpop.com/", desc: "신뢰도 높은 자산관리 브랜드" },
    { name: "하나증권", link: "https://www.hanaw.com/", desc: "종합 자산관리 전문성" },
    { name: "키움증권", link: "https://www.kiwoom.com/", desc: "개인 투자자 점유율 독보적 1위" },
    { name: "신한투자증권", link: "https://www.shinhansec.com/", desc: "신한금융그룹 통합 서비스" },
    { name: "대신증권", link: "https://www.daishin.com/", desc: "전통의 명문, 크레온 플랫폼" },
    { name: "교보증권", link: "https://www.iprovest.com/", desc: "국내 1호 증권사, 안정적 운영" },
    { name: "유안타증권", link: "https://www.myasset.com/", desc: "티레이더 등 특화 시스템" },
    { name: "한화투자증권", link: "https://www.hanwhawm.com/", desc: "STEPS 등 친절한 투자 앱" },
    { name: "현대차증권", link: "https://www.hmsec.com/", desc: "현대차그룹 연계 퇴직연금 강점" },
    { name: "아이엠증권", link: "https://www.imstock.com/", desc: "DGB금융그룹 계열 증권사" },
    { name: "IBK투자증권", link: "https://www.ibks.com/", desc: "중소기업 지원 및 정책금융 특화" },
    { name: "신영증권", link: "https://www.shinyoung.com/", desc: "가치투자 및 자산승계 전문" },
    { name: "LS증권", link: "https://www.ls-sec.co.kr/", desc: "이베스트투자증권의 새 이름" },
    { name: "BNK투자증권", link: "https://www.bnkfn.co.kr/", desc: "동남권 최대 금융그룹 계열" },
    { name: "유진투자증권", link: "https://www.eugenefn.com/", desc: "강소 증권사로서의 맞춤형 서비스" }
  ];

  const accounts = [
    { type: "CMA", name: "종합자산관리계좌", desc: "하루만 맡겨도 이자가 붙어 비상금 보관에 최적화된 수시 입출금 계좌입니다." },
    { type: "ISA", name: "개인종합관리계좌", desc: "한 계좌에서 주식, 펀드 등을 운용하며 '절세 혜택'을 누리는 만능 재테크 통장입니다." },
    { type: "IRP", name: "개인형 퇴직연금", desc: "소득이 있는 사람이라면 필수! 노후 준비와 연말정산 세액공제 혜택을 받습니다." },
    { type: "연금저축", name: "연금저축펀드", desc: "IRP보다 운용이 자유롭고, 세액공제를 받으며 ETF 등에 장기 투자하기 좋습니다." },
    { type: "외화계좌", name: "외화/해외주식계좌", desc: "미국 주식 등 해외 투자를 위해 달러를 보유하고 거래를 할 수 있는 계좌입니다." },
    { type: "위탁계좌", name: "일반 주식계좌", desc: "제한 없이 자유롭게 국내외 주식을 매매할 수 있는 가장 기본적인 투자 계좌입니다." }
  ];

  const addToMyList = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    if (myList.includes(searchTerm.trim())) {
      alert("이미 리스트에 있는 종목입니다.");
      return;
    }
    const newList = [searchTerm.trim(), ...myList];
    setMyList(newList);
    localStorage.setItem("ecoCheck_myList", JSON.stringify(newList));
    setSearchTerm("");
  };

  const removeFromList = (term: string) => {
    const newList = myList.filter((item) => item !== term);
    setMyList(newList);
    localStorage.setItem("ecoCheck_myList", JSON.stringify(newList));
  };

  const handleSearch = (term: string) => {
    window.open(`https://search.naver.com/search.naver?query=${encodeURIComponent(term + " 주가")}`, "_blank");
  };

  return (
    <div className="min-h-screen font-sans overflow-x-hidden transition-colors duration-300" style={{ backgroundColor: "var(--bg-color)", color: "var(--text-main)" }}>
      
      <nav className="h-16 border-b flex items-center justify-between px-4 md:px-8 sticky top-0 z-[100] shadow-sm transition-colors" 
           style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>
        
        <div className="flex items-center gap-4">
          <Link href="/" className="font-black text-xl md:text-2xl text-blue-600 tracking-tighter">ECO_CHECK</Link>
          <DarkModeToggle />
        </div>

        <div className="flex items-center h-full gap-4 md:gap-8">
          <div className="hidden lg:flex gap-6 text-base font-black h-full">
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
              <Link href="/stock" className="text-blue-600 flex items-center gap-1">증권 <span className="text-[10px] opacity-40 group-hover:rotate-180 transition-transform">▼</span></Link>
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
              <Link href="/recommend" className="group-hover:text-blue-600 transition flex items-center gap-1" style={{ color: "var(--text-main)" }}>추천 <span className="text-[10px] opacity-40 group-hover:rotate-180 transition-transform">▼</span></Link>
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
                  <a key={cat.id} href={`https://search.naver.com/search.naver?where=news&query=${encodeURIComponent(cat.query)}`} target="_blank" className="text-[14px] font-bold" style={{ color: "var(--text-main)" }}>{cat.name}</a>
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

      <main className="max-w-5xl mx-auto px-5 py-12">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-8">Stock Market</h1>
          <form onSubmit={addToMyList} className="relative max-w-2xl">
            <input type="text" placeholder="관심 종목 추가 (예: 삼성전자)" className="w-full h-16 px-6 rounded-full border-2 focus:border-blue-500 shadow-xl" style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)", color: "var(--text-main)" }} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <button type="submit" className="absolute right-2 top-2 h-12 px-6 bg-blue-600 text-white rounded-full font-black">추가</button>
          </form>
          {myList.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {myList.map((term, i) => (
                <div key={i} className="flex items-center border rounded-full pl-5 pr-2 py-2 shadow-sm hover:border-blue-400" style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>
                  <span onClick={() => handleSearch(term)} className="font-bold mr-2 cursor-pointer" style={{ color: "var(--text-main)" }}>{term}</span>
                  <button onClick={() => removeFromList(term)} className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-700 text-xs font-black">✕</button>
                </div>
              ))}
            </div>
          )}
        </header>

        {/* 지수 영역 상단에 업데이트 시간 표시 */}
        <div className="flex justify-between items-end mb-4 px-2">
          <h2 className="text-sm font-black opacity-50 uppercase tracking-widest">Market Indices</h2>
          {lastUpdated && (
            <span className="text-[10px] font-bold opacity-40">Last Updated: {lastUpdated} (Auto-refresh every 1m)</span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="p-8 rounded-[40px] shadow-xl border" style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>
            <div className="text-[10px] font-black mb-4 tracking-widest uppercase">KOSPI</div>
            <div className="text-4xl font-black">{indices.kospi.price}</div>
            <div className={`mt-2 font-bold ${indices.kospi.isUp ? 'text-red-500' : 'text-blue-600'}`}>{indices.kospi.change} ({indices.kospi.percent})</div>
          </div>
          <div className="p-8 rounded-[40px] shadow-xl border" style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>
            <div className="text-[10px] font-black mb-4 tracking-widest uppercase">NASDAQ</div>
            <div className="text-4xl font-black">{indices.nasdaq.price}</div>
            <div className={`mt-2 font-bold ${indices.nasdaq.isUp ? 'text-red-500' : 'text-blue-600'}`}>{indices.nasdaq.change} ({indices.nasdaq.percent})</div>
          </div>
        </div>

        <div className="p-6 md:p-10 rounded-[40px] border shadow-sm mb-12" style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>
          <div className="flex gap-4 mb-8">
            <button onClick={() => setActiveTab("brokers")} className={`px-6 py-2 rounded-full font-black text-sm transition-all ${activeTab === "brokers" ? "bg-slate-800 text-white" : "border text-slate-400"}`} style={{ borderColor: "var(--border-color)" }}>증권사 목록</button>
            <button onClick={() => setActiveTab("accounts")} className={`px-6 py-2 rounded-full font-black text-sm transition-all ${activeTab === "accounts" ? "bg-slate-800 text-white" : "border text-slate-400"}`} style={{ borderColor: "var(--border-color)" }}>계좌 가이드</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {activeTab === "brokers" ? brokers.map((b, i) => (
              <a key={i} href={b.link} target="_blank" rel="noopener noreferrer" 
                 className="p-6 border rounded-[24px] hover:border-blue-500 transition group flex justify-between items-start" 
                 style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>
                <div>
                  <h4 className="font-black mb-1 text-lg group-hover:text-blue-600 transition-colors" style={{ color: "var(--text-main)" }}>{b.name}</h4>
                  <p className="text-[11px] font-bold opacity-60" style={{ color: "var(--text-sub)" }}>{b.desc}</p>
                </div>
                {/* 우측 상단 화살표 아이콘 */}
                <div className="text-slate-300 group-hover:text-blue-600 transition-all pt-1 group-hover:-translate-y-1 group-hover:translate-x-1">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7M17 7H7M17 7V17"/>
                  </svg>
                </div>
              </a>
            )) : accounts.map((a, i) => (
              <div key={i} className="p-7 border shadow-sm rounded-[28px]" style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>
                <span className="text-[13px] font-black text-blue-600 uppercase mb-3 block">{a.type}</span>
                <h4 className="font-black mb-3 text-xl" style={{ color: "var(--text-main)" }}>{a.name}</h4>
                <p className="text-[13px] font-bold opacity-90" style={{ color: "var(--text-sub)" }}>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-20 pb-12">
          <Link href="/" className="inline-block px-12 py-5 bg-slate-800 text-white rounded-full font-black text-lg hover:bg-slate-900 transition shadow-xl">홈으로 돌아가기</Link>
        </div>
      </main>
      <footer className="py-12 text-center text-[10px] font-bold tracking-widest border-t uppercase" style={{ color: "var(--text-sub)", borderColor: "var(--border-color)" }}>© 2026 ECO_CHECK. ALL RIGHTS RESERVED.</footer>
    </div>
  );
}

export default function StockPage() {
  return (
    <Suspense fallback={<div className="p-20 text-center font-black">페이지 로드 중...</div>}>
      <StockContent />
    </Suspense>
  );
}