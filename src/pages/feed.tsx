import Up from '@/assets/icons/ic-down-chevron.svg';
import Plus from '@/assets/icons/ic-plus.svg';
import Button from '@/components/Button';
import Card from '@/shared/Card';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const mockDataArray = [
  { content: '명언 1입니다', author: 'Author One', tags: ['첫번째'] },
  {
    content: `Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work. And the only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle. As with all matters of the heart, you'll know when you find it`,
    author: 'Steve Jobs',
    tags: ['긴 명언 테스트', '스크롤로 표시?', '그냥 길어지도록?'],
  },
  {
    content:
      'If you cannot fly then run. If you cannot run, then walk. And, if you cannot walk, then crawl, but whatever you do, you have to keep moving forward.',
    author: 'Martin Luther King Jr',
    tags: ['태그2', '태그4'],
  },
  {
    content: 'Yet another piece of mock content',
    author: 'Author Three',
    tags: ['태그3'],
  },
  {
    content: 'Yet another piece of mock content',
    author: 'Author Three',
    tags: ['태그4'],
  },
];

export default function Feed() {
  const router = useRouter();

  const handleAddEpigramButtonClick = () => {
    if (router.pathname === '/addepigram') return;
    router.push('/addepigram');
  };
  const [data, setData] = useState<
    { content: string; author: string; tags: string[] }[]
  >([]);

  useEffect(() => {
    setTimeout(() => {
      setData(mockDataArray);
    }, 500);
  }, []);

  return (
    <div className='h-full w-full bg-background-100'>
      <div className='px-24 md:px-72 xl:px-360'>
        <h1 className='pb-24 pt-32 font-primary text-24 font-semibold md:pb-40 md:pt-120 md:leading-32'>
          피드
        </h1>
        <div className='grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 md:gap-x-12 md:gap-y-24 xl:gap-x-30 xl:gap-y-40'>
          {data.map((item, index) => (
            <Card
              key={index}
              content={item.content}
              author={item.author}
              tags={item.tags.map(tag => `#${tag} `)}
            />
          ))}
        </div>
      </div>
      <div className='pt:56 flex items-center justify-center pb-114 xl:pt-80'>
        <Button variant='round' color='white'>
          <Plus className='mr-8 h-24 w-24' viewBox='0 1 24 24' />
          에피그램 더보기
        </Button>
      </div>
      <div className='fixed bottom-152 right-120'>
        <Button
          variant='round'
          onClick={handleAddEpigramButtonClick}
          color='blue'
        >
          <Plus className='mr-8 h-24 w-24' viewBox='0 1 24 24' />
          에피그램 만들기
        </Button>
        <Button color='blue' variant='round'>
          <Up className='h-24 w-24 text-white' />
        </Button>
      </div>
    </div>
  );
}
