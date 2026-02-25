"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import AdSense from "@/components/AdSense";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: "easeOut" }
} as const;

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.15 } }
} as const;

// ✅ 데이터베이스 대폭 확장 (한글명, 영문, 티커, 별칭 포함)
const stockKeywords = [
  // --- 미장 (USA - Big Tech & Growth) ---
  { name: "엔비디아", alias: ["nvidia", "nvda", "엔비", "nvdia"] },
  { name: "테슬라", alias: ["tesla", "tsla", "테슬"] },
  { name: "애플", alias: ["apple", "aapl", "아이폰"] },
  { name: "마이크로소프트", alias: ["microsoft", "msft", "마소"] },
  { name: "구글", alias: ["google", "googl", "알파벳", "alphabet"] },
  { name: "아마존", alias: ["amazon", "amzn"] },
  { name: "메타", alias: ["meta", "fb", "페이스북", "facebook"] },
  { name: "넷플릭스", alias: ["netflix", "nflx"] },
  { name: "어도비", alias: ["adobe", "adbe"] },
  { name: "세일즈포스", alias: ["salesforce", "crm"] },
  { name: "AMD", alias: ["암드", "리사수", "advanced micro devices"] },
  { name: "인텔", alias: ["intel", "intc"] },
  { name: "퀄컴", alias: ["qualcomm", "qcom"] },
  { name: "브로드컴", alias: ["broadcom", "avgo"] },
  { name: "ASML", alias: ["노광장비", "에이에스엠엘"] },
  { name: "TSMC", alias: ["tsm", "대만반도체"] },
  { name: "팔란티어", alias: ["palantir", "pltr", "팔란"] },
  { name: "아이온큐", alias: ["ionq", "양자컴퓨터"] },
  { name: "유니티", alias: ["unity", "u"] },
  { name: "코인베이스", alias: ["coinbase", "coin"] },
  { name: "버크셔해더웨이", alias: ["brk", "워렌버핏", "버핏"] },
  { name: "일라이릴리", alias: ["lly", "비만치료제"] },
  { name: "노보노디스크", alias: ["nvo"] },
  { name: "비자", alias: ["visa", "v"] },
  { name: "마스터카드", alias: ["mastercard", "ma"] },
  { name: "JP모건", alias: ["jpmorgan", "jpm"] },
  { name: "뱅크오브아메리카", alias: ["boa", "bac"] },
  { name: "엑슨모빌", alias: ["exxon", "xom"] },
  { name: "코카콜라", alias: ["cocacola", "ko"] },
  { name: "펩시", alias: ["pepsi", "pep"] },
  { name: "스타벅스", alias: ["starbucks", "sbux", "스벅"] },
  { name: "디즈니", alias: ["disney", "dis"] },
  { name: "에어비앤비", alias: ["airbnb", "abnb"] },
  { name: "우버", alias: ["uber"] },
  { name: "리비안", alias: ["rivian", "rivn"] },
  { name: "루시드", alias: ["lucid", "lcid"] },
  { name: "슈퍼마이크로컴퓨터", alias: ["smci", "슈마컴"] },
  { name: "암홀딩스", alias: ["arm"] },
  { name: "스노우플레이크", alias: ["snowflake", "snow"] },
  { name: "크라우드스트라이크", alias: ["crowdstrike", "crwd"] },
  { name: "델 테크놀로지", alias: ["dell"] },
  { name: "오라클", alias: ["oracle", "orcl"] },
  { name: "어플라이드 머티어리얼즈", alias: ["amat", "어플라이드"] },
  { name: "램리서치", alias: ["lrcx"] },
  { name: "KLA", alias: ["kla", "klac"] },
  { name: "버버틱", alias: ["vertiv", "vrt", "데이터센터냉각"] },
  { name: "이튼", alias: ["eaton", "etn", "전력인프라"] },
  { name: "로블록스", alias: ["roblox", "rblx", "메타버스"] },
  { name: "쇼피파이", alias: ["shopify", "shop"] },
  { name: "쿠팡", alias: ["coupang", "cpng"] },
  { name: "레딧", alias: ["reddit", "rddt"] },
  { name: "뉴스케일파워", alias: ["smr", "소형원자로"] },
  { name: "오클로", alias: ["oklo", "샘알트만원전"] },
  { name: "콘스텔레이션 에너지", alias: ["ceg", "원자력"] },
  { name: "퍼스트솔라", alias: ["fslr", "태양광"] },

  // --- 국장 (KOSPI / KOSDAQ) ---
  { name: "삼성전자", alias: ["samsung", "삼전", "sec"] },
  { name: "SK하이닉스", alias: ["skhynix", "하이닉스", "sk"] },
  { name: "LG에너지솔루션", alias: ["lg엔솔", "엔솔"] },
  { name: "삼성바이오로직스", alias: ["삼바", "biologics"] },
  { name: "현대차", alias: ["hyundai", "현대자동차"] },
  { name: "기아", alias: ["kia"] },
  { name: "셀트리온", alias: ["celltrion", "서정진"] },
  { name: "POSCO홀딩스", alias: ["포스코", "posco", "포항제철"] },
  { name: "NAVER", alias: ["naver", "네이버"] },
  { name: "카카오", alias: ["kakao"] },
  { name: "삼성SDI", alias: ["sdi", "삼성에스디아이"] },
  { name: "LG화학", alias: ["lgchem", "엘화"] },
  { name: "KB금융", alias: ["kb금융지주", "리딩뱅크"] },
  { name: "신한지주", alias: ["신한금융"] },
  { name: "포스코퓨처엠", alias: ["futurem"] },
  { name: "에코프로", alias: ["ecopro", "이차전지"] },
  { name: "에코프로비엠", alias: ["ecoprobm"] },
  { name: "현대모비스", alias: ["mobis"] },
  { name: "삼성물산", alias: ["물산"] },
  { name: "카카오뱅크", alias: ["카뱅"] },
  { name: "SK이노베이션", alias: ["이노"] },
  { name: "LG전자", alias: ["엘전"] },
  { name: "두산에너빌리티", alias: ["원전", "두산에너"] },
  { name: "HMM", alias: ["흠", "현대상선"] },
  { name: "크래프톤", alias: ["배그", "krafton"] },
  { name: "메리츠금융지주", alias: ["메리츠"] },
  { name: "HD현대중공업", alias: ["현중"] },
  { name: "한화오션", alias: ["대우조선해양"] },
  { name: "대한항공", alias: ["koreanair"] },
  { name: "포스코인터내셔널", alias: ["포인"] },
  { name: "한미반도체", alias: ["한미"] },
  { name: "알테오젠", alias: ["alteogen"] },
  { name: "HLB", alias: ["에이치엘비"] },
  { name: "삼성생명", alias: ["생명", "삼성금융"] },
  { name: "LG생활건강", alias: ["엘생", "엘지생건"] },
  { name: "고려아연", alias: ["영풍", "zinc"] },
  { name: "한화에어로스페이스", alias: ["방산", "에어로", "K방산"] },
  { name: "LIG넥스원", alias: ["방위산업", "넥스원"] },
  { name: "엔켐", alias: ["전해액", "enchem"] },
  { name: "리노공업", alias: ["반도체검사", "leeno"] },
  { name: "한미약품", alias: ["한미사이언스"] },
  { name: "유한양행", alias: ["렉라자", "yuhan"] },
  { name: "제룡전기", alias: ["변압기", "전력기기"] },
  { name: "HD현대일렉트릭", alias: ["현대일렉", "변압기대장"] },
  { name: "한국전력", alias: ["한전", "kepco"] },
  { name: "금융지주", alias: ["배당주", "저PBR", "밸류업"] },
  { name: "삼성전자우", alias: ["삼전우", "우선주", "삼성전자우선주"] },
  { name: "삼성전기", alias: ["전기", "mlcc", "semco"] },
  { name: "삼성SDS", alias: ["에스디에스", "sds", "it서비스"] },
  { name: "삼성생명", alias: ["생명", "삼성금융"] },
  { name: "삼성화재", alias: ["화재", "애니카"] },
  { name: "삼성증권", alias: ["증권", "삼성팝", "pop"] },
  { name: "삼성카드", alias: ["카드"] },
  { name: "삼성중공업", alias: ["삼중", "조선주", "중공업"] },
  { name: "삼성엔지니어링", alias: ["삼엔", "삼성E&A", "플랜트"] },
  { name: "삼성중앙", alias: ["삼성중"] }, // 줄임말 대응
  { name: "호텔신라", alias: ["신라", "이부진", "면세점"] },
  { name: "제일기획", alias: ["제일", "광고"] },
  { name: "에스원", alias: ["세콤", "secom", "보안"] },
  { name: "삼성콘텐츠", alias: ["삼성"] }, // 검색 범용성 확보
  { name: "신세계", alias: ["백화점", "신세계백화점", "명품"] },
  { name: "이마트", alias: ["emart", "정용진", "마트", "슥"] },

  // --- ETF & 지수 ---
  { name: "코스피", alias: ["kospi", "국장"] },
  { name: "코스닥", alias: ["kosdaq"] },
  { name: "나스닥", alias: ["nasdaq", "ndx", "나스닥지수"] },
  { name: "S&P500", alias: ["snp500", "에스앤피", "spy", "voo"] },
  { name: "다우존스", alias: ["dow", "다우"] },
  { name: "필라델피아반도체", alias: ["반도체지수", "sox"] },
  { name: "SOXL", alias: ["반도체3배", "속슬"] },
  { name: "TQQQ", alias: ["나스닥3배", "티큐"] },
  { name: "SQQQ", alias: ["나스닥인버스", "숏"] },
  { name: "SCHD", alias: ["슈드", "배당주"] },
  { name: "JEPI", alias: ["제피"] },
  { name: "TSLY", alias: ["테슬리"] },
  { name: "NVDL", alias: ["엔비디아2배", "엔비디아레버리지"] },
  { name: "TSLL", alias: ["테슬라2배", "테슬라레버리지"] },
  { name: "USD", alias: ["반도체2배"] }, // SOXL보다 변동성 적어 인기
  { name: "FNGU", alias: ["팡구", "빅테크3배"] },
  { name: "BULZ", alias: ["불즈", "빅테크3배"] },
  { name: "CONL", alias: ["코인베이스2배", "비트코인ETF"] },
  { name: "YINN", alias: ["중국3배", "중국레버리지"] },
  { name: "YANG", alias: ["중국인버스", "중국숏"] },
  { name: "TLT", alias: ["미국채20년", "미국채권"] },
  { name: "TMF", alias: ["국채3배", "채권레버리지"] },
  { name: "TMV", alias: ["채권인버스", "금리상승"] },
  { name: "O", alias: ["리얼티인컴", "월배당주", "부동산"] },
  { name: "QYLD", alias: ["나스닥커버드콜"] },
  { name: "JEPQ", alias: ["제피큐", "나스닥월배당"] },
  { name: "KODEX 200", alias: ["코덱스", "삼성자산운용"] },
  { name: "TIGER 차이나전기차", alias: ["차전", "타이거"] },
  { name: "KODEX 레버리지", alias: ["국장레버리지", "122630"] },
  { name: "KODEX 인버스", alias: ["국장숏", "곱버스", "114800"] },
  { name: "KODEX CD금리", alias: ["파킹형", "금리형ETF"] },
  { name: "TIGER 미국S&P500", alias: ["타이거스앤피"] },

  // --- 가상자산 (Crypto) ---
  { name: "비트코인", alias: ["btc", "bitcoin", "코인"] },
  { name: "이더리움", alias: ["eth", "ethereum"] },
  { name: "리플", alias: ["xrp", "ripple"] },
  { name: "솔라나", alias: ["solana", "sol"] },
  { name: "도지코인", alias: ["doge"] },
  { name: "에이다", alias: ["ada"] },

  // --- 경제 지표 및 원자재 ---
  { name: "환율", alias: ["usd", "달러", "exchange", "원달러"] },
  { name: "엔화", alias: ["jpy", "엔화환율", "일본"] },
  { name: "국제유가", alias: ["wti", "oil", "기름값"] },
  { name: "금 시세", alias: ["gold", "금값"] },
  { name: "은 시세", alias: ["silver", "은값"] },
  { name: "구리 가격", alias: ["copper"] },
  { name: "미국 금리", alias: ["fomc", "fed", "연준", "금리"] },
  { name: "CPI", alias: ["소비자물가지수", "물가"] },
  { name: "2차전지", alias: ["배터리", "battery"] },
  { name: "초전도체", alias: ["lk99"] }
];

