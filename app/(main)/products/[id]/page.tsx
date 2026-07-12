"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useProductStore } from "@/store/productStore";
import { useOrderStore } from "@/store/orderStore";
import { Button } from "@/components/ui/button";

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const products = useProductStore((s) => s.products);
  const product = products.find((p) => p.id === params.id);
  const addToCart = useOrderStore((s) => s.addToCart);
  const [qty, setQty] = useState(1);

  if (!product) {
    return <p>상품을 찾을 수 없습니다.</p>;
  }

  const handleAddToCart = () => {
    addToCart({ productId: product.id, quantity: qty });
    alert("장바구니에 담았습니다.");
  };

  const handleBuyNow = () => {
    addToCart({ productId: product.id, quantity: qty });
    router.push("/cart");
  };

  return (
    <div className="grid md:grid-cols-2 gap-10">
      <img src={product.thumbnailUrl} alt={product.name} className="w-full rounded-xl border" />
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="text-muted-foreground">{product.description}</p>
        <p className="text-2xl font-bold">{product.priceKrw.toLocaleString()}원</p>
        <p className="text-sm text-teal-600">
          구매 시 CHN 보상률 {Math.round(product.chnRewardRate * 100)}%
        </p>

        <div className="flex items-center gap-3">
          <span className="text-sm">수량</span>
          <div className="flex items-center border rounded-md">
            <button className="px-3 py-1" onClick={() => setQty((q) => Math.max(1, q - 1))}>
              -
            </button>
            <span className="px-4">{qty}</span>
            <button className="px-3 py-1" onClick={() => setQty((q) => q + 1)}>
              +
            </button>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button variant="outline" className="flex-1" onClick={handleAddToCart}>
            장바구니 담기
          </Button>
          <Button className="flex-1" onClick={handleBuyNow}>
            바로구매
          </Button>
        </div>
      </div>
    </div>
  );
}