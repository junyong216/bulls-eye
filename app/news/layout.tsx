import { Metadata } from "next";

export const metadata: Metadata = {
  title: "실시간 경제 뉴스 브리핑",
  description: "시장지표, 금리전망, 주식시황 등 불스아이가 선별한 핵심 경제 뉴스를 실시간으로 확인하세요.",
  openGraph: {
    title: "실시간 경제 뉴스 브리핑 | BULL'S EYE",
    description: "시장의 소음을 제거한 투자자 전용 핵심 뉴스 큐레이션",
    url: "https://bullseye-check.vercel.app/news",
  },
};

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}