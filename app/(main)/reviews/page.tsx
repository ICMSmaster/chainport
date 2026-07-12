"use client";

import { useState } from "react";
import { useOrderStore } from "@/store/orderStore";
import { useReviewStore } from "@/store/reviewStore";
import { useUserStore } from "@/store/userStore";
import { Button } from "@/components/ui/button";
import { ReviewableOrderList } from "@/components/features/review/ReviewableOrderList";
import { ReviewCard } from "@/components/common/ReviewCard";
import { RewardToast } from "@/components/common/RewardToast";

export default function ReviewsPage() {
  const [tab, setTab] = useState<"todo" | "done">("todo");
  const [rewardToast, setRewardToast] = useState<number | null>(null);

  const userId = useUserStore((s) => s.currentUser.id);
  const orders = useOrderStore((s) => s.orders).filter((o) => o.userId === userId);
  const reviews = useReviewStore((s) => s.reviews).filter((r) => r.userId === userId);

  const reviewableOrders = orders.filter((o) => o.status === "paid");

  const handleRewarded = (chn: number) => {
    setRewardToast(chn);
    setTimeout(() => setRewardToast(null), 2500);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">리뷰센터</h1>

      <div className="flex gap-2">
        <Button variant={tab === "todo" ? "default" : "outline"} onClick={() => setTab("todo")}>
          리뷰 작성 가능 ({reviewableOrders.length})
        </Button>
        <Button variant={tab === "done" ? "default" : "outline"} onClick={() => setTab("done")}>
          내가 쓴 리뷰 ({reviews.length})
        </Button>
      </div>

      {tab === "todo" ? (
        <ReviewableOrderList orders={reviewableOrders} onRewarded={handleRewarded} />
      ) : reviews.length === 0 ? (
        <p className="text-sm text-muted-foreground py-10 text-center">아직 작성한 리뷰가 없습니다.</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </div>
      )}

      <RewardToast amount={rewardToast} />
    </div>
  );
}