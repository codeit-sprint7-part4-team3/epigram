import { Id, Timestamps } from '@/types/CommonTypes';

type OauthProvider = 'GOOGLE' | 'NAVER' | 'KAKAO';
type AppKey = string;
type AppSecret = string;

export interface OauthApp extends Timestamps {
  appSecret: AppSecret | null;
  appKey: AppKey;
  provider: OauthProvider;
  teamId: string;
  id: Id;
}

interface UpsertOauthAppRequestBody {
  appSecret?: AppSecret;
  appKey: AppKey;
  provider: OauthProvider;
}
