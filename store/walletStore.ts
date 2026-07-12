import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WalletState {
  krwBalance: number;
  chnBalance: number;
  charge: (krw: number) => void;
  addChn: (chn: number) => void;
  deductKrw: (krw: number) => void;
  deductChn: (chn: number) => void;
}

export const useWalletStore = create<WalletState>()(
  persist(
    (set) => ({
      krwBalance: 500000,
      chnBalance: 5000,
      charge: (krw) => set((s) => ({ krwBalance: s.krwBalance + krw })),
      addChn: (chn) => set((s) => ({ chnBalance: s.chnBalance + chn })),
      deductKrw: (krw) => set((s) => ({ krwBalance: Math.max(0, s.krwBalance - krw) })),
      deductChn: (chn) => set((s) => ({ chnBalance: Math.max(0, s.chnBalance - chn) })),
    }),
    { name: "chainport-wallet" }
  )
);