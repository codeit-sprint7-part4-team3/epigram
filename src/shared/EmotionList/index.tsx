import { useState } from 'react';

import EmotionCard from './components/EmotionCard';

type EmotionType = 'moved' | 'happy' | 'worried' | 'sad' | 'angry';

const emotionList: EmotionType[] = [
  'moved',
  'happy',
  'worried',
  'sad',
  'angry',
];

export default function EmotionList() {
  const [selectedEmotion, setSelectedEmotion] = useState('');

  const handleCardClick = (emotion: EmotionType) => {
    setSelectedEmotion(emotion);
  };

  return (
    <div className={`flex gap-16`}>
      {emotionList.map(emotion => (
        <EmotionCard
          key={emotion}
          emotionType={emotion}
          isSelected={emotion === selectedEmotion}
          handleCardClick={handleCardClick}
        />
      ))}
    </div>
  );
}
