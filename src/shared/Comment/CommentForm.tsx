import Form from '@/components/Form';
import useToggle from '@/hooks/useToggle';
import ToggleButton from '@/shared/ToggleButton';
import { useForm } from 'react-hook-form';

type EpigramIdOnly = Pick<CreateCommentBody, 'epigramId'>;
interface CommentWithCommentContent extends Omit<CreateCommentBody, 'content'> {
  commentContent: CommentContent;
}

export default function CommentForm({ epigramId }: EpigramIdOnly) {
  const DEFAULT_COMMENT_FORM_BODY: CommentWithCommentContent = {
    commentContent: '',
    isPrivate: true,
    epigramId,
  };
  const { isOpen: isPrivate, toggle } = useToggle(true);
  const methods = useForm<CommentWithCommentContent>({
    defaultValues: DEFAULT_COMMENT_FORM_BODY,
  });
  const { setValue } = methods;

  const handleToggle = () => {
    setValue('isPrivate', !isPrivate);
    toggle();
  };
  return (
    <Form
      onSubmit={(data: CommentWithCommentContent) => {
        console.log(data);
        console.log('댓글 폼 제출');
      }}
      methods={methods}
    >
      <Form.Label className='mb-8 xl:mb-16'>
        <Form.TextArea
          className='text-black h-auto max-h-500 border border-solid border-line-200 bg-transparent px-16 pb-30 pt-12 text-black-700 focus:border-black-600 md:pb-42 xl:px-16 xl:pb-60 xl:pt-12'
          name='commentContent'
          placeholder='100자 이내로 입력해주세요.'
          maxLength={101}
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
