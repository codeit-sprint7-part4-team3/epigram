import { apiRequestWithAtuh } from '@/lib/api/apiRequestWithAtuh';

import axios from '../instance/axios';

interface ReactionResponse {
  likeCount: number;
  tags: Array<{ name: string; id: number }>;
  writerId: number;
  referenceUrl: string | null;
  referenceTitle: string | null;
  author: string;
  content: string;
  id: number;
  isLiked: boolean;
}

export async function PostReaction(
  epigramId: number
): Promise<ReactionResponse> {
  try {
    const res = await apiRequestWithAtuh({
      endpoint: `/epigrams/${epigramId}/like`,
      method: 'POST',
    });
    return res;
  } catch (error) {
    console.error('Error adding reaction:', error);
    throw error;
  }
}

export async function DeleteReaction(
  epigramId: number
): Promise<ReactionResponse> {
  try {
    const response = await apiRequestWithAtuh({
      endpoint: `/epigrams/${epigramId}/like`,
      method: 'DELETE',
    });
    return response;
  } catch (error) {
    console.error('Error removing reaction:', error);
    throw error;
  }
}
