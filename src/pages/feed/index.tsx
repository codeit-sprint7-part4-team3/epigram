import Up from '@/assets/icons/ic-down-chevron.svg';
import Plus from '@/assets/icons/ic-plus.svg';
import Button from '@/components/Button';
import EpigramCard from '@/shared/EpigramCard';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { mockDataArray } from './mockData';

export default function Feed() {
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

  const [cards, setCards] = useState<
    { content: string; author: string; tags: string[] }[]
  >([]);

  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    setTimeout(() => {
      setCards(mockDataArray);
    }, 500);
  }, []);

  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + 4);
  };

  return (
    <div className='h-full w-full bg-background-100 pb-100'>
      <div className='transition-animation px-24 md:px-72 xl:px-360'>
        <h1 className='pb-24 pt-32 font-primary text-24 font-semibold md:pb-40 md:pt-120 md:leading-32'>
          피드
        </h1>
        <div className='grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 md:gap-x-12 md:gap-y-24 xl:gap-x-30 xl:gap-y-40'>
          {cards.slice(0, visibleCount).map((card, index) => (
            <EpigramCard
              key={index}
              content={card.content}
              author={card.author}
              tags={card.tags.map(tag => `#${tag} `)}
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
