import Form, { type InputVariant } from '@/components/Form';
import { MAX_EPIGRAM_CONTENT_LENGTH } from '@/constants/formValidation';
import { CreateEpigram } from '@/lib/api/epigrams';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

const DIRECT_INPUT = '직접 입력';

interface EpigramWithEpigramContent extends Omit<EpigramBaseBody, 'content'> {
  epigramContent: string;
  authorInput: string;
}

interface Props {
  epigramBody: EpigramBaseBody;
}

export default function EditEpigramForm({ epigramBody }: Props) {
  const { content = '', tags = [], ...rest } = epigramBody || {};
  const transformedEpigramBody: EpigramWithEpigramContent = {
    ...rest,
    epigramContent: content,
    authorInput: '',
    tags,
  };
  if (!['본인', '알 수 없음'].includes(rest.author)) {
    transformedEpigramBody.authorInput = transformedEpigramBody.author;
    transformedEpigramBody.author = DIRECT_INPUT;
  }
  const methods = useForm<EpigramWithEpigramContent>({
    defaultValues: transformedEpigramBody,
  });
  const { watch, register } = methods;
  const router = useRouter();
  const mutation = useMutation(CreateEpigram, {
    onSuccess: (data: EpigramListType) => {
      console.log(data);
      // router.push(`/feed/${data.id}`);
    },
    onError: (error: any) => {
      console.error(error);
    },
  });

  const selectedAuthor = methods.watch('author');
  const isDirectInputSelected = selectedAuthor === DIRECT_INPUT;

  const handleSubmit = async (data: EpigramWithEpigramContent) => {
    const {
      epigramContent,
      authorInput,
      tags,
      author,
      referenceTitle,
      referenceUrl,
    } = data;

    const transformedData: CreateEpigramBody = {
      content: epigramContent,
      tags,
      author,
    };
    if (isDirectInputSelected && authorInput) {
      transformedData.author = authorInput;
    }
    if (referenceTitle && referenceUrl) {
      transformedData.referenceTitle = referenceTitle;
      transformedData.referenceUrl = referenceUrl;
    }
    console.log(transformedData);
    mutation.mutate(transformedData);
  };

  return (
    <Form onSubmit={handleSubmit} methods={methods}>
      <Form.Label className='mb-40 xl:mb-54'>
        <Form.LabelHeader className='mb-8 font-semibold xl:mb-24'>
          내용<span className='ml-4 font-medium text-error xl:ml-6'>*</span>
        </Form.LabelHeader>
        <Form.TextArea
          name='epigramContent'
          className='min-h-132 xl:min-h-148'
          placeholder={`${MAX_EPIGRAM_CONTENT_LENGTH}자 이내로 입력해주세요.`}
          variant={INPUT_VARIANT}
          maxLength={MAX_EPIGRAM_CONTENT_LENGTH + 1}
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
          initialTags={transformedEpigramBody.tags}
        />
      </Form.Label>
      <Form.Submit>수정 완료</Form.Submit>
    </Form>
  );
}

const INPUT_VARIANT: InputVariant = 'outlined';
