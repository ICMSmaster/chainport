"use client";

import { useMemo } from "react";

// 실제 주문 매칭 엔진이 아니라, 현재가를 기준으로 위/아래 호가를 시각적으로 만들어 보여주는 시뮬레이션입니다.
export function OrderBookMini({ price }: { price: number }) {
  const { asks, bids } = useMemo(() => {
    const asks = Array.from({ length: 5 }).map((_, i) => ({
      price: price + (5 - i) * (price * 0.002),
      qty: Number((Math.random() * 20 + 1).toFixed(1)),
    }));
    const bids = Array.from({ length: 5 }).map((_, i) => ({
      price: price - (i + 1) * (price * 0.002),
      qty: Number((Math.random() * 20 + 1).toFixed(1)),
    }));
    return { asks, bids };
  }, [price]);

  return (
    <div className="border rounded-xl p-4 text-sm">
      <h3 className="font-semibold mb-3">호가창</h3>
      <div className="space-y-1 mb-2">
        {asks.map((a, i) => (
          <div key={i} className="flex justify-between text-red-500">
            <span>{a.price.toFixed(1)}원</span>
            <span>{a.qty} CHN</span>
          </div>
        ))}
      </div>
      <div className="text-center font-bold py-1 border-y">{price.toFixed(1)}원</div>
      <div className="space-y-1 mt-2">
        {bids.map((b, i) => (
          <div key={i} className="flex justify-between text-blue-600">
            <span>{b.price.toFixed(1)}원</span>
            <span>{b.qty} CHN</span>
          </div>
        ))}
      </div>
    </div>
  );
}