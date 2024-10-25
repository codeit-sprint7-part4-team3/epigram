import { create } from 'zustand';

interface UserState {
  user: UserWithEmail | null;
  setUser: (user: UserWithEmail) => void;
}

export const useGuestStore = create<UserState>(set => ({
  user: null,
  setUser: (user: UserWithEmail) => set({ user }),
}));
