import IconAngry from '@/assets/icons/ic-emotion-angry.svg';
import IconHappy from '@/assets/icons/ic-emotion-happy.svg';
import IconMoved from '@/assets/icons/ic-emotion-moved.svg';
import IconSad from '@/assets/icons/ic-emotion-sad.svg';
import IconWorried from '@/assets/icons/ic-emotion-worried.svg';
import { getMonthKey, getToday } from '@/constants/utils';
import mockMonthlyEmotionDatas from '@/data/mockMonthlyEmotionDatas';
import { getEmotionLogsMonthly } from '@/lib/api/emotionLogs';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

const iconSize = 'w-18 h-18 md:h-24 md:w-24 xl:h-36 xl:w-36';
const iconByEmotion: Record<string, JSX.Element> = {
  MOVED: <IconMoved className={iconSize} />,
  HAPPY: <IconHappy className={iconSize} />,
  WORRIED: <IconWorried className={iconSize} />,
  SAD: <IconSad className={iconSize} />,
  ANGRY: <IconAngry className={iconSize} />,
};

const convertedMonthlyEmotionData: Record<string, JSX.Element> = {};

export default function CalendarBar({
  calendarData,
  year,
  month,
}: CalendarBarProps) {
  const [monthlyEmotionData, setMonthlyEmotionData] = useState<
    Record<string, JSX.Element>
  >({});

  const { isLoading, error, data } = useQuery({
    queryKey: ['emotionLogsMonthly'],
    queryFn: () => getEmotionLogsMonthly(year, month),
  });

  useEffect(() => {
    const fetchEmotionLogs = async () => {
      try {
        const emotionLogsMonthly =
          mockMonthlyEmotionDatas[getMonthKey(year, month)];
        emotionLogsMonthly.forEach((monthlyEmotionData: EmotionLogType) => {
          if (!iconByEmotion[monthlyEmotionData.emotion]) {
            return;
          }

          const [formattedDate] = monthlyEmotionData.createdAt.split('T');
          convertedMonthlyEmotionData[formattedDate] =
            iconByEmotion[monthlyEmotionData.emotion];
        });

        setMonthlyEmotionData(convertedMonthlyEmotionData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEmotionLogs();
  }, [year, month]);

  return (
    <div className={`flex w-308 flex-row items-center md:w-379 xl:w-640`}>
      {(calendarData || []).map(calendarItem => {
        const key = calendarItem.key
          .split('-')
          .map(dateString =>
            dateString.length === 1 ? '0' + dateString : dateString
          )
          .join('-');

        const highlightToday =
          key === getToday()
            ? 'border-3 xl:border-6 border-solid border-illust-red rounded-3 box-border'
            : '';

        const emotionOfDay = monthlyEmotionData[key];
        const fontSize = emotionOfDay
          ? 'text-8 leading-16 md:text-10 xl:text-16 font-bold'
          : 'text-16 font-semibold leading-26 xl:text-24 xl:leading-32';

        return (
          calendarItem.data && (
            <div
              key={calendarItem.key}
              className={`flex aspect-square w-44 grow flex-col items-center justify-center text-center text-gray-200 ${highlightToday} ${fontSize}`}
            >
              {calendarItem.data}
              {emotionOfDay}
            </div>
          )
        );
      })}
    </div>
  );
}
