"use client";

import Link from "next/link";

// 경제 용어 데이터
const economicTerms = [
  { term: "공포와 탐욕 지수", definition: "투자 심리를 나타내는 지표로, 0에 가까울수록 극단적 공포를, 100에 가까울수록 극단적 낙관을 의미합니다." },
  { term: "환율 (Exchange Rate)", definition: "한 나라의 화폐와 다른 나라 화폐의 교환 비율입니다. 보통 1달러당 원화 가격으로 표시합니다." },
  { term: "금리 (Interest Rate)", definition: "빌려준 돈에 대한 이자율입니다. 중앙은행이 금리를 올리면 시장의 돈이 줄어들어 물가가 잡힙니다." },
  { term: "인플레이션", definition: "물가가 지속적으로 상승하여 화폐 가치가 떨어지는 현상을 말합니다." },
  { term: "데드캣 바운스", definition: "주가가 급락하다가 잠깐 소폭 반등하는 현상으로, 하락장에서 일시적인 회복을 의미합니다." },
  { term: "FOMC", definition: "미국의 중앙은행인 연방준비제도(Fed) 내에서 통화정책을 결정하는 회의입니다." },
  { term: "스태그플레이션", definition: "경기 불황과 물가 상승이 동시에 발생하는 최악의 경제 상태를 뜻합니다." },
  { term: "양적 완화", definition: "중앙은행이 시장에 돈을 직접 풀어서 경기를 부양시키는 정책입니다." },
];

export default function Dictionary() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* 상단 네비게이션: 뉴스, 증권 메뉴 추가 및 용어사전 활성화 */}
      <nav className="h-16 bg-white border-b border-slate-200 flex items-center px-8 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto w-full flex justify-between items-center">
          <Link href="/" className="font-black text-xl text-blue-600 tracking-tighter">ECO_CHECK</Link>
          <div className="flex gap-8">
            <Link href="/news" className="text-sm font-bold text-slate-500 hover:text-blue-600 transition">뉴스</Link>
            <Link href="/stock" className="text-sm font-bold text-slate-500 hover:text-blue-600 transition">증권</Link>
            <Link href="/dictionary" className="text-sm font-bold text-blue-600">용어사전</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-20">
        <header className="mb-12">
          <h1 className="text-5xl font-black text-slate-900 mb-4 tracking-tight">용어사전</h1>
          <p className="text-slate-500 font-medium text-lg text-center md:text-left">초보 투자자를 위한 핵심 경제 용어 해설</p>
        </header>

        {/* 용어 리스트 */}
        <div className="grid gap-4">
          {economicTerms.map((item, index) => (
            <div key={index} className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 hover:border-blue-300 transition-all hover:shadow-md group">
              <h2 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 mb-3">{item.term}</h2>
              <p className="text-slate-500 leading-relaxed text-sm md:text-base">{item.definition}</p>
            </div>
          ))}
        </div>

        {/* 하단 버튼 */}
        <div className="mt-20 text-center">
          <Link href="/" className="inline-block px-10 py-4 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition shadow-lg">
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </main>
  );
}