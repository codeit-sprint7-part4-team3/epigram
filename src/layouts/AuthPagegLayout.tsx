import GoogleLogo from '@/assets/logos/logo-google.svg';
import KakaoLogo from '@/assets/logos/logo-kakao.svg';
import NaverLogo from '@/assets/logos/logo-naver.svg';
import Logo from '@/components/Logo';
import { ReactNode } from 'react';

interface AuthPageLayoutProps {
  children: ReactNode;
  page: Page;
}

export default function AuthPageLayout({
  children,
  page,
}: AuthPageLayoutProps) {
  const {
    sendToLabel,
    sendToLink,
    sendToLinkLabel,
    oAuthLabel,
    oAuthLinkGoogle,
    oAuthLinkKakao,
    oAuthLinkNaver,
  } = labelByPage[page];
  return (
    <div className='my-0 px-24 py-100 md:px-180'>
      <div className='mx-auto flex max-w-640 flex-col items-center'>
        <Logo size='lg' className='mb-50 md:mb-60'></Logo>
        {children}
        <span className='mb-50 mt-10 self-end text-sm leading-24 text-blue-400 md:mb-60 md:text-base md:leading-26 xl:text-xl xl:leading-32'>
          {sendToLabel}
          <a
            href={sendToLink}
            className='ml-8 leading-26 text-black-500 underline'
          >
            {sendToLinkLabel}
          </a>
        </span>
        <div className='w-full px-[6.5px] xl:px-[13.5px]'>
          <div className='mb-24 flex items-center justify-between gap-14 xl:mb-40 xl:gap-24'>
            <div className='bg-line-300 h-1 w-full'></div>
            <span className='shrink-0 text-xs leading-26 text-gray-500 xl:text-xl'>
              SNS 계정으로 {oAuthLabel}
            </span>
            <div className='bg-line-300 h-1 w-full'></div>
          </div>
          <ul className='flex items-center justify-center gap-16'>
            <li>
              <a href={oAuthLinkGoogle}>
                <GoogleLogo className={socialLogoClass} />
              </a>
            </li>
            <li>
              <a href={oAuthLinkKakao}>
                <KakaoLogo className={socialLogoClass} />
              </a>
            </li>
            <li>
              <a href={oAuthLinkNaver}>
                <NaverLogo className={socialLogoClass} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
type Page = 'signin' | 'signup';

type AuthPageLabel =
  | 'sendToLabel'
  | 'sendToLink'
  | 'sendToLinkLabel'
  | 'oAuthLabel'
  | 'oAuthLinkGoogle'
  | 'oAuthLinkKakao'
  | 'oAuthLinkNaver';

const labelByPage: Record<Page, Record<AuthPageLabel, string>> = {
  signin: {
    sendToLabel: '회원이 아니신가요?',
    sendToLink: '/signup',
    sendToLinkLabel: '가입하기',
    oAuthLabel: '로그인하기',
    oAuthLinkGoogle: '#',
    oAuthLinkKakao: '#',
    oAuthLinkNaver: '#',
  },
  signup: {
    sendToLabel: '이미 가입하셨나요?',
    sendToLink: '/signin',
    sendToLinkLabel: '로그인하러 가기',
    oAuthLabel: '간편 가입하기',
    oAuthLinkGoogle: '#',
    oAuthLinkKakao: '#',
    oAuthLinkNaver: '#',
  },
};

const socialLogoClass = 'h-40 w-40 xl:h-60 xl:w-60';
