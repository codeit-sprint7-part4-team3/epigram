import { create } from 'zustand';

interface UserState {
  user: UserWithEmail | null;
  setUser: (user: UserWithEmail) => void;
}

export const useUserStore = create<UserState>(set => ({
  user: null,
  setUser: (user: UserWithEmail | null) => set({ user }),
}));
