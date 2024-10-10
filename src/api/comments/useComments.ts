import { useCommentStore } from '@/lib/store/useCommentStore';
import { CommentType } from '@/shared/Comment/Comment';
import { useCallback, useEffect, useState } from 'react';

import { CommentsResponse, fetchComments } from './comments';

export const useComments = (epigramId: number, initialLimit: number = 10) => {
  const { isCommentOld } = useCommentStore();
  const [comments, setComments] = useState<CommentType[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [nextCursor, setNextCursor] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadComments = useCallback(
    async (cursor?: number) => {
      setIsLoading(true);
      try {
        const data: CommentsResponse = await fetchComments(
          epigramId,
          initialLimit,
          cursor
        );

        console.log('data::', data);

        setComments(prevComments =>
          cursor ? [...prevComments, ...data.list] : data.list
        );
        setTotalCount(data.totalCount);
        setNextCursor(data.nextCursor);
        setError(null);
      } catch (err) {
        setError('댓글을 불러오는 데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    },
    [epigramId, initialLimit]
  );

  useEffect(() => {
    loadComments();
  }, [loadComments, isCommentOld]);

  const loadMore = () => {
    if (nextCursor) {
      loadComments(nextCursor);
    }
  };

  return {
    comments,
    totalCount,
    isLoading,
    error,
    loadMore,
    hasMore: !!nextCursor,
  };
};
