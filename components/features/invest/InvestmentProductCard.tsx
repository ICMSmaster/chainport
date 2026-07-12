"use client";

import { useState } from "react";
import { InvestmentProduct } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useWalletStore } from "@/store/walletStore";
import { processInvestDeposit } from "@/lib/tokenomics";

export function InvestmentProductCard({ product }: { product: InvestmentProduct }) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const chnBalance = useWalletStore((s) => s.chnBalance);

  const value = Number(amount) || 0;
  const insufficient = value > chnBalance;
  const tooLow = value > 0 && value < product.minAmountChn;

  const handleInvest = () => {
    if (!value || insufficient || tooLow) return;
    processInvestDeposit(product, value);
    setAmount("");
    setOpen(false);
    alert(`${product.name}에 ${value} CHN을 예치했습니다.`);
  };

  return (
    <div className="border rounded-xl p-5 space-y-3">
      <h3 className="font-semibold">{product.name}</h3>
      <div className="text-sm text-muted-foreground space-y-1">
        <p>락업 기간: {product.lockupDays}일</p>
        <p>예상 수익률: <span className="text-teal-600 font-medium">+{Math.round(product.expectedYieldRate * 100)}%</span></p>
        <p>최소 예치: {product.minAmountChn} CHN</p>
      </div>

      {!open ? (
        <Button className="w-full" onClick={() => setOpen(true)}>
          예치하기
        </Button>
      ) : (
        <div className="space-y-2 pt-2 border-t">
          <Input
            type="number"
            placeholder={`최소 ${product.minAmountChn} CHN`}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">보유: {chnBalance.toFixed(2)} CHN</p>
          {insufficient && <p className="text-xs text-red-500">잔액이 부족합니다.</p>}
          {tooLow && <p className="text-xs text-red-500">최소 예치 금액 미만입니다.</p>}
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" size="sm" onClick={() => setOpen(false)}>
              취소
            </Button>
            <Button className="flex-1" size="sm" disabled={!value || insufficient || tooLow} onClick={handleInvest}>
              확인
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}