"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center transition-colors duration-300 px-8 overflow-hidden relative" 
         style={{ backgroundColor: "var(--bg-color)" }}>
      
      {/* 배경 장식 요소: 거대한 404 텍스트 */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
        <span className="text-[40vw] font-black italic tracking-tighter" style={{ color: "var(--text-main)" }}>404</span>
      </div>

      <div className="relative z-10 text-center">
        {/* 에러 코드 강조 애니메이션 태그 */}
        <div className="mb-4 inline-block px-5 py-1.5 bg-red-600 text-white text-[10px] font-black tracking-[0.4em] uppercase rounded-full shadow-2xl animate-bounce">
          System Alert: Error Code
        </div>
        
        <h1 className="text-[100px] md:text-[200px] font-black leading-none tracking-tighter italic text-red-600 mb-6 drop-shadow-2xl">
          404<span className="text-slate-300 dark:text-slate-800">!</span>
        </h1>

        <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tighter uppercase italic" style={{ color: "var(--text-main)" }}>
          LOST IN THE MARKET?
        </h2>

        <p className="text-[14px] md:text-[16px] font-bold opacity-60 mb-12 leading-relaxed max-w-md mx-auto" style={{ color: "var(--text-main)" }}>
          요청하신 페이지가 시장에서 증발했거나 주소가 잘못되었습니다.<br/>
          당황하지 마시고 <span className="text-red-600">BULL'S EYE</span>의 안전한 메인 베이스로 복귀하세요.
        </p>

        {/* 액션 버튼 섹션 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/" 
                className="px-14 py-6 bg-red-600 text-white rounded-2xl font-black text-xl hover:bg-red-700 transition-all shadow-2xl hover:-translate-y-1 uppercase tracking-tighter italic active:scale-95">
            Back to Dashboard
          </Link>
          
          <button onClick={() => window.history.back()} 
                  className="px-10 py-6 border-2 rounded-2xl font-black text-sm transition-all hover:bg-slate-100 dark:hover:bg-slate-800 uppercase tracking-widest active:scale-95"
                  style={{ borderColor: "var(--border-color)", color: "var(--text-main)" }}>
            Previous Page
          </button>
        </div>
      </div>

      {/* 하단 데코레이션 라인 (데이터 스캔 느낌) */}
      <div className="absolute bottom-12 left-0 w-full flex justify-center gap-3 opacity-30">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-1.5 w-16 bg-red-600 rounded-full animate-pulse" 
               style={{ animationDelay: `${i * 0.15}s` }}></div>
        ))}
      </div>
    </div>
  );
}