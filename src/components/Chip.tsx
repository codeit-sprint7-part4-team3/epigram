import type { Key, LiHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface ChipProps
  extends Pick<LiHTMLAttributes<HTMLLIElement>, 'children' | 'className'> {}

export default function Chip({ children, className }: ChipProps) {
  const chipClass = twMerge(
    'rounded-20 flex-center h-fit w-fit bg-background-100 px-12 py-8 text-xl leading-32 text-black-300 xl:px-14 xl:py-12 xl:text-2xl',
    className
  );
  return <li className={chipClass}>{children}</li>;
}
