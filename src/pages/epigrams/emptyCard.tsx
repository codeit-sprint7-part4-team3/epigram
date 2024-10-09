import Empty from '@/assets/icons/ic-empty.svg';
import Button from '@/components/Button';
import Link from 'next/link';

export default function EmptyCard() {
  return (
    <div className='flex-center mb-8 h-fit w-314 flex-col rounded-2xl bg-white bg-stripe-pattern bg-stripe-size p-30 md:w-384 xl:w-640'>
      <Empty className='h-110 w-110 xl:h-150 xl:w-150' />
      <div className='mb-20 font-secondary text-14 text-zinc-700 xl:text-18'>
        오늘 등록된 에피그램이 없습니다
        <br /> 첫 번째 에피그램을 남겨주세요!
      </div>

      <Link href={'/addepigram'}>
        <Button variant='round' color='white' className='h-max w-max' size='sm'>
          에피그램 작성하러가기
        </Button>
      </Link>
    </div>
  );
}
