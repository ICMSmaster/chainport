import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, Order } from "@/types";

interface OrderState {
  cartItems: CartItem[];
  orders: Order[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  addOrder: (order: Order) => void;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      cartItems: [],
      orders: [],
      addToCart: (item) => {
        const existing = get().cartItems.find((c) => c.productId === item.productId);
        if (existing) {
          set({
            cartItems: get().cartItems.map((c) =>
              c.productId === item.productId ? { ...c, quantity: c.quantity + item.quantity } : c
            ),
          });
        } else {
          set({ cartItems: [...get().cartItems, item] });
        }
      },
      removeFromCart: (productId) =>
        set({ cartItems: get().cartItems.filter((c) => c.productId !== productId) }),
      updateQuantity: (productId, quantity) =>
        set({
          cartItems: get().cartItems.map((c) =>
            c.productId === productId ? { ...c, quantity: Math.max(1, quantity) } : c
          ),
        }),
      clearCart: () => set({ cartItems: [] }),
      addOrder: (order) => set({ orders: [...get().orders, order] }),
    }),
    { name: "chainport-order" }
  )
);