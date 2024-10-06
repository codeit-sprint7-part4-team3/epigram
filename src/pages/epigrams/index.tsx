import Plus from '@/assets/icons/ic-plus.svg';
import Button from '@/components/Button';
import { apiRequestWithAtuh } from '@/lib/api/apiRequestWithAtuh';
import Comment from '@/shared/Comment/Comment';
import EmotionList from '@/shared/EmotionList';
import EpigramCard from '@/shared/EpigramCard';
import AddEpigramButton from '@/shared/RightFixedButton/AddEpigramButton';
import PageUpButton from '@/shared/RightFixedButton/PageUpButton';
import { useEffect, useState } from 'react';

interface Epigram {
  id: number;
  content: string;
  author: string;
  tags: string[];
}

interface BasicQuery {
  limit?: number;
}

const commentData = {
  epigramId: 3,
  writer: 'User',
  updatedAt: '2024-01-02',
  createdAt: '2024-01-02',
  isPrivate: true,
  content: 'hi code it',
  id: 3,
};

// 오늘의 에피그램 불러오기
const fetchTodayEpigram = async () => {
  try {
    const data = await apiRequestWithAtuh({
      endpoint: `/epigrams/today`,
      method: 'GET',
    });

    // 데이터가 배열 형태로 반환될 경우, 첫 번째 항목을 사용
    return {
      id: data.id,
      content: data.content,
      author: data.author,
      tags: Array.isArray(data.tags)
        ? data.tags.map((tag: any) => tag.name)
        : [],
    };
  } catch (error) {
    console.error('오늘의 에피그램 가져오기 실패:', error);
    return null; // 실패 시 null 반환
  }
};

// 에피그램 카드 불러오기
const fetchEpigramCards = async ({ limit }: BasicQuery) => {
  try {
    const data = await apiRequestWithAtuh({
      endpoint: `/epigrams?limit=${limit}`,
      method: 'GET',
    });

    return {
      list: data.list.map((epigramCard: any) => ({
        id: epigramCard.id,
        content: epigramCard.content,
        author: epigramCard.author,
        // tags 배열의 name 값을 추출해서 표시
        tags: Array.isArray(epigramCard.tags)
          ? epigramCard.tags.map((tag: any) => tag.name)
          : [],
      })),
      totalCount: data.totalCount,
    };
  } catch (error) {
    console.error('에피그램 가져오기 실패:', error);
    return { list: [], totalCount: 0 };
  }
};

export default function Epigrams() {
  const [cards, setCards] = useState<Epigram[]>([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [todayEpigram, setTodayEpigram] = useState<Epigram | null>(null);

  useEffect(() => {
    const loadEpigrams = async () => {
      // 오늘의 에피그램
      const fetchedTodayEpigram = await fetchTodayEpigram();
      setTodayEpigram(fetchedTodayEpigram);

      // 최신 에피그램
      const { list: initialEpigrams, totalCount } = await fetchEpigramCards({
        limit: 10,
      });
      const { list: fullEpigrams } = await fetchEpigramCards({
        limit: totalCount,
      });

      setCards(fullEpigrams);
    };

    loadEpigrams();
  }, []);

  // 에피그램 더보기
  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + 4);
  };

  return (
    <div className='flex h-full w-full justify-center bg-background-100'>
      <div>
        <div className='transition-animation mt-32 xl:mt-120'>
          <h1 className='mb-24 font-primary text-16 font-semibold xl:mb-40 xl:text-24'>
            오늘의 에피그램
          </h1>
          {todayEpigram && (
            <div className='mb-16'>
              <EpigramCard
                key={todayEpigram.id}
                content={todayEpigram.content}
                author={todayEpigram.author}
                tags={todayEpigram.tags.map(tag => `#${tag} `)}
                variant='normal'
              />
            </div>
          )}
        </div>
        <div className='mt-56 xl:mt-140'>
          <h1 className='mb-24 font-primary text-16 font-semibold xl:mb-40 xl:text-24'>
            오늘의 감정은 어떤가요?
          </h1>
          <div className='flex-center'>
            <EmotionList />
          </div>
        </div>
        <div className='mt-56 xl:mt-140'>
          <h1 className='mb-24 font-primary text-16 font-semibold xl:mb-40 xl:text-24'>
            최신 에피그램
          </h1>
          {cards.slice(0, visibleCount).map(card => (
            <div className='mb-16'>
              <EpigramCard
                key={card.id}
                content={card.content}
                author={card.author}
                tags={card.tags.map(tag => `#${tag} `)}
                variant='normal'
              />
            </div>
          ))}
          <div className='flex-center mt-40 md:mt-56 xl:mt-72'>
            <Button variant='round' color='white' onClick={handleLoadMore}>
              <Plus className='mr-8 h-24 w-24' viewBox='0 1 24 24' />
              에피그램 더보기
            </Button>
          </div>
        </div>
        <div className='mt-72 xl:mt-160'>
          <h1 className='mb-16 font-primary text-16 font-semibold xl:mb-40 xl:text-24'>
            최신 댓글
          </h1>
          <Comment data={commentData} />
          <div className='flex-center mb-114 mt-40 md:mb-270 xl:mb-119 xl:mt-72'>
            <Button variant='round' color='white'>
              <Plus className='mr-8 h-24 w-24' viewBox='0 1 24 24' />
              최신 댓글 더보기
            </Button>
          </div>
        </div>
      </div>
      <div className='fixed bottom-104 right-24 md:bottom-92 md:right-72 xl:bottom-80 xl:right-120'>
        <div className='grid justify-items-end'>
          <AddEpigramButton />
          <PageUpButton />
        </div>
      </div>
    </div>
  );
}
