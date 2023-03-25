import { create } from "zustand";

export const useUserStore = create((set) => ({
    user: null,
    setUser: (value) => set(() => ({ user: value })),
}));