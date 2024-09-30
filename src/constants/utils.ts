import IconAngry from '@/assets/icons/ic-emotion-angry.svg';
import IconHappy from '@/assets/icons/ic-emotion-happy.svg';
import IconMoved from '@/assets/icons/ic-emotion-moved.svg';
import IconSad from '@/assets/icons/ic-emotion-sad.svg';
import IconWorried from '@/assets/icons/ic-emotion-worried.svg';

export const getToday = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  const today = `${year}-${month}-${day}`;

  return today;
};

export const getFirstWeekday = (year: number, month: Month) => {
  const date = new Date(year, month - 1, 1);
  return date.getDay();
};

export const getLastDay = (year: number, month: Month) => {
  const lastDay = {
    1: 31,
    2: getLastDayForFebruary(year),
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31,
  };

  return lastDay[month];
};

export const getLastDayForFebruary = (year: number) => {
  if (year % 400 === 0) return 29;
  if (year % 100 === 0) return 28;
  if (year % 4 === 0) return 29;
  return 28;
};

export const leftPad = (string: string | number, length: number) => {
  string = string + '';
  return string.padStart(length, '0');
};

export const getMonthKey = (year: number, month: Month) => {
  return `${year}-${leftPad(month, 2)}`;
};
