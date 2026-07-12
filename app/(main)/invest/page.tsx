"use client";

import { useInvestStore } from "@/store/investStore";
import { useUserStore } from "@/store/userStore";
import { InvestmentProductCard } from "@/components/features/invest/InvestmentProductCard";
import { MyInvestmentList } from "@/components/features/invest/MyInvestmentList";
import { YieldProjectionChart } from "@/components/features/invest/YieldProjectionChart";

export default function InvestPage() {
  const investmentProducts = useInvestStore((s) => s.investmentProducts);
  const myInvestments = useInvestStore((s) => s.myInvestments);
  const userId = useUserStore((s) => s.currentUser.id);

  const myOwnInvestments = myInvestments.filter((i) => i.userId === userId);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-bold mb-1">투자센터</h1>
        <p className="text-sm text-muted-foreground">
          CHN을 예치하고 만기까지 기다리면 수익을 받을 수 있습니다. (시연용으로 1일 = 10초로 압축되어 있습니다)
        </p>
      </div>

      <section>
        <h2 className="font-semibold mb-4">투자 상품</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {investmentProducts.map((p) => (
            <InvestmentProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="border rounded-xl p-6">
        <h2 className="font-semibold mb-4">상품별 예상 수익 비교 (100 CHN 기준)</h2>
        <YieldProjectionChart products={investmentProducts} />
      </section>

      <section>
        <h2 className="font-semibold mb-4">내 투자 현황</h2>
        <MyInvestmentList investments={myOwnInvestments} products={investmentProducts} />
      </section>
    </div>
  );
}