import IconAngry from '@/assets/icons/ic-emotion-angry.svg';
import IconHappy from '@/assets/icons/ic-emotion-happy.svg';
import IconMoved from '@/assets/icons/ic-emotion-moved.svg';
import IconNotFound from '@/assets/icons/ic-emotion-notfound.svg';
import IconSad from '@/assets/icons/ic-emotion-sad.svg';
import IconWorried from '@/assets/icons/ic-emotion-worried.svg';

const iconSize = 'm-auto h-16 w-16 xl:h-24 xl:w-24';
const iconByEmotion: Record<EmotionNames, JSX.Element> = {
  감동: <IconMoved className={iconSize} />,
  기쁨: <IconHappy className={iconSize} />,
  고민: <IconWorried className={iconSize} />,
  슬픔: <IconSad className={iconSize} />,
  분노: <IconAngry className={iconSize} />,
  없음: <IconNotFound className={iconSize} />,
};

export default function EmotionRankingItem({
  emotion,
  color,
  rate,
}: EmotionRankingItemProps) {
  return (
    <div className='flex items-center justify-between gap-8 xl:gap-16'>
      <div className={`h-8 w-8 rounded-2 ${color} xl:h-16 xl:w-16`} />
      {iconByEmotion[emotion]}
      <p className='font-primary text-12 font-semibold leading-20 text-black-600 xl:text-20 xl:leading-32'>
        {`${rate}%`}
      </p>
    </div>
  );
}
