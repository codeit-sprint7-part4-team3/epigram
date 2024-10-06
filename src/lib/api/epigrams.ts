import { apiRequestWithAtuh } from '@/lib/api/apiRequestWithAtuh';

const fetchEpigramDetailComments = async ({
  id: epigramId,
  limit,
  cursor = 0,
}: BasicQuery) => {
  try {
    const response = await apiRequestWithAtuh({
      endpoint: `/epigrams/${epigramId}/comments?limit=${limit}&cursor=${cursor}`,
      method: 'GET',
    });

    console.log('응답 데이터:', response);
  } catch (error) {
    console.error('댓글 가져오기 실패:', error);
  }
};

const CreateEpigram = async (data: CreateEpigramBody) => {
  try {
    const response = await apiRequestWithAtuh({
      endpoint: `/epigrams`,
      method: 'POST',
      data,
    });

    return response;
  } catch (error) {
    console.error('에피그램 생성 실패:', error);
  }
};

export { fetchEpigramDetailComments, CreateEpigram };
