"use client";

import { useMemo, useState } from "react";
import { useProductStore } from "@/store/productStore";
import { ProductCard } from "@/components/common/ProductCard";
import { Button } from "@/components/ui/button";

export default function ProductsPage() {
  const products = useProductStore((s) => s.products);
  const categories = useMemo(
    () => ["전체", ...Array.from(new Set(products.map((p) => p.category)))],
    [products]
  );
  const [category, setCategory] = useState("전체");
  const [sort, setSort] = useState<"latest" | "price" | "rating">("latest");

  const filtered = useMemo(() => {
    let list = category === "전체" ? products : products.filter((p) => p.category === category);
    list = [...list];
    if (sort === "price") list.sort((a, b) => a.priceKrw - b.priceKrw);
    if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [products, category, sort]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">상품 목록</h1>

      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map((c) => (
          <Button
            key={c}
            size="sm"
            variant={c === category ? "default" : "outline"}
            onClick={() => setCategory(c)}
          >
            {c}
          </Button>
        ))}
      </div>

      <div className="flex gap-2 mb-6">
        <Button size="sm" variant={sort === "latest" ? "default" : "outline"} onClick={() => setSort("latest")}>
          최신순
        </Button>
        <Button size="sm" variant={sort === "price" ? "default" : "outline"} onClick={() => setSort("price")}>
          가격순
        </Button>
        <Button size="sm" variant={sort === "rating" ? "default" : "outline"} onClick={() => setSort("rating")}>
          평점순
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}