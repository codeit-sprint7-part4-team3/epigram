import { apiRequestWithAtuh } from '@/lib/api/apiRequestWithAtuh';

const createComments = async (formData: CreateCommentBody) => {
  try {
    const response = await apiRequestWithAtuh({
      endpoint: `/comments`,
      method: 'POST',
      data: formData,
    });

    console.log('응답 데이터:', response);
  } catch (error) {
    console.error('댓글 생성 실패:', error);
  }
};

export { createComments };
