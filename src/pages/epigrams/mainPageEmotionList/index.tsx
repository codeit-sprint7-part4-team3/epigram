import { getEmotionLogsToday } from '@/lib/api/emotionLogs';
import { useEffect, useState } from 'react';

import EmotionCard from './components/EmotionCard';

const emotionList: Emotion[] = ['MOVED', 'HAPPY', 'WORRIED', 'SAD', 'ANGRY'];

interface EmotionListProps {
  selectedEmotion: Emotion | null; //부모에서 선택된 감정 받기
  setSelectedEmotion: (emotion: Emotion | null) => void; //부모에서 상태 변경 함수 받기
}

export default function MainPageEmotionList({
  selectedEmotion,
  setSelectedEmotion,
}: EmotionListProps) {
  useEffect(() => {
    const fetchEmotionLogs = async () => {
      const result = await getEmotionLogsToday();
      setSelectedEmotion(result.emotion); //초기값 설정
    };

    fetchEmotionLogs();
  }, [setSelectedEmotion]);

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
