"use client";

import { useEffect } from "react";
import { useProductStore } from "@/store/productStore";
import { useWalletStore } from "@/store/walletStore";

export default function HomePage() {
  const products = useProductStore((s) => s.products);
  const { krwBalance, chnBalance } = useWalletStore();

  useEffect(() => {
    console.log("[CHAINPORT] 목업 상품 데이터:", products);
    console.log("[CHAINPORT] 내 지갑 잔액:", { krwBalance, chnBalance });
  }, [products, krwBalance, chnBalance]);

  return (
    <div>
      <h1>홈</h1>
      <p>내 KRW 잔액: {krwBalance.toLocaleString()}원 / CHN 잔액: {chnBalance} CHN</p>
      <h2>추천 상품 ({products.length}개)</h2>
      <ul>
        {products.map((p) => (
          <li key={p.id}>{p.name} - {p.priceKrw.toLocaleString()}원</li>
        ))}
      </ul>
    </div>
  );
}