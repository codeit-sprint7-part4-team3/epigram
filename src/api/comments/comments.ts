import { apiRequestWithAtuh } from '@/lib/api/apiRequestWithAtuh';

export interface CommentType {
  id: number;
  content: string;
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string;
  writer: {
    id: number;
    nickname: string;
    image: string | null;
  };
  epigramId: number;
}

export interface CommentsResponse {
  list: CommentType[];
  nextCursor: number | null;
  totalCount: number;
}

export const fetchComments = async (
  epigramId: number,
  limit: number,
  cursor?: number
): Promise<CommentsResponse> => {
  const endpoint = `/epigrams/${epigramId}/comments`;
  const params = new URLSearchParams();
  params.append('limit', limit.toString());
  if (cursor !== undefined) {
    params.append('cursor', cursor.toString());
  }

  try {
    const response = await apiRequestWithAtuh({
      endpoint: `${endpoint}?${params.toString()}`,
      method: 'GET',
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export async function DeleteComment(commentId: number) {
  try {
    const endpoint = `/comments/${commentId}`;
    const response = await apiRequestWithAtuh({
      endpoint,
      method: 'DELETE',
    });

    return response;
  } catch (error) {
    console.error('댓글 삭제 실패', error);
    throw error;
  }
}
