import Form, { type InputVariant } from '@/components/Form';
import useToggle from '@/hooks/useToggle';
import { Controller, UseFormReturn, useForm } from 'react-hook-form';

const DIRECT_INPUT = '직접 입력';

const CREATE_EPIGRAM_FORM_DEFAULT_VALUES: EpigramWithEpigramContent = {
  epigramContent: '',
  author: DIRECT_INPUT,
  referenceTitle: '',
  referenceUrl: '',
  tags: [],
};

interface EpigramWithEpigramContent extends Omit<EpigramBaseBody, 'content'> {
  epigramContent?: EpigramContent;
  authorInput?: string;
}

export default function CreateEpigramForm() {
  const methods = useForm<EpigramWithEpigramContent>({
    defaultValues: CREATE_EPIGRAM_FORM_DEFAULT_VALUES,
  });
  const { watch, register } = methods;
  const selectedAuthor = methods.watch('author');
  const isDirectInputSelected = selectedAuthor === DIRECT_INPUT;

  const handleSubmit = async (data: EpigramWithEpigramContent) => {
    const transformedData = {
      ...data,
      content: data.epigramContent,
    };
    if (isDirectInputSelected && transformedData.authorInput) {
      transformedData.author = transformedData.authorInput;
    }
    delete data.authorInput;
    delete transformedData.epigramContent;

    console.log('에피그램 생성 폼 제출');
    console.log(transformedData);
  };

  return (
    <Form onSubmit={handleSubmit} methods={methods}>
      <button>hi</button>
      <Form.Label className='mb-40 xl:mb-54'>
        <Form.LabelHeader className='mb-8 font-semibold xl:mb-24'>
          내용<span className='ml-4 font-medium text-error xl:ml-6'>*</span>
        </Form.LabelHeader>
        <Form.TextArea
          name='epigramContent'
          className='min-h-132 xl:min-h-148'
          placeholder='500자 이내로 입력해주세요.'
          variant={INPUT_VARIANT}
        />
      </Form.Label>
      <div className='mb-40 xl:mb-54'>
        <Form.LabelHeader className='mb-8 font-semibold xl:mb-24'>
          저자<span className='ml-4 font-medium text-error xl:ml-6'>*</span>
        </Form.LabelHeader>
        <div className='mb-12 flex gap-16 text-base font-medium leading-26 text-black-600 xl:mb-16 xl:gap-24 xl:text-xl xl:leading-32'>
          <Form.RadioInput name='author' value={DIRECT_INPUT} />
          <Form.RadioInput name='author' value={'알 수 없음'} />
          <Form.RadioInput name='author' value={'본인'} />
        </div>
        <Form.Input
          placeholder='저자 이름 입력'
          disabled={!isDirectInputSelected}
          variant={INPUT_VARIANT}
          {...register('authorInput', {
            required: isDirectInputSelected
              ? '저자 이름을 입력해 주세요'
              : false,
          })}
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
          disabled={!watch('referenceTitle')}
        />
      </Form.Label>
      <Form.Label className='mb-40 xl:mb-54'>
        <Form.LabelHeader className='mb-8 font-semibold xl:mb-24'>
          태그
        </Form.LabelHeader>
        <Form.TagInput
          name='tags'
          variant={INPUT_VARIANT}
          placeholder='입력하여 태그 작성 (최대 10자)'
        />
      </Form.Label>
      <Form.Submit>작성 완료</Form.Submit>
    </Form>
  );
}

const INPUT_VARIANT: InputVariant = 'outlined';
