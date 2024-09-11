import Form from '@/components/Form';

export default function CreateEpigramForm() {
  // const values: CreateEpigramBody = {
  //   tags,
  //   author,
  //   content,
  //   referenceTitle,
  //   referenceUrl,
  // };
  return (
    <div className='mx-auto w-full md:max-w-384 xl:max-w-640'>
      <Form
        onSubmit={(data: CreateEpigramBody) => {
          console.log('에피그램 생성 폼 제출');
          console.log(data);
        }}
      >
        <Form.Label className='mb-40 xl:mb-54'>
          <Form.LabelHeader className='mb-8 font-semibold xl:mb-24'>
            내용<span className='ml-4 font-medium text-error xl:ml-6'>*</span>
          </Form.LabelHeader>
          <Form.TextArea
            name='content'
            className='min-h-132 xl:min-h-148'
            placeholder='500자 이내로 입력해주세요.'
            required
          />
        </Form.Label>
        <div className='mb-40 xl:mb-54'>
          <Form.LabelHeader className='mb-8 font-semibold xl:mb-24'>
            저자<span className='ml-4 font-medium text-error xl:ml-6'>*</span>
          </Form.LabelHeader>
          <div className='mb-12 flex gap-16 xl:mb-16 xl:gap-24'>
            <Form.Label className='flex items-center gap-8'>
              <Form.RadioInput name='author' value='직접 입력' checked />
              직접 입력
            </Form.Label>
            <Form.Label className='flex items-center gap-8'>
              <Form.RadioInput name='author' value='알 수 없음' />알 수 없음
            </Form.Label>
            <Form.Label className='flex items-center gap-8'>
              <Form.RadioInput name='author' value='본인' />
              본인
            </Form.Label>
          </div>
          <Form.Input name='author' placeholder='저자 이름 입력' disabled />
        </div>

        <Form.Submit>가입하기</Form.Submit>
      </Form>
    </div>
  );
}
