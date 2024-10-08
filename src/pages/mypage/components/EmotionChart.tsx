import IconAngry from '@/assets/icons/ic-emotion-angry.svg';
import IconHappy from '@/assets/icons/ic-emotion-happy.svg';
import IconMoved from '@/assets/icons/ic-emotion-moved.svg';
import IconNotFound from '@/assets/icons/ic-emotion-notfound.svg';
import IconSad from '@/assets/icons/ic-emotion-sad.svg';
import IconWorried from '@/assets/icons/ic-emotion-worried.svg';
import { useEffect, useRef, useState } from 'react';

import EmotionRankingItem from './EmotionRankingItem';

const stylesBySize = {
  small: { width: 120, height: 120, radius: 57, lineWidth: 6, gap: 10 / 57 },
  large: { width: 180, height: 180, radius: 85, lineWidth: 10, gap: 14 / 85 },
};

const iconSize = 'm-auto h-24 w-24 xl:w-40 xl:h-40';
const iconByEmotion: Record<EmotionNames, JSX.Element> = {
  감동: <IconMoved className={iconSize} />,
  기쁨: <IconHappy className={iconSize} />,
  고민: <IconWorried className={iconSize} />,
  슬픔: <IconSad className={iconSize} />,
  분노: <IconAngry className={iconSize} />,
  없음: <IconNotFound className='m-auto block h-50 w-50 xl:h-70 xl:w-70' />,
};

const colorCodeMap: Record<ChartColors, string> = {
  'bg-illust-yellow': '#FBC85B',
  'bg-illust-green': '#48BB98',
  'bg-illust-purple': '#8E80E3',
  'bg-illust-blue': '#5195EE',
  'bg-illust-red': '#E46E80',
  'bg-illust-sub-gray01': '#C7D1E0',
  'bg-illust-sub-gray02': '#E3E9F1',
  'bg-illust-sub-gray03': '#EFF3F8',
};

const emotionDatasNotExist: MonthlyEmotionDatasItem[] = [
  { name: '감동', color: 'bg-illust-sub-gray02', count: 1 },
  { name: '기쁨', color: 'bg-illust-sub-gray02', count: 1 },
  { name: '고민', color: 'bg-illust-sub-gray02', count: 1 },
  { name: '슬픔', color: 'bg-illust-sub-gray02', count: 1 },
  { name: '분노', color: 'bg-illust-sub-gray02', count: 1 },
];

export default function EmotionChart({
  className,
  monthlyEmotionDatas,
  windowSize,
}: EmotionChartProps) {
  const [firstEmotionName, setFirstEmotionName] = useState<EmotionNames | ''>(
    ''
  );
  const [chartDatas, setChartDatas] = useState<
    EmotionRankingItemProps[] | null
  >(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let emotionDatas: MonthlyEmotionDatasItem[] = Object.values(
      monthlyEmotionDatas
    ).sort((a, b) => b.count - a.count);

    let totalCountOfEmotion = emotionDatas.reduce(
      (acc, emotionData) => acc + emotionData.count,
      0
    );

    emotionDatas[2].color = 'bg-illust-sub-gray01';
    emotionDatas[3].color = 'bg-illust-sub-gray02';
    emotionDatas[4].color = 'bg-illust-sub-gray03';

    if (totalCountOfEmotion === 0) {
      emotionDatas = emotionDatasNotExist;
    }

    const { width, height, radius, lineWidth, gap } = stylesBySize[windowSize];

    canvas.width = width;
    canvas.height = height;

    const centerX = width / 2;
    const centerY = height / 2;

    let startAngle = -Math.PI / 2;

    emotionDatas.forEach(emotionData => {
      if (emotionData.count === 0) {
        return;
      }

      const sliceAngle =
        (emotionData.count / (totalCountOfEmotion || emotionDatas.length)) *
        2 *
        Math.PI;

      const endAngle = startAngle + sliceAngle - gap;

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.lineWidth = lineWidth;
      ctx.lineCap = 'round';
      ctx.strokeStyle = colorCodeMap[emotionData.color];
      ctx.stroke();

      startAngle = endAngle + gap;
    });

    let tempChartDatas: EmotionRankingItemProps[] = [];

    if (totalCountOfEmotion === 0) {
      emotionDatas.forEach(emotionData => {
        tempChartDatas.push({
          emotion: emotionData.name,
          color: emotionData.color,
          rate: 0,
        });
      });

      setFirstEmotionName('없음');
      setChartDatas(tempChartDatas);
      return;
    }

    emotionDatas.forEach(emotionData => {
      tempChartDatas.push({
        emotion: emotionData.name,
        color: emotionData.color,
        rate: Math.round((emotionData.count / totalCountOfEmotion) * 100),
      });
    });

    setFirstEmotionName(emotionDatas[0].name);
    setChartDatas(tempChartDatas);
  }, [monthlyEmotionDatas, windowSize]);

  if (!windowSize) {
    return null;
  }

  return (
    <div
      className={`${className} flex w-312 items-center justify-between rounded-8 border-1 border-solid border-blue-200 px-38 py-22 md:w-384 md:px-60 xl:h-264 xl:w-640 xl:px-112 xl:py-24`}
    >
      <div className='flex items-center'>
        <canvas ref={canvasRef} />
        <div className='absolute left-0 flex h-166 w-196 items-center justify-center md:w-240 xl:h-264 xl:w-404'>
          <div className='flex h-94 w-94 rounded-full border-1 border-dashed border-blue-200 xl:h-140 xl:w-140'>
            <div className='grow-1 flex w-94 flex-col items-center justify-center gap-4 py-21 xl:w-140 xl:gap-8 xl:py-34'>
              {firstEmotionName && iconByEmotion[firstEmotionName]}
              {firstEmotionName !== '없음' && (
                <p className='m-auto text-center font-primary text-16 font-bold text-black-600'>
                  {firstEmotionName}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      {chartDatas && (
        <div className='xl:gap flex h-132 flex-col items-center justify-between gap-8 xl:h-216'>
          {chartDatas.map(chartData => (
            <EmotionRankingItem
              key={chartData.emotion}
              emotion={chartData.emotion}
              color={chartData.color}
              rate={chartData.rate}
            />
          ))}
        </div>
      )}
    </div>
  );
}
