type Emotion = 'MOVED' | 'HAPPY' | 'WORRIED' | 'SAD' | 'ANGRY';

interface EmotionLogType extends Timestamps {
  emotion: Emotion;
  userId: Id;
  id: Id;
}

interface UpsertEmotionLogBody {
  emotion: Emotion;
}
