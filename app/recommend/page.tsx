"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import AdSense from "@/components/AdSense";

// 데이터 타입 정의 (에러 방지용)
interface Book {
  title: string;
  author: string;
  desc: string;
  link: string;
}

interface Video {
  title: string;
  channel: string;
  desc: string;
  link: string;
}

const recommendTabs = [
  { name: "추천 도서", slug: "books" },
  { name: "추천 영상", slug: "videos" }
];

function RecommendContent() {
  const [activeTab, setActiveTab] = useState("books");
  const searchParams = useSearchParams();

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "books" || tab === "videos") {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const books: Book[] = [
    { title: "돈의 속성", author: "김승호", desc: "최상위 부자가 말하는 돈에 대한 태도와 75가지 경제 철학을 담은 필독서입니다.", link: "https://product.kyobobook.co.kr/detail/S000001913217" },
    { title: "부자 아빠 가난한 아빠 1", author: "로버트 기요사키", desc: "자산과 부채의 차이를 명확히 하고 경제적 자유를 향한 로드맵을 제시합니다.", link: "https://product.kyobobook.co.kr/detail/S000001772245" },
    { title: "현명한 투자자", author: "벤자민 그레이엄", desc: "워런 버핏의 스승이자 가치 투자 원칙을 정립한 투자의 고전입니다.", link: "https://product.kyobobook.co.kr/detail/S000216669456" },
    { title: "자본주의 시대 최소한의 경제 공부", author: "백억남(김욱현)", desc: "경제의 흐름을 이해하는 순간 당신 앞에 선명한 기회가 보이기 시작합니다.", link: "https://product.kyobobook.co.kr/detail/S000218687476" },
    { title: "시대예보: 핵개인의 시대", author: "송길영", desc: "변화하는 사회 속에서 경제적, 사회적 자립을 고민하는 이들을 위한 깊은 통찰.", link: "https://product.kyobobook.co.kr/detail/S000209151495" },
    { title: "EBS 다큐프라임 자본주의", author: "EBS 자본주의 제작팀", desc: "우리가 살아가는 자본주의 시스템의 본질과 금융의 진실을 날카롭게 파헤칩니다.", link: "https://product.kyobobook.co.kr/detail/S000000848997" },
    { title: "위대한 기업에 투자하라", author: "필립 피셔", desc: "성장주 투자의 바이블입니다. 기업의 질적 가치를 분석하는 15가지 원칙을 통해 텐배거(10배 수익) 종목을 찾는 법을 알려줍니다.", link: "https://product.kyobobook.co.kr/detail/S000217068294" },
    { title: "돈의 심리학", author: "모건 하우절", desc: "부의 축적은 머리 좋은 것보다 '행동'에 달려 있음을 강조합니다. 당신의 투자 멘탈을 송두리째 바꿔놓을 20가지 투자 스토리를 담았습니다.", link: "https://product.kyobobook.co.kr/detail/S000218942259" },
    { title: "원칙", author: "레이 달리오", desc: "세계 최대 헤지펀드 설립자가 공개하는 인생과 투자의 원칙. 시장의 파도를 견디고 시스템으로 승리하는 법을 배울 수 있습니다.", link: "https://product.kyobobook.co.kr/detail/S000001760938" }
  ];

  const videos: Video[] = [
    { title: "슈카월드", channel: "YouTube", desc: "어려운 경제 이슈를 유쾌하고 깊이 있게 풀어주는 국내 1위 경제 채널입니다.", link: "https://www.youtube.com/@syukaworld" },
    { title: "삼프로TV", channel: "YouTube", desc: "국내외 금융 전문가들의 정교한 시장 분석을 매일 아침 만날 수 있습니다.", link: "https://www.youtube.com/@3protv" },
    { title: "지식인사이드", channel: "YouTube", desc: "각 분야 최고 전문가들의 깊은 통찰력을 통해 세상을 보는 눈을 넓혀주는 인터뷰 전문 채널입니다.", link: "https://www.youtube.com/@%EC%A7%80%EC%8B%9D%EC%9D%B8%EC%82%AC%EC%9D%B4%EB%93%9C" },
    { title: "월급쟁이부자들", channel: "YouTube", desc: "현실적인 재테크와 내 집 마련을 위한 실전 노하우를 아낌없이 공유합니다.", link: "https://www.youtube.com/@weolbu_official" },
    { title: "소수몽키", channel: "YouTube", desc: "미국 주식과 배당주 투자를 초보자도 이해하기 쉽게 설명해 주는 채널입니다.", link: "https://www.youtube.com/@sosumonkey" },
    { title: "신사임당", channel: "YouTube", desc: "대한민국에서 지금 가장 뜨거운 '이슈'를 신사임당의 시선으로 분석합니다.", link: "https://www.youtube.com/@CH%EC%8B%A0%EC%82%AC%EC%9E%84%EB%8B%B9" },
    { title: "내일은 투자왕", channel: "YouTube", desc: "투자 철학과 멘탈 관리, 시장을 꿰뚫어 보는 통찰력을 길러줍니다.", link: "https://www.youtube.com/@%EA%B9%80%EB%8B%A8%ED%85%8C" },
    { title: "달란트투자", channel: "YouTube", desc: "데이터와 통계를 바탕으로 기업의 내재 가치를 분석합니다. 복잡한 재무제표를 초보자도 알기 쉽게 설명해 주는 실전 주식 가이드 채널입니다.", link: "https://www.youtube.com/@talentinvestment" },
    { title: "815머니톡", channel: "YouTube", desc: "국내외 최고의 투자 고수들을 초빙해 거시 경제의 흐름을 읽어줍니다. 시장의 큰 판을 읽고 대응 전략을 세우는 데 큰 도움이 됩니다.", link: "https://www.youtube.com/@815moneytalk" },
    { title: "행크TV", channel: "YouTube", desc: "부동산 경매와 상가 투자, 사업 노하우 등 주식 외의 강력한 파이프라인을 만드는 법을 알려주는 재테크 실전 채널입니다.", link: "https://www.youtube.com/@hank_tv" },
    { title: "박곰희TV", channel: "YouTube", desc: "자산관리사 출신이 알려주는 연금저축, IRP, ISA 활용법의 정석입니다. 복잡한 금융 상품을 계좌 개설부터 운용까지 친절하게 가이드해 줍니다.", link: "https://www.youtube.com/@gomhee" },
    { title: "경제읽어주는남자", channel: "YouTube", desc: "김광석 교수가 전하는 명쾌한 거시 경제 분석 채널입니다. 금리, 물가, 환율 등 어려운 지표들이 내 자산에 미치는 영향을 데이터로 쉽게 풀어줍니다.", link: "https://www.youtube.com/@경읽남_김광석TV" }
  ];

  return (
    <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: "var(--bg-color)", color: "var(--text-main)" }}>
      <main className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        <header className="mb-16 text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6 italic uppercase">Bulls_Pick</h1>
          <p className="text-lg font-bold mb-10 opacity-70" style={{ color: "var(--text-sub)" }}>인사이트를 완성할 베스트 도서와 인기 영상을 큐레이션했습니다.</p>
          <div className="flex gap-4 justify-center md:justify-start">
            {recommendTabs.map((tab) => (
              <button
                key={tab.slug}
                onClick={() => setActiveTab(tab.slug)}
                className={`px-10 py-4 rounded-full font-black text-base transition-all ${activeTab === tab.slug ? "bg-red-600 text-white shadow-xl scale-105" : "border"}`}
                style={{ backgroundColor: activeTab === tab.slug ? "" : "var(--card-bg)", color: activeTab === tab.slug ? "#fff" : "var(--text-sub)", borderColor: "var(--border-color)" }}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </header>

        <div className="mb-16"><AdSense slot="5544332211" format="auto" /></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(activeTab === "books" ? books : videos).map((item, i) => (
            <div key={i} className="flex flex-col h-full">
              <a href={item.link} target="_blank" rel="noopener noreferrer"
                className="p-10 rounded-[40px] border shadow-sm hover:shadow-2xl hover:border-red-500 transition-all group flex flex-col justify-between h-full min-h-[360px]"
                style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[11px] font-black text-red-600 uppercase tracking-[0.2em]">
                      {"author" in item ? "KYOBO BEST" : "YOUTUBE CHANNEL"}
                    </span>
                    <div className="opacity-0 group-hover:opacity-100 transition-all text-red-600 transform translate-x-2 group-hover:translate-x-0">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7H7M17 7V17" /></svg>
                    </div>
                  </div>
                  <h4 className="font-black mb-3 text-2xl md:text-3xl group-hover:text-red-600 transition-colors leading-tight break-keep">{item.title}</h4>
                  <p className="text-[13px] font-black mb-6 uppercase tracking-wide opacity-60">
                    {"author" in item ? item.author : item.channel}
                  </p>
                  <p className="text-[15px] font-bold leading-relaxed opacity-80" style={{ color: "var(--text-sub)" }}>{item.desc}</p>
                </div>
                <div className="mt-10 pt-6 border-t group-hover:border-red-200 transition-colors" style={{ borderColor: "var(--border-color)" }}>
                  <span className="text-[12px] font-black group-hover:text-red-600 transition tracking-tighter" style={{ color: "var(--text-sub)" }}>컨텐츠 보러가기 →</span>
                </div>
              </a>
              {/* 중간 광고 삽입 로직 */}
              {(i + 1) % 3 === 0 && <div className="mt-8"><AdSense slot="1122334455" format="fluid" /></div>}
            </div>
          ))}
        </div>

        <div className="text-center mt-24 pb-12">
          <Link href="/" className="inline-block px-14 py-6 bg-red-600 text-white rounded-full font-black text-xl hover:bg-red-700 transition shadow-2xl hover:-translate-y-1">홈으로 돌아가기</Link>
        </div>
      </main>

      <footer className="py-12 border-t text-center" style={{ borderColor: "var(--border-color)" }}>
        <div className="flex justify-center gap-6 mb-4 text-[10px] font-black text-red-600/50 uppercase tracking-widest">
          <Link href="/privacy" className="hover:text-red-600 transition">개인정보 처리방침</Link>
          <Link href="/terms" className="hover:text-red-600 transition">이용약관</Link>
        </div>
        <div className="text-[10px] font-bold tracking-[0.5em] uppercase opacity-40">© 2026 BULL'S EYE. ALL RIGHTS RESERVED.</div>
      </footer>
    </div>
  );
}

export default function RecommendPage() {
  return (
    <Suspense fallback={<div className="p-20 text-center font-black animate-pulse text-red-600 italic">Targeting Data...</div>}>
      <RecommendContent />
    </Suspense>
  );
}