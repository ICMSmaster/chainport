"use client";

import { Button } from "@/components/ui/button";
import { AdPlan, Product } from "@/types";
import { useWalletStore } from "@/store/walletStore";

export function AdPaymentSummary({
  product,
  plan,
  onConfirm,
}: {
  product: Product | null;
  plan: AdPlan | null;
  onConfirm: () => void;
}) {
  const chnBalance = useWalletStore((s) => s.chnBalance);

  if (!product || !plan) {
    return (
      <div className="border rounded-xl p-5 text-sm text-muted-foreground">
        상품과 광고 플랜을 먼저 선택해주세요.
      </div>
    );
  }

  const insufficient = chnBalance < plan.costChn;

  return (
    <div className="border rounded-xl p-5 space-y-3">
      <h3 className="font-semibold">결제 요약</h3>
      <div className="text-sm space-y-1">
        <div className="flex justify-between">
          <span>광고 상품</span>
          <span>{product.name}</span>
        </div>
        <div className="flex justify-between">
          <span>플랜</span>
          <span>{plan.label}</span>
        </div>
        <div className="flex justify-between font-bold border-t pt-2 mt-2">
          <span>결제 금액</span>
          <span>{plan.costChn} CHN</span>
        </div>
        <p className="text-xs text-muted-foreground">보유: {chnBalance.toFixed(2)} CHN</p>
      </div>
      {insufficient && <p className="text-sm text-red-500">CHN 잔액이 부족합니다.</p>}
      <Button className="w-full" disabled={insufficient} onClick={onConfirm}>
        CHN으로 광고 결제
      </Button>
    </div>
  );
}