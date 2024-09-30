import IconAngry from '@/assets/icons/ic-emotion-angry.svg';
import IconHappy from '@/assets/icons/ic-emotion-happy.svg';
import IconMoved from '@/assets/icons/ic-emotion-moved.svg';
import IconSad from '@/assets/icons/ic-emotion-sad.svg';
import IconWorried from '@/assets/icons/ic-emotion-worried.svg';

const iconSize = 'w-32 h-32 xl:w-48 xl:h-48';
const dataByEmotionType = {
  moved: {
    name: '감동',
    render: <IconMoved className={iconSize} />,
    borderColor: 'border-illust-yellow',
  },
  happy: {
    name: '기쁨',
    render: <IconHappy className={iconSize} />,
    borderColor: 'border-illust-green',
  },
  worried: {
    name: '고민',
    render: <IconWorried className={iconSize} />,
    borderColor: 'border-illust-purple',
  },
  sad: {
    name: '슬픔',
    render: <IconSad className={iconSize} />,
    borderColor: 'border-illust-blue',
  },
  angry: {
    name: '분노',
    render: <IconAngry className={iconSize} />,
    borderColor: 'border-illust-red',
  },
};

type EmotionType = 'moved' | 'happy' | 'worried' | 'sad' | 'angry';
interface EmotionCardProps {
  emotionType: EmotionType;
  isSelected?: boolean;
  handleCardClick: (emotion: EmotionType) => void;
}

export default function EmotionCard({
  emotionType,
  isSelected,
  handleCardClick,
}: EmotionCardProps) {
  const emotionData = dataByEmotionType[emotionType];

  const borderBase = 'border-4 border-solid ';
  const borderColor = emotionData.borderColor;
  const selectedBorder = isSelected ? borderBase + borderColor : '';

  const padding = isSelected ? 'p-20' : 'p-24';

  const backgroundColor = isSelected ? '' : 'bg-etc-emotion-background';

  const handleClick = () => {
    handleCardClick(emotionType);
  };

  return (
    <div
      className={`flex w-56 flex-col gap-8 md:w-64 xl:w-96`}
      onClick={handleClick}
    >
      <div
        className={`box-border h-84 w-56 md:h-96 md:w-64 xl:h-96 xl:w-96 ${padding} ${selectedBorder} rounded-2xl ${backgroundColor}`}
      >
        {emotionData.render}
      </div>
      <p className={`text-center`}>{emotionData.name}</p>
    </div>
  );
}
