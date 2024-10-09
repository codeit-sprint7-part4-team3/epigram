import IconAngry from '@/assets/icons/ic-emotion-angry.svg';
import IconHappy from '@/assets/icons/ic-emotion-happy.svg';
import IconMoved from '@/assets/icons/ic-emotion-moved.svg';
import IconSad from '@/assets/icons/ic-emotion-sad.svg';
import IconWorried from '@/assets/icons/ic-emotion-worried.svg';
import { useQuery } from 'react-query';

const iconSize = 'w-32 h-32 xl:w-48 xl:h-48';
const dataByEmotionType = {
  MOVED: {
    name: '감동',
    render: <IconMoved className={iconSize} />,
    borderColor: 'border-illust-yellow',
  },
  HAPPY: {
    name: '기쁨',
    render: <IconHappy className={iconSize} />,
    borderColor: 'border-illust-green',
  },
  WORRIED: {
    name: '고민',
    render: <IconWorried className={iconSize} />,
    borderColor: 'border-illust-purple',
  },
  SAD: {
    name: '슬픔',
    render: <IconSad className={iconSize} />,
    borderColor: 'border-illust-blue',
  },
  ANGRY: {
    name: '분노',
    render: <IconAngry className={iconSize} />,
    borderColor: 'border-illust-red',
  },
};

interface EmotionCardProps {
  emotionType: Emotion;
  isSelected?: boolean;
  handleCardClick: (emotion: Emotion) => void;
}

export default function EmotionCard({
  emotionType,
  isSelected,
  handleCardClick,
}: EmotionCardProps) {
  const emotionData = dataByEmotionType[emotionType];

  const borderBase = 'border-3 xl:border-4 border-solid ';
  const borderColor = emotionData.borderColor;
  const selectedBorder = isSelected ? borderBase + borderColor : '';

  const padding = isSelected ? 'p-9 md:p-13 xl:p-20' : 'p-12 md:p-16 xl:p-24';
  const backgroundColor = isSelected ? '' : 'bg-etc-emotion-background';
  const textColor = isSelected
    ? 'text-illust-sub-blue01'
    : 'text-etc-emotion-textNotSelected';

  const handleClick = () => {
    handleCardClick(emotionType);
  };

  return (
    <div
      className={`flex w-56 flex-col gap-8 md:w-64 xl:w-96`}
      onClick={handleClick}
    >
      <div
        className={`box-border w-56 md:w-64 xl:w-96 ${padding} ${selectedBorder} rounded-2xl ${backgroundColor}`}
      >
        {emotionData.render}
      </div>
      <p
        className={`text-center font-primary text-12 font-semibold md:text-14 xl:text-24 ${textColor}`}
      >
        {emotionData.name}
      </p>
    </div>
  );
}
