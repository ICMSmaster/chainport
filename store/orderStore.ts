import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, Order } from "@/types";

interface OrderState {
  cartItems: CartItem[];
  orders: Order[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  addOrder: (order: Order) => void;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      cartItems: [],
      orders: [],
      addToCart: (item) => set({ cartItems: [...get().cartItems, item] }),
      removeFromCart: (productId) =>
        set({ cartItems: get().cartItems.filter((c) => c.productId !== productId) }),
      clearCart: () => set({ cartItems: [] }),
      addOrder: (order) => set({ orders: [...get().orders, order] }),
    }),
    { name: "chainport-order" }
  )
);