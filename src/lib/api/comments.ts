import { apiRequestWithAtuh } from '@/lib/api/apiRequestWithAtuh';

const createComments = async (formData: CreateCommentBody) => {
  const response = await apiRequestWithAtuh({
    endpoint: `/comments`,
    method: 'POST',
    data: formData,
  });
  return response;
};

export { createComments };
