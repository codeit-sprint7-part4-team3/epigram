import axios from 'axios';

const fetchEpigramDetailComments = async ({
  id: epigramId,
  limit,
  cursor = 0,
}: BasicQuery) => {
  const response = await axios.get(
    `/api/epigrams/${epigramId}/comments?limit=${limit}&cursor=${cursor}`,
    {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    }
  );
  return response.data;
};

export { fetchEpigramDetailComments };
