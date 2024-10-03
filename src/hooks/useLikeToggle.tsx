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

  //   const toggleLike = useCallback(async () => {
  //     if (isProcessing) return; // 이미 처리 중이면 early return

  //     try {
  //       setIsProcessing(true);
  //       const requestFunc = isLiked ? DeleteReaction : PostReaction;
  //       const response = await requestFunc(epigramId);
  //       setLikeCount(response.likeCount);
  //       setIsLiked(response.isLiked); // 서버 응답의 isLiked 값을 사용
  //     } catch (error) {
  //       console.error('Error toggling like:', error);
  //       // 에러 처리 (예: 사용자에게 알림)
  //     } finally {
  //       setIsProcessing(false);
  //     }
  //   }, [epigramId, isLiked, isProcessing]);

  //   return { likeCount, isLiked, toggleLike, isProcessing };
}
