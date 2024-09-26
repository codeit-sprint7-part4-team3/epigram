import Form from '@/components/Form';
import { signinUser } from '@/lib/api/auth';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

export default function SignInForm() {
  const methods = useForm();
  const { setError } = methods;
  const mutation = useMutation(signinUser, {
    onSuccess: data => {
      // 로그인 성공 시
      // 1. 리다이렉트
      // 2. 유저 정보 저장
      console.log(data);
    },
    onError: (error: any) => {
      const errorMessage = error.response.data.message;
      const errorDetail = Object.keys(error.response.data.details)[0];
      setError(errorDetail, { message: errorMessage });
    },
  });

  const handleClick = async () => {
    try {
      const response = await axios.get('/api/users/me', {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      console.log(response);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

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
      <button type='button' onClick={handleClick}>
        유후
      </button>
    </Form>
  );
}