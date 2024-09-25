import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

interface CardProps {
  content: string;
  author: string;
  tags: string[];
  variant?: EpigramVariant;
}

type EpigramVariant = 'normal' | 'feed';

export default function EpigramCard({
  content,
  author,
  tags,
  variant = 'normal',
}: CardProps) {
  const EpigramCardStyle = twMerge(
    'stripe-pattern mb-8 flex flex-col justify-between rounded-2xl bg-blue-100 px-24 py-23',
    styleByVariant[variant]
  );
  return (
    <div className='transition-animation font-secondary'>
      <div className={EpigramCardStyle}>
        <div className='flex-1'>
          <div className='text-14 font-normal leading-24 md:text-16 md:leading-26 xl:text-24 xl:leading-40'>
            {content}
          </div>
        </div>
        <div className='mt-20 text-right text-14 font-normal leading-24 text-blue-400 md:text-16 md:leading-26 xl:text-24 xl:leading-40'>
          - {author} -
        </div>
      </div>
      {/* TODO: tag 컴포넌트 연결 */}
      <div className='text-right text-14 font-normal leading-24 text-blue-400 md:text-16 md:leading-26 xl:text-24 xl:leading-40'>
        {tags}
      </div>
    </div>
  );
}

const styleByVariant: Record<EpigramVariant, string> = {
  feed: 'md:w-294 xl:w-585 xl:min-h-295 md:min-h-180 min-h-140',
  normal: 'xl:w-640 md:w-384 w-312',
};
