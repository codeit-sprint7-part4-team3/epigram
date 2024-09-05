import IconUserSigned from '@/assets/icons/ic-user-signed.svg';

import UserIcon from './UserIcon';

interface UserInfo {
  image?: string;
  nickname: string;
  onClick: () => void;
}

export default function UserInfo({ image, nickname, onClick }: UserInfo) {
  return (
    <div
      className='flex justify-between items-center gap-6 cursor-pointer'
      onClick={onClick}
    >
      {image ? (
        <UserIcon
          imageSource={image}
          styles='w-24 h-24 border-1 border-solid border-gray-200 rounded-full'
        />
      ) : (
        <IconUserSigned className='w-16 xl:w-24 h-16 xl:h-24' />
      )}
      <p className='font-primary text-gray-300 text-13 xl:text-14 font-semibold leading-22 xl:leading-24 cursor-pointer'>
        {nickname}
      </p>
    </div>
  );
}
