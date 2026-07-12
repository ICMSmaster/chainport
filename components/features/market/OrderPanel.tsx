"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useWalletStore } from "@/store/walletStore";
import { useMarketStore } from "@/store/marketStore";
import { processExchange } from "@/lib/tokenomics";

export function OrderPanel() {
  const [tab, setTab] = useState<"BUY" | "SELL">("BUY");
  const [amount, setAmount] = useState("");
  const { krwBalance, chnBalance } = useWalletStore();
  const price = useMarketStore((s) => s.currentPrice);

  const value = Number(amount) || 0;
  // 매수 탭에서는 "쓸 KRW 금액"을, 매도 탭에서는 "팔 CHN 수량"을 입력받습니다.
  const estimated = tab === "BUY" ? value / price : value * price;
  const insufficient = tab === "BUY" ? value > krwBalance : value > chnBalance;

  const handleSubmit = () => {
    if (!value || value <= 0 || insufficient) return;
    processExchange(tab === "BUY" ? "KRW_TO_CHN" : "CHN_TO_KRW", value);
    setAmount("");
  };

  return (
    <div className="border rounded-xl p-5 space-y-4">
      <div className="flex gap-2">
        <Button
          className="flex-1"
          variant={tab === "BUY" ? "default" : "outline"}
          onClick={() => { setTab("BUY"); setAmount(""); }}
        >
          매수
        </Button>
        <Button
          className="flex-1"
          variant={tab === "SELL" ? "default" : "outline"}
          onClick={() => { setTab("SELL"); setAmount(""); }}
        >
          매도
        </Button>
      </div>

      <p className="text-sm text-muted-foreground">
        현재가 <strong>{price.toFixed(1)}원</strong> / CHN
      </p>

      <div className="space-y-2">
        <label className="text-sm">{tab === "BUY" ? "주문 금액 (KRW)" : "주문 수량 (CHN)"}</label>
        <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <p className="text-xs text-muted-foreground">
          보유: {tab === "BUY" ? `${krwBalance.toLocaleString()}원` : `${chnBalance.toFixed(2)} CHN`}
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg p-3 text-sm">
        예상 {tab === "BUY" ? "체결 수량" : "수령 금액"}:{" "}
        <strong>{tab === "BUY" ? `${estimated.toFixed(2)} CHN` : `${Math.round(estimated).toLocaleString()}원`}</strong>
      </div>

      {insufficient && <p className="text-sm text-red-500">잔액이 부족합니다.</p>}

      <Button className="w-full" disabled={!value || insufficient} onClick={handleSubmit}>
        {tab === "BUY" ? "매수 주문 체결" : "매도 주문 체결"}
      </Button>
    </div>
  );
}