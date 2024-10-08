import React, { ComponentProps, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface ChipListProps extends ComponentProps<'ul'> {}

const ChipList = ({ children, className, ...rest }: ChipListProps) => {
  return (
    <ul className={twMerge('flex gap-10', className)} {...rest}>
      {children}
    </ul>
  );
};

interface ChipItemProps extends ComponentProps<'li'> {
  name: string;
  onItemChange?: (tag: string) => void;
  keyword?: string;
  backgroundColor?: string;
}

const ChipItem = ({
  name,
  keyword,
  onItemChange,
  className,
  ...rest
}: ChipItemProps) => {
  let item: ReactNode = name;

  if (keyword) {
    const parts = name.split(new RegExp(`(${keyword})`, 'gi'));

    item = parts.map((part, index) =>
      part.toLowerCase() === keyword.toLowerCase() ? (
        <span key={index} className='text-illust-blue'>
          {part}
        </span>
      ) : (
        part
      )
    );
  }

  return (
    <li
      className={twMerge('rounded-xl p-5 text-black-300', className)}
      {...rest}
    >
      <button
        onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
          onItemChange && onItemChange(event.currentTarget.value)
        }
        value={name}
      >
        {item}
      </button>
    </li>
  );
};

ChipList.Item = ChipItem;

export default ChipList;
