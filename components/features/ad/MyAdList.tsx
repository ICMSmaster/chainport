"use client";

import { useEffect, useState } from "react";
import { Advertisement, Product, AdPlan } from "@/types";
import { checkAndExpireAds } from "@/lib/tokenomics";

export function MyAdList({
  ads,
  products,
  plans,
}: {
  ads: Advertisement[];
  products: Product[];
  plans: AdPlan[];
}) {
  const [, setTick] = useState(0);

  // 1초마다 화면을 갱신하면서, 기간이 끝난 광고를 자동으로 종료 처리합니다.
  useEffect(() => {
    const interval = setInterval(() => {
      checkAndExpireAds();
      setTick((t) => t + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (ads.length === 0) {
    return <p className="text-sm text-muted-foreground py-10 text-center">집행한 광고가 없습니다.</p>;
  }

  const sorted = [...ads].sort((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime());

  return (
    <div className="space-y-3">
      {sorted.map((ad) => {
        const product = products.find((p) => p.id === ad.productId);
        const plan = plans.find((p) => p.id === ad.planId);
        const remainingMs = new Date(ad.endsAt).getTime() - Date.now();
        const remainingSec = Math.max(0, Math.ceil(remainingMs / 1000));

        return (
          <div key={ad.id} className="border rounded-xl p-4 flex items-center gap-4">
            <img src={product?.thumbnailUrl} alt={product?.name} className="w-14 h-14 rounded-lg object-cover" />
            <div className="flex-1">
              <p className="font-medium text-sm">{product?.name ?? "상품 정보 없음"}</p>
              <p className="text-xs text-muted-foreground">{plan?.label} · {plan?.costChn} CHN 결제</p>
            </div>
            <div className="text-right">
              {ad.status === "active" ? (
                <span className="text-xs text-teal-600 font-medium">남은 시간 {remainingSec}초</span>
              ) : (
                <span className="text-xs text-muted-foreground">집행 종료</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}