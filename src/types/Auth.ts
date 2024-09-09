import { Nickname, UrlType } from '@/types/CommonTypes';
import UserType from '@/types/User';

type Email = string;
type Password = string;
type RefreshToken = string;
type AccessToken = string;

interface UserWithEmail extends UserType {
  email: Email;
}

export interface SignUpResponse {
  user: UserWithEmail;
}

export interface SignUpRequestBody {
  image?: UrlType;
  passwordConfirmation: Password;
  password: Password;
  nickname: Nickname;
  email: Email;
}

export interface SignInResponse {
  refreshToken: RefreshToken;
  accessToken: AccessToken;
  user: UserWithEmail;
}

export interface SignInRequestBody {
  password: Password;
  email: Email;
}
