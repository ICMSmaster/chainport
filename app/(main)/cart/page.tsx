"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useOrderStore } from "@/store/orderStore";
import { useProductStore } from "@/store/productStore";
import { calcTotalKrw } from "@/lib/tokenomics";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const router = useRouter();
  const cartItems = useOrderStore((s) => s.cartItems);
  const updateQuantity = useOrderStore((s) => s.updateQuantity);
  const removeFromCart = useOrderStore((s) => s.removeFromCart);
  const products = useProductStore((s) => s.products);

  const totalKrw = calcTotalKrw(cartItems, products);

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

  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2 space-y-4">
        <h1 className="text-2xl font-bold mb-4">장바구니</h1>
        {cartItems.map((item) => {
          const product = products.find((p) => p.id === item.productId);
          if (!product) return null;
          return (
            <div key={item.productId} className="flex gap-4 border rounded-xl p-4 items-center">
              <img src={product.thumbnailUrl} alt={product.name} className="w-20 h-20 object-cover rounded-lg" />
              <div className="flex-1">
                <p className="font-medium">{product.name}</p>
                <p className="text-sm text-muted-foreground">{product.priceKrw.toLocaleString()}원</p>
                <div className="flex items-center border rounded-md w-fit mt-2">
                  <button
                    className="px-3 py-1"
                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span className="px-4">{item.quantity}</span>
                  <button
                    className="px-3 py-1"
                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold">{(product.priceKrw * item.quantity).toLocaleString()}원</p>
                <button
                  className="text-xs text-red-500 mt-2"
                  onClick={() => removeFromCart(item.productId)}
                >
                  삭제
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="border rounded-xl p-6 h-fit space-y-4">
        <h2 className="font-semibold">결제 요약</h2>
        <div className="flex justify-between text-sm">
          <span>총 상품금액</span>
          <span>{totalKrw.toLocaleString()}원</span>
        </div>
        <div className="flex justify-between font-bold text-lg border-t pt-3">
          <span>총 결제금액</span>
          <span>{totalKrw.toLocaleString()}원</span>
        </div>
        <Button className="w-full" onClick={() => router.push("/checkout")}>
          결제하기
        </Button>
      </div>
    </div>
  );
}