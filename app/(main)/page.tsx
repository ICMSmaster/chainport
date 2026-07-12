"use client";

import Link from "next/link";
import { useProductStore } from "@/store/productStore";
import { useWalletStore } from "@/store/walletStore";
import { useMarketStore } from "@/store/marketStore";
import { ProductCard } from "@/components/common/ProductCard";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const products = useProductStore((s) => s.products);
  const { krwBalance, chnBalance } = useWalletStore();
  const currentPrice = useMarketStore((s) => s.currentPrice);

  return (
    <div className="space-y-10">
      <section className="rounded-2xl bg-gradient-to-r from-blue-600 to-teal-500 text-white p-10">
        <h1 className="text-3xl font-bold mb-2">CHAINPORT</h1>
        <p className="text-white/90">
          구매하고, 리뷰 쓰고, CHN을 모으세요. 순환하는 토큰 경제를 경험해보세요.
        </p>
        <Link href="/products">
          <Button className="mt-4" variant="secondary">
            상품 둘러보기
          </Button>
        </Link>
      </section>

      <section className="grid grid-cols-2 gap-4 max-w-md">
        <div className="border rounded-xl p-4">
          <p className="text-sm text-muted-foreground">내 KRW 잔액</p>
          <p className="text-xl font-bold">{krwBalance.toLocaleString()}원</p>
        </div>
        <div className="border rounded-xl p-4">
          <p className="text-sm text-muted-foreground">내 CHN 잔액</p>
          <p className="text-xl font-bold">{chnBalance.toFixed(1)} CHN</p>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">추천 상품</h2>
          <Link href="/products" className="text-sm text-blue-600">
            전체보기 →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="border rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-2">현재 CHN 시세</h2>
        <p className="text-2xl font-bold text-teal-600">{currentPrice.toFixed(1)}원 / CHN</p>
      </section>
    </div>
  );
}