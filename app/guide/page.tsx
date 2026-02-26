"use client";

import { useState } from "react";
import Link from "next/link";
import AdSense from "@/components/AdSense";

const investorGuides = [
  { id: 1, title: "고금리 시대의 자산 배분 전략", desc: "기준금리가 높은 수준을 유지할 때는 현금 흐름이 우수한 기업과 채권형 자산의 매력도가 높아집니다. 금리 사이클을 읽는 법을 익혀보세요.", tag: "Strategy" },
  { id: 2, title: "시장의 심리, 공포와 탐욕 지수", desc: "모두가 탐욕에 빠졌을 때 경계하고, 모두가 공포에 질렸을 때 기회를 찾는 역발상 투자의 핵심은 객관적인 데이터 분석에서 시작됩니다.", tag: "Psychology" },
  { id: 3, title: "분산 투자의 기술: 포트폴리오 최적화", desc: "단순히 종목을 나누는 것을 넘어, 상관관계가 낮은 자산군에 분산하여 하락장에서도 내 자산을 지키는 방어 기법을 알아봅니다.", tag: "Risk" },
  { id: 4, title: "워렌 버핏의 가치투자 철학", desc: "위대한 기업을 적절한 가격에 사는 법. 기업의 내재 가치를 계산하고 안전마진을 확보하는 장기 투자자의 핵심 원칙을 정리했습니다.", tag: "Legend" },
  { id: 5, title: "세계 금융의 심장, '월가' 완벽 이해하기", desc: "뉴욕의 작은 거리 Wall Street가 어떻게 전 세계 돈의 흐름을 결정하게 되었을까요? 거대 자본이 움직이는 메커니즘을 쉽게 풀어드립니다.", tag: "Finance" },
  { id: 6, title: "제2의 월급, 배당주 투자의 기초", desc: "주가 시세 차익을 넘어 기업의 이익을 공유받는 배당 투자! 지속 가능한 현금 흐름을 만드는 배당 성장주 선별법을 알아봅니다.", tag: "Income" },
  { id: 7, title: "미국 주식 시장의 3대 지수 완벽 정복", desc: "S&P500, 나스닥, 다우지수... 뉴스에서 매일 들리는 이 지수들이 내 계좌에 미치는 영향은? 글로벌 시장의 나침반을 읽는 법을 공개합니다.", tag: "Global" },
  { id: 8, title: "AI 혁명과 반도체 사이클의 이해", desc: "인공지능 시대의 쌀이라 불리는 반도체! 단순한 유행을 넘어 산업의 패러다임이 바뀌는 시점에서 우리가 주목해야 할 기술적 해자와 투자 포인트를 짚어봅니다.", tag: "Tech" },
  { id: 9, title: "투자의 종합 선물 세트, ETF 기초 가이드", desc: "개별 종목 선택이 어렵다면? 수십 개의 우량주를 한 번에 담는 ETF가 정답일 수 있습니다. 비용은 낮추고 분산 효과는 극대화하는 스마트한 투자법.", tag: "Passive" },
  { id: 10, title: "세금은 줄이고 수익은 높이는 절세 계좌 활용법", desc: "수익만큼 중요한 것이 내 지갑을 지키는 법입니다. ISA, IRP 등 정부가 주는 세제 혜택을 100% 활용하여 실질 수익률을 극대화하는 노하우를 소개합니다.", tag: "Tax" },
  { id: 11, title: "잠자는 동안에도 돈이 들어오는 배당주 투자", desc: "매달 월급처럼 들어오는 배당금의 매력! 하락장에서도 버틸 수 있는 힘이 되는 고배당주와 배당 성장주를 선별하는 기준과 포트폴리오 구성 전략을 알아봅니다.", tag: "Income" },
  { id: 12, title: "시장의 흔들림에 대처하는 투자 심리의 미학", desc: "투자는 결국 자신과의 싸움입니다. 공포에 사고 환희에 파는 역발상 투자자가 되기 위한 멘탈 관리법과 나만의 투자 원칙을 세우는 법을 공유합니다.", tag: "Mind" },
  { id: 13, title: "주식 시장의 사계절, '금융 장세' 읽기", desc: "금리와 실적에 따라 시장은 봄, 여름, 가을, 겨울처럼 순환합니다. 현재 시장이 어느 계절에 와 있는지 파악하는 법을 배웁니다.", tag: "Cycle" },
  { id: 14, title: "나만 모르는 '공시' 속에 숨겨진 힌트", desc: "유상증자, 전환사채(CB), 자사주 매입... 기업이 시장에 던지는 신호인 공시를 해석해 악재와 호재를 구분하는 안목을 기릅니다.", tag: "Analysis" },
  { id: 15, title: "잃지 않는 투자를 위한 '자금 관리' 원칙", desc: "수익률보다 중요한 것은 비중 조절입니다. 한 종목에 몰빵하지 않고 살아남아 다음 기회를 잡는 자금 운용의 기술을 소개합니다.", tag: "Money" },
  { id: 16, title: "재무제표에서 꼭 확인해야 할 3대 지표", desc: "어려운 회계 지식 없이도 매출, 영업이익, 부채비율만 제대로 보면 위험한 기업을 거를 수 있습니다. 기업의 기초 체력을 진단하는 법을 알아봅니다.", tag: "Analysis" },
  { id: 17, title: "하락장에서도 든든한 '안전마진' 확보법", desc: "주가가 내릴 때 더 자신 있게 살 수 있는 비결은 무엇일까요? 기업의 가치보다 싸게 사는 법과 손실을 최소화하는 안전장치 설정법을 소개합니다.", tag: "Value" },
  { id: 18, title: "초보 투자자를 위한 '분할 매수·매도'의 정석", desc: "한 번에 몰빵하는 습관이 계좌를 망칩니다. 주가를 예측하려 하지 않고, 가격 범위를 나누어 대응하며 평균 단가를 관리하는 실전 매매 기술을 배웁니다.", tag: "Trading" },
  { id: 19, title: "가상자산 투자의 기초: 비트코인과 이더리움", desc: "디지털 금이라 불리는 비트코인과 스마트 컨트랙트의 선두주자 이더리움. 변동성을 기회로 바꾸는 가상자산 포트폴리오 편입 전략을 알아봅니다.", tag: "Crypto" },
  { id: 20, title: "나침반이 되어줄 '매크로 지표' 독해법", desc: "금리, 물가(CPI), 고용 지표가 주식 시장을 흔드는 이유를 아시나요? 거시 경제의 흐름을 읽고 시장의 변곡점을 포착하는 안목을 길러봅니다.", tag: "Global" },
  { id: 21, title: "투자의 시작과 끝, '포모(FOMO)' 극복하기", desc: "나만 뒤처지는 것 같은 불안감이 실패한 투자를 만듭니다. 시장의 소음에서 벗어나 나만의 속도로 자산을 불려 나가는 심리 통제술을 소개합니다.", tag: "Mind" }
];

