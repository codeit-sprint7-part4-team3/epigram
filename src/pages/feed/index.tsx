import SortDouble from '@/assets/icons/ic-dashboard.svg';
import Up from '@/assets/icons/ic-down-chevron.svg';
import Plus from '@/assets/icons/ic-plus.svg';
import SortSingle from '@/assets/icons/ic-sort.svg';
import Button from '@/components/Button';
import { apiRequestWithAtuh } from '@/lib/api/apiRequestWithAtuh';
import EpigramCard from '@/shared/EpigramCard';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface Epigram {
  id: number;
  content: string;
  author: string;
  tags: string[];
}

interface BasicQuery {
  limit?: number;
  cursor?: number;
}

const fetchEpigramCards = async ({ limit = 3, cursor = 0 }: BasicQuery) => {
  try {
    const data = await apiRequestWithAtuh({
      endpoint: `/epigrams?limit=${limit}&cursor=${cursor}`,
      method: 'GET',
    });
    console.log('응답 데이터:', data);

    return data.list.map((item: any) => ({
      id: item.id,
      content: item.content,
      author: item.author,
      // tags 배열의 name 값을 추출해서 표시
      tags: Array.isArray(item.tags)
        ? item.tags.map((tag: any) => tag.name)
        : [], // tags가 배열일 때만 처리, 아닐 경우 빈 배열
    }));
  } catch (error) {
    console.error('에피그램 가져오기 실패:', error);
    return [];
  }
};

export default function Feed() {
  const [cards, setCards] = useState<Epigram[]>([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [isSingleColumn, setIsSingleColumn] = useState(true);
  const [cursor, setCursor] = useState(0);

  const router = useRouter();

  const handleAddEpigramButtonClick = () => {
    if (router.pathname === '/addepigram') return;
    router.push('/addepigram');
  };

  const handlePageUp = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const loadEpigrams = async () => {
      const epigramData = await fetchEpigramCards({
        limit: 10,
        cursor,
      });
      setCards(epigramData);
    };
    loadEpigrams();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + 4);
    setCursor(cards.length > 0 ? cards[cards.length - 1].id : 0); // 마지막 아이템의 id를 커서로 설정
  };

  const toggleGridLayout = () => {
    setIsSingleColumn(prevLayout => !prevLayout);
  };

  return (
    <div className='flex-center h-full w-full flex-col bg-background-100 px-24 pb-100'>
      <div>
        <div className='transition-animation flex justify-between pb-24 pt-32 md:pb-40 md:pt-120'>
          <h1 className='font-primary text-24 font-semibold md:leading-32'>
            피드
          </h1>
          <div className='flex space-x-4'>
            <button onClick={toggleGridLayout} className='md:hidden'>
              <SortDouble
                className={clsx('h-30 w-30 text-gray-200', {
                  hidden: !isSingleColumn,
                })}
              />
            </button>
            <button onClick={toggleGridLayout} className='md:hidden'>
              <SortSingle
                className={clsx('h-30 w-30 text-gray-200', {
                  hidden: isSingleColumn,
                })}
              />
            </button>
          </div>
        </div>

        <div
          className={twMerge(
            'grid gap-x-8 gap-y-16 md:gap-x-12 md:gap-y-24 xl:gap-x-30 xl:gap-y-40',
            clsx({
              'grid-cols-1 md:grid-cols-2': isSingleColumn,
              'grid-cols-2': !isSingleColumn,
            })
          )}
        >
          {cards.slice(0, visibleCount).map((card, index) => (
            <EpigramCard
              key={index}
              content={card.content}
              author={card.author}
              tags={card.tags.map(tag => `#${tag} `)}
              variant='feed'
            />
          ))}
        </div>
      </div>

      {visibleCount < cards.length && (
        <div className='pt:56 flex items-center justify-center pb-114 xl:pt-80'>
          <Button variant='round' color='white' onClick={handleLoadMore}>
            <Plus className='mr-8 h-24 w-24' viewBox='0 1 24 24' />
            에피그램 더보기
          </Button>
        </div>
      )}
      <div className='fixed bottom-104 right-24 md:bottom-92 md:right-72 xl:bottom-80 xl:right-120'>
        <div className='grid justify-items-end'>
          <Button
            variant='round'
            onClick={handleAddEpigramButtonClick}
            color='blue'
            className='mb-8'
          >
            <Plus className='mr-8 h-24 w-24' viewBox='0 1 24 24' />
            에피그램 만들기
          </Button>
          <Button onClick={handlePageUp} color='blue' variant='round'>
            <Up className='h-24 w-24 rotate-180' />
          </Button>
        </div>
      </div>
    </div>
  );
}
