import { KAKAO_REDIRECT_URL } from '@/constants/apiConstants';
import { kakaoSignInUser } from '@/lib/api/auth';
import { useUserStore } from '@/lib/store/useUserStore';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useMutation } from 'react-query';

const KakaoCallback = () => {
  const router = useRouter();
  const { code } = router.query;
  const { setUser } = useUserStore();
  const mutation = useMutation(kakaoSignInUser, {
    onSuccess: response => {
      setUser(response.user);
      router.push('/');
    },
    onError: error => {
      console.error('카카오 로그인 에러:', error);
    },
  });

  useEffect(() => {
    if (code) {
      const data: SignInWithOauthRequestBody = {
        token: code as string,
        redirectUri: KAKAO_REDIRECT_URL,
      };
      mutation.mutate(data);
    }
  }, [code, mutation]);

  return <div>카카오 로그인 처리 중...</div>;
};

export default KakaoCallback;
