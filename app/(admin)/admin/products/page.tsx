"use client";

import { useProductStore } from "@/store/productStore";
import { ProductForm } from "@/components/features/admin/ProductForm";
import { Button } from "@/components/ui/button";

export default function AdminProductsPage() {
  const products = useProductStore((s) => s.products);
  const deleteProduct = useProductStore((s) => s.deleteProduct);

  const handleDelete = (id: string, name: string) => {
    const confirmed = window.confirm(`"${name}" 상품을 삭제할까요?`);
    if (confirmed) deleteProduct(id);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">상품 관리</h1>
        <ProductForm mode="add" triggerLabel="+ 상품 추가" />
      </div>

      <div className="space-y-3">
        {products.map((p) => (
          <div key={p.id} className="border rounded-xl p-4 flex items-center gap-4">
            <img src={p.thumbnailUrl} alt={p.name} className="w-16 h-16 rounded-lg object-cover" />
            <div className="flex-1">
              <p className="font-medium">{p.name}</p>
              <p className="text-sm text-muted-foreground">
                {p.category} · {p.priceKrw.toLocaleString()}원 · 재고 {p.stock}개 · CHN 보상{" "}
                {Math.round(p.chnRewardRate * 100)}%
              </p>
            </div>
            <ProductForm mode="edit" product={p} triggerLabel="수정" triggerVariant="outline" />
            <Button variant="destructive" size="sm" onClick={() => handleDelete(p.id, p.name)}>
              삭제
            </Button>
          </div>
        ))}
        {products.length === 0 && (
          <p className="text-sm text-muted-foreground py-10 text-center">등록된 상품이 없습니다.</p>
        )}
      </div>
    </div>
  );
}