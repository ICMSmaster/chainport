"use client";

import { useState } from "react";
import { useProductStore } from "@/store/productStore";
import { useAdStore } from "@/store/adStore";
import { useUserStore } from "@/store/userStore";
import { AdProductSelector } from "@/components/features/ad/AdProductSelector";
import { AdPlanCard } from "@/components/features/ad/AdPlanCard";
import { AdPaymentSummary } from "@/components/features/ad/AdPaymentSummary";
import { MyAdList } from "@/components/features/ad/MyAdList";
import { processAdPurchase } from "@/lib/tokenomics";
import { AdPlan } from "@/types";

export default function AdsPage() {
  const products = useProductStore((s) => s.products);
  const { adPlans, myAds } = useAdStore();
  const userId = useUserStore((s) => s.currentUser.id);

  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<AdPlan | null>(null);

  const selectedProduct = products.find((p) => p.id === selectedProductId) ?? null;
  const myOwnAds = myAds.filter((a) => a.sellerId === userId);

  const handleConfirm = () => {
    if (!selectedProductId || !selectedPlan) return;
    processAdPurchase(selectedProductId, selectedPlan);
    alert(`${selectedProduct?.name} 상품의 광고를 시작했습니다!`);
    setSelectedProductId(null);
    setSelectedPlan(null);
  };

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-bold mb-1">광고센터</h1>
        <p className="text-sm text-muted-foreground">
          CHN을 결제해 상품 노출을 강화하세요. 결제된 CHN 일부는 자동으로 소각됩니다.
        </p>
      </div>

      <section>
        <h2 className="font-semibold mb-3">1. 광고할 상품 선택</h2>
        <AdProductSelector products={products} selectedId={selectedProductId} onSelect={setSelectedProductId} />
      </section>

      <section>
        <h2 className="font-semibold mb-3">2. 광고 플랜 선택</h2>
        <div className="grid sm:grid-cols-2 gap-4 max-w-lg">
          {adPlans.map((plan) => (
            <AdPlanCard
              key={plan.id}
              plan={plan}
              selected={selectedPlan?.id === plan.id}
              onSelect={() => setSelectedPlan(plan)}
            />
          ))}
        </div>
      </section>

      <section className="max-w-lg">
        <h2 className="font-semibold mb-3">3. 결제</h2>
        <AdPaymentSummary product={selectedProduct} plan={selectedPlan} onConfirm={handleConfirm} />
      </section>

      <section>
        <h2 className="font-semibold mb-3">집행 중인 광고</h2>
        <MyAdList ads={myOwnAds} products={products} plans={adPlans} />
      </section>
    </div>
  );
}