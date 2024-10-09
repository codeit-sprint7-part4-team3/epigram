import { apiRequestWithAtuh } from '@/lib/api/apiRequestWithAtuh';

const createComments = async (formData: CreateCommentBody) => {
  const response = await apiRequestWithAtuh({
    endpoint: `/comments`,
    method: 'POST',
    data: formData,
  });
  return response;
};

// 전체 댓글 가져오기
const fetchEpigramComments = async ({
  id: epigramId,
  limit,
  cursor = 0,
}: BasicQuery) => {
  try {
    const response = await apiRequestWithAtuh({
      endpoint: `/epigrams/${epigramId}/comments?limit=${limit}`,
      method: 'GET',
    });

    console.log('응답 데이터:', response);
  } catch (error) {
    console.error('댓글 가져오기 실패:', error);
  }
};

export { createComments, fetchEpigramComments };
