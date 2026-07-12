"use client";

import { useState } from "react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useWalletStore } from "@/store/walletStore";
import { useMarketStore } from "@/store/marketStore";
import { processExchange } from "@/lib/tokenomics";

export function ExchangeModal() {
  const [open, setOpen] = useState(false);
  const [direction, setDirection] = useState<"KRW_TO_CHN" | "CHN_TO_KRW">("KRW_TO_CHN");
  const [amount, setAmount] = useState("");
  const { krwBalance, chnBalance } = useWalletStore();
  const price = useMarketStore((s) => s.currentPrice);

  const value = Number(amount) || 0;
  const estimated = direction === "KRW_TO_CHN" ? value / price : value * price;
  const insufficient =
    direction === "KRW_TO_CHN" ? value > krwBalance : value > chnBalance;

  const handleExchange = () => {
    if (!value || value <= 0 || insufficient) return;
    processExchange(direction, value);
    setAmount("");
    setOpen(false);
  };

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>환전하기</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>KRW ↔ CHN 환전</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <p className="text-sm text-muted-foreground">현재 시세: 1 CHN = {price.toFixed(1)}원</p>

            <div className="flex gap-2">
              <Button
                size="sm"
                className="flex-1"
                variant={direction === "KRW_TO_CHN" ? "default" : "outline"}
                onClick={() => { setDirection("KRW_TO_CHN"); setAmount(""); }}
              >
                KRW → CHN
              </Button>
              <Button
                size="sm"
                className="flex-1"
                variant={direction === "CHN_TO_KRW" ? "default" : "outline"}
                onClick={() => { setDirection("CHN_TO_KRW"); setAmount(""); }}
              >
                CHN → KRW
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="exchange-amount">
                {direction === "KRW_TO_CHN" ? "보낼 KRW 금액" : "보낼 CHN 수량"}
              </Label>
              <Input
                id="exchange-amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                보유: {direction === "KRW_TO_CHN"
                  ? `${krwBalance.toLocaleString()}원`
                  : `${chnBalance.toFixed(2)} CHN`}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-3 text-sm">
              받을 수량: <strong>
                {direction === "KRW_TO_CHN" ? `${estimated.toFixed(2)} CHN` : `${estimated.toLocaleString()}원`}
              </strong>
            </div>

            {insufficient && <p className="text-sm text-red-500">잔액이 부족합니다.</p>}
          </div>
          <DialogFooter>
            <Button className="w-full" disabled={!value || insufficient} onClick={handleExchange}>
              환전 완료
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}