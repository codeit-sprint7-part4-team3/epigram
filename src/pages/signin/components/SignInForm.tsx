import Form from '@/components/Form';
import { signinUser } from '@/lib/api/auth';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

export default function SignInForm() {
  const methods = useForm();
  const router = useRouter();
  const { setError } = methods;
  const mutation = useMutation(signinUser, {
    onSuccess: data => {
      // 1. 리다이렉트
      console.log(data);
      // 2. 유저 정보 저장
      router.push('/');
    },
    onError: (error: any) => {
      const errorMessage = error.response.data.message;
      const errorDetail = Object.keys(error.response.data.details)[0];
      setError(errorDetail, { message: errorMessage });
    },
  });

  return (
    <Form
      onSubmit={(data: SignInRequestBody) => {
        mutation.mutate(data);
        console.log('로그인 폼 제출');
      }}
      methods={methods}
    >
      <Form.Label className='mb-10 xl:mb-16'>
        <Form.Input
          name='email'
          placeholder='이메일'
          required
          autoComplete='email'
        />
      </Form.Label>
      <Form.Label className='mb-20 xl:mb-24'>
        <Form.PasswordInput
          name='password'
          placeholder='비밀번호'
          required
          autoComplete='password'
        />
      </Form.Label>
      <Form.Submit>로그인</Form.Submit>
    </Form>
  );
}
