import ChipList from '@/shared/tagchip';
import React, { useState } from 'react';

const test = () => {
  const DUMMY = [
    { name: '임창기', id: 1 },
    { name: '지인혁', id: 2 },
    { name: '홍준기', id: 3 },
    { name: '홍준기2', id: 4 },
  ];

  const [currentTag, setCurrenTag] = useState('');
  console.log(currentTag);
  return (
    <>
      <div className='bg-white w-100vh h-100vh'>
        <span className='text-50 text-red-500'>무고</span>
        <ChipList>
          {DUMMY.map(({ name, id }) => (
            <ChipList.Item
              key={id}
              name={name}
              onItemChange={tag => setCurrenTag(tag)}
              keyword='우울'
              isTag={true}
              backgroundColor='blue'
            />
          ))}
        </ChipList>
      </div>
    </>
  );
};

export default test;
