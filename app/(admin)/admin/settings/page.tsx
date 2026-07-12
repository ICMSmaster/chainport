"use client";

import { ParameterControlPanel } from "@/components/features/admin/ParameterControlPanel";
import { ResetDataButton } from "@/components/features/admin/ResetDataButton";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-10">
      <h1 className="text-2xl font-bold">파라미터 설정</h1>

      <div className="border rounded-xl p-6 max-w-xl">
        <ParameterControlPanel />
      </div>

      <div className="border rounded-xl p-6 max-w-xl">
        <h2 className="font-semibold mb-2">위험 구역</h2>
        <p className="text-sm text-muted-foreground mb-4">
          모든 지갑 잔액, 거래 내역, 리뷰, 투자, 광고 데이터를 삭제하고 초기 상태로 되돌립니다.
        </p>
        <ResetDataButton />
      </div>
    </div>
  );
}