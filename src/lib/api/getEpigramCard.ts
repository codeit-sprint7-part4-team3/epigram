import { apiRequestWithAtuh } from '@/lib/api/apiRequestWithAtuh';

interface BasicQuery {
  limit?: number;
}

// 에피그램 카드 불러오기
const fetchEpigramCards = async ({ limit }: BasicQuery) => {
  try {
    const { list, totalCount } = await apiRequestWithAtuh({
      endpoint: `/epigrams?limit=${limit}`,
      method: 'GET',
    });

    return {
      list: list.map(({ id, content, author, tags }: any) => ({
        id,
        content,
        author,
        tags: Array.isArray(tags) ? tags.map(({ name }: any) => name) : [],
      })),
      totalCount,
    };
  } catch (error) {
    console.error('에피그램 가져오기 실패:', error);
    return { list: [], totalCount: 0 };
  }
};

export { fetchEpigramCards };
