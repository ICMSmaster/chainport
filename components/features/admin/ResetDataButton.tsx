"use client";

import { Button } from "@/components/ui/button";
import { resetAllData } from "@/lib/resetAll";

export function ResetDataButton() {
  const handleReset = () => {
    const confirmed = window.confirm(
      "정말 모든 데이터를 초기화할까요?\n지갑 잔액, 거래 내역, 리뷰, 투자, 광고가 모두 삭제되고 처음 상태로 돌아갑니다."
    );
    if (confirmed) {
      resetAllData();
    }
  };

  return (
    <Button variant="destructive" onClick={handleReset}>
      전체 데이터 초기화
    </Button>
  );
}