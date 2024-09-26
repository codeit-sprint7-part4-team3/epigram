import ExternalLink from '@/assets/icons/ic-external-link.svg';
import Thumbsup from '@/assets/icons/ic-thumbs-up.svg';
import Comment, { CommentType } from '@/shared/Comment/Comment';
import CommentForm from '@/shared/Comment/CommentForm';
import ChipList from '@/shared/Tagchip';
import UserIcon from '@/shared/UserIcon';

interface InteractionProps {
  epigramData: EpigramDetailType;
  comments: CommentType[];
  totalComments: number;
  loadMoreComments: () => void;
  hasMoreComments: boolean;
}

export default function Interaction({
  epigramData,
  comments,
  totalComments,
  loadMoreComments,
  hasMoreComments,
}: InteractionProps) {
  return (
    <div className='flex min-h-screen flex-col'>
      <header className='flex-center w-full'>
        <div className='flex w-640 flex-col gap-32 py-40'>
          <div className='flex w-640 justify-between'>
            <ChipList>
              {epigramData.tags.map(tag => (
                <ChipList.Item key={tag.id} name={`#${tag.name}`} />
              ))}
            </ChipList>
            <span>더보기</span>
          </div>
          <p className='font-secondary text-32 font-normal text-black-700'>
            {epigramData.content}
          </p>
          <span className='flex justify-end text-24 font-normal text-blue-400'>
            - {epigramData.author} -
          </span>
          <div className='flex-center'>
            <div className='mr-16 flex h-48 w-102'>
              <button className='flex-center w-full gap-4 rounded-[100px] bg-black-600 text-white'>
                <Thumbsup width={36} height={36} aria-label='좋아요' />
                <span className='text-20'>{epigramData.likeCount}</span>
              </button>
            </div>
            {epigramData.referenceUrl && (
              <div className='flex-center h-48 w-200'>
                <button className='flex-center h-full w-full rounded-[100px] bg-line-100 text-20 font-medium text-gray-300'>
                  <span>{epigramData.referenceTitle || '외부 링크'}</span>
                  <ExternalLink width={36} height={36} aria-label='외부링크' />
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
      <div className='zigzag-bottom'></div>
      <section className='flex-center flex-grow flex-col bg-background-100 pt-90'>
        <div className='w-640'>
          <p className='mb-24'>댓글 ({totalComments})</p>
          <div className='flex'>
            <UserIcon
              imageSource={comments[0]?.writer.image}
              styles='w-48 h-48 rounded-full mr-21'
            />
            <CommentForm epigramId={epigramData.id} />
          </div>
        </div>
        <div className='mt-40 flex flex-col'>
          {comments.map(comment => (
            <Comment key={comment.id} data={comment} />
          ))}
          {hasMoreComments && (
            <button onClick={loadMoreComments}>더 보기</button>
          )}
        </div>
      </section>
    </div>
  );
}
