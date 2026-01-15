"use client";

import Link from "next/link";

export default function Terms() {
  return (
    <div className="min-h-screen bg-white">
      {/* 상단 네비게이션 */}
      <nav className="h-16 border-b flex items-center px-8">
        <Link href="/" className="font-black text-blue-600 tracking-tighter">ECO_CHECK</Link>
      </nav>

      <main className="max-w-3xl mx-auto px-8 py-20">
        <h1 className="text-3xl font-black mb-10 tracking-tight">이용약관 (Terms of Service)</h1>
        
        <div className="space-y-10 text-slate-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">1. 서비스의 목적</h2>
            <p>본 서비스(ECO_CHECK)는 사용자에게 공포탐욕지수, 환율 정보 등 주요 경제 지표를 실시간으로 제공하고, 경제 지식 함양을 돕는 것을 목적으로 합니다.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 text-red-500">2. 투자 책임 면책 조항 (중요)</h2>
            <p className="bg-red-50 p-4 rounded-xl text-slate-700">
              본 사이트에서 제공하는 모든 정보는 투자 참고용이며, 어떠한 경우에도 투자 결과에 대한 법적 책임 소재의 증빙 자료로 사용될 수 없습니다. 모든 투자 결정의 책임은 사용자 본인에게 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">3. 데이터의 정확성</h2>
            <p>본 서비스는 외부 API를 통해 데이터를 제공받으며, 기술적 지연이나 오류로 인해 실제 데이터와 차이가 발생할 수 있습니다. 운영자는 데이터의 100% 정확성을 보장하지 않습니다.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">4. 서비스의 중단</h2>
            <p>운영자는 시스템 점검, 서버 교체 등 필요한 경우 사전 고지 없이 서비스의 일부 또는 전부를 중단할 수 있습니다.</p>
          </section>

          <p className="text-sm text-slate-400 mt-20">시행일자: 2026년 1월 15일</p>
        </div>

        <div className="mt-20 border-t pt-10 text-center">
          <Link href="/" className="px-6 py-3 bg-slate-900 text-white rounded-full font-bold text-sm hover:bg-slate-800 transition">
            홈으로 돌아가기
          </Link>
        </div>
      </main>
    </div>
  );
}