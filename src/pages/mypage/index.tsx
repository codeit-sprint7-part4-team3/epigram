import IconLeftChevron from '@/assets/icons/ic-left-chevron.svg';
import Plus from '@/assets/icons/ic-plus.svg';
import IconRightChevron from '@/assets/icons/ic-right-chevron.svg';
import Button from '@/components/Button';
import { getMonthKey, getToday } from '@/constants/utils';
import mockCommentDataArray from '@/data/mockCommentData';
import mockEpigramDataArray from '@/data/mockEpigramData';
import { signoutUser } from '@/lib/api/auth';
import { getEmotionLogsMonthly } from '@/lib/api/emotionLogs';
import { getMyComments, getMyEpigrams } from '@/lib/api/myFeeds';
import Comment from '@/shared/Comment/Comment';
import EmotionList from '@/shared/EmotionList';
import EpigramCard from '@/shared/EpigramCard';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import { mockMonthlyEmotionDatas } from '../../data/mockMonthlyEmotionDatas';
import EmotionCalendar from './components/EmotionCalendar';
import EmotionChart from './components/EmotionChart';

export default function MyPage() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState<Month>((today.getMonth() + 1) as Month);
  const [monthlyEmotionData, setMonthlyEmotionData] =
    useState<MonthlyEmotionDatasForChart>();

  const { isLoading, error, data } = useQuery({
    queryKey: ['emotionLogsMonthly', year, month],
    queryFn: () => getEmotionLogsMonthly(year, month),
  });

  useEffect(() => {
    const fetchEmotionLogs = async () => {
      const emotionLogsMonthly: EmotionLogType[] =
        mockMonthlyEmotionDatas[getMonthKey(year, month)];

      let tempMonthlyEmotionDataForChart: MonthlyEmotionDatasForChart = {
        MOVED: { name: '감동', color: 'bg-illust-yellow', count: 0 },
        HAPPY: { name: '기쁨', color: 'bg-illust-green', count: 0 },
        WORRIED: { name: '고민', color: 'bg-illust-purple', count: 0 },
        SAD: { name: '슬픔', color: 'bg-illust-blue', count: 0 },
        ANGRY: { name: '분노', color: 'bg-illust-red', count: 0 },
      };

      if (emotionLogsMonthly) {
        emotionLogsMonthly.forEach((emotionLog: EmotionLogType) => {
          tempMonthlyEmotionDataForChart[emotionLog.emotion].count++;
        });
      }

      setMonthlyEmotionData(tempMonthlyEmotionDataForChart);
    };

    fetchEmotionLogs();
  }, [year, month]);

  const [image, setImage] = useState();
  const [nickname, setNickname] = useState();
  const [selectedBoard, setSelectedBoard] = useState<'epigram' | 'comment'>(
    'epigram'
  );
  const [myEpigrams, setMyEpigrams] = useState<EpigramListType[]>([]);
  const [myComments, setMyComments] = useState<CommentType[]>([]);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const getMyInfos = async () => {
      const sessionUserData = sessionStorage.getItem('userData');
      if (!sessionUserData) {
        throw new Error('사용자 데이터가 존재하지 않습니다.');
      }
      const userData = JSON.parse(sessionUserData);
      const { image, nickname } = userData;
      setImage(
        image ||
          'https://i.namu.wiki/i/Bge3xnYd4kRe_IKbm2uqxlhQJij2SngwNssjpjaOyOqoRhQlNwLrR2ZiK-JWJ2b99RGcSxDaZ2UCI7fiv4IDDQ.webp'
      );
      setNickname(nickname);

      const myEpigrams = await getMyEpigrams();
      const myComments = await getMyComments();
      setMyEpigrams(myEpigrams.list);
      setMyComments(myComments.list);
    };

    getMyInfos();
  }, []);

  const handleSignOut = async () => {
    try {
      await signoutUser();
      sessionStorage.clear();
      window.location.href = '/';
    } catch (error) {
      console.error(error);
    }
  };

  const handleLeftClick = () => {
    const previousYear = month !== 1 ? year : year - 1;
    const previousMonth = month !== 1 ? ((month - 1) as Month) : 12;
    setYear(previousYear);
    setMonth(previousMonth);
  };

  const handleRightClick = () => {
    const nextYear = month !== 12 ? year : year + 1;
    const nextMonth = month !== 12 ? ((month + 1) as Month) : 1;
    setYear(nextYear);
    setMonth(nextMonth);
  };

  const handleEpigramClick = () => {
    setSelectedBoard('epigram');
    setVisibleCount(3);
  };

  const handleCommentClick = () => {
    setSelectedBoard('comment');
    setVisibleCount(3);
  };

  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + 3);
  };

  return (
    <div className={`bg-background-100 pt-64 xl:pt-128`}>
      <div className={`w-full rounded-24 bg-white pb-28`}>
        <div
          className={`relative bottom-60 m-auto flex w-312 flex-col gap-96 md:w-384 xl:w-640`}
        >
          <div
            className={`m-auto flex w-80 flex-col gap-16 xl:w-120 xl:gap-24`}
          >
            <div className={`flex flex-col gap-8 xl:gap-16`}>
              <img
                className={`h-80 w-80 rounded-full border-2 border-solid border-blue-300 xl:h-120 xl:w-120`}
                src={image}
              ></img>
              <p className={`text-center`}>{nickname}</p>
            </div>
            <button
              className={`whitespace-nowrap rounded-100 bg-line-100 py-6 text-14 text-gray-300 xl:py-8 xl:text-20 xl:font-medium`}
              onClick={handleSignOut}
            >
              로그아웃
            </button>
          </div>
          <div className={`flex flex-col gap-56 md:gap-60 xl:gap-164`}>
            <section
              className={`flex w-312 flex-col items-center justify-between gap-24 md:w-384 xl:w-640 xl:gap-48`}
            >
              <div className='flex w-full items-center justify-between font-primary text-16 font-semibold leading-26 xl:text-24 xl:leading-32'>
                <h2 className=''>오늘의 감정</h2>
                <p className='font-normal text-blue-400'>{getToday()}</p>
              </div>
              <EmotionList />
            </section>
            <section
              className={`flex w-312 flex-col items-center justify-between gap-24 md:w-384 xl:w-640 xl:gap-48`}
            >
              <div className='flex w-full items-center justify-between'>
                <h2 className='font-primary text-16 font-semibold leading-26 xl:text-24 xl:leading-32'>
                  {`${year}년 ${month}월`}
                </h2>
                <div className='flex items-center justify-between gap-16 xl:gap-24'>
                  <div className={`flex gap-10`}>
                    <IconLeftChevron
                      className='h-20 w-20 cursor-pointer xl:h-36 xl:w-36'
                      onClick={handleLeftClick}
                    />
                    <IconRightChevron
                      className='h-20 w-20 cursor-pointer xl:h-36 xl:w-36'
                      onClick={handleRightClick}
                    />
                  </div>
                </div>
              </div>
              <EmotionCalendar year={year} month={month} />
            </section>
            {monthlyEmotionData && (
              <section className='flex flex-col justify-between gap-16 xl:gap-48'>
                <h2 className='font-primary text-16 font-semibold leading-26 xl:text-24 xl:leading-32'>
                  감정 차트
                </h2>
                <div>
                  <EmotionChart
                    className='flex xl:hidden'
                    monthlyEmotionDatas={monthlyEmotionData}
                    windowSize='small'
                  />
                  <EmotionChart
                    className='hidden xl:flex'
                    monthlyEmotionDatas={monthlyEmotionData}
                    windowSize='large'
                  />
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
      <div className='m-auto w-312 pb-114 pt-56 md:w-384 md:pb-233 xl:w-640 xl:pb-336 xl:pt-96'>
        <div className='flex flex-col gap-40 xl:gap-72'>
          <div className='flex flex-col gap-16 md:gap-32 xl:gap-48'>
            <div className='flex gap-16 xl:gap-24'>
              <button
                className={`font-primary text-16 font-semibold xl:text-24 ${selectedBoard === 'epigram' ? 'text-black-600' : 'text-gray-300'}`}
                onClick={handleEpigramClick}
              >
                {`내 에피그램(${myEpigrams.length})`}
              </button>
              <button
                className={`font-primary text-16 font-semibold xl:text-24 ${selectedBoard === 'comment' ? 'text-black-600' : 'text-gray-300'}`}
                onClick={handleCommentClick}
              >
                {`내 댓글(${myComments.length})`}
              </button>
            </div>
            {selectedBoard === 'epigram' && (
              <>
                <div>
                  {myEpigrams.length > 0 &&
                    myEpigrams
                      .slice(0, visibleCount)
                      .map(myEpigram => (
                        <EpigramCard
                          id={myEpigram.id}
                          key={myEpigram.id}
                          content={myEpigram.content}
                          author={myEpigram.author}
                          tags={myEpigram.tags.map(tag => `#${tag.name} `)}
                        />
                      ))}
                </div>
                <div>
                  {visibleCount < myEpigrams.length && (
                    <div className='pt:56 flex items-center justify-center pb-114 xl:pt-80'>
                      <Button
                        variant='round'
                        color='white'
                        onClick={handleLoadMore}
                      >
                        <Plus className='mr-8 h-24 w-24' viewBox='0 1 24 24' />
                        에피그램 더보기
                      </Button>
                    </div>
                  )}
                </div>
              </>
            )}
            {selectedBoard === 'comment' && (
              <>
                <div>
                  {myComments.length > 0 &&
                    myComments
                      .slice(0, visibleCount)
                      .map(myComment => (
                        <Comment key={myComment.id} data={myComment} />
                      ))}
                </div>
                <div>
                  {visibleCount < myComments.length && (
                    <div className='pt:56 flex items-center justify-center pb-114 xl:pt-80'>
                      <Button
                        variant='round'
                        color='white'
                        onClick={handleLoadMore}
                      >
                        <Plus className='mr-8 h-24 w-24' viewBox='0 1 24 24' />
                        댓글 더보기
                      </Button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
