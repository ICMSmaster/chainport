import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Advertisement } from "@/types";
import { MOCK_AD_PLANS } from "@/lib/mockSeed";

interface AdState {
  adPlans: typeof MOCK_AD_PLANS;
  myAds: Advertisement[];
  addAd: (ad: Advertisement) => void;
}

export const useAdStore = create<AdState>()(
  persist(
    (set, get) => ({
      adPlans: MOCK_AD_PLANS,
      myAds: [],
      addAd: (ad) => set({ myAds: [...get().myAds, ad] }),
    }),
    { name: "chainport-ad" }
  )
);