import { create } from 'zustand';

interface CommentState {
  isCommentOld: boolean;
  refreshComment: () => void;
}

export const useCommentStore = create<CommentState>(set => ({
  isCommentOld: false,
  refreshComment: () => set(state => ({ isCommentOld: !state.isCommentOld })),
}));
