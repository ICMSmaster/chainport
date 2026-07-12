"use client";

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TokenomicsTotals } from "@/lib/adminStats";

export function TokenomicsPieChart({ totals }: { totals: TokenomicsTotals }) {
  const data = [
    { name: "판매자 지급", value: Number(totals.sellerPayout.toFixed(2)), color: "#1B4D8F" },
    { name: "회사 수익", value: Number(totals.companyRevenue.toFixed(2)), color: "#0EA5A5" },
    { name: "준비금 적립", value: Number(totals.reserveAccumulated.toFixed(2)), color: "#E0A93A" },
    { name: "토큰 소각", value: Number(totals.burned.toFixed(2)), color: "#D9534F" },
  ];

  const total = data.reduce((sum, d) => sum + d.value, 0);

  if (total === 0) {
    return <p className="text-sm text-muted-foreground py-10 text-center">아직 분배된 거래가 없습니다.</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" innerRadius={60} outerRadius={100}>
          {data.map((d) => (
            <Cell key={d.name} fill={d.color} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}