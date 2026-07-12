"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Transaction } from "@/types";

export function AssetTrendChart({ transactions }: { transactions: Transaction[] }) {
  // 시간 순으로 정렬 후, CHN 잔액이 어떻게 누적되어왔는지 계산합니다.
  const sorted = [...transactions].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  let chnRunning = 0;
  const data = sorted.map((tx, idx) => {
    const isIncoming = ["EXCHANGE_BUY", "REVIEW_REWARD", "TOKENOMICS_SPLIT", "INVEST_RETURN"].includes(tx.type);
    const isOutgoing = ["EXCHANGE_SELL", "PURCHASE", "INVEST_DEPOSIT", "AD_PAYMENT"].includes(tx.type);
    if (tx.amountChn) {
      if (isIncoming) chnRunning += tx.amountChn;
      if (isOutgoing) chnRunning -= tx.amountChn;
    }
    return { index: idx + 1, chn: Number(chnRunning.toFixed(2)) };
  });

  if (data.length === 0) {
    return <p className="text-sm text-muted-foreground py-10 text-center">아직 거래 내역이 없습니다.</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
        <XAxis dataKey="index" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip formatter={(v: number) => [`${v} CHN`, "누적 변화"]} />
        <Line type="monotone" dataKey="chn" stroke="#0EA5A5" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}