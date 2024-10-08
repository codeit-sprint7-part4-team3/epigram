import IconUserSigned from '@/assets/icons/ic-user-signed.svg';
import Profile from '@/shared/Profile';
import UserIcon from '@/shared/UserIcon';

interface UserInfoProps {
  image: string | null;
  nickname: string;
  onClick: () => void;
}

export default function UserInfo({ image, nickname, onClick }: UserInfoProps) {
  return (
    <div
      className='flex cursor-pointer items-center justify-between gap-6'
      onClick={onClick}
    >
      <Profile image={image} size='sm' />
      <p className='cursor-pointer font-primary text-13 font-semibold leading-22 text-gray-300 xl:text-14 xl:leading-24'>
        {nickname}
      </p>
    </div>
  );
}
