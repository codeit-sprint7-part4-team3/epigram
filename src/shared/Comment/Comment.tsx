import { DeleteComment } from '@/api/comments/comments';
import IconUserSigned from '@/assets/icons/ic-user-signed.svg';
import useModalStore from '@/lib/store/useModalStore';
import { useEffect, useState } from 'react';

import DeleteAlertModalContent from '../Modal/DeleteAlertModalContent';
import UserIcon from '../UserIcon';

export interface User {
  image: string | null;
  nickname: string;
  id: number;
}

export interface CommentType {
  epigramId: number;
  writer: User;
  updatedAt: string;
  createdAt: string;
  isPrivate: boolean;
  content: string;
  id: number;
}

export interface FetchCommentsResponse {
  totalCount: number;
  nextCursor: number | null;
  list: CommentType[];
}

export interface CommentProps {
  data: CommentType;
}

interface UserData {
  id: number;
  nickname: string;
  teamId: string;
  createdAt: string;
  updatedAt: string;
  image: string | null;
  email: string;
}

export default function Comment({ data }: CommentProps) {
  const { openModal } = useModalStore();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isDelete, setIsDeleting] = useState(false);

  useEffect(() => {
    const storedData = sessionStorage.getItem('userData');

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setUserData(parsedData);
    } else {
      console.log('세션 스토리지에 데이터가 없습니다.');
    }

    console.log('sessionStorage data:', sessionStorage.getItem('userData'));
  }, []);

  const isWriter = userData?.id === data.writer.id;

  const handleUpdateClick = () => {};

  const onDelete = async () => {
    try {
      await DeleteComment(data.id);
    } catch (error) {
      console.error('댓글 삭제 중 오류 발생:', error);
    }
  };

  const handleDeleteClick = async () => {
    openModal(
      <DeleteAlertModalContent deleteTargetLabel='댓글' onDelete={onDelete} />
    );
  };

  return (
    <div className='flex w-360 gap-16 border-t border-solid border-line-200 bg-background-100 px-24 py-16 md:w-384 md:py-24 xl:w-640 xl:py-35'>
      {data.writer.image ? (
        <UserIcon
          imageSource={data.writer.image}
          styles='w-48 h-48 rounded-full'
        />
      ) : (
        <IconUserSigned className='h-48 w-48' />
      )}
      <div className='flex w-0 flex-grow flex-col gap-8 md:gap-12 xl:gap-16'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center justify-between gap-8 font-primary text-12 leading-18 text-black-300 md:text-14 md:leading-24 xl:text-16 xl:leading-26'>
            <p>{data.writer.nickname}</p>
            <p>{getTimeAgo(data.createdAt)}</p>
          </div>
          {isWriter && (
            <div className='flex items-center justify-between gap-16 font-primary text-12 font-normal leading-18 md:text-14 xl:text-16'>
              <button
                className='text-black-600 underline'
                onClick={handleUpdateClick}
              >
                수정
              </button>
              <button
                className='text-error underline'
                onClick={handleDeleteClick}
              >
                삭제
              </button>
            </div>
          )}
        </div>
        <p className='font-primary text-14 font-normal leading-24 text-black-700 md:text-16 md:leading-26 xl:text-20 xl:leading-32'>
          {data.content}
        </p>
      </div>
    </div>
  );
}

function getTimeAgo(dateString: string) {
  const now = new Date();
  const pastDate = new Date(dateString);
  const diff: number = now.getTime() - pastDate.getTime();

  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) return `${seconds}초 전`;

  console.log(seconds);

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}분 전`;

  console.log(minutes);

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}시간 전`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}일 전`;

  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks}주 전`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months}달 전`;

  const years = Math.floor(days / 365);
  return `${years}년 전`;
}
