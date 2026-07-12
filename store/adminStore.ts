import { create } from "zustand";

interface AdminState {
  message: string;
}

export const useAdminStore = create<AdminState>()(() => ({
  message: "관리자 대시보드는 Sprint 8에서 완성됩니다.",
}));