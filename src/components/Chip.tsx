import type { Key, LiHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface ChipProps
  extends Pick<LiHTMLAttributes<HTMLLIElement>, 'children' | 'className'> {
  key?: Key;
}

export default function Chip({ children, className, key }: ChipProps) {
  const chipClass = twMerge('', className);
  return (
    <li
      key={key}
      className={
        'rounded-20 flex-center h-fit w-fit bg-background-100 px-12 py-8 text-xl leading-32 text-black-300 xl:px-14 xl:py-12 xl:text-2xl'
      }
    >
      {children}
    </li>
  );
}
