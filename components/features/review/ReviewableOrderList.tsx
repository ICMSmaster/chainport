"use client";

import { useState } from "react";
import { Order } from "@/types";
import { useProductStore } from "@/store/productStore";
import { StarRating } from "./StarRating";
import { Button } from "@/components/ui/button";
import { processReview } from "@/lib/tokenomics";

export function ReviewableOrderList({
  orders,
  onRewarded,
}: {
  orders: Order[];
  onRewarded: (chn: number) => void;
}) {
  const products = useProductStore((s) => s.products);
  const [openOrderId, setOpenOrderId] = useState<string | null>(null);
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState("");

  if (orders.length === 0) {
    return <p className="text-sm text-muted-foreground py-10 text-center">리뷰를 작성할 수 있는 주문이 없습니다. 상품을 구매해보세요!</p>;
  }

  const handleSubmit = (order: Order) => {
    if (!content.trim()) {
      alert("리뷰 내용을 입력해주세요.");
      return;
    }
    const productId = order.items[0]?.productId;
    if (!productId) return;
    const reward = processReview({ orderId: order.id, productId, rating, content });
    onRewarded(reward);
    setOpenOrderId(null);
    setRating(5);
    setContent("");
  };

  return (
    <div className="space-y-4">
      {orders.map((order) => {
        const firstItem = order.items[0];
        const product = products.find((p) => p.id === firstItem?.productId);
        const isOpen = openOrderId === order.id;

        return (
          <div key={order.id} className="border rounded-xl p-4">
            <div className="flex items-center gap-4">
              <img
                src={product?.thumbnailUrl}
                alt={product?.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <p className="font-medium">{product?.name ?? "상품 정보 없음"}</p>
                <p className="text-xs text-muted-foreground">
                  {order.totalKrw.toLocaleString()}원 · {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              {!isOpen && (
                <Button size="sm" onClick={() => setOpenOrderId(order.id)}>
                  리뷰 작성
                </Button>
              )}
            </div>

            {isOpen && (
              <div className="mt-4 pt-4 border-t space-y-3">
                <StarRating value={rating} onChange={setRating} />
                <textarea
                  className="w-full border rounded-lg p-3 text-sm min-h-[90px]"
                  placeholder="상품 사용 후기를 남겨주세요."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" size="sm" onClick={() => setOpenOrderId(null)}>
                    취소
                  </Button>
                  <Button size="sm" onClick={() => handleSubmit(order)}>
                    리뷰 등록하고 CHN 받기
                  </Button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}