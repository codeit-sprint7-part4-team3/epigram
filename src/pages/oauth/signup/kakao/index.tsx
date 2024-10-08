import { KAKAO_REDIRECT_URL } from '@/constants/apiConstants';
import { socialSignInUser } from '@/lib/api/auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useMutation } from 'react-query';

const KakaoCallback = () => {
  const router = useRouter();
  const { code } = router.query;

  // 리액트 쿼리의 useMutation을 사용하여 카카오 로그인 요청 처리
  const mutation = useMutation(
    async (data: SignInWithOauthRequestBody) => {
      return await socialSignInUser('KAKAO', data);
    },
    {
      onSuccess: response => {
        console.log('Login successful:', response);
        // 로그인 후 성공 시 처리 (예: 리다이렉트)
        // router.push('/dashboard'); // 예시로 대시보드로 리다이렉트
      },
      onError: error => {
        console.error('Error during Kakao login:', error);
      },
    }
  );

  useEffect(() => {
    if (code) {
      const data: SignInWithOauthRequestBody = {
        token: code as string,
        redirectUri: KAKAO_REDIRECT_URL,
      };
      // code가 존재하면 mutation 실행
      mutation.mutate(data);
    }
  }, [code]); // code가 바뀔 때마다 useEffect 실행

  return <div>카카오 로그인 처리 중...</div>;
};

export default KakaoCallback;