const categories = ["ALL", "Strategy", "Analysis", "Income", "Global", "Mind"];

export default function GuidePage() {
  const [filter, setFilter] = useState("ALL");

  const filteredGuides = filter === "ALL" 
    ? investorGuides 
    : investorGuides.filter(g => g.tag === filter || (filter === "Income" && g.tag === "Income") || (filter === "Analysis" && g.tag === "Analysis"));
    // ※ Income이나 Analysis처럼 중복된 성격은 필터 로직에 따라 확장 가능

  return (
    <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: "var(--bg-color)", color: "var(--text-main)" }}>
      <main className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <header className="mb-16 text-center md:text-left">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 italic uppercase text-red-600">
            Investment <span style={{ color: "var(--text-main)" }}>Guide</span>
          </h1>
          <p className="text-lg md:text-xl font-bold opacity-70 mb-10 break-keep" style={{ color: "var(--text-sub)" }}>
            시장의 소음을 이기는 불스아이만의 <span className="text-red-600">정기 투자 인사이트</span>
          </p>

          {/* 카테고리 필터 */}
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
                  filter === cat ? "bg-red-600 text-white" : "border opacity-50 hover:opacity-100"
                }`}
                style={{ borderColor: "var(--border-color)" }}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        <div className="mb-20">
          <AdSense slot="1122334455" format="auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
          {filteredGuides.map((guide) => (
            <div key={guide.id} className="flex flex-col">
              <Link href={`/guide/${guide.id}`} className="group cursor-pointer">
                <div className="aspect-[16/10] mb-8 overflow-hidden rounded-[40px] border-2 transition-all group-hover:border-red-600 group-hover:shadow-[0_20px_50px_rgba(220,38,38,0.15)] flex items-center justify-center relative bg-neutral-100 dark:bg-neutral-900"
                  style={{
                    borderColor: "var(--border-color)"
                  }}>

                  {/* 배경 장식 텍스트 */}
                  <div className="font-black text-4xl italic uppercase tracking-tighter transition-all duration-500 opacity-10 group-hover:opacity-30 group-hover:scale-110"
                    style={{ color: "var(--text-main)" }}>
                    {guide.tag}
                  </div>

                  {/* 하단 플로팅 라벨 */}
                  <div className="absolute bottom-6 left-6 bg-white/10 backdrop-blur-md px-4 py-1 rounded-full border border-white/20">
                     <span className="text-[10px] font-black text-red-600 uppercase tracking-tighter">Bulls Eye Insight</span>
                  </div>

                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-600 font-black text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100">
                    OPEN ARTICLE
                  </div>
                </div>

                <div className="px-2">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-8 h-[2px] bg-red-600"></span>
                    <span className="text-red-600 font-black text-[10px] uppercase tracking-[0.3em]">{guide.tag}</span>
                  </div>
                  <h3 className="text-2xl font-black mb-5 group-hover:text-red-600 transition-colors leading-[1.3] break-keep" style={{ color: "var(--text-main)" }}>
                    {guide.title}
                  </h3>
                  <p className="text-[15px] font-bold leading-relaxed opacity-60 break-keep line-clamp-3" style={{ color: "var(--text-sub)" }}>
                    {guide.desc}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-32 pb-20">
          <Link href="/" className="inline-block px-14 py-6 bg-red-600 text-white rounded-full font-black text-xl hover:bg-red-700 transition shadow-2xl hover:-translate-y-2 active:scale-95">
            홈으로 돌아가기
          </Link>
        </div>
      </main>
    </div>
  );
}