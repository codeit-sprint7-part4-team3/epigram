import ChipList from '@/shared/tagchip';
import React, { useState } from 'react';

const test = () => {
  const DUMMY = [
    { name: '김도용', id: 1 },
    { name: '정윤호', id: 2 },
    { name: '오소영', id: 3 },
    { name: '정한주', id: 4 },
  ];

  const [currentTag, setCurrenTag] = useState('');
  console.log(currentTag);
  return (
    <>
      <div className='bg-white w-100vh h-100vh'>
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
