import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Transaction } from "@/types";

interface LedgerState {
  transactions: Transaction[];
  record: (tx: Transaction) => void;
  reset: () => void;
}

export const useLedgerStore = create<LedgerState>()(
  persist(
    (set, get) => ({
      transactions: [],
      record: (tx) => set({ transactions: [...get().transactions, tx] }),
      reset: () => set({ transactions: [] }),
    }),
    { name: "chainport-ledger" }
  )
);