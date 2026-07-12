import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Investment } from "@/types";
import { MOCK_INVESTMENT_PRODUCTS } from "@/lib/mockSeed";

interface InvestState {
  investmentProducts: typeof MOCK_INVESTMENT_PRODUCTS;
  myInvestments: Investment[];
  addInvestment: (inv: Investment) => void;
  updateInvestmentStatus: (id: string, status: Investment["status"]) => void;
}

export const useInvestStore = create<InvestState>()(
  persist(
    (set, get) => ({
      investmentProducts: MOCK_INVESTMENT_PRODUCTS,
      myInvestments: [],
      addInvestment: (inv) => set({ myInvestments: [...get().myInvestments, inv] }),
      updateInvestmentStatus: (id, status) =>
        set({
          myInvestments: get().myInvestments.map((inv) =>
            inv.id === id ? { ...inv, status } : inv
          ),
        }),
    }),
    { name: "chainport-invest" }
  )
);