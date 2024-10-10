import { DeleteEpigram } from '@/api/epigram/fetchEpigram';
import ExternalLink from '@/assets/icons/ic-external-link.svg';
import Thumbsup from '@/assets/icons/ic-thumbs-up.svg';
import IconUserSigned from '@/assets/icons/ic-user-signed.svg';
import { useLikeToggle } from '@/hooks/useLikeToggle';
import useModalStore from '@/lib/store/useModalStore';
import Comment, { CommentType } from '@/shared/Comment/Comment';
import CommentForm from '@/shared/Comment/CommentForm';
import DropdownMenu from '@/shared/DropdownMenu';
import DeleteAlertModalContent from '@/shared/Modal/DeleteAlertModalContent';
import Profile from '@/shared/Profile';
import ChipList from '@/shared/TagChip';
import UserIcon from '@/shared/UserIcon';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface UserData {
  id: number;
  nickname: string;
  teamId: string;
  createdAt: string;
  updatedAt: string;
  image: string | null;
  email: string;
}

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
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const { openModal } = useModalStore();
  useEffect(() => {
    const storedData = sessionStorage.getItem('userData');

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setUserData(parsedData);

      console.log('유저정보보보보', parsedData);

      console.log('유저정보보보보', userData);
    } else {
      console.log('세션 스토리지에 데이터가 없습니다.');
    }

    console.log('sessionStorage data:', sessionStorage.getItem('userData'));
  }, []);

  const { likeCount, isLiked, toggleLike } = useLikeToggle(
    epigramData.likeCount,
    epigramData.isLiked,
    epigramData.id
  );

  console.log('data:::::::', epigramData);
  const handleEdit = () => {
    router.push(`/epigrams/${epigramData.id}/editepigram`);
  };

  const onDelete = async () => {
    setIsDeleting(true);
    try {
      await DeleteEpigram(epigramData.id);
      router.push('/');
    } catch (error) {
      console.error('에피그램 삭제 중 오류 발생:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDelete = async () => {
    openModal(
      <DeleteAlertModalContent deleteTargetLabel='게시글' onDelete={onDelete} />
    );
  };

  const dropOptions = [
    { label: '수정하기', method: handleEdit },
    { label: '삭제하기', method: handleDelete },
  ];
  return (
    <div className='flex min-h-screen flex-col bg-stripe-pattern bg-stripe-size'>
      <header className='flex-center zigzag-bottom w-full flex-col'>
        <div className='flex w-312 flex-col gap-16 py-40 md:w-384 lg:w-640 lg:gap-32'>
          <div className='flex w-312 justify-between md:w-384 lg:w-640'>
            <ChipList>
              {epigramData.tags.map(tag => (
                <ChipList.Item key={tag.id} name={`#${tag.name}`} />
              ))}
            </ChipList>
            {userData && (
              <span>
                <DropdownMenu options={dropOptions} />
              </span>
            )}
          </div>
          <p className='font-secondary text-32 font-normal text-black-700'>
            {epigramData.content}
          </p>
          <span className='flex justify-end text-24 font-normal text-blue-400'>
            - {epigramData.author} -
          </span>
          <div className='flex-center'>
            <div className='mr-16 flex h-48 w-102'>
              <button
                className={`flex-center w-full gap-4 rounded-[100px] ${
                  isLiked ? 'bg-blue-400' : 'bg-black-600'
                } text-white shadow-md transition-all duration-100 ease-in-out hover:shadow-sm active:translate-y-0.5 active:transform active:shadow-inner`}
                onClick={toggleLike}
              >
                <Thumbsup width={36} height={36} aria-label='좋아요' />
                <span className='text-20'>{likeCount}</span>
              </button>
            </div>
            {epigramData.referenceUrl && (
              <div className='flex-center h-48 w-220'>
                <a
                  href={epigramData.referenceUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex-center h-full w-full rounded-[100px] bg-line-100 text-20 font-medium text-gray-300 shadow-md transition-all duration-100 ease-in-out hover:shadow-sm active:translate-y-0.5 active:transform active:shadow-inner'
                >
                  <span>{epigramData.referenceTitle || '외부 링크'}</span>
                  <ExternalLink width={36} height={36} aria-label='외부링크' />
                </a>
              </div>
            )}
          </div>
        </div>
      </header>
      <section className='flex-center flex-grow flex-col bg-background-100 pt-90'>
        <div className='w-640'>
          <p className='mb-24'>댓글 ({totalComments})</p>
          <div className='flex gap-16 xl:gap-24'>
            {userData && <Profile image={userData.image} />}
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
