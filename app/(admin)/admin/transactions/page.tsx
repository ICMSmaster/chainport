"use client";

import { useMemo, useState } from "react";
import { useLedgerStore } from "@/store/ledgerStore";
import { TransactionTable } from "@/components/common/TransactionTable";

const TYPE_OPTIONS = [
  { value: "ALL", label: "전체" },
  { value: "CHARGE", label: "충전" },
  { value: "EXCHANGE_BUY", label: "환전(매수)" },
  { value: "EXCHANGE_SELL", label: "환전(매도)" },
  { value: "PURCHASE", label: "상품 구매" },
  { value: "TOKENOMICS_SPLIT", label: "토큰 분배" },
  { value: "REVIEW_REWARD", label: "리뷰 보상" },
  { value: "INVEST_DEPOSIT", label: "투자 예치" },
  { value: "INVEST_RETURN", label: "투자 수익" },
  { value: "AD_PAYMENT", label: "광고 결제" },
  { value: "BURN", label: "토큰 소각" },
];

export default function AdminTransactionsPage() {
  const transactions = useLedgerStore((s) => s.transactions);
  const [filter, setFilter] = useState("ALL");

  const filtered = useMemo(
    () => (filter === "ALL" ? transactions : transactions.filter((tx) => tx.type === filter)),
    [transactions, filter]
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">전체 거래 내역</h1>

      <select
        className="border rounded-lg px-3 py-2 text-sm"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        {TYPE_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <div className="border rounded-xl p-4">
        <TransactionTable transactions={filtered} />
      </div>
    </div>
  );
}