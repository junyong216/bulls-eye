"use client";

import Link from "next/link";
import DarkModeToggle from "@/components/DarkModeToggle";
import AdSense from "@/components/AdSense"; // 👈 광고 컴포넌트 추가

export default function Privacy() {
  return (
    <main className="min-h-screen font-sans transition-colors duration-300" style={{ backgroundColor: "var(--bg-color)", color: "var(--text-main)" }}>
      {/* 상단 네비게이션 */}
      <nav className="h-16 border-b flex items-center justify-between px-4 md:px-8 sticky top-0 z-50 shadow-sm" style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>
        <div className="flex items-center gap-4">
          <Link href="/" className="font-black text-xl text-red-600 tracking-tighter italic">BULL'S EYE</Link>
          <DarkModeToggle />
        </div>
        <div className="hidden md:flex gap-8 text-sm font-bold opacity-60">
          <Link href="/news" className="hover:text-red-600 transition">뉴스</Link>
          <Link href="/stock" className="hover:text-red-600 transition">증권</Link>
          <Link href="/dictionary" className="hover:text-red-600 transition">용어사전</Link>
          <Link href="/recommend" className="hover:text-red-600 transition">추천</Link>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-20">
        <header className="mb-12 text-center md:text-left">
          <h1 className="text-4xl font-black mb-4 tracking-tight">개인정보처리방침</h1>
          <p className="font-medium opacity-60">BULL'S EYE 서비스 이용과 관련하여 귀하의 개인정보가 어떻게 보호되는지 안내해 드립니다.</p>
        </header>

        {/* 📢 상단 광고 (정보성 페이지이므로 하나만 깔끔하게 배치) */}
        <div className="mb-12">
          <AdSense slot="7766554433" format="auto" />
        </div>

        <section className="p-8 md:p-12 rounded-[40px] border shadow-lg space-y-10 leading-relaxed transition-colors" 
                  style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)" }}>
          
          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-red-600 rounded-full"></span>
              1. 수집하는 개인정보 항목
            </h2>
            <p className="opacity-80">BULL'S EYE는 별도의 회원가입 없이 이용 가능한 서비스로, 사용자의 직접적인 개인정보(이름, 연락처 등)를 수집하지 않습니다. 다만, 서비스 이용 과정에서 쿠키나 접속 로그와 같은 기술적 정보가 생성될 수 있습니다.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-red-600 rounded-full"></span>
              2. 개인정보의 이용 목적
            </h2>
            <p className="opacity-80">수집된 기술적 정보는 서비스 개선, 통계 분석, 그리고 사용자 경험 최적화를 위해서만 사용됩니다.</p>
          </div>

          {/* [애드센스 승인용 필수 삽입 구간] */}
          <div className="p-6 rounded-2xl border bg-red-50/50 dark:bg-red-900/10" style={{ borderColor: "var(--accent-color)" }}>
            <h2 className="text-xl font-bold text-red-600 mb-4">3. 광고 식별자 및 쿠키 사용 고지</h2>
            <p className="text-sm md:text-base font-medium opacity-90">
              본 서비스는 맞춤형 광고 제공을 위해 <strong>Google AdMob 및 AdSense</strong>를 활용합니다. 
              이 과정에서 Google은 쿠키를 사용하여 사용자의 이전 방문 기록을 바탕으로 광고를 게재합니다. 
              사용자는 Google의 광고 설정이나 기기 설정을 통해 맞춤형 광고를 해제할 수 있습니다.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-red-600 rounded-full"></span>
              4. 외부 링크 관련 고지
            </h2>
            <p className="opacity-80">본 서비스는 외부 사이트(네이버 뉴스, 증권 정보 등)로의 링크를 포함하고 있습니다. 이동된 외부 사이트의 개인정보처리방침은 해당 사이트의 정책을 따르며, BULL'S EYE의 정책과 무관합니다.</p>
          </div>
          
          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-red-600 rounded-full"></span>
              5. 개인정보의 보유 및 파기
            </h2>
            <p className="opacity-80">BULL'S EYE는 수집된 정보를 서버에 저장하지 않으며, 서비스 개선 목적의 통계 데이터는 목적 달성 시 즉시 파기합니다.</p>
          </div>
        </section>

        {/* 홈으로 돌아가기 버튼 */}
        <div className="mt-16 text-center">
          <Link 
            href="/" 
            className="inline-block px-12 py-5 bg-red-600 text-white rounded-full font-black text-lg hover:bg-red-700 transition shadow-xl"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>

      <footer className="py-12 text-center opacity-40 text-[10px] font-bold tracking-widest border-t uppercase" style={{ borderColor: "var(--border-color)" }}>
        © 2026 BULL'S EYE. ALL RIGHTS RESERVED.
      </footer>
    </main>
  );
}