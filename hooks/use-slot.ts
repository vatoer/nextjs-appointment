import { create } from "zustand";

type SlotState = {
  dt: Date | null;
  setSlot: (dt: Date | null) => void;
};

export const useSlot = create<SlotState>((set) => ({
  dt: null,
  setSlot: (dt) => set({ dt }),
}));
