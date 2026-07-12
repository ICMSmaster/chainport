"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

interface PricePoint {
  time: string;
  price: number;
}

export function PriceChart({ data }: { data: PricePoint[] }) {
  const formatted = data.map((d, idx) => ({
    index: idx + 1,
    price: Number(d.price.toFixed(1)),
  }));

  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={formatted}>
        <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
        <XAxis dataKey="index" tick={{ fontSize: 12 }} />
        <YAxis domain={["auto", "auto"]} tick={{ fontSize: 12 }} />
        <Tooltip formatter={(v) => [`${v}원`, "CHN 시세"]} />
        <Line type="monotone" dataKey="price" stroke="#1B4D8F" strokeWidth={2} dot={false} isAnimationActive={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}