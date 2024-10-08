import { DeleteReaction, PostReaction } from '@/api/reaction/fetchReaction';
import { useCallback, useState } from 'react';

export function useLikeToggle(
  initialLikeCount: number,
  initialIsLiked: boolean = false,
  epigramId: number
) {
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [isProcessing, setIsProcessing] = useState(false);

  console.log('isLiKED :::', isLiked);
  const toggleLike = useCallback(async () => {
    try {
      if (isLiked) {
        const response = await DeleteReaction(epigramId);
        setLikeCount(response.likeCount);
        setIsLiked(false);
      } else {
        const response = await PostReaction(epigramId);
        console.log('likeCount :::', likeCount);
        setLikeCount(response.likeCount);
        setIsLiked(true);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  }, [epigramId, isLiked]);

  return { likeCount, isLiked, toggleLike, isProcessing };
}
