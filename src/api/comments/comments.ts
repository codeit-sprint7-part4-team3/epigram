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

  console.log('Fetching comments with:');
  console.log('Endpoint:', endpoint);
  console.log('Params:', params.toString());

  try {
    const response = await apiRequestWithAtuh({
      endpoint: `${endpoint}?${params.toString()}`,
      method: 'GET',
    });

    console.log('Response data:', response);
    return response;
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
};
