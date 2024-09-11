type OauthProvider = 'GOOGLE' | 'NAVER' | 'KAKAO';
type AppKey = string;
type AppSecret = string;
type OauthToken = string;

interface OauthApp extends Timestamps {
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

interface SignInWithOauthRequestBody {
  state?: string;
  redirectUri?: UrlType;
  token: OauthToken;
}
