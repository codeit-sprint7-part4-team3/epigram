import { create } from 'zustand';

interface UpdateState {
  isOld: boolean;
  setIsOld: (isOld: boolean) => void;
}

export const useUpdateStore = create<UpdateState>(set => ({
  isOld: false,
  setIsOld: (isOld: boolean) => set({ isOld }),
}));
