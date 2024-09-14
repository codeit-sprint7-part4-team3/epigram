import Form, { type InputVariant } from '@/components/Form';
import useToggle from '@/hooks/useToggle';
import { useForm } from 'react-hook-form';

export default function CreateEpigramForm() {
  const {
    isOpen: isInputActive,
    close: deactivateInput,
    open: activateInput,
  } = useToggle(false);
  const methods = useForm();
  const { setValue } = methods;
  return (
    <Form
      onSubmit={(data: CreateEpigramBody) => {
        console.log('에피그램 생성 폼 제출');
        console.log(data);
      }}
      methods={methods}
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
          variant={INPUT_VARIANT}
        />
      </Form.Label>
      <div className='mb-40 xl:mb-54'>
        <Form.LabelHeader className='mb-8 font-semibold xl:mb-24'>
          저자<span className='ml-4 font-medium text-error xl:ml-6'>*</span>
        </Form.LabelHeader>
        <div className='mb-12 flex gap-16 text-base font-medium leading-26 text-black-600 xl:mb-16 xl:gap-24 xl:text-xl xl:leading-32'>
          <Form.Label
            className='flex cursor-pointer items-center gap-8'
            onClick={() => {
              activateInput();
            }}
          >
            <Form.RadioInput name='author' />
            직접 입력
          </Form.Label>
          <Form.Label
            className='flex cursor-pointer items-center gap-8'
            onClick={() => {
              deactivateInput();
              setValue('name', '알 수 없음');
            }}
          >
            <Form.RadioInput name='author' value='알 수 없음' />알 수 없음
          </Form.Label>
          <Form.Label
            className='flex cursor-pointer items-center gap-8'
            onClick={() => {
              deactivateInput();
              setValue('name', '알 수 없음');
            }}
          >
            <Form.RadioInput name='author' value='본인' />
            본인
          </Form.Label>
        </div>
        <Form.Input
          name='author'
          placeholder='저자 이름 입력'
          disabled={!isInputActive}
          variant={INPUT_VARIANT}
        />
      </div>
      <Form.Label className='mb-8 xl:mb-16'>
        <Form.LabelHeader className='mb-8 font-semibold xl:mb-24'>
          출처
        </Form.LabelHeader>
        <Form.Input
          name='referenceTitle'
          placeholder='출처 제목 입력'
          variant={INPUT_VARIANT}
        />
      </Form.Label>
      <Form.Label className='mb-40 xl:mb-54'>
        <Form.Input
          name='referenceUrl'
          placeholder='URL (ex. https://www.website.com)'
          variant={INPUT_VARIANT}
        />
      </Form.Label>
      <Form.Label className='mb-40 xl:mb-54'>
        <Form.LabelHeader className='mb-8 font-semibold xl:mb-24'>
          태그
        </Form.LabelHeader>
        <Form.Input
          name='tags'
          placeholder='입력하여 태그 작성 (최대 10자)'
          variant={INPUT_VARIANT}
        />
      </Form.Label>
      <Form.Submit>작성 완료</Form.Submit>
    </Form>
  );
}

const INPUT_VARIANT: InputVariant = 'outlined';
