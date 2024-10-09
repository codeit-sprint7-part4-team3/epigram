import {
  getEmotionLogsToday,
  postEmotionLogsToday,
} from '@/lib/api/emotionLogs';
import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import EmotionCard from './components/EmotionCard';

const emotionList: Emotion[] = ['MOVED', 'HAPPY', 'WORRIED', 'SAD', 'ANGRY'];

export default function EmotionList() {
  const [selectedEmotion, setSelectedEmotion] = useState('');
  const queryClient = useQueryClient(); // React Query의 Query Client 사용

  const { isLoading, error, data } = useQuery({
    queryKey: ['emotionLogsToday'],
    queryFn: () => getEmotionLogsToday(),
  });

  const mutation = useMutation(postEmotionLogsToday, {
    onSuccess: () => {
      queryClient.invalidateQueries(['emotionLogsToday']);
      queryClient.invalidateQueries(['emotionLogsMonthly']);
    },
    onError: (error: any) => {
      console.error(error);
    },
  });

  useEffect(() => {
    const fetchEmotionLogs = async () => {
      if (data) {
        setSelectedEmotion(data.emotion);
      }
    };

    fetchEmotionLogs();
  }, [data]);

  const handleCardClick = (emotion: Emotion) => {
    setSelectedEmotion(emotion);
    mutation.mutate({ emotion });
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
