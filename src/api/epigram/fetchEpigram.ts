import axios from '../instance/axios';

export async function GetEpigram() {}

export async function GetDetailEpigram({ id }: Pick<EpigramListType, 'id'>) {
  try {
    const res = await axios.get(`epigram/${id}`);
    return res.data;
  } catch (error) {
    console.log('Error fetching Detail Epigram', error);
    throw error;
  }
}
