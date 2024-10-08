import { getFirstWeekday, getLastDay } from '@/constants/utils';
import { useMemo } from 'react';

import CalendarBar from './CalendarBar';

export default function EmotionCalendar({ year, month }: EmotionCalendarProps) {
  const calendarDatas: CalendarDatas = useMemo(
    () => createCalendar(year, month),
    [year, month]
  );

  return (
    <div className={`flex w-308 flex-col md:w-379 xl:w-640`}>
      {calendarDatas.map(calendarData => (
        <CalendarBar
          key={calendarData[0].key}
          calendarData={calendarData}
          year={year}
          month={month}
        />
      ))}
    </div>
  );
}

const createCalendar = (year: number, month: Month) => {
  const calendarDatas: CalendarDatas = [
    [
      { key: 'sun', data: '일' },
      { key: 'mon', data: '월' },
      { key: 'tue', data: '화' },
      { key: 'wed', data: '수' },
      { key: 'thu', data: '목' },
      { key: 'fri', data: '금' },
      { key: 'sat', data: '토' },
    ],
  ];

  const prevYear = month === 1 ? year - 1 : year;
  const prevMonth = month === 1 ? 12 : ((month - 1) as Month);
  const prevLastDay = getLastDay(prevYear, prevMonth);

  const nextYear = month === 12 ? year + 1 : year;
  const nextMonth = month === 12 ? 1 : month + 1;

  const currentLastDay = getLastDay(year, month);
  const firstWeekday = getFirstWeekday(year, month);

  let dayCounter = 1 - firstWeekday;
  let weekCounter = 1;

  while (true) {
    if (dayCounter > currentLastDay) break;

    const week: CalendarItem[] = [{ key: String(weekCounter), data: null }];

    for (let i = 0; i < 7; i++) {
      let day: number | null = null;

      if (dayCounter <= 0) {
        day = prevLastDay + dayCounter;
      } else if (dayCounter > currentLastDay) {
        day = dayCounter - currentLastDay;
      } else {
        day = dayCounter;
      }

      week.push({
        key:
          dayCounter <= 0
            ? `${prevYear}-${prevMonth}-${day}`
            : dayCounter > currentLastDay
              ? `${nextYear}-${nextMonth}-${day}`
              : `${year}-${month}-${day}`,
        data: day,
      });

      dayCounter++;
    }

    calendarDatas.push(week);
    weekCounter++;
  }
  return calendarDatas;
};
