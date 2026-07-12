"use client";

import { useUserStore } from "@/store/userStore";
import { useWalletStore } from "@/store/walletStore";
import { useLedgerStore } from "@/store/ledgerStore";
import { ChargeModal } from "@/components/features/wallet/ChargeModal";
import { ExchangeModal } from "@/components/features/wallet/ExchangeModal";
import { AssetTrendChart } from "@/components/features/wallet/AssetTrendChart";
import { TransactionTable } from "@/components/common/TransactionTable";

export default function WalletPage() {
  const userId = useUserStore((s) => s.currentUser.id);
  const { krwBalance, chnBalance } = useWalletStore();
  const transactions = useLedgerStore((s) => s.transactions).filter((tx) => tx.userId === userId);

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">CHN Wallet</h1>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="border rounded-2xl p-6 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
          <p className="text-sm text-white/80">KRW 잔액</p>
          <p className="text-3xl font-bold mt-1">{krwBalance.toLocaleString()}원</p>
        </div>
        <div className="border rounded-2xl p-6 bg-gradient-to-br from-teal-500 to-teal-600 text-white">
          <p className="text-sm text-white/80">CHN 잔액</p>
          <p className="text-3xl font-bold mt-1">{chnBalance.toFixed(2)} CHN</p>
        </div>
      </div>

      <div className="flex gap-3">
        <ChargeModal />
        <ExchangeModal />
      </div>

      <div className="border rounded-xl p-6">
        <h2 className="font-semibold mb-4">자산 추이 (CHN 기준)</h2>
        <AssetTrendChart transactions={transactions} />
      </div>

      <div className="border rounded-xl p-6">
        <h2 className="font-semibold mb-4">거래 내역</h2>
        <TransactionTable transactions={transactions} />
      </div>
    </div>
  );
}