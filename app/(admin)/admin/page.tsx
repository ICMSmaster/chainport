"use client";

import { useLedgerStore } from "@/store/ledgerStore";
import { useProductStore } from "@/store/productStore";
import { computeTokenomicsTotals } from "@/lib/adminStats";
import { DashboardCard } from "@/components/common/DashboardCard";

export default function AdminOverviewPage() {
  const transactions = useLedgerStore((s) => s.transactions);
  const products = useProductStore((s) => s.products);
  const totals = computeTokenomicsTotals(transactions);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">관리자 개요</h1>

      <div className="grid sm:grid-cols-3 gap-4">
        <DashboardCard label="총 거래 건수" value={`${totals.transactionCount}건`} />
        <DashboardCard label="총 판매액 (KRW)" value={`${Math.round(totals.totalPurchaseKrw).toLocaleString()}원`} />
        <DashboardCard label="총 판매액 (CHN 환산)" value={`${totals.totalPurchaseChn.toFixed(2)} CHN`} />
        <DashboardCard label="판매자 누적 지급" value={`${totals.sellerPayout.toFixed(2)} CHN`} />
        <DashboardCard label="회사 누적 수익" value={`${totals.companyRevenue.toFixed(2)} CHN`} />
        <DashboardCard label="누적 준비금" value={`${totals.reserveAccumulated.toFixed(2)} CHN`} />
        <DashboardCard label="누적 소각량" value={`${totals.burned.toFixed(2)} CHN`} sub="시장에서 영구히 제거됨" />
        <DashboardCard label="등록 상품 수" value={`${products.length}개`} />
        <DashboardCard label="광고 진행 중 상품" value={`${products.filter((p) => p.isAdBoosted).length}개`} />
      </div>
    </div>
  );
}