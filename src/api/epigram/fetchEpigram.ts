// import axios from '../instance/axios';
// export async function GetDetailEpigram(id: number) {
//   try {
//     const url = `epigrams/${id}`;
//     console.log('Full Request URL:', `${axios.defaults.baseURL}${url}`);
//     const res = await axios.get(url);
//     console.log('Response:', res);
//     return res.data;
//   } catch (error) {
//     console.log('Error fetching Detail Epigram', error);
//     throw error;
//   }
// }
// export async function DeleteEpigram(id: number) {
//   try {
//     const res = await axios.delete(`epigrams/${id}`);
//     return res.data;
//   } catch (error) {
//     console.log('에피그램 삭제 실패', error);
//     throw error;
//   }
// }
import { apiRequestWithAtuh } from '@/lib/api/apiRequestWithAtuh';

export async function GetDetailEpigram(id: number) {
  try {
    const endpoint = `/epigrams/${id}`;
    console.log('Requesting epigram detail:', endpoint);

    const response = await apiRequestWithAtuh({
      endpoint,
      method: 'GET',
    });

    console.log('Epigram detail response:', response);
    return response;
  } catch (error) {
    console.error('Error fetching Detail Epigram', error);
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

    console.log('Epigram delete response:', response);
    return response;
  } catch (error) {
    console.error('에피그램 삭제 실패', error);
    throw error;
  }
}
