import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types";
import { MOCK_PRODUCTS } from "@/lib/mockSeed";

interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
  selectProduct: (id: string) => void;
  setAdBoosted: (productId: string, boosted: boolean) => void;
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
}

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      products: MOCK_PRODUCTS,
      selectedProduct: null,
      selectProduct: (id) => set({ selectedProduct: get().products.find((p) => p.id === id) ?? null }),
      setAdBoosted: (productId, boosted) =>
        set({
          products: get().products.map((p) =>
            p.id === productId ? { ...p, isAdBoosted: boosted } : p
          ),
        }),
      addProduct: (product) => set({ products: [...get().products, product] }),
      updateProduct: (id, updates) =>
        set({
          products: get().products.map((p) => (p.id === id ? { ...p, ...updates } : p)),
        }),
      deleteProduct: (id) => set({ products: get().products.filter((p) => p.id !== id) }),
    }),
    { name: "chainport-product" }
  )
);