import {
  getEmotionLogsToday,
  postEmotionLogsToday,
} from '@/lib/api/emotionLogs';
import { useEffect, useState } from 'react';

import MainPageEmotionCard from './components/MainPageEmotionCard';

const emotionList: Emotion[] = ['MOVED', 'HAPPY', 'WORRIED', 'SAD', 'ANGRY'];

interface EmotionListProps {
  selectedEmotion: Emotion | null; // 부모에서 선택된 감정을 받아오기
  setSelectedEmotion: (emotion: Emotion | null) => void; // 부모에서 상태 변경 함수 받아오기
}

export default function MainPageEmotionList({
  selectedEmotion,
  setSelectedEmotion,
}: EmotionListProps) {
  useEffect(() => {
    const fetchEmotionLogs = async () => {
      const result = await getEmotionLogsToday();
      setSelectedEmotion(result.emotion); // 초기값 설정
    };

    fetchEmotionLogs();
  }, [setSelectedEmotion]);

  const handleCardClick = (emotion: Emotion) => {
    setSelectedEmotion(emotion);
  };

  return (
    <div className={`flex gap-16`}>
      {emotionList.map(emotion => (
        <MainPageEmotionCard
          key={emotion}
          emotionType={emotion}
          isSelected={emotion === selectedEmotion}
          handleCardClick={handleCardClick}
        />
      ))}
    </div>
  );
}
