"use client";

import { useState } from "react";
import Link from "next/link";
import { useOrderStore } from "@/store/orderStore";
import { useProductStore } from "@/store/productStore";
import { useWalletStore } from "@/store/walletStore";
import { useMarketStore } from "@/store/marketStore";
import { calcTotalKrw, processPurchase, PurchaseResult } from "@/lib/tokenomics";
import { Button } from "@/components/ui/button";
import { TokenomicsSplitResult } from "@/components/features/checkout/TokenomicsSplitResult";

export default function CheckoutPage() {
  const cartItems = useOrderStore((s) => s.cartItems);
  const products = useProductStore((s) => s.products);
  const { krwBalance, chnBalance } = useWalletStore();
  const currentPrice = useMarketStore((s) => s.currentPrice);

  const [method, setMethod] = useState<"KRW" | "CHN">("KRW");
  const [result, setResult] = useState<PurchaseResult | null>(null);

  const totalKrw = calcTotalKrw(cartItems, products);
  const totalChn = totalKrw / currentPrice;

  const insufficient =
    method === "KRW" ? krwBalance < totalKrw : chnBalance < totalChn;

  const handlePay = () => {
    if (insufficient) return;
    const res = processPurchase(cartItems, products, method);
    setResult(res);
  };

  // ── 결제 완료 화면 ──
  if (result) {
    return (
      <div className="max-w-md mx-auto text-center space-y-6 py-10">
        <h1 className="text-2xl font-bold text-teal-600">결제가 완료되었습니다 🎉</h1>
        <p className="text-muted-foreground">
          {result.totalKrw.toLocaleString()}원 ({result.totalChn.toFixed(2)} CHN)이 결제되었습니다.
        </p>
        <div className="border rounded-xl p-6 text-left">
          <TokenomicsSplitResult split={result.split} totalChn={result.totalChn} />
        </div>
        <div className="flex gap-3">
          <Link href="/reviews" className="flex-1">
            <Button className="w-full">리뷰 작성하고 CHN 받기</Button>
          </Link>
          <Link href="/products" className="flex-1">
            <Button variant="outline" className="w-full">
              쇼핑 계속하기
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // ── 장바구니가 비어있는데 결제 페이지로 바로 들어온 경우 ──
  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground mb-4">장바구니가 비어있습니다.</p>
        <Link href="/products">
          <Button>상품 보러가기</Button>
        </Link>
      </div>
    );
  }

  // ── 결제 입력 화면 ──
  return (
    <div className="max-w-lg mx-auto space-y-6">
      <h1 className="text-2xl font-bold">결제</h1>

      <div className="border rounded-xl p-5 space-y-2">
        <h2 className="font-semibold mb-2">주문 요약</h2>
        {cartItems.map((item) => {
          const product = products.find((p) => p.id === item.productId);
          if (!product) return null;
          return (
            <div key={item.productId} className="flex justify-between text-sm">
              <span>{product.name} x {item.quantity}</span>
              <span>{(product.priceKrw * item.quantity).toLocaleString()}원</span>
            </div>
          );
        })}
        <div className="flex justify-between font-bold border-t pt-2 mt-2">
          <span>총 결제금액</span>
          <span>{totalKrw.toLocaleString()}원 ({totalChn.toFixed(2)} CHN)</span>
        </div>
      </div>

      <div className="border rounded-xl p-5 space-y-3">
        <h2 className="font-semibold mb-2">결제 수단</h2>
        <label className="flex items-center justify-between border rounded-lg p-3 cursor-pointer">
          <span className="flex items-center gap-2">
            <input type="radio" checked={method === "KRW"} onChange={() => setMethod("KRW")} />
            KRW 잔액으로 결제
          </span>
          <span className="text-sm text-muted-foreground">{krwBalance.toLocaleString()}원 보유</span>
        </label>
        <label className="flex items-center justify-between border rounded-lg p-3 cursor-pointer">
          <span className="flex items-center gap-2">
            <input type="radio" checked={method === "CHN"} onChange={() => setMethod("CHN")} />
            CHN 잔액으로 결제
          </span>
          <span className="text-sm text-muted-foreground">{chnBalance.toFixed(2)} CHN 보유</span>
        </label>
      </div>

      {insufficient && (
        <p className="text-sm text-red-500">
          잔액이 부족합니다. Wallet 페이지에서 충전 기능은 Sprint 3에서 제공될 예정입니다.
        </p>
      )}

      <Button className="w-full" size="lg" disabled={insufficient} onClick={handlePay}>
        결제하기
      </Button>
    </div>
  );
}