import Form from '@/components/Form';

export default function SignupForm() {
  return (
    <div className='mx-auto w-full md:max-w-384 xl:max-w-640'>
      <Form
        onSubmit={() => {
          console.log('회원가입 폼 제출');
        }}
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
          <Form.LabelHeader className='mb-16 md:mb-20'>
            비밀번호
          </Form.LabelHeader>
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
    </div>
  );
}