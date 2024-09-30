import type { Config } from 'tailwindcss';

const colorPalette: Record<
  string,
  string | Record<string | number, string | Record<string, string>>
> = {
  black: {
    100: '#787878',
    200: '#6B6B6B',
    300: '#5E5E5E',
    400: '#525252',
    500: '#454545',
    600: '#373737',
    700: '#2B2B2B',
    800: '#1F1F1F',
    900: '#121212',
    950: '#050505',
  },
  blue: {
    100: '#FFFFFF',
    200: '#ECEFF4',
    300: '#CBD3E1',
    400: '#ABB8CE',
    500: '#8B9DBC',
    600: '#6A82A9',
    700: '#52698E',
    800: '#40516E',
    900: '#2D394E',
    950: '#1A212D',
  },
  gray: {
    100: '#DEDEDE',
    200: '#C4C4C4',
    300: '#ABABAB',
    400: '#919191',
  },
  illust: {
    yellow: '#FBC85B',
    green: '#48BB98',
    purple: '#8E80E3',
    blue: '#5195EE',
    red: '#E46E80',
    brown: '#9A695E',
    sub: {
      yellow: '#E8AA26',
      blue01: '#3E3E3E',
      blue02: '#3E414D',
      blue03: '#494D59',
      gray01: '#C7D1E0',
      gray02: '#E3E9F1',
      gray03: '#EFF3F8',
    },
  },
  line: {
    100: '#F2F2F2',
    200: '#CFDBEA',
  },
  background: {
    100: '#F5F7FA',
  },
  error: '#FF6577',
};

const px0_10 = Array.from(Array(11)).reduce(
  (acc, _, i) => {
    acc[i] = `${i}px`;
    return acc;
  },
  {} as Record<number, string>
);

const px0_100 = Array.from(Array(101)).reduce(
  (acc, _, i) => {
    acc[i] = `${i}px`;
    return acc;
  },
  {} as Record<number, string>
);

const px0_1000 = Array.from(Array(1001)).reduce(
  (acc, _, i) => {
    acc[i] = `${i}px`;
    return acc;
  },
  {} as Record<number, string>
);

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/shared/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      borderWidth: px0_10,
      borderRadius: px0_100,
      fontSize: px0_100,
      lineHeight: px0_100,
      minWidth: px0_1000,
      minHeight: px0_1000,
      spacing: px0_1000,
      margin: px0_100,
      padding: px0_100,
      gap: px0_10,
      colors: colorPalette,
      fontFamily: {
        primary: ['Pretendard', 'sans-serif'],
        secondary: ['Iropke Batang', 'serif'],
      },
      backgroundImage: {
        'stripe-pattern':
          'linear-gradient(to bottom, #f2f2f2 1px, transparent 1px)',
      },
      backgroundSize: {
        'stripe-size': '100% 24px',
      },
    },
  },
  plugins: [],
};
export default config;
