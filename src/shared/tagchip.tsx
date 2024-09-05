import React, { ComponentProps } from 'react';
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
  isTag?: boolean;
  backgroundColor?: string;
}

const ChipItem = ({
  name,
  keyword,
  isTag = false,
  onItemChange,
  backgroundColor = 'white',
  className,
  ...rest
}: ChipItemProps) => {
  return (
    <li
      className={twMerge('text-black-300 p-5 rounded-xl', className)}
      style={{ backgroundColor }}
      {...rest}
    >
      <button
        onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
          onItemChange && onItemChange(event.currentTarget.value)
        }
        value={name}
      >
        {isTag ? `#${name}` : `${name}`}
      </button>
    </li>
  );
};

ChipList.Item = ChipItem;

export default ChipList;
