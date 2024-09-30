interface CalendarItem {
  key: string;
  data: string | number | null;
}

type CalendarDatas = CalendarItem[][];

type Month = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

interface EmotionCalendarProps {
  year: number;
  month: Month;
}

interface CalendarBarProps extends EmotionCalendarProps {
  calendarData: CalendarItem[];
}
