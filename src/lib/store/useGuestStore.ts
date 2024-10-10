import { create } from 'zustand';

interface GuestState {
  isGuest: boolean;
  setIsGuest: (isGuest: boolean) => void;
}

export const useGuestStore = create<GuestState>(set => ({
  isGuest: false,
  setIsGuest: (isGuest: boolean) => set({ isGuest }),
}));
