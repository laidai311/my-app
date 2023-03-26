import { create } from "zustand";

export const useAuthStore = create((set) => ({
    user: null,
    setUser: (value) => set(() => ({ user: value })),
}));
