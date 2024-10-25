import { apiRequestWithAtuh } from '@/lib/api/apiRequestWithAtuh';

const limit = Number.MAX_SAFE_INTEGER;

const getMyEpigrams = async (userId: Id) => {
  try {
    const response = await apiRequestWithAtuh({
      endpoint: `/epigrams?limit=${limit}&writerId=${userId}`,
      method: 'GET',
    });

    return response;
  } catch (error) {
    console.error('내 에피그램 가져오기 실패:', error);
  }
};
const getMyComments = async (userId: Id) => {
  try {
    const response = await apiRequestWithAtuh({
      endpoint: `/users/${userId}/comments?limit=${limit}`,
      method: 'GET',
    });

    return response;
  } catch (error) {
    console.error('내 댓글 가져오기 실패:', error);
  }
};

export { getMyEpigrams, getMyComments };
