import SortDouble from '@/assets/icons/ic-dashboard.svg';
import Plus from '@/assets/icons/ic-plus.svg';
import SortSingle from '@/assets/icons/ic-sort.svg';
import Button from '@/components/Button';
import { apiRequestWithAtuh } from '@/lib/api/apiRequestWithAtuh';
import EpigramCard from '@/shared/EpigramCard';
import AddEpigramButton from '@/shared/RightFixedButton/AddEpigramButton';
import PageUpButton from '@/shared/RightFixedButton/PageUpButton';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import SkeletonCard from './skeletonCard';

interface BasicQuery {
  limit?: number;
}

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

export default function Feed() {
  const [cards, setCards] = useState<EpigramListType[]>([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [visibleCount, setVisibleCount] = useState(6);
  const [isSingleColumn, setIsSingleColumn] = useState(true);
  const [cursor, setCursor] = useState(0);

  useEffect(() => {
    const loadEpigrams = async () => {
      setLoading(true); // Start loading
      const { list: fullEpigrams } = await fetchEpigramCards({ limit: 10 });
      setCards(fullEpigrams);
      setLoading(false); // End loading
    };
    loadEpigrams();
  }, []);

  // 에피그램 더보기
  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + 4);
    setCursor(cards.length > 0 ? cards[cards.length - 1].id : 0); // 마지막 아이템의 id를 커서로 설정
  };

  // 그리드 레이아웃 변경 토글
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
          {/* 로딩시 스켈레톤 보여주기 */}
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))
            : cards
                .slice(0, visibleCount)
                .map((card, index) => (
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

      {!loading && visibleCount < cards.length && (
        <div className='pt:56 flex items-center justify-center pb-114 xl:pt-80'>
          <Button variant='round' color='white' onClick={handleLoadMore}>
            <Plus className='mr-8 h-24 w-24' viewBox='0 1 24 24' />
            에피그램 더보기
          </Button>
        </div>
      )}

      <div className='fixed bottom-104 right-24 md:bottom-92 md:right-72 xl:bottom-80 xl:right-120'>
        <div className='grid justify-items-end'>
          <AddEpigramButton />
          <PageUpButton />
        </div>
      </div>
    </div>
  );
}
