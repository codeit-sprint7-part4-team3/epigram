import { useComments } from '@/api/comments/useComments';
import Plus from '@/assets/icons/ic-plus.svg';
import Button from '@/components/Button';
import { postEmotionLogsToday } from '@/lib/api/emotionLogs';
import { fetchEpigramCards, fetchTodayEpigram } from '@/lib/api/getEpigramCard';
import Comment from '@/shared/Comment/Comment';
import EmotionList from '@/shared/EmotionList';
import EpigramCard from '@/shared/EpigramCard';
import AddEpigramButton from '@/shared/RightFixedButton/AddEpigramButton';
import PageUpButton from '@/shared/RightFixedButton/PageUpButton';
import { useEffect, useState } from 'react';

import MainPageEmotionList from './mainPageEmotionList';
import MainPageEmotionCard from './mainPageEmotionList/components/MainPageEmotionCard';
import { SkeletonCard } from './skeleton';

export default function Epigrams() {
  const [cards, setCards] = useState<EpigramListType[]>([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [todayEpigram, setTodayEpigram] = useState<EpigramListType | null>(
    null
  );
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(null);
  const [isEmotionSaved, setIsEmotionSaved] = useState(false);
  const [isLoadingTodayEpigram, setIsLoadingTodayEpigram] = useState(true);
  const [isLoadingEpigrams, setIsLoadingEpigrams] = useState(true);
  const [isLoadingComments, setIsLoadingComments] = useState(true);

  //최신 댓글 불러오기
  const {
    comments,
    isLoading: commentsLoading,
    loadMore: loadMoreComments,
    hasMore: hasMoreComments,
  } = useComments(10);

  // 에피그램 더보기
  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + 4);
  };

  //오늘의 감정 선택하기
  const handleSaveEmotion = async () => {
    if (selectedEmotion) {
      await postEmotionLogsToday({ emotion: selectedEmotion });
      console.log(`오늘의 감정: ${selectedEmotion}`);
      setIsEmotionSaved(true);
    }
  };

  //다시 고르기 버튼 클릭 핸들러
  const handleChooseAgain = () => {
    setIsEmotionSaved(false); // 상태 초기화
    setSelectedEmotion(null); // 선택된 감정 초기화
  };

  useEffect(() => {
    const loadEpigrams = async () => {
      setIsLoadingTodayEpigram(true);
      setIsLoadingEpigrams(true);
      try {
        // 오늘의 에피그램
        const fetchedTodayEpigram = await fetchTodayEpigram();
        setTodayEpigram(fetchedTodayEpigram);
      } catch (error) {
        console.error("Error fetching today's epigram:", error);
      } finally {
        setIsLoadingTodayEpigram(false);
      }

      try {
        // 최신 에피그램
        const { list: fullEpigrams } = await fetchEpigramCards();
        setCards(fullEpigrams);
      } catch (error) {
        console.error('Error fetching latest epigrams:', error);
      } finally {
        setIsLoadingEpigrams(false);
      }
    };

    loadEpigrams();
  }, []);

  return (
    <div className='flex h-full w-full justify-center bg-background-100'>
      <div>
        <div className='transition-animation mt-32 xl:mt-120'>
          <h1 className='mb-24 font-primary text-16 font-semibold xl:mb-40 xl:text-24'>
            오늘의 에피그램
          </h1>
          {isLoadingTodayEpigram ? (
            <SkeletonCard />
          ) : (
            todayEpigram && (
              <div className='mb-16'>
                <EpigramCard
                  id={todayEpigram.id}
                  key={todayEpigram.id}
                  content={todayEpigram.content}
                  author={todayEpigram.author}
                  tags={todayEpigram.tags.map(tag => `#${tag} `)}
                  variant='normal'
                />
              </div>
            )
          )}
        </div>
        <div className='mt-56 xl:mt-140'>
          <div className='flex justify-between'>
            <h1 className='mb-24 font-primary text-16 font-semibold xl:mb-40 xl:text-24'>
              오늘의 감정은 어떤가요?
            </h1>
            <div className='flex items-center'>
              <button
                className='h-fit w-fit cursor-pointer rounded-md bg-illust-yellow p-8 font-primary font-semibold duration-100 hover:scale-105'
                onClick={handleSaveEmotion}
              >
                감정 저장하기
              </button>
              <button
                className='bg-illust-gray ml-4 h-full w-fit cursor-pointer rounded-md p-8 font-primary font-semibold duration-100 hover:scale-105'
                onClick={handleChooseAgain} // 다시 고르기 버튼 클릭 핸들러
              >
                다시 고르기
              </button>
            </div>
          </div>
          {isEmotionSaved ? (
            selectedEmotion && (
              <div className='flex-center mt-4'>
                <MainPageEmotionCard
                  emotionType={selectedEmotion}
                  isSelected={true}
                  handleCardClick={() => {}}
                />
                {selectedEmotion === 'MOVED' && '감동적인 하루였군요!'}
                {selectedEmotion === 'HAPPY' && '행복한 하루였군요!'}
                {selectedEmotion === 'WORRIED' && '걱정이 많았던 하루였군요!'}
                {selectedEmotion === 'SAD' && '슬픈 하루였군요!'}
                {selectedEmotion === 'ANGRY' && '분노에 가득찬 하루였군요!'}
              </div>
            )
          ) : (
            <div className='flex-center'>
              <MainPageEmotionList
                selectedEmotion={selectedEmotion}
                setSelectedEmotion={setSelectedEmotion}
              />
            </div>
          )}
        </div>
        <div className='mt-56 xl:mt-140'>
          <h1 className='mb-24 font-primary text-16 font-semibold xl:mb-40 xl:text-24'>
            최신 에피그램
          </h1>
          {isLoadingEpigrams
            ? Array.from({ length: 3 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))
            : cards.slice(0, visibleCount).map(card => (
                <div className='mb-16' key={card.id}>
                  <EpigramCard
                    id={card.id}
                    content={card.content}
                    author={card.author}
                    tags={card.tags.map(tag => `#${tag} `)}
                    variant='normal'
                  />
                </div>
              ))}
          <div className='flex-center mt-40 md:mt-56 xl:mt-72'>
            <Button variant='round' color='white' onClick={handleLoadMore}>
              <Plus className='mr-8 h-24 w-24' viewBox='0 1 24 24' />
              에피그램 더보기
            </Button>
          </div>
        </div>
        <div className='mt-72 xl:mt-160'>
          <h1 className='mb-16 font-primary text-16 font-semibold xl:mb-40 xl:text-24'>
            최신 댓글
          </h1>
          <div className='mb-16'>
            {comments.map(comment => (
              <Comment
                key={comment.id}
                data={{
                  ...comment,
                  writer: {
                    ...comment.writer,
                    image: comment.writer.image ?? '',
                  },
                }}
              />
            ))}
          </div>
          <div className='flex-center mb-114 mt-40 md:mb-270 xl:mb-119 xl:mt-72'>
            {hasMoreComments && (
              <Button variant='round' color='white' onClick={loadMoreComments}>
                <Plus className='mr-8 h-24 w-24' viewBox='0 1 24 24' />
                최신 댓글 더보기
              </Button>
            )}
          </div>
          {commentsLoading && <p>댓글을 불러오는 중입니다...</p>}
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
