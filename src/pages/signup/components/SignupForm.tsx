import Form from '@/components/Form';
import { signupUser } from '@/lib/api/auth';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

export default function SignupForm() {
  const methods = useForm<SignUpRequestBody>();
  const router = useRouter();
  const { setError } = methods;
  const mutation = useMutation(signupUser, {
    onSuccess: data => {
      const userData = JSON.stringify(data.user);
      sessionStorage.setItem('userData', userData);
      router.push('/epigrams');
    },
    onError: (error: any) => {
      if (error.response.status === 500) {
        setError('nickname', { message: '이미 존재하는 닉네임입니다.' });
      }
      const errorMessage = error.response.data.message;
      const errorDetail = Object.keys(error.response.data.details)[0];
      if (['email', 'password'].includes(errorDetail)) {
        setError(errorDetail as keyof SignInRequestBody, {
          message: errorMessage,
        });
      }
    },
  });
  return (
    <Form
      onSubmit={(data: SignUpRequestBody) => {
        mutation.mutate(data);
      }}
      methods={methods}
    >
      <Form.Label className='mb-20 md:mb-40'>
        <Form.LabelHeader className='mb-16 md:mb-20'>이메일</Form.LabelHeader>
        <Form.Input
          name='email'
          placeholder='이메일'
          autoComplete='email'
          required
        />
      </Form.Label>
      <Form.Label className='mb-10 md:mb-16'>
        <Form.LabelHeader className='mb-16 md:mb-20'>비밀번호</Form.LabelHeader>
        <Form.PasswordInput
          name='password'
          placeholder='비밀번호'
          autoComplete='password'
          required
        />
      </Form.Label>
      <Form.Label className='mb-20 md:mb-40'>
        <Form.PasswordInput
          name='passwordConfirmation'
          placeholder='비밀번호 확인'
          autoComplete='password'
          required
        />
      </Form.Label>
      <Form.Label className='mb-30 md:mb-40'>
        <Form.LabelHeader className='mb-16 md:mb-20'>닉네임</Form.LabelHeader>
        <Form.Input
          name='nickname'
          placeholder='닉네임'
          autoComplete='nickname'
          required
        />
      </Form.Label>
      <Form.Submit>가입하기</Form.Submit>
    </Form>
  );
}
