import React, { ComponentProps, PropsWithChildren, ReactNode } from 'react';

interface ChipItemProps extends ComponentProps<'li'> {
  name: string;
  onItemChange?: (tag: string) => void;
  keyword?: string;
  isTag?: boolean;
  backgroundColor?: string;
}

interface ChipListProps extends ComponentProps<'ul'> {}

const ChipList = ({ children, ...rest }: ChipListProps) => {
  return (
    <ul className='flex gap-10' {...rest}>
      {children}
    </ul>
  );
};
// tw-merge
const ChipItem = ({
  name,
  keyword,
  isTag = false,
  onItemChange,
  backgroundColor = 'white',
  ...rest
}: ChipItemProps) => {
  const handleTagChange = (event: any) => {
    const { value } = event.target;

    onItemChange && onItemChange(value);
  };

  return (
    <li
      className='text-black-300 p-5 rounded-xl'
      style={{ backgroundColor }}
      {...rest}
    >
      <button onClick={handleTagChange} value={name}>
        {isTag ? `#${name}` : `${name}`}
      </button>
    </li>
  );
};

ChipList.Item = ChipItem;

export default ChipList;
