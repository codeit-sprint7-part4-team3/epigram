import IconAngry from '@/assets/icons/ic-emotion-angry.svg';
import IconHappy from '@/assets/icons/ic-emotion-happy.svg';
import IconMoved from '@/assets/icons/ic-emotion-moved.svg';
import IconSad from '@/assets/icons/ic-emotion-sad.svg';
import IconWorried from '@/assets/icons/ic-emotion-worried.svg';
import { getMonthKey, getToday } from '@/constants/utils';
import { getEmotionLogsMonthly } from '@/lib/api/emotionLogs';
import { useUserStore } from '@/lib/store/useUserStore';
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

export default function CalendarBar({
  calendarData,
  year,
  month,
}: CalendarBarProps) {
  const { user } = useUserStore();
  const [monthlyEmotionData, setMonthlyEmotionData] = useState<
    Record<string, JSX.Element>
  >({});

  const {
    data: emotionLogs,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['emotionLogsMonthly', year, month, user?.id],
    queryFn: () =>
      user ? getEmotionLogsMonthly(year, month, user.id) : Promise.resolve([]),
    enabled: !!user,
  });

  useEffect(() => {
    if (emotionLogs) {
      const newMonthlyEmotionData: Record<string, JSX.Element> = {};

      emotionLogs.forEach((log: EmotionLogType) => {
        const [formattedDate] = log.createdAt.split('T');
        if (iconByEmotion[log.emotion]) {
          newMonthlyEmotionData[formattedDate] = iconByEmotion[log.emotion];
        }
      });

      setMonthlyEmotionData(newMonthlyEmotionData);
    }
  }, [emotionLogs]);

  const todayKey = getToday();
  const defaultClasses =
    'flex aspect-square w-44 grow flex-col items-center justify-center text-center text-gray-200';
  const highlightTodayClasses =
    'border-3 xl:border-6 border-solid border-illust-red rounded-3 box-border';

  return (
    <div className='flex w-308 flex-row items-center md:w-379 xl:w-640'>
      {(calendarData || []).map(calendarItem => {
        const formattedKey = calendarItem.key
          .split('-')
          .map(dateString =>
            dateString.length === 1 ? '0' + dateString : dateString
          )
          .join('-');

        const isToday = formattedKey === todayKey;
        const emotionOfDay = monthlyEmotionData[formattedKey];
        const fontSizeClass = emotionOfDay
          ? 'text-8 leading-16 md:text-10 xl:text-16 font-bold'
          : 'text-16 font-semibold leading-26 xl:text-24 xl:leading-32';

        return (
          calendarItem.data && (
            <div
              key={calendarItem.key}
              className={`${defaultClasses} ${isToday ? highlightTodayClasses : ''} ${fontSizeClass}`}
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
