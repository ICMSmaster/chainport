"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { InvestmentProduct } from "@/types";

export function YieldProjectionChart({ products }: { products: InvestmentProduct[] }) {
  // 100 CHN을 각 상품에 예치했다고 가정했을 때 예상 수익을 비교해서 보여줍니다.
  const data = products.map((p) => ({
    name: p.name,
    원금: 100,
    예상수익: Number((100 * p.expectedYieldRate).toFixed(1)),
  }));

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip />
        <Legend />
        <Bar dataKey="원금" fill="#94A3B8" radius={[4, 4, 0, 0]} />
        <Bar dataKey="예상수익" fill="#0EA5A5" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}