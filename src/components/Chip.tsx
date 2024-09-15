import { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface ChipProps
  extends Pick<HTMLAttributes<HTMLSpanElement>, 'children' | 'className'> {}

export default function Chip({ children, className }: ChipProps) {
  const chipClass = twMerge('', className);
  return (
    <span
      className={
        'rounded-20 bg-background-100 px-12 py-8 text-xl leading-32 text-black-300 xl:px-14 xl:py-12 xl:text-2xl'
      }
    >
      {children}
    </span>
  );
}
