import { create } from "zustand";

interface PricePoint {
  time: string;
  price: number;
}

interface MarketState {
  currentPrice: number;
  priceHistory: PricePoint[];
  tick: () => void;
}

export const useMarketStore = create<MarketState>()((set, get) => ({
  currentPrice: 120,
  priceHistory: [{ time: new Date().toISOString(), price: 120 }],
  tick: () => {
    const last = get().currentPrice;
    const next = Math.max(1, last + (Math.random() - 0.5) * 5);
    set({
      currentPrice: next,
      priceHistory: [...get().priceHistory, { time: new Date().toISOString(), price: next }].slice(-50),
    });
  },
}));