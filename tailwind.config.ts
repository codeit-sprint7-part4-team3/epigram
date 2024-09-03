import type { Config } from 'tailwindcss';

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

const px0_200 = Array.from(Array(201)).reduce(
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
  ],
  theme: {
    extend: {
      borderWidth: px0_10,
      fontSize: px0_100,
      lineHeight: px0_100,
      minWidth: px0_200,
      minHeight: px0_200,
      spacing: px0_200,
      margin: px0_100,
      padding: px0_100,
      gap: px0_10,
    },
  },
  plugins: [],
};
export default config;
