import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-8">
      <h1 className="text-[120px] font-black text-slate-100 leading-none">404</h1>
      <h2 className="text-3xl font-black text-slate-900 mt-[-40px] mb-4">길을 잃으셨나요?</h2>
      <p className="text-slate-500 text-center mb-10 leading-relaxed font-medium">
        요청하신 페이지가 사라졌거나 주소가 잘못되었습니다.<br/>메인으로 돌아가서 다시 시작해 보세요.
      </p>
      <Link href="/" className="px-10 py-4 bg-blue-600 text-white rounded-full font-black hover:bg-blue-700 shadow-xl transition-all">
        메인으로 돌아가기
      </Link>
    </div>
  );
}