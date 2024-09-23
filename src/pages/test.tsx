import ChipList from '@/shared/Tagchip';
import React, { useState } from 'react';

const Test = () => {
  const DUMMY = [
    { name: '#꿈을 이루고 싶을 때', id: 1 },
    { name: '#나아가아할 때', id: 2 },
    { name: '오소영', id: 3 },
    { name: '정한주', id: 4 },
  ];

  const [currentTag, setCurrenTag] = useState('');
  console.log(currentTag);
  return (
    <>
      <div className='w-100vh h-100vh bg-white'>
        <ChipList>
          {DUMMY.map(({ name, id }) => (
            <ChipList.Item
              key={id}
              name={name}
              keyword='아'
              onItemChange={tag => setCurrenTag(tag)}
            />
          ))}
        </ChipList>
      </div>
    </>
  );
};

export default Test;
