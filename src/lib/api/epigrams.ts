import { apiRequestWithAtuh } from '@/lib/api/apiRequestWithAtuh';

const fetchEpigramDetailComments = async ({
  id: epigramId,
  limit,
  cursor = 0,
}: BasicQuery) => {
  try {
    const res = await apiRequestWithAtuh({
      endpoint: `/epigrams/${epigramId}/comments?limit=${limit}&cursor=${cursor}`,
      method: 'GET',
    });

    console.log('응답 데이터:', res);
    return res;
  } catch (error) {
    console.error('댓글 가져오기 실패:', error);
  }
};

export { fetchEpigramDetailComments };
