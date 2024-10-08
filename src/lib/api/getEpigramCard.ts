import { apiRequestWithAtuh } from '@/lib/api/apiRequestWithAtuh';

// 에피그램 카드 불러오기
const fetchEpigramCards = async () => {
  try {
    // 첫 번째 요청: 기본 limit으로 요청하여 totalCount 가져오기
    const initialResponse = await apiRequestWithAtuh({
      endpoint: `/epigrams?limit=10`,
      method: 'GET',
    });

    const { totalCount } = initialResponse;

    // 두 번째 요청: totalCount로 다시 요청하여 전체 데이터를 가져오기
    const finalResponse = await apiRequestWithAtuh({
      endpoint: `/epigrams?limit=${totalCount}`,
      method: 'GET',
    });

    return {
      list: finalResponse.list.map(({ id, content, author, tags }: any) => ({
        id,
        content,
        author,
        tags: Array.isArray(tags) ? tags.map(({ name }: any) => name) : [],
      })),
      totalCount,
    };
  } catch (error) {
    console.error('에피그램 카드 가져오기 실패:', error);
    return { list: [], totalCount: 0 };
  }
};

export { fetchEpigramCards };
