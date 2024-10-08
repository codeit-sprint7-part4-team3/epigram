import { useComments } from '@/api/comments/useComments';
import Plus from '@/assets/icons/ic-plus.svg';
import Button from '@/components/Button';
import { apiRequestWithAtuh } from '@/lib/api/apiRequestWithAtuh';
import Comment from '@/shared/Comment/Comment';
import EmotionList from '@/shared/EmotionList';
import EpigramCard from '@/shared/EpigramCard';
import AddEpigramButton from '@/shared/RightFixedButton/AddEpigramButton';
import PageUpButton from '@/shared/RightFixedButton/PageUpButton';
import { useEffect, useState } from 'react';

interface BasicQuery {
  limit?: number;
}

// 오늘의 에피그램 불러오기
const fetchTodayEpigram = async () => {
  try {
    const data = await apiRequestWithAtuh({
      endpoint: `/epigrams/today`,
      method: 'GET',
    });

    return {
      id: data.id,
      content: data.content,
      author: data.author,
      tags: Array.isArray(data.tags)
        ? data.tags.map((tag: any) => tag.name)
        : [],
      // 기본값 설정
      likeCount: data.likeCount ?? 0,
      writerId: data.writerId ?? null,
      referenceUrl: data.referenceUrl ?? '',
      referenceTitle: data.referenceTitle ?? '',
    };
  } catch (error) {
    console.error('오늘의 에피그램 가져오기 실패:', error);
    return null;
  }
};

// 에피그램 카드 불러오기
const fetchEpigramCards = async ({ limit }: BasicQuery) => {
  try {
    const data = await apiRequestWithAtuh({
      endpoint: `/epigrams?limit=${limit}`,
      method: 'GET',
    });

    return {
      list: data.list.map((epigramCard: any) => ({
        id: epigramCard.id,
        content: epigramCard.content,
        author: epigramCard.author,
        tags: Array.isArray(epigramCard.tags)
          ? epigramCard.tags.map((tag: any) => tag.name)
          : [],
        //기본값 설정
        likeCount: epigramCard.likeCount ?? 0,
        writerId: epigramCard.writerId ?? null,
        referenceUrl: epigramCard.referenceUrl ?? '',
        referenceTitle: epigramCard.referenceTitle ?? '',
      })),
      totalCount: data.totalCount,
    };
  } catch (error) {
    console.error('에피그램 가져오기 실패:', error);
    return { list: [], totalCount: 0 };
  }
};

export default function Epigrams() {
  const [cards, setCards] = useState<EpigramListType[]>([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [todayEpigram, setTodayEpigram] = useState<EpigramListType | null>(
    null
  );

  //최신 댓글 불러오기
  const {
    comments,
    isLoading: commentsLoading,
    loadMore: loadMoreComments,
    hasMore: hasMoreComments,
  } = useComments(3);

  useEffect(() => {
    const loadEpigrams = async () => {
      // 오늘의 에피그램
      const fetchedTodayEpigram = await fetchTodayEpigram();
      setTodayEpigram(fetchedTodayEpigram);

      // 최신 에피그램
      const { list: initialEpigrams, totalCount } = await fetchEpigramCards({
        limit: 10,
      });
      const { list: fullEpigrams } = await fetchEpigramCards({
        limit: totalCount,
      });

      setCards(fullEpigrams);
    };

    loadEpigrams();
  }, []);

  // 에피그램 더보기
  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + 4);
  };

  return (
    <div className='flex h-full w-full justify-center bg-background-100'>
      <div>
        <div className='transition-animation mt-32 xl:mt-120'>
          <h1 className='mb-24 font-primary text-16 font-semibold xl:mb-40 xl:text-24'>
            오늘의 에피그램
          </h1>
          {todayEpigram && (
            <div className='mb-16'>
              <EpigramCard
                key={todayEpigram.id}
                content={todayEpigram.content}
                author={todayEpigram.author}
                tags={todayEpigram.tags.map(tag => `#${tag} `)}
                variant='normal'
              />
            </div>
          )}
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
          {cards.slice(0, visibleCount).map(card => (
            <div className='mb-16' key={card.id}>
              <EpigramCard
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
        {/* Latest comments section */}
        <div className='mt-72 xl:mt-160'>
          <h1 className='mb-16 font-primary text-16 font-semibold xl:mb-40 xl:text-24'>
            최신 댓글
          </h1>
          <div className='mb-16'>
            {comments.map(comment => (
              <Comment key={comment.id} data={comment} />
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
