"use client";

import { useEffect, useState } from "react";
import { Investment, InvestmentProduct } from "@/types";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { processInvestWithdraw } from "@/lib/tokenomics";

export function MyInvestmentList({
  investments,
  products,
}: {
  investments: Investment[];
  products: InvestmentProduct[];
}) {
  // 1초마다 화면을 다시 그려서 진행률 바가 실시간으로 움직이게 합니다.
  const [, setTick] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const active = investments.filter((i) => i.status === "active");

  if (active.length === 0) {
    return <p className="text-sm text-muted-foreground py-10 text-center">진행 중인 투자가 없습니다.</p>;
  }

  const handleWithdraw = (investmentId: string) => {
    const res = processInvestWithdraw(investmentId);
    if (res?.isMatured) {
      alert(`만기 해지 완료! 원금+수익 ${res.totalReturn.toFixed(2)} CHN을 받았습니다.`);
    } else {
      alert(`중도 해지되었습니다. 원금 ${res?.totalReturn.toFixed(2)} CHN만 반환됩니다 (수익 없음).`);
    }
  };

  return (
    <div className="space-y-4">
      {active.map((inv) => {
        const product = products.find((p) => p.id === inv.productId);
        const start = new Date(inv.startedAt).getTime();
        const end = new Date(inv.maturesAt).getTime();
        const now = Date.now();
        const progress = Math.min(100, Math.max(0, ((now - start) / (end - start)) * 100));
        const isMatured = now >= end;

        return (
          <div key={inv.id} className="border rounded-xl p-4 space-y-3">
            <div className="flex justify-between items-center">
              <p className="font-medium">{product?.name ?? "상품 정보 없음"}</p>
              <span className="text-sm">{inv.principalChn.toFixed(2)} CHN 예치</span>
            </div>
            <Progress value={progress} />
            <div className="flex justify-between items-center text-xs text-muted-foreground">
              <span>{isMatured ? "만기 도달 ✅" : `진행률 ${progress.toFixed(0)}%`}</span>
              <span>
                예상 수익: {(inv.principalChn * (product?.expectedYieldRate ?? 0)).toFixed(2)} CHN
              </span>
            </div>
            <Button
              size="sm"
              variant={isMatured ? "default" : "outline"}
              className="w-full"
              onClick={() => handleWithdraw(inv.id)}
            >
              {isMatured ? "만기 해지 (원금+수익 받기)" : "중도 해지 (수익 없이 원금만)"}
            </Button>
          </div>
        );
      })}
    </div>
  );
}