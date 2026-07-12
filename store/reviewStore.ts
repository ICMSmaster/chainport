import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Review } from "@/types";

interface ReviewState {
  reviews: Review[];
  addReview: (review: Review) => void;
}

export const useReviewStore = create<ReviewState>()(
  persist(
    (set, get) => ({
      reviews: [],
      addReview: (review) => set({ reviews: [...get().reviews, review] }),
    }),
    { name: "chainport-review" }
  )
);