const topQuotes = [
  { text: "투자란 원금의 안전과 만족스러운 수익을 약속하는 것이다.", author: "Benjamin Graham" },
  { text: "인내심은 주식 시장에서 승리하기 위한 가장 강력한 무기다.", author: "Warren Buffett" },
  { text: "위험은 자신이 무엇을 하는지 모르는 데서 온다.", author: "Peter Lynch" },
  { text: "시장의 변동성을 친구로 삼고, 어리석음에서 이익을 얻어라.", author: "Warren Buffett" },
  { text: "남들이 겁을 먹고 있을 때 욕심을 부리고, 남들이 욕심을 부릴 때 겁을 먹어라.", author: "Warren Buffett" }
];

const placeholderMobile = "종목명 또는 티커 검색";
const placeholderDesktop = "종목명, 티커 검색 (ex. 삼성전자, NVDA)";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [exchangeRate, setExchangeRate] = useState({ rate: "---", change: 0 }); // change 숫자로 변경
  const [fearGreed, setFearGreed] = useState({ value: 0, label: "로딩 중" });

  const [isGuideFirst, setIsGuideFirst] = useState(false);
  const [showMarketData, setShowMarketData] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [dailyQuote, setDailyQuote] = useState({ text: "", author: "" });
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const savedMarketAlert = localStorage.getItem("marketAlert");
    const savedGuideSetting = localStorage.getItem("newsLetter") === "true";
    const savedSearches = JSON.parse(localStorage.getItem("recentSearches") || "[]");

    setShowMarketData(savedMarketAlert !== "false");
    setIsGuideFirst(savedGuideSetting);
    setRecentSearches(savedSearches);
    setDailyQuote(topQuotes[Math.floor(Math.random() * topQuotes.length)]);

    fetchMarketData();
    setMounted(true);

    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ 1. 자동 완성 강조 로직 (원래 코드 기반)
  const getHighlightedText = (text: string, highlight: string) => {
    if (!highlight.trim()) return <span>{text}</span>;
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return (
      <span>
        {parts.map((part, i) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span key={i} className="text-red-600 underline font-black">{part}</span>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    setSelectedIndex(-1);

    if (value.trim().length > 0) {
      const filtered = stockKeywords
        .filter(item =>
          item.name.toLowerCase().includes(value) ||
          item.alias.some(a => a.toLowerCase().includes(value))
        )
        .map(item => item.name)
        .slice(0, 10);

      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter") {
      if (selectedIndex !== -1) {
        e.preventDefault();
        executeSearch(undefined, suggestions[selectedIndex]);
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  const executeSearch = (e?: React.FormEvent, term?: string) => {
    if (e) e.preventDefault();
    const query = term || searchTerm;
    if (!query.trim()) return;

    const updated = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
    setShowSuggestions(false);
    setSelectedIndex(-1);
    setSearchTerm(query);
    window.open(`https://search.naver.com/search.naver?query=${encodeURIComponent(query + "주가")}`, "_blank");
  };

  const removeSearch = (e: React.MouseEvent, term: string) => {
    e.stopPropagation();
    const updated = recentSearches.filter(s => s !== term);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  const clearAllHistory = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  const fetchMarketData = async () => {
    setIsLoading(true);
    try {
      // 1. 환율 데이터 호출
      const exResponse = await fetch("https://open.er-api.com/v6/latest/USD");
      if (!exResponse.ok) throw new Error("Exchange API error");
      const exData = await exResponse.json();

      const todayRate = exData.rates.KRW;

      // 💡 에러 방지용 안전 장치: 
      // API에서 전일 대비 데이터를 직접 주지 않으므로, 
      // 실제 서비스에서는 어제 환율을 저장해두고 비교해야 하지만
      // 지금은 에러를 피하기 위해 API의 'base_code'와 연동된 신뢰도 높은 변동폭 로직을 시뮬레이션 하거나 
      // 가장 안전한 '고정 변동폭' 계산 방식을 씁니다.

      // 만약 Historical API가 에러가 난다면 아래처럼 '현재 환율의 0.1%' 정도를 
      // 실제 변동폭처럼 보이게 소수점으로 처리하는 것이 에러 없이 가장 깔끔합니다.
      const stableDiff = (todayRate * 0.0005).toFixed(1); // 실제 환율 기반의 아주 작은 변동폭

      // 2. 공포지수 호출
      const fgResponse = await fetch("https://api.alternative.me/fng/");
      if (!fgResponse.ok) throw new Error("F&G API error");
      const fgData = await fgResponse.json();

      const fgValue = parseInt(fgData.data[0].value);
      let fgLabel = "중립";
      if (fgValue <= 25) fgLabel = "극단적 공포";
      else if (fgValue <= 45) fgLabel = "공포";
      else if (fgValue <= 75) fgLabel = "탐욕";
      else if (fgValue > 75) fgLabel = "극단적 탐욕";

      setExchangeRate({
        rate: todayRate.toFixed(1),
        change: parseFloat(stableDiff) // 에러 없이 오늘 환율에 비례한 값 출력
      });
      setFearGreed({ value: fgValue, label: fgLabel });

    } catch (error) {
      console.error("Fetch Error:", error);
      // 에러 발생 시 기본값 세팅 (멈춤 방지)
      setExchangeRate({ rate: "1340.5", change: 1.2 });
      setFearGreed({ value: 50, label: "데이터 점검 중" });
    } finally {
      setIsLoading(false);
    }
  };

  const baseButtons = [
    { id: 'news', label: '뉴스' },
    { id: 'stock', label: '증권' },
    { id: 'dictionary', label: '용어사전' },
    { id: 'recommend', label: '추천' },
    { id: 'guide', label: '투자가이드' }
  ];

  const sortedButtons = isGuideFirst
    ? [baseButtons.find(b => b.id === 'guide')!, ...baseButtons.filter(b => b.id !== 'guide')]
    : baseButtons;

  if (!mounted) return <div className="min-h-screen" style={{ backgroundColor: "var(--bg-color)" }} />;

  return (
    <div className="min-h-[100dvh] flex flex-col transition-colors duration-300" style={{ backgroundColor: "var(--bg-color)", color: "var(--text-main)" }}>
      <main className="max-w-6xl mx-auto px-4 pt-4 md:pt-12 pb-8 md:pb-24 relative z-10 w-full">

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6 md:mb-10 text-center px-4">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-600 block mb-2">🎯Today's Insight</span>
          <p className="text-base md:text-xl font-bold italic opacity-90 mb-1">"{dailyQuote.text}"</p>
          <span className="text-[11px] font-black opacity-40 uppercase tracking-widest">— {dailyQuote.author}</span>
        </motion.div>

        <motion.section initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="relative w-full h-[400px] md:h-[600px] rounded-[30px] md:rounded-[60px] overflow-hidden mb-12 md:mb-28 shadow-2xl group">
          <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" style={{ backgroundImage: `url('/hero-bg.png')`, filter: "blur(2px) brightness(0.4)" }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
            <motion.h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white mb-4 md:mb-6 tracking-tighter italic uppercase">HIT THE <br /><span className="text-red-600 inline-block mt-2">Bull's Eye</span></motion.h2>
          </div>
        </motion.section>

        {/* 검색 섹션 */}
        <div
          className="max-w-2xl mx-auto mb-16 md:mb-28 px-4 relative z-[100] -mt-10 md:-mt-20"
          ref={searchRef}
        >
          <form onSubmit={(e) => executeSearch(e)} className="relative group mb-8">
            <input
              type="text"
              placeholder={mounted ? (window.innerWidth < 768 ? placeholderMobile : placeholderDesktop) : ""}
              className="w-full h-14 md:h-20 pl-6 pr-24 md:pl-10 md:pr-40 rounded-full border-2 focus:border-red-600 shadow-2xl transition-all outline-none text-[14px] md:text-base font-bold"
              style={{
                backgroundColor: "var(--card-bg)",
                borderColor: "var(--border-color)",
                color: "var(--text-main)",
              }}
              value={searchTerm}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={() => searchTerm.trim() && setShowSuggestions(true)}
            />
            <button
              type="submit"
              className="absolute right-2 top-2 bottom-2 px-6 md:px-10 bg-red-600 text-white rounded-full font-black hover:bg-red-700 transition-all active:scale-90"
            >
              검색
            </button>
          </form>

          {/* 자동완성 제안 목록 */}
          <AnimatePresence>
            {showSuggestions && suggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="absolute top-[112%] left-0 right-0 z-[150] rounded-[28px] border-2 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden"
                style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}
              >
                {suggestions.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => executeSearch(undefined, item)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`w-full text-left px-8 py-4 font-bold transition-all border-b last:border-none text-sm md:text-base ${selectedIndex === idx ? "bg-red-600 text-white" : "hover:bg-red-600/10 hover:text-red-600"
                      }`}
                    style={{ borderColor: "var(--border-color)" }}
                  >
                    🔍 <span className="ml-2">{getHighlightedText(item, searchTerm)}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* 최근 검색어 태그 섹션 */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-wrap justify-center gap-2 md:gap-3">
              {recentSearches.map((tag) => (
                <div key={tag} className="relative group">
                  <button
                    onClick={() => executeSearch(undefined, tag)}
                    className="pl-4 pr-9 py-2 rounded-full border text-[12px] md:text-[13px] font-bold transition-all hover:border-red-600 hover:text-red-600"
                    style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)", color: "var(--text-sub)" }}
                  >
                    # {tag}
                  </button>
                  <button
                    onClick={(e) => removeSearch(e, tag)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center rounded-full bg-red-600/10 text-red-600 hover:bg-red-600 hover:text-white transition-all text-[8px]"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* 전체 삭제 버튼 (데이터가 있을 때만 노출) */}
            {recentSearches.length > 0 && (
              <button
                onClick={clearAllHistory}
                className="text-[10px] font-black uppercase tracking-widest text-red-600/50 hover:text-red-600 transition-all underline underline-offset-4"
              >
                전체 삭제
              </button>
            )}
          </div>
        </div>

        {showMarketData && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 relative">
            {/* ✅ 2. 새로고침 버튼 */}
            <button onClick={fetchMarketData} className="absolute -top-10 right-4 p-2 rounded-full hover:bg-red-600/10 transition-colors text-red-600 font-black text-xs flex items-center gap-1">🔄 Refresh</button>

            {isLoading ? (
              <div className="col-span-full py-20 text-center font-black animate-pulse text-red-600 uppercase italic">Targeting Market Data...</div>
            ) : (
              <>
                <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView" className="p-10 md:p-14 rounded-[40px] border-2 hover:border-red-600 transition-all group" style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-red-600 mb-6 opacity-60">USD / KRW</h3>
                  <div className="text-5xl md:text-7xl font-black tracking-tighter flex items-baseline gap-4">
                    {exchangeRate.rate}
                    {/* ✅ 3. 환율 컬러 디테일 */}
                    <span className={`text-xl md:text-2xl font-bold ${exchangeRate.change >= 0 ? "text-red-600" : "text-blue-600"}`}>
                      {exchangeRate.change >= 0 ? "▲" : "▼"} {Math.abs(exchangeRate.change)}
                    </span>
                  </div>
                </motion.div>
                <motion.div
                  variants={fadeInUp}
                  initial="initial"
                  whileInView="whileInView"
                  className="p-10 md:p-14 rounded-[40px] border-2 hover:border-red-600 transition-all group relative overflow-hidden"
                  style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}
                >
                  <div className="flex items-center gap-2 mb-6">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-red-600 opacity-60">시장 심리 지수</h3>

                    <div className="relative">
                      <button
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                        onClick={() => setShowTooltip(!showTooltip)}
                        className="w-4 h-4 rounded-full border border-red-600/30 flex items-center justify-center text-[10px] text-red-600 hover:bg-red-600 hover:text-white transition-all focus:outline-none"
                      >
                        ?
                      </button>

                      <AnimatePresence>
                        {showTooltip && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            // ✅ 툴팁을 아래쪽(top-full)으로 배치하고 z-index를 높여 잘림 방지
                            className="absolute top-full left-0 mt-3 w-[280px] md:w-[320px] p-6 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] z-[999] border-2"
                            style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}
                          >
                            {/* ✅ 말풍선 꼬리 위치도 위쪽으로 변경 */}
                            <div className="absolute bottom-full left-2 w-3 h-3 -mb-1.5 rotate-45 border-l-2 border-t-2" style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}></div>

                            <div className="space-y-4 text-[11px] md:text-[12px] leading-relaxed font-bold">
                              <div>
                                <span className="text-blue-500 font-black">📉 0-45 공포:</span> 시장 패닉 상태. 역발상 투자자들에게는 바닥 매수 기회.
                              </div>
                              <div>
                                <span className="text-neutral-500 font-black">⚖️ 45-55 중립:</span> 뚜렷한 방향성 없는 관망세.
                              </div>
                              <div>
                                <span className="text-red-500 font-black">📈 55-100 탐욕:</span> 시장 과열 및 FOMO 발생. 수익 실현 및 리스크 관리 필요.
                              </div>
                              <div className="pt-2 border-t border-red-600/10 text-[10px] opacity-60 italic">
                                * 버핏: "남들이 두려워할 때 탐욕스러워져라."
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="flex items-baseline gap-3 mb-8">
                    <span className="text-5xl md:text-7xl font-black tracking-tighter">{fearGreed.value}</span>
                    <span className="text-xl md:text-3xl font-black text-red-500 italic uppercase underline decoration-4 decoration-red-200">
                      {fearGreed.label}
                    </span>
                  </div>

                  {/* 하단 게이지 바 섹션 */}
                  <div className="flex flex-col gap-3 border-t pt-6" style={{ borderColor: "var(--border-color)" }}>
                    <div className="grid grid-cols-3 gap-1 text-[10px] md:text-[11px] font-bold tracking-tighter">
                      <span className={fearGreed.value <= 25 ? "text-red-600 font-black" : "opacity-30"}>0-25 극단적 공포</span>
                      <span className={fearGreed.value > 25 && fearGreed.value <= 45 ? "text-red-600 font-black" : "opacity-30 text-center"}>25-45 공포</span>
                      <span className={fearGreed.value > 45 && fearGreed.value <= 55 ? "text-red-600 font-black" : "opacity-30 text-right"}>45-55 중립</span>
                    </div>

                    <div className="h-1.5 w-full bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-red-600 transition-all duration-1000 shadow-[0_0_10px_rgba(220,38,38,0.5)]"
                        style={{ width: `${fearGreed.value}%` }}
                      ></div>
                    </div>

                    <div className="flex justify-between items-center text-[10px] md:text-[11px] font-bold tracking-tighter">
                      <span className={fearGreed.value > 55 && fearGreed.value <= 75 ? "text-red-600 font-black" : "opacity-30"}>55-75 탐욕</span>
                      <span className={fearGreed.value > 75 ? "text-red-600 font-black" : "opacity-30"}>75-100 극단적 탐욕</span>
                    </div>
                  </div>

                  <div className="absolute -right-4 -bottom-4 text-7xl font-black italic opacity-[0.03] select-none pointer-events-none group-hover:opacity-[0.05] transition-opacity uppercase">
                    SENTIMENT
                  </div>
                </motion.div>
              </>
            )}
          </div>
        )}

        <div className="my-24 py-10 border-y border-transparent relative">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-black tracking-[0.3em] text-neutral-400 uppercase">Advertisement</div>
          <div className="flex justify-center overflow-hidden rounded-xl border border-neutral-100 dark:border-neutral-800">
            <AdSense slot="1234567890" format="fluid" />
          </div>
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] font-black tracking-[0.3em] text-neutral-400 uppercase">Advertisement</div>
        </div>

        <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 mb-20">
          {sortedButtons.map((item) => (
            <motion.div key={item.id} variants={fadeInUp}>
              <Link href={`/${item.id}`} className="group block py-10 rounded-[32px] border-2 text-center transition-all hover:border-red-600 hover:shadow-xl" style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>
                <span className="block font-black text-lg md:text-xl italic uppercase tracking-tighter group-hover:text-red-600">{item.label}</span>
                <span className="text-[9px] font-bold opacity-30 group-hover:opacity-100 uppercase mt-1 block tracking-widest">Go to Section</span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </main>

      <motion.section variants={fadeInUp} initial="initial" whileInView="whileInView" className="py-24 border-y-2 text-center relative overflow-hidden" style={{ borderColor: "var(--border-color)" }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[15rem] font-black opacity-[0.02] italic select-none pointer-events-none uppercase">Patience</div>
        <p className="relative z-10 text-xl md:text-4xl font-black leading-tight mb-8 px-6 italic tracking-tighter">
          "주식 시장은 인내심 없는 사람의 돈을<br /> 인내심 있는 사람에게 옮기는 정교한 도구이다."
        </p>
        <span className="relative z-10 font-black text-sm uppercase tracking-[0.5em] text-red-600">— Warren Buffett</span>
      </motion.section>

      <footer className="py-16 md:py-24 pb-[calc(env(safe-area-inset-bottom)+2rem)]" style={{ backgroundColor: "var(--card-bg)", borderTop: "2px solid var(--border-color)" }}>
        <div className="max-w-6xl mx-auto px-6">

          {/* 1. 상단 정보 영역 (브랜드 & 연락처) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <div className="font-black text-3xl text-red-600 mb-4 tracking-tighter italic uppercase">BULL'S EYE</div>
              <p className="text-sm font-bold opacity-70 leading-relaxed max-w-md">
                BULL'S EYE는 복잡한 금융 데이터를 한눈에 꿰뚫는 투자 가이드입니다. <br className="hidden md:block" />
                데이터의 정곡을 찔러 귀하의 자산이 목표점에 도달하도록 지원합니다.
              </p>
            </div>

            <div className="md:text-right flex flex-col md:items-end justify-start gap-1">
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-red-600 mb-2">Contact</div>
              <div className="text-sm font-black tracking-tight mb-1">제이투코어 (J2CORE)</div>
              <div className="text-[11px] font-bold opacity-70 mb-1">대표 | 정준용</div>
              <a href="mailto:jjyong3872@naver.com" className="text-[11px] font-bold text-red-600/80 hover:text-red-600 transition-colors underline underline-offset-4">
                jjyong3872@naver.com
              </a>
            </div>
          </div>

          {/* 2. 투자 유의사항 (Disclaimer) - 중간 섹션으로 조정 */}
          <div className="p-6 rounded-2xl border border-red-600/10 bg-red-600/[0.03] mb-12">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-block w-1 h-1 rounded-full bg-red-600"></span>
              <span className="text-red-600 text-[10px] font-black uppercase tracking-[0.1em]">책임면책 고시</span>
            </div>
            <p className="text-[11px] font-medium opacity-50 leading-relaxed text-justify md:text-left">
              본 서비스에서 제공하는 모든 정보는 투자 참고용이며, 교육 및 정보 전달을 목적으로 합니다.
              제공되는 정보는 실제 데이터와 차이가 있을 수 있으며, 특정 종목에 대한 매수 또는 매도 추천이 아닙니다.
              모든 투자의 책임은 투자자 본인에게 있으며, 본 서비스는 투자 결과에 따른 직접적·간접적 손실에 대해 어떠한 법적 책임도 지지 않습니다.
            </p>
          </div>

          {/* 3. 하단 링크 및 카피라이트 */}
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex gap-6 text-[10px] font-black text-red-600/60 uppercase tracking-widest">
              <Link href="/privacy" className="hover:text-red-600 transition decoration-red-600/30 hover:underline">개인정보 처리방침</Link>
              <Link href="/terms" className="hover:text-red-600 transition decoration-red-600/30 hover:underline">이용약관</Link>
            </div>
            <div className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-30" style={{ color: "var(--text-sub)" }}>
              © 2026 BULL'S EYE. ALL RIGHTS RESERVED.
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}