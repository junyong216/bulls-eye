"use client";

import Link from "next/link";

export default function Privacy() {
  return (
    <main className="min-h-screen bg-[#F1F5F9] text-slate-900 font-sans">
      {/* 상단 네비게이션 */}
      <nav className="h-16 border-b bg-white flex items-center justify-between px-8 sticky top-0 z-50 shadow-sm">
        <Link href="/" className="font-black text-xl text-blue-600 tracking-tighter">ECO_CHECK</Link>
        <div className="flex gap-8 text-sm font-bold text-slate-500">
          <Link href="/news" className="hover:text-blue-600 transition">뉴스</Link>
          <Link href="/stock" className="hover:text-blue-600 transition">증권</Link>
          <Link href="/dictionary" className="hover:text-blue-600 transition">용어사전</Link>
          <Link href="/recommend" className="hover:text-blue-600 transition">추천</Link>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-20">
        <header className="mb-12">
          <h1 className="text-4xl font-black text-slate-800 mb-4 tracking-tight">개인정보처리방침</h1>
          <p className="text-slate-500 font-medium">ECO_CHECK 서비스 이용과 관련하여 귀하의 개인정보가 어떻게 보호되는지 안내해 드립니다.</p>
        </header>

        <section className="bg-white p-10 rounded-[40px] border border-slate-200 shadow-lg space-y-8 text-slate-700 leading-relaxed">
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4">1. 수집하는 개인정보 항목</h2>
            <p>ECO_CHECK는 별도의 회원가입 없이 이용 가능한 서비스로, 사용자의 직접적인 개인정보(이름, 연락처 등)를 수집하지 않습니다. 다만, 서비스 이용 과정에서 쿠키나 접속 로그와 같은 기술적 정보가 생성될 수 있습니다.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4">2. 개인정보의 이용 목적</h2>
            <p>수집된 기술적 정보는 서비스 개선, 통계 분석, 그리고 사용자 경험 최적화를 위해서만 사용됩니다.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4">3. 외부 링크 관련 고지</h2>
            <p>본 서비스는 네이버 주가 검색 등 외부 사이트로의 링크를 포함하고 있습니다. 이동된 외부 사이트의 개인정보처리방침은 해당 사이트의 정책을 따르며, ECO_CHECK와 무관합니다.</p>
          </div>
        </section>

        {/* [추가] 홈으로 돌아가기 버튼 (이용약관 페이지와 통일) */}
        <div className="mt-16 text-center">
          <Link 
            href="/" 
            className="inline-block px-10 py-4 bg-slate-900 text-white rounded-full font-bold hover:bg-slate-800 transition shadow-lg"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>

      <footer className="py-12 text-center text-slate-400 text-[10px] font-bold tracking-widest uppercase mt-20">
        © 2026 ECO_CHECK. ALL RIGHTS RESERVED.
      </footer>
    </main>
  );
}