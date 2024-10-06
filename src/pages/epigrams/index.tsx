import Up from '@/assets/icons/ic-down-chevron.svg';
import Plus from '@/assets/icons/ic-plus.svg';
import Button from '@/components/Button';
import Comment from '@/shared/Comment/Comment';
import EmotionList from '@/shared/EmotionList';
import EpigramCard from '@/shared/EpigramCard';
import AddEpigramButton from '@/shared/RightFixedButton/AddEpigramButton';
import PageUpButton from '@/shared/RightFixedButton/PageUpButton';

const commentData = {
  epigramId: 3,
  writer: 'User',
  updatedAt: '2024-01-02',
  createdAt: '2024-01-02',
  isPrivate: true,
  content: 'hi code it',
  id: 3,
};

export default function Epigrams() {
  return (
    <div className='flex h-full w-full justify-center bg-background-100'>
      <div>
        <div className='transition-animation mt-32 xl:mt-120'>
          <h1 className='mb-24 font-primary text-16 font-semibold xl:mb-40 xl:text-24'>
            오늘의 에피그램
          </h1>
          <EpigramCard
            variant='normal'
            content='오랫동안 꿈을 그리는 사람은 마침내 그 꿈을 닮아 간다'
            author='앙드레 말로'
            tags={['#나아가야할때']}
          />
        </div>
        <div className='mt-56 xl:mt-140'>
          <h1 className='mb-24 font-primary text-16 font-semibold xl:mb-40 xl:text-24'>
            오늘의 감정은 어떤가요?
          </h1>
          <div className='flex-center'>
            <EmotionList />
          </div>
        </div>
        <div className='mt-56 xl:mt-140'>
          <h1 className='mb-24 font-primary text-16 font-semibold xl:mb-40 xl:text-24'>
            최신 에피그램
          </h1>
          <EpigramCard
            variant='normal'
            content='오랫동안 꿈을 그리는 사람은 마침내 그 꿈을 닮아 간다'
            author='앙드레 말로'
            tags={['#나아가야할때']}
          />
          <EpigramCard
            variant='normal'
            content='오랫동안 꿈을 그리는 사람은 마침내 그 꿈을 닮아 간다'
            author='앙드레 말로'
            tags={['#나아가야할때']}
          />
          <div className='flex-center mt-40 md:mt-56 xl:mt-72'>
            <Button variant='round' color='white'>
              <Plus className='mr-8 h-24 w-24' viewBox='0 1 24 24' />
              에피그램 더보기
            </Button>
          </div>
        </div>
        <div className='mt-72 xl:mt-160'>
          <h1 className='mb-16 font-primary text-16 font-semibold xl:mb-40 xl:text-24'>
            최신 댓글
          </h1>
          <Comment data={commentData} />
          <div className='flex-center mb-114 mt-40 md:mb-270 xl:mb-119 xl:mt-72'>
            <Button variant='round' color='white'>
              <Plus className='mr-8 h-24 w-24' viewBox='0 1 24 24' />
              최신 댓글 더보기
            </Button>
          </div>
        </div>
      </div>
      <div className='fixed bottom-104 right-24 md:bottom-92 md:right-72 xl:bottom-80 xl:right-120'>
        <div className='grid justify-items-end'>
          <AddEpigramButton />
          <PageUpButton />
        </div>
      </div>
    </div>
  );
}
