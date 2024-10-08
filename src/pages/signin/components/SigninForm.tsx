import Form from '@/components/Form';

export default function LoginForm() {
  return (
    <div className='mx-auto w-full md:max-w-384 xl:max-w-640'>
      <Form
        onSubmit={() => {
          console.log('로그인 폼 제출');
        }}
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
    </div>
  );
}