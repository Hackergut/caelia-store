import { create } from "zustand";

export const useChrome = create<{ showNav: boolean; setShowNav: (v: boolean) => void }>((set) => ({
  showNav: false,
  setShowNav: (v) => set({ showNav: v }),
}));
