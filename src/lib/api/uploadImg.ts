import { apiRequestWithAtuh } from './apiRequestWithAtuh';

interface Props {
  image: File;
}

const uploadImage = async (data: Props) => {
  const response = await apiRequestWithAtuh({
    endpoint: `/images/upload`,
    method: 'POST',
    data,
  });
  const { url } = response;
  return url;
};

export { uploadImage };
