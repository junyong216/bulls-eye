"use client";

import Link from "next/link";
import AdSense from "@/components/AdSense"; // 👈 광고 컴포넌트 추가

export default function Terms() {
  return (
    <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: "var(--bg-color)", color: "var(--text-main)" }}>
      {/* 상단 네비게이션 */}
      <nav className="h-16 border-b flex items-center px-8 sticky top-0 z-[100]" 
           style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>
        <Link href="/" className="font-black text-2xl text-red-600 tracking-tighter italic">BULL'S EYE</Link>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-24">
        <header className="mb-16">
          <div className="text-red-600 font-black text-xs tracking-[0.3em] uppercase mb-4">Legal Notice</div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter italic uppercase">Terms of Service</h1>
          <p className="text-sm font-bold opacity-50 uppercase tracking-widest">이용약관 및 투자 책임 면책 고지</p>
        </header>

        {/* 📢 상단 헤더 아래 광고 배치 */}
        <div className="mb-16">
          <AdSense slot="1234567890" format="auto" />
        </div>
        
        <div className="space-y-16 text-slate-600 leading-relaxed">
          <section className="relative">
            <h2 className="text-2xl font-black mb-6 flex items-center gap-3" style={{ color: "var(--text-main)" }}>
              <span className="text-red-600 text-sm">01.</span> 서비스의 목적
            </h2>
            <p className="text-[15px] font-bold leading-8 opacity-80" style={{ color: "var(--text-sub)" }}>
              본 서비스(BULL'S EYE)는 사용자에게 공포탐욕지수, 실시간 지수, 환율 정보 등 주요 경제 지표를 직관적으로 제공하고, 올바른 경제 지식 함양을 돕는 것을 목적으로 합니다.
            </p>
          </section>

          <section className="relative">
            <h2 className="text-2xl font-black mb-6 flex items-center gap-3 text-red-600">
              <span className="text-red-600 text-sm">02.</span> 투자 책임 면책 조항
            </h2>
            <div className="p-8 rounded-[32px] border-2 border-red-600 bg-red-50/50 dark:bg-red-900/10">
              <p className="text-[15px] font-black leading-8 text-red-600 mb-2">
                [경고] 본 서비스에서 제공하는 모든 데이터는 투자 참고용입니다.
              </p>
              <p className="text-[15px] font-bold leading-8 text-slate-700 dark:text-slate-300">
                어떠한 경우에도 본 서비스의 정보는 투자 결과에 대한 법적 책임 소재의 증빙 자료로 사용될 수 없습니다. 모든 투자 결정의 최종 책임은 사용자 본인에게 있음을 명시합니다.
              </p>
            </div>
          </section>

          {/* 📢 중간 면책 조항 아래 광고 배치 */}
          <div className="my-16">
            <AdSense slot="0987654321" format="horizontal" />
          </div>

          <section className="relative">
            <h2 className="text-2xl font-black mb-6 flex items-center gap-3" style={{ color: "var(--text-main)" }}>
              <span className="text-red-600 text-sm">03.</span> 데이터의 정확성
            </h2>
            <p className="text-[15px] font-bold leading-8 opacity-80" style={{ color: "var(--text-sub)" }}>
              본 서비스는 외부 공신력 있는 API를 통해 데이터를 제공받으나, 네트워크 환경이나 기술적 오류로 인해 실제 시장 데이터와 미세한 차이가 발생할 수 있습니다. 운영자는 데이터의 절대적 정확성을 보장하지 않습니다.
            </p>
          </section>

          <section className="relative">
            <h2 className="text-2xl font-black mb-6 flex items-center gap-3" style={{ color: "var(--text-main)" }}>
              <span className="text-red-600 text-sm">04.</span> 서비스의 중단 및 변경
            </h2>
            <p className="text-[15px] font-bold leading-8 opacity-80" style={{ color: "var(--text-sub)" }}>
              운영자는 더 나은 서비스 제공을 위한 시스템 점검, 서버 교체 등 필요한 경우 사전 고지 없이 서비스의 일부 또는 전부를 중단하거나 업데이트할 수 있습니다.
            </p>
          </section>

          <div className="pt-10 border-t border-dashed" style={{ borderColor: "var(--border-color)" }}>
            <p className="text-xs font-black opacity-40 uppercase tracking-[0.2em]">Effective Date: 2026. 01. 15</p>
          </div>
        </div>

        {/* 📢 하단 버튼 위 광고 배치 */}
        <div className="mt-16">
          <AdSense slot="1122334455" format="auto" />
        </div>

        <div className="mt-24 text-center">
          <Link href="/" 
                className="inline-block px-12 py-5 bg-red-600 text-white rounded-2xl font-black text-sm hover:bg-red-700 transition-all shadow-2xl hover:-translate-y-1 uppercase tracking-widest">
            홈으로 돌아가기
          </Link>
        </div>
      </main>

      <footer className="py-12 text-center text-[10px] font-black tracking-[0.3em] opacity-30 uppercase">
        © 2026 BULL'S EYE. LEGAL DEPT.
      </footer>
    </div>
  );
}