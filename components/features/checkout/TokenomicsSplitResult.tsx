"use client";

import { motion } from "framer-motion";
import { TokenomicsSplit } from "@/lib/tokenomics";

const ITEMS: { key: keyof TokenomicsSplit; label: string; color: string }[] = [
  { key: "seller", label: "판매자 지급", color: "#1B4D8F" },
  { key: "company", label: "회사 수익", color: "#0EA5A5" },
  { key: "reserve", label: "준비금 적립", color: "#E0A93A" },
  { key: "burn", label: "토큰 소각", color: "#D9534F" },
];

export function TokenomicsSplitResult({ split, totalChn }: { split: TokenomicsSplit; totalChn: number }) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        총 {totalChn.toFixed(2)} CHN이 스마트 컨트랙트에 의해 자동으로 아래와 같이 분배되었습니다.
      </p>
      {ITEMS.map((item) => {
        const value = split[item.key];
        const percent = totalChn > 0 ? (value / totalChn) * 100 : 0;
        return (
          <div key={item.key}>
            <div className="flex justify-between text-sm mb-1">
              <span>{item.label}</span>
              <span className="font-medium">
                {value.toFixed(2)} CHN ({percent.toFixed(0)}%)
              </span>
            </div>
            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${percent}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{ backgroundColor: item.color, height: "100%" }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}