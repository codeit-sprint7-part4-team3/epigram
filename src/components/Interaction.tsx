import ExternalLink from '@/assets/icons/ic-external-link.svg';
import Thumbsup from '@/assets/icons/ic-thumbs-up.svg';
import Comment from '@/shared/Comment/Comment';
import CommentForm from '@/shared/Comment/CommentForm';
import UserIcon from '@/shared/UserIcon';
import ChipList from '@/shared/tagchip';

// 임시 데이터 생성
const mockCommentData = [
  {
    epigramId: 1,
    writer: {
      image: 'https://example.com/avatar1.jpg',
      nickname: '테스트 사용자1',
      id: 1,
    },
    updatedAt: '2024-09-19T10:00:00Z',
    createdAt: '2024-09-19T10:00:00Z',
    isPrivate: false,
    content:
      '이 글귀는 정말 인상 깊네요. 꿈을 향해 노력하는 것의 중요성을 잘 보여주는 것 같습니다.',
    id: 1,
  },
  {
    epigramId: 1,
    writer: {
      image: 'https://example.com/avatar2.jpg',
      nickname: '테스트 사용자2',
      id: 2,
    },
    updatedAt: '2024-09-19T11:30:00Z',
    createdAt: '2024-09-19T11:30:00Z',
    isPrivate: false,
    content:
      '꿈을 이루기 위해 노력하는 과정에서 우리는 성장하고 변화하죠. 이 글귀가 그 과정을 잘 표현한 것 같아요.',
    id: 2,
  },
  {
    epigramId: 1,
    writer: {
      image: 'https://example.com/avatar3.jpg',
      nickname: '테스트 사용자3',
      id: 3,
    },
    updatedAt: '2024-09-19T13:15:00Z',
    createdAt: '2024-09-19T13:15:00Z',
    isPrivate: false,
    content:
      '앙드레 말로의 말씀은 항상 깊은 통찰력을 주는 것 같아요. 이 글귀를 보면서 제 꿈에 대해 다시 한번 생각해보게 되었습니다.',
    id: 3,
  },
];

export default function Interaction() {
  return (
    <div className='flex min-h-screen flex-col'>
      <header className='flex-center w-full'>
        <div className='flex w-640 flex-col gap-32 py-40'>
          <div className='flex w-640 justify-between'>
            <ChipList>
              <ChipList.Item name='#꿈을 이루고 싶을 때'></ChipList.Item>
            </ChipList>
            <span>더보기</span>
          </div>
          <p className='font-secondary text-32 font-normal text-black-700'>
            오랫동안 꿈을 그리는 사람은 마침내 그 꿈을 닮아 간다.
          </p>
          <span className='flex justify-end text-24 font-normal text-blue-400'>
            - 앙드레 말로 -
          </span>
          <div className='flex-center'>
            <div className='mr-16 flex h-48 w-102'>
              <button className='flex-center w-full gap-4 rounded-[100px] bg-black-600 text-white'>
                <Thumbsup width={36} height={36} aria-label='좋아요' />
                <span className='text-20'>123</span>
              </button>
            </div>
            <div className='flex-center h-48 w-200'>
              <button className='flex-center h-full w-full rounded-[100px] bg-line-100 text-20 font-medium text-gray-300'>
                <span>왕도로 가는 길</span>
                <ExternalLink width={36} height={36} aria-label='외부링크' />
              </button>
            </div>
          </div>
        </div>
      </header>
      <div className='zigzag-bottom'></div>
      <section className='flex-center flex-grow flex-col bg-background-100 pt-90'>
        <div className='w-640'>
          <p className='mb-24'>댓글 ({mockCommentData.length})</p>
          <div className='flex'>
            <UserIcon
              imageSource={mockCommentData[0].writer.image}
              styles='w-48 h-48 rounded-full mr-21'
            />
            <CommentForm epigramId={1} />
          </div>
        </div>
        <div className='mt-40 flex flex-col'>
          {mockCommentData.map(comment => (
            <Comment key={comment.id} data={comment} />
          ))}
        </div>
      </section>
    </div>
  );
}
