import { apiRequestWithAtuh } from '@/lib/api/apiRequestWithAtuh';

const limit = Number.MAX_SAFE_INTEGER;

const getMyEpigrams = async () => {
  try {
    const sessionUserData = sessionStorage.getItem('userData');
    if (!sessionUserData) {
      throw new Error('사용자 데이터가 존재하지 않습니다.');
    }
    const userData = JSON.parse(sessionUserData);
    const userId = userData.id;

    const response = await apiRequestWithAtuh({
      endpoint: `/epigrams?limit=${limit}&writerId=${userId}`,
      method: 'GET',
    });

    return response;
  } catch (error) {
    console.error('내 에피그램 가져오기 실패:', error);
  }
};
const getMyComments = async () => {
  try {
    const sessionUserData = sessionStorage.getItem('userData');
    if (!sessionUserData) {
      throw new Error('사용자 데이터가 존재하지 않습니다.');
    }
    const userData = JSON.parse(sessionUserData);
    const userId = userData.id;

    const response = await apiRequestWithAtuh({
      endpoint: `/comments?limit=${limit}&writerId=${userId}`,
      method: 'GET',
    });

    return response;
  } catch (error) {
    console.error('내 댓글 가져오기 실패:', error);
  }
};

export { getMyEpigrams, getMyComments };
