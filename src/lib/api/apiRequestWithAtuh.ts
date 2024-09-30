import axios from 'axios';

const apiRequestWithAtuh = async ({
  endpoint,
  method = 'GET',
  data = {},
}: {
  endpoint: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: any;
}) => {
  try {
    const response = await axios.post('/api/authProxy', {
      endpoint,
      method,
      data,
    });

    return response.data;
  } catch (error: any) {
    console.error('API 요청 실패:', error);
    throw new Error(
      error.response?.data?.message || error.message || 'Unknown error'
    );
  }
};

export { apiRequestWithAtuh };
