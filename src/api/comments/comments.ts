import axios from '../instance/axios';

interface CommentsResponse {
  totalCount: number;
  nextCursor: number;
  list: CommentType[];
}

export const fetchComments = async (
  limit: number,
  cursor?: number
): Promise<CommentsResponse> => {
  const response = await axios.get<CommentsResponse>(`comments`, {
    params: {
      limit,
      cursor,
    },
  });
  return response.data;
};
