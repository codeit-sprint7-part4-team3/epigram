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
  const endpoint = `epigrams/${epigramId}/comments`;
  const fullUrl = `${axios.defaults.baseURL}${endpoint}`;
  const params = { limit, cursor };

  console.log('Fetching comments with:');
  console.log('Full URL:', fullUrl);
  console.log('Params:', params);

  try {
    const response = await axios.get<CommentsResponse>(endpoint, { params });
    console.log('Response status:', response.status);
    console.log('Response data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
};
