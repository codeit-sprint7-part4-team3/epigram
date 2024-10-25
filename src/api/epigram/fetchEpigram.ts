import { apiRequestWithAtuh } from '@/lib/api/apiRequestWithAtuh';

export async function GetDetailEpigram(id: number) {
  try {
    const endpoint = `/epigrams/${id}`;

    const response = await apiRequestWithAtuh({
      endpoint,
      method: 'GET',
    });

    return response;
  } catch (error) {
    throw error;
  }
}

export async function DeleteEpigram(id: number) {
  try {
    const endpoint = `epigrams/${id}`;
    const response = await apiRequestWithAtuh({
      endpoint,
      method: 'DELETE',
    });

    return response;
  } catch (error) {
    throw error;
  }
}
