import { getFirstWeekday, getLastDay } from '@/constants/utils';

import CalendarBar from './CalendarBar';

export default function EmotionCalendar({ year, month }: EmotionCalendarProps) {
  const calendarDatas: CalendarDatas = createCalendar(year, month);

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
  let calendarDatas: CalendarDatas = [
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

  const prevYear = month !== 1 ? year : year - 1;
  const prevMonth = month !== 1 ? ((month - 1) as Month) : 12;
  const prevLastDay = getLastDay(prevYear, prevMonth);

  const nextYear = month !== 12 ? year : year + 1;
  const nextMonth = month !== 12 ? ((month + 1) as Month) : 1;

  const currentLastDay = getLastDay(year, month);
  const firstWeekday = getFirstWeekday(year, month);

  let dayCounter = 1 - firstWeekday;
  let weekCounter = 1;

  while (dayCounter <= currentLastDay) {
    const week: CalendarItem[] = [{ key: String(weekCounter), data: null }];

    for (let i = 0; i < 7; i++) {
      if (dayCounter <= 0) {
        const day = prevLastDay + dayCounter;
        week.push({
          key: `${prevYear}-${prevMonth}-${day}`,
          data: day,
        });
      } else if (dayCounter > currentLastDay) {
        const day = dayCounter - currentLastDay;
        week.push({
          key: `${nextYear}-${nextMonth}-${day}`,
          data: day,
        });
      } else {
        const day = dayCounter;
        week.push({
          key: `${year}-${month}-${day}`,
          data: day,
        });
      }
      dayCounter++;
    }

    weekCounter++;

    calendarDatas.push(week);
  }
  return calendarDatas;
};
