import { useState } from 'react';

import EmotionCard from './components/EmotionCard';

const emotionList: Emotion[] = ['MOVED', 'HAPPY', 'WORRIED', 'SAD', 'ANGRY'];

export default function EmotionList() {
  const [selectedEmotion, setSelectedEmotion] = useState('');

  const handleCardClick = (emotion: Emotion) => {
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
