"use client";

import { Product } from "@/types";

export function AdProductSelector({
  products,
  selectedId,
  onSelect,
}: {
  products: Product[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="grid sm:grid-cols-3 gap-3">
      {products.map((p) => (
        <button
          key={p.id}
          onClick={() => onSelect(p.id)}
          className={`border rounded-xl p-3 text-left transition-colors ${
            selectedId === p.id ? "border-blue-600 ring-2 ring-blue-100" : "hover:border-gray-300"
          }`}
        >
          <img src={p.thumbnailUrl} alt={p.name} className="w-full aspect-square object-cover rounded-lg mb-2" />
          <p className="text-sm font-medium line-clamp-1">{p.name}</p>
          {p.isAdBoosted && <p className="text-xs text-teal-600 mt-1">광고 진행 중</p>}
        </button>
      ))}
    </div>
  );
}