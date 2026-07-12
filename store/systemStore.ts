import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TokenomicsConfig, MarketConfig } from "@/types";

interface SystemStoreState {
  tokenomicsConfig: TokenomicsConfig;
  marketConfig: MarketConfig;
  updateTokenomicsConfig: (config: Partial<TokenomicsConfig>) => void;
  updateMarketConfig: (config: Partial<MarketConfig>) => void;
}

export const useSystemStore = create<SystemStoreState>()(
  persist(
    (set, get) => ({
      tokenomicsConfig: { sellerRate: 0.95, companyRate: 0.03, reserveRate: 0.01, burnRate: 0.01 },
      marketConfig: { reviewRewardChn: 5, priceVolatility: 5, investDefaultYield: 0.05 },
      updateTokenomicsConfig: (config) =>
        set({ tokenomicsConfig: { ...get().tokenomicsConfig, ...config } }),
      updateMarketConfig: (config) => set({ marketConfig: { ...get().marketConfig, ...config } }),
    }),
    { name: "chainport-system" }
  )
);