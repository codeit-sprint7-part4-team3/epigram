type Email = string;
type Password = string;
type RefreshToken = string;
type AccessToken = string;

interface UserWithEmail extends User {
  email: Email;
}

interface SignUpResponse {
  refreshToken: RefreshToken;
  accessToken: AccessToken;
  user: UserWithEmail;
}

interface SignUpRequestBody {
  image?: UrlType;
  passwordConfirmation: Password;
  password: Password;
  nickname: Nickname;
  email: Email;
}

interface SignInResponse {
  refreshToken: RefreshToken;
  accessToken: AccessToken;
  user: UserWithEmail;
}

interface SignInRequestBody {
  password: Password;
  email: Email;
}
