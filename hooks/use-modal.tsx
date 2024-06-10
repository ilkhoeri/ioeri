import { create } from "zustand";

interface useModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useModal = create<useModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
