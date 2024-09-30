interface EmotionChartProps {
  className: string;
  monthlyEmotionDatas: MonthlyEmotionDatasForChart;
  windowSize: 'small' | 'large';
}
type ChartColors =
  | 'bg-illust-yellow'
  | 'bg-illust-green'
  | 'bg-illust-purple'
  | 'bg-illust-blue'
  | 'bg-illust-red'
  | 'bg-illust-sub-gray01'
  | 'bg-illust-sub-gray02'
  | 'bg-illust-sub-gray03';

type EmotionNames = '감동' | '기쁨' | '고민' | '슬픔' | '분노' | '없음';

interface MonthlyEmotionDatasItem {
  name: EmotionNames;
  color: ChartColors;
  count: number;
}

interface MonthlyEmotionDatasForChart {
  MOVED: MonthlyEmotionDatasItem;
  HAPPY: MonthlyEmotionDatasItem;
  WORRIED: MonthlyEmotionDatasItem;
  SAD: MonthlyEmotionDatasItem;
  ANGRY: MonthlyEmotionDatasItem;
}

interface EmotionRankingItemProps {
  emotion: EmotionNames;
  color: string;
  rate: number;
}
