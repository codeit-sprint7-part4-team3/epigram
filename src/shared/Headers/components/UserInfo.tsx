import IconUserSigned from '@/assets/icons/ic-user-signed.svg';
import UserIcon from '@/shared/UserIcon';

interface UserInfoProps {
  image?: string;
  nickname: string;
  onClick: () => void;
}

export default function UserInfo({ image, nickname, onClick }: UserInfoProps) {
  return (
    <div
      className='flex cursor-pointer items-center justify-between gap-6'
      onClick={onClick}
    >
      {image ? (
        <UserIcon
          imageSource={image}
          styles='w-24 h-24 border-1 border-solid border-gray-200 rounded-full'
        />
      ) : (
        <IconUserSigned className='h-16 w-16 xl:h-24 xl:w-24' />
      )}
      <p className='cursor-pointer font-primary text-13 font-semibold leading-22 text-gray-300 xl:text-14 xl:leading-24'>
        {nickname}
      </p>
    </div>
  );
}
