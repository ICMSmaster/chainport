"use client";

import { useLedgerStore } from "@/store/ledgerStore";
import { computeTokenomicsTotals } from "@/lib/adminStats";
import { TokenomicsPieChart } from "@/components/features/admin/TokenomicsPieChart";
import { TokenomicsTrendChart } from "@/components/features/admin/TokenomicsTrendChart";

export default function AdminTokenomicsPage() {
  const transactions = useLedgerStore((s) => s.transactions);
  const totals = computeTokenomicsTotals(transactions);

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">토크노믹스 모니터</h1>

      <div className="border rounded-xl p-6">
        <h2 className="font-semibold mb-4">누적 분배 비중</h2>
        <TokenomicsPieChart totals={totals} />
      </div>

      <div className="border rounded-xl p-6">
        <h2 className="font-semibold mb-4">시간에 따른 누적 분배 추이</h2>
        <TokenomicsTrendChart transactions={transactions} />
      </div>
    </div>
  );
}