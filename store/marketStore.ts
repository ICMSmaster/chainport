import { create } from "zustand";
import { useSystemStore } from "./systemStore";

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
    // 관리자 설정의 변동성 값을 그대로 사용합니다 (기본값 5).
    const volatility = useSystemStore.getState().marketConfig.priceVolatility;
    const next = Math.max(1, last + (Math.random() - 0.5) * volatility);
    set({
      currentPrice: next,
      priceHistory: [...get().priceHistory, { time: new Date().toISOString(), price: next }].slice(-50),
    });
  },
}));