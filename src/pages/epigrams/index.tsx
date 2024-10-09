import Plus from '@/assets/icons/ic-plus.svg';
import Button from '@/components/Button';
import { fetchAllComments } from '@/lib/api/comments';
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
import SkeletonCard from './skeleton/skeletonCard';
import SkeletonComment from './skeleton/skeletonComment';

export default function Epigrams() {
  const [cards, setCards] = useState<EpigramListType[]>([]);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [todayEpigram, setTodayEpigram] = useState<EpigramListType | null>(
    null
  );
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(null);
  const [isEmotionSaved, setIsEmotionSaved] = useState(false);
  const [isLoadingTodayEpigram, setIsLoadingTodayEpigram] = useState(true);
  const [isLoadingEpigrams, setIsLoadingEpigrams] = useState(true);
  const [isLoadingComments, setIsLoadingComments] = useState(true);

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
      setIsLoadingComments(true);
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
      //최신 댓글
      try {
        const { list: fullComments } = await fetchAllComments();
        setComments(fullComments);
      } catch (error) {
        console.error('Error fetching latest comments:', error);
      } finally {
        setIsLoadingComments(false);
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
            <div className='mb-40 flex items-center gap-x-8'>
              <button
                className='h-fit w-fit cursor-pointer rounded-md bg-illust-yellow p-8 font-primary text-12 font-semibold duration-100 hover:scale-105 xl:text-16'
                onClick={handleSaveEmotion}
              >
                감정 저장하기
              </button>
              <button
                className='bg-illust-gray h-full w-fit cursor-pointer rounded-md p-8 font-primary text-12 font-semibold duration-100 hover:scale-105 xl:text-16'
                onClick={handleChooseAgain} // 다시 고르기 버튼 클릭 핸들러
              >
                다시 고르기
              </button>
            </div>
          </div>
          {isEmotionSaved ? (
            selectedEmotion && (
              <div className='ml-15 mt-10 flex w-314 md:w-384 xl:w-640'>
                <MainPageEmotionCard
                  emotionType={selectedEmotion}
                  isSelected={true}
                  handleCardClick={() => {}}
                />
                <p className='flex justify-items-center whitespace-pre-wrap pl-15 pt-5 font-secondary text-12 xl:pl-20 xl:text-14 xl:text-18'>
                  {selectedEmotion === 'MOVED' &&
                    `감동이 가득한 하루였군요!\n작은 순간 하나하나가 당신에게 깊은 울림이 되었길 바랍니다.\n앞으로도 많은 감동이 함께하길 응원할게요! `}
                  {selectedEmotion === 'HAPPY' &&
                    '오늘 하루가 행복으로 가득했군요!\n그 행복이 오래도록 당신을 따뜻하게 감싸주길 바랍니다. 앞으로도 작은 순간들이 큰 기쁨이 되길 응원해요!'}
                  {selectedEmotion === 'WORRIED' &&
                    '많은 고민이 있었던 하루였네요.\n고민 속에서도 한 걸음씩 나아가는 당신을 응원합니다.\n힘든 순간은 지나가고, 더 나은 길이 열릴 거예요'}
                  {selectedEmotion === 'SAD' &&
                    '오늘 하루가 슬픔으로 가득했군요.\n당신의 마음이 조금이라도 위로받길 바랍니다. \n시간이 지나면 이 슬픔도 당신에게 의미 있는 기억으로 남길 바라요'}
                  {selectedEmotion === 'ANGRY' &&
                    '분노로 가득했던 하루였군요. \n오늘의 분노가 내일의 평온함으로 바뀌길 바라며, 당신의 마음이 조금이라도 가벼워지길 바랍니다.'}
                </p>
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
            {isLoadingComments
              ? Array.from({ length: 3 }).map((_, index) => (
                  <SkeletonComment key={index} />
                ))
              : comments.slice(0, visibleCount).map(comment => (
                  <div className='mb-16' key={comment.id}>
                    <Comment key={comment.id} data={comment} />
                  </div>
                ))}
          </div>
          <div className='flex-center mb-114 mt-40 md:mb-270 xl:mb-119 xl:mt-72'>
            <Button variant='round' color='white' onClick={handleLoadMore}>
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
