import ExternalLink from '@/assets/icons/ic-external-link.svg';
import Thumbsup from '@/assets/icons/ic-thumbs-up.svg';
import ChipList from '@/shared/tagchip';

export default function Interaction() {
  return (
    <div className='flex min-h-screen flex-col'>
      <header className='flex-center w-full'>
        <div className='flex w-640 flex-col gap-32 py-40'>
          <div className='flex w-640 justify-between'>
            <ChipList>
              <ChipList.Item name='#꿈을 이루고 싶을 때'></ChipList.Item>
            </ChipList>
            <span>더보기</span>
          </div>
          <p className='font-secondary text-32 font-normal text-black-700'>
            오랫동안 꿈을 그리는 사람은 마침내 그 꿈을 닮아 간다.
          </p>
          <span className='flex justify-end text-24 font-normal text-blue-400'>
            - 앙드레 말로 -
          </span>
          <div className='flex-center'>
            <div className='mr-16 flex h-48 w-102'>
              <button className='flex-center w-full gap-4 rounded-[100px] bg-black-600 text-white'>
                <Thumbsup width={36} height={36} aria-label='좋아요' />
                <span className='text-20'>123</span>
              </button>
            </div>
            <div className='flex-center h-48 w-200'>
              <button className='flex-center h-full w-full rounded-[100px] bg-line-100 text-20 font-medium text-gray-300'>
                <span>왕도로 가는 길</span>
                <ExternalLink width={36} height={36} aria-label='외부링크' />
              </button>
            </div>
          </div>
        </div>
      </header>
      <section className='flex-grow bg-gray-50'> 냥냥</section>
    </div>
  );
}
