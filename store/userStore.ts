import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/types";

interface UserState {
  currentUser: User;
  switchToAdmin: () => void;
  switchToUser: () => void;
}

const DEFAULT_USER: User = {
  id: "user1",
  nickname: "체인포트 손님",
  role: "user",
  createdAt: new Date().toISOString(),
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      currentUser: DEFAULT_USER,
      switchToAdmin: () => set((s) => ({ currentUser: { ...s.currentUser, role: "admin" } })),
      switchToUser: () => set((s) => ({ currentUser: { ...s.currentUser, role: "user" } })),
    }),
    { name: "chainport-user" }
  )
);