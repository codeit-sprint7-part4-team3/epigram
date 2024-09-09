import { Id, Timestamps, UrlType } from '@/types/CommonTypes';

type OauthProvider = 'GOOGLE' | 'NAVER' | 'KAKAO';
type AppKey = string;
type AppSecret = string;
type OauthToken = string;

export interface OauthApp extends Timestamps {
  appSecret: AppSecret | null;
  appKey: AppKey;
  provider: OauthProvider;
  teamId: string;
  id: Id;
}

export interface UpsertOauthAppRequestBody {
  appSecret?: AppSecret;
  appKey: AppKey;
  provider: OauthProvider;
}

export interface SignInWithOauthRequestBody {
  state?: string;
  redirectUri?: UrlType;
  token: OauthToken;
}
