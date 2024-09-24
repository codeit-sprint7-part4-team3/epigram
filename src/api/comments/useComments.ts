import { Comment } from '@/shared/Comment/Comment';
import { useCallback, useEffect, useState } from 'react';

import { fetchComments } from './comments';

// fetchComments 함수의 반환 타입을 명시적으로 정의
interface FetchCommentsResult {
  list: Comment[];
  totalCount: number;
  nextCursor: number | null;
}

export const useComments = (initialLimit: number = 10) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [nextCursor, setNextCursor] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadComments = useCallback(
    async (cursor?: number) => {
      setIsLoading(true);
      try {
        const data: FetchCommentsResult = await fetchComments(
          initialLimit,
          cursor
        );
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
    [initialLimit]
  );

  useEffect(() => {
    loadComments();
  }, [loadComments]);

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
