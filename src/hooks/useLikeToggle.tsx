import { DeleteReaction, PostReaction } from '@/api/reaction/fetchReaction';
import { useCallback, useState } from 'react';

export function useLikeToggle(
  initialLikeCount: number,
  initialIsLiked: boolean = false,
  epigramId: number
) {
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [isLiked, setIsLiked] = useState(initialIsLiked);

  const toggleLike = useCallback(async () => {
    try {
      const requestFunc = isLiked ? DeleteReaction : PostReaction;
      const response = await requestFunc(epigramId);
      setLikeCount(response.likeCount);
      setIsLiked(!isLiked);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  }, [epigramId, isLiked]);

  return { likeCount, isLiked, toggleLike };
}
