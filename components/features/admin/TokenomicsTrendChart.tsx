"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from "recharts";
import { Transaction } from "@/types";
import { computeTrendData } from "@/lib/adminStats";

export function TokenomicsTrendChart({ transactions }: { transactions: Transaction[] }) {
  const data = computeTrendData(transactions);

  if (data.length === 0) {
    return <p className="text-sm text-muted-foreground py-10 text-center">아직 분배 이력이 없습니다.</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
        <XAxis dataKey="index" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="판매자" stroke="#1B4D8F" dot={false} />
        <Line type="monotone" dataKey="회사" stroke="#0EA5A5" dot={false} />
        <Line type="monotone" dataKey="준비금" stroke="#E0A93A" dot={false} />
        <Line type="monotone" dataKey="소각" stroke="#D9534F" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}