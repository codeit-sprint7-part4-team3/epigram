import { KAKAO_JS_KEY } from '@/constants/apiConstants';
import AuthPageLayout from '@/layouts/AuthPagegLayout';
import SignInForm from '@/pages/signin/components/SignInForm';
import { initKakao } from 'kakao-js-sdk';
import Script from 'next/script';
import { useEffect } from 'react';

export default function SignInPage() {
  useEffect(() => {
    initKakao(KAKAO_JS_KEY);
  }, []);
  return (
    <>
      <Script src='https://developers.kakao.com/sdk/js/kakao.js' />
      <AuthPageLayout page='signin'>
        <SignInForm />
      </AuthPageLayout>
    </>
  );
}
