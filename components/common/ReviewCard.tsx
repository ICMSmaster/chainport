"use client";

import { Review } from "@/types";
import { useProductStore } from "@/store/productStore";
import { StarRating } from "@/components/features/review/StarRating";

export function ReviewCard({ review }: { review: Review }) {
  const product = useProductStore((s) => s.products.find((p) => p.id === review.productId));

  return (
    <div className="border rounded-xl p-4">
      <div className="flex items-center justify-between mb-2">
        <p className="font-medium">{product?.name ?? "상품 정보 없음"}</p>
        <span className="text-xs text-teal-600 font-medium">+{review.rewardChn} CHN 획득</span>
      </div>
      <StarRating value={review.rating} readOnly />
      <p className="text-sm text-muted-foreground mt-2">{review.content}</p>
      <p className="text-xs text-muted-foreground mt-2">
        {new Date(review.createdAt).toLocaleString()}
      </p>
    </div>
  );
}