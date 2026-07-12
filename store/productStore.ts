import { create } from "zustand";
import { Product } from "@/types";
import { MOCK_PRODUCTS } from "@/lib/mockSeed";

interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
  selectProduct: (id: string) => void;
  setAdBoosted: (productId: string, boosted: boolean) => void;
}

export const useProductStore = create<ProductState>()((set, get) => ({
  products: MOCK_PRODUCTS,
  selectedProduct: null,
  selectProduct: (id) => set({ selectedProduct: get().products.find((p) => p.id === id) ?? null }),
  setAdBoosted: (productId, boosted) =>
    set({
      products: get().products.map((p) =>
        p.id === productId ? { ...p, isAdBoosted: boosted } : p
      ),
    }),
}));