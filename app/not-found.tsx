"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center transition-colors duration-300 px-8 overflow-hidden" 
         style={{ backgroundColor: "var(--bg-color)" }}>
      
      {/* 배경 장식 요소: 거대한 404 텍스트 */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
        <span className="text-[40vw] font-black italic tracking-tighter">404</span>
      </div>

      <div className="relative z-10 text-center">
        {/* 에러 코드 강조 */}
        <div className="mb-2 inline-block px-4 py-1 bg-red-600 text-white text-xs font-black tracking-[0.4em] uppercase rounded-full shadow-lg animate-bounce">
          Error Code
        </div>
        
        <h1 className="text-[100px] md:text-[180px] font-black leading-none tracking-tighter italic text-red-600 mb-4">
          404<span className="text-slate-200 dark:text-slate-800">!</span>
        </h1>

        <h2 className="text-3xl md:text-4xl font-black mb-6 tracking-tight uppercase" style={{ color: "var(--text-main)" }}>
          Lost in the Market?
        </h2>

        <p className="text-[15px] font-bold opacity-50 mb-12 leading-relaxed max-w-md mx-auto" style={{ color: "var(--text-sub)" }}>
          요청하신 페이지가 시장에서 증발했거나 주소가 잘못되었습니다.<br/>
          당황하지 마시고 BULL'S EYE의 안전한 메인 베이스로 복귀하세요.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/" 
                className="px-12 py-5 bg-red-600 text-white rounded-2xl font-black text-lg hover:bg-red-700 transition-all shadow-2xl hover:-translate-y-1 uppercase tracking-tighter italic">
            Back to Dashboard
          </Link>
          
          <button onClick={() => window.history.back()} 
                  className="px-8 py-5 border-2 rounded-2xl font-black text-sm transition-all hover:bg-slate-100 dark:hover:bg-slate-800 uppercase"
                  style={{ borderColor: "var(--border-color)", color: "var(--text-main)" }}>
            Previous Page
          </button>
        </div>
      </div>

      {/* 하단 데코레이션 라인 */}
      <div className="absolute bottom-10 left-0 w-full flex justify-center gap-2 opacity-20">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-1 w-12 bg-red-600 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}></div>
        ))}
      </div>
    </div>
  );
}