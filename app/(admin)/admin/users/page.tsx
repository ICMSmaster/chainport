"use client";

import { useUserStore } from "@/store/userStore";
import { useWalletStore } from "@/store/walletStore";
import { useOrderStore } from "@/store/orderStore";
import { useProductStore } from "@/store/productStore";
import { computeSellerStats } from "@/lib/adminStats";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

export default function AdminUsersPage() {
  const currentUser = useUserStore((s) => s.currentUser);
  const { krwBalance, chnBalance } = useWalletStore();
  const orders = useOrderStore((s) => s.orders);
  const products = useProductStore((s) => s.products);
  const sellerStats = computeSellerStats(orders, products);

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">사용자 관리</h1>

      <div className="border rounded-xl p-5">
        <h2 className="font-semibold mb-3">현재 로그인 사용자</h2>
        <p className="text-sm">닉네임: {currentUser.nickname}</p>
        <p className="text-sm">잔액: {krwBalance.toLocaleString()}원 / {chnBalance.toFixed(2)} CHN</p>
      </div>

      <div className="border rounded-xl p-5">
        <h2 className="font-semibold mb-3">판매자별 누적 판매 현황</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>판매자 ID</TableHead>
              <TableHead>등록 상품 수</TableHead>
              <TableHead className="text-right">누적 판매액</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sellerStats.map((s) => (
              <TableRow key={s.sellerId}>
                <TableCell>{s.sellerId}</TableCell>
                <TableCell>{s.productCount}개</TableCell>
                <TableCell className="text-right">{s.totalSalesKrw.toLocaleString()}원</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}