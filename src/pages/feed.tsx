import Card from '@/shared/Card';
import { useEffect, useState } from 'react';

const mockDataArray = [
  { content: '명언 1입니다', author: 'Author One', tags: ['나아가야할때'] },
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
    </div>
  );
}
