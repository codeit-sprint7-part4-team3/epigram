import { Id, Timestamps } from '@/types/CommonTypes';

export type Emotion = 'MOVED' | 'HAPPY' | 'WORRIED' | 'SAD' | 'ANGRY';

export interface EmotionLogType extends Timestamps {
  emotion: Emotion;
  userId: Id;
  id: Id;
}

export interface UpsertEmotionLogBody {
  emotion: Emotion;
}
