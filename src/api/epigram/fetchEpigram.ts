import axios from '../instance/axios';

export async function GetDetailEpigram(id: number) {
  try {
    const url = `epigrams/${id}`;
    console.log('Full Request URL:', `${axios.defaults.baseURL}${url}`);

    const res = await axios.get(url);
    console.log('Response:', res);
    return res.data;
  } catch (error) {
    console.log('Error fetching Detail Epigram', error);
    throw error;
  }
}
