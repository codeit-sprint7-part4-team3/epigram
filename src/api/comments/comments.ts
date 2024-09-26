import axios from '../instance/axios';

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
  const response = await axios.get<CommentsResponse>(`${epigramId}/comments`, {
    params: {
      limit,
      cursor,
    },
  });
  return response.data;
};
