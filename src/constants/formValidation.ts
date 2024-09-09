import { RegisterOptions } from 'react-hook-form';

export type Field = 'email' | 'password' | 'passwordConfirmation' | 'nickname';

const FIELD_DICTIONARY: Record<Field, string> = {
  email: '이메일',
  password: '비밀번호',
  passwordConfirmation: '비밀번호 확인',
  nickname: '닉네임',
};
const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PASSWORD_PATTERN = /^[A-Za-z\d!@#$%^&*]+$/;
const MAX_NICKNAME_LENGTH = 20;
const MIN_PASSWORD_LENGTH = 8;

const generateRequiredMessage = (name: Field): string => {
  if (name === 'passwordConfirmation')
    return `${FIELD_DICTIONARY[name]}을 입력해주세요.`;
  return `${FIELD_DICTIONARY[name]}은/는 필수 입력입니다.`;
};

const EMAIL_RULES: RegisterOptions = {
  required: generateRequiredMessage('email'),
  pattern: {
    value: EMAIL_PATTERN,
    message: '이메일 형식으로 작성해 주세요.',
  },
};

const NICKNAME_RULES: RegisterOptions = {
  required: generateRequiredMessage('nickname'),
  maxLength: {
    value: MAX_NICKNAME_LENGTH,
    message: `닉네임은 최대 ${MAX_NICKNAME_LENGTH}자까지 가능합니다.`,
  },
};

const PASSWORD_RULES: RegisterOptions = {
  required: generateRequiredMessage('비밀번호'),
  minLength: {
    value: MIN_PASSWORD_LENGTH,
    message: `비밀번호는 최소 ${MIN_PASSWORD_LENGTH}자 이상입니다.`,
  },
  pattern: {
    value: PASSWORD_PATTERN,
    message: '비밀번호는 숫자, 영문, 특수문자(!@#$%^&*)로만 가능합니다.',
  },
};

export const PASSWORD_CONFIRM_RULES = (
  passwordValue: string
): RegisterOptions => ({
  required: generateRequiredMessage('passwordConfirmation'),
  validate: value => value === passwordValue || '비밀번호가 일치하지 않습니다.',
});

const VALIDATION_RULES: Record<Field, RegisterOptions> = {
  email: EMAIL_RULES,
  password: PASSWORD_RULES,
  passwordConfirmation: {},
  nickname: NICKNAME_RULES,
};

export default VALIDATION_RULES;
