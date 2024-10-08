import Form from '@/components/Form';
import { MAX_COMMENT_CONTENT_LENGTH } from '@/constants/formValidation';
import useToggle from '@/hooks/useToggle';
import { createComments } from '@/lib/api/comments';
import ToggleButton from '@/shared/ToggleButton';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

type EpigramIdOnly = Pick<CreateCommentBody, 'epigramId'>;
interface CommentWithCommentContent extends Omit<CreateCommentBody, 'content'> {
  commentContent: CommentContent;
}

const DEFAULT_ISPRIVATE = false;

export default function CommentForm({ epigramId }: EpigramIdOnly) {
  const mutation = useMutation(createComments, {
    onSuccess: data => {},
    onError: (error: any) => {
      console.error(error);
    },
  });
  const DEFAULT_COMMENT_FORM_BODY: CommentWithCommentContent = {
    commentContent: '',
    isPrivate: DEFAULT_ISPRIVATE,
    epigramId,
  };
  const { isOpen: isPrivate, toggle } = useToggle(DEFAULT_ISPRIVATE);
  const methods = useForm<CommentWithCommentContent>({
    defaultValues: DEFAULT_COMMENT_FORM_BODY,
  });
  const { setValue, reset } = methods;

  const handleToggle = () => {
    setValue('isPrivate', !isPrivate);
    toggle();
  };
  const handleSubmit = async (data: CommentWithCommentContent) => {
    const { commentContent, isPrivate, epigramId } = data;

    const transformedData: CreateCommentBody = {
      content: commentContent,
      isPrivate,
      epigramId,
    };

    mutation.mutate(transformedData);
    reset();
  };
  return (
    <Form onSubmit={handleSubmit} methods={methods}>
      <Form.Label className='mb-8 xl:mb-16'>
        <Form.TextArea
          className='text-black h-auto max-h-500 border border-solid border-line-200 bg-transparent px-16 pb-30 pt-12 text-black-700 focus:border-black-600 md:pb-42 xl:px-16 xl:pb-60 xl:pt-12'
          name='commentContent'
          placeholder={`${MAX_COMMENT_CONTENT_LENGTH}자 이내로 입력해주세요.`}
          maxLength={MAX_COMMENT_CONTENT_LENGTH + 1}
          required
          variant='outlined'
        />
      </Form.Label>
      <div className='flex items-center justify-between'>
        <Form.Label className='flex items-center gap-8 text-xs font-semibold leading-20 text-gray-400 transition-colors hover:text-black-600 md:text-sm md:leading-24 xl:text-base xl:leading-26'>
          공개
          <ToggleButton isOpen={!isPrivate} toggle={handleToggle} />
        </Form.Label>
        <Form.Submit className='w-60 xl:w-70' size='sm'>
          저장
        </Form.Submit>
      </div>
    </Form>
  );
}
