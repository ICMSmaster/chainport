"use client";

import { useEffect } from "react";
import { useMarketStore } from "@/store/marketStore";
import { useLedgerStore } from "@/store/ledgerStore";
import { useUserStore } from "@/store/userStore";
import { PriceChart } from "@/components/common/PriceChart";
import { OrderPanel } from "@/components/features/market/OrderPanel";
import { OrderBookMini } from "@/components/features/market/OrderBookMini";
import { TradeHistoryList } from "@/components/features/market/TradeHistoryList";

export default function MarketPage() {
  const currentPrice = useMarketStore((s) => s.currentPrice);
  const priceHistory = useMarketStore((s) => s.priceHistory);
  const tick = useMarketStore((s) => s.tick);
  const userId = useUserStore((s) => s.currentUser.id);
  const transactions = useLedgerStore((s) => s.transactions).filter((tx) => tx.userId === userId);

  // 2초마다 시세를 자동으로 흔들어 "실시간처럼" 보이게 합니다.
  useEffect(() => {
    const interval = setInterval(() => {
      tick();
    }, 2000);
    return () => clearInterval(interval);
  }, [tick]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">CHN 거래소</h1>
        <p className="text-3xl font-bold text-teal-600 mt-2">{currentPrice.toFixed(1)}원</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 border rounded-xl p-4">
          <PriceChart data={priceHistory} />
        </div>
        <OrderBookMini price={currentPrice} />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <OrderPanel />
        <div className="md:col-span-2">
          <TradeHistoryList transactions={transactions} />
        </div>
      </div>
    </div>
  );
}