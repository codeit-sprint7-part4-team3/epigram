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
      endpoint: `/comments?limit=${limit}&`,
      method: 'GET',
    });
  } catch (error) {
    console.error('댓글 가져오기 실패:', error);
  }
};

const fetchAllComments = async () => {
  try {
    // 첫 번째 요청: 기본 limit으로 요청하여 totalCount 가져오기
    const initialResponse = await apiRequestWithAtuh({
      endpoint: `/comments?limit=10`,
      method: 'GET',
    });

    const { totalCount } = initialResponse;

    // 두 번째 요청: totalCount로 다시 요청하여 전체 데이터를 가져오기
    const finalResponse = await apiRequestWithAtuh({
      endpoint: `/comments?limit=${totalCount}`,
      method: 'GET',
    });
    return finalResponse;
  } catch (error) {
    console.error('전체 댓글 가져오기 실패:', error);
    return { list: [], totalCount: 0 };
  }
};

export { createComments, fetchEpigramComments, fetchAllComments };
