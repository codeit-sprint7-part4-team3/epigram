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
    const res = await axios.post<ReactionResponse>(
      `epigrams/${epigramId}/like`
    );
    return res.data;
  } catch (error) {
    console.error('Error adding reaction:', error);
    throw error;
  }
}

export async function DeleteReaction(
  epigramId: number
): Promise<ReactionResponse> {
  try {
    const response = await axios.delete<ReactionResponse>(
      `epigrams/${epigramId}/like`
    );
    return response.data;
  } catch (error) {
    console.error('Error removing reaction:', error);
    throw error;
  }
}
