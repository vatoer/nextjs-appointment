import { create } from "zustand";

type SlotState = {
  dt: Date | null;
  setSlot: (dt: Date) => void;
};

export const useSlot = create<SlotState>((set) => ({
  dt: null,
  setSlot: (dt) => set({ dt }),
}));
