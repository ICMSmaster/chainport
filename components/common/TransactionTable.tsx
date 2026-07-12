"use client";

import { Transaction } from "@/types";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

const TYPE_LABEL: Record<string, string> = {
  CHARGE: "충전",
  EXCHANGE_BUY: "환전(KRW→CHN)",
  EXCHANGE_SELL: "환전(CHN→KRW)",
  PURCHASE: "상품 구매",
  TOKENOMICS_SPLIT: "토큰 분배",
  REVIEW_REWARD: "리뷰 보상",
  INVEST_DEPOSIT: "투자 예치",
  INVEST_RETURN: "투자 수익",
  AD_PAYMENT: "광고 결제",
  BURN: "토큰 소각",
};

export function TransactionTable({ transactions }: { transactions: Transaction[] }) {
  const sorted = [...transactions].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  if (sorted.length === 0) {
    return <p className="text-sm text-muted-foreground py-10 text-center">거래 내역이 없습니다.</p>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>유형</TableHead>
          <TableHead>메모</TableHead>
          <TableHead className="text-right">KRW</TableHead>
          <TableHead className="text-right">CHN</TableHead>
          <TableHead className="text-right">일시</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sorted.map((tx) => (
          <TableRow key={tx.id}>
            <TableCell>{TYPE_LABEL[tx.type] ?? tx.type}</TableCell>
            <TableCell className="text-muted-foreground text-sm">{tx.memo}</TableCell>
            <TableCell className="text-right">{tx.amountKrw ? `${Math.round(tx.amountKrw).toLocaleString()}원` : "-"}</TableCell>
            <TableCell className="text-right">{tx.amountChn ? `${tx.amountChn.toFixed(2)} CHN` : "-"}</TableCell>
            <TableCell className="text-right text-xs text-muted-foreground">
              {new Date(tx.createdAt).toLocaleString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}