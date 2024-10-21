import { apiRequestWithAtuh } from './apiRequestWithAtuh';

const updateUserInfo = async (data: UpdateUserBody) => {
  const response = await apiRequestWithAtuh({
    endpoint: `/users/me`,
    method: 'PATCH',
    data,
  });

  return response;
};

export { updateUserInfo };
