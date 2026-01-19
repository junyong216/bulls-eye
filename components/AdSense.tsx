"use client";

import { useEffect } from "react";

interface AdSenseProps {
  slot: string;
  format?: "auto" | "fluid" | "rectangle" | "horizontal" | "vertical";
  responsive?: string;
  style?: React.CSSProperties;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default function AdSense({ 
  slot, 
  format = "auto", 
  responsive = "true",
  style = { display: "block", width: "100%" }
}: AdSenseProps) {
  
  useEffect(() => {
    try {
      if (typeof window !== "undefined" && window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      // 개발 환경에서 광고 유닛이 여러 번 로드될 때 발생하는 에러를 무시합니다.
      console.warn("AdSense logic handled:", err);
    }
  }, [slot]); 

  return (
    <div className="adsense-container w-full overflow-hidden flex justify-center my-4" style={{ minHeight: "100px" }}>
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client="ca-pub-3737116795159579" // 👈 본인의 ID로 교체 완료!
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </div>
  );
}