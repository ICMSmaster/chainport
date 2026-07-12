"use client";

import { Transaction } from "@/types";

export function TradeHistoryList({ transactions }: { transactions: Transaction[] }) {
  const trades = transactions
    .filter((tx) => tx.type === "EXCHANGE_BUY" || tx.type === "EXCHANGE_SELL")
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  if (trades.length === 0) {
    return <p className="text-sm text-muted-foreground py-6 text-center">체결 내역이 없습니다.</p>;
  }

  return (
    <div className="border rounded-xl p-4">
      <h3 className="font-semibold mb-3">체결 내역</h3>
      <div className="space-y-2 max-h-72 overflow-y-auto">
        {trades.map((tx) => (
          <div key={tx.id} className="flex justify-between text-sm border-b pb-2">
            <span className={tx.type === "EXCHANGE_BUY" ? "text-blue-600" : "text-red-500"}>
              {tx.type === "EXCHANGE_BUY" ? "매수" : "매도"}
            </span>
            <span>{tx.amountChn?.toFixed(2)} CHN</span>
            <span className="text-muted-foreground">{tx.amountKrw ? `${Math.round(tx.amountKrw).toLocaleString()}원` : "-"}</span>
            <span className="text-xs text-muted-foreground">{new Date(tx.createdAt).toLocaleTimeString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}