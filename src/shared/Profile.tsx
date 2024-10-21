import ProfileIcon from '@/assets/icons/ic-profile.svg';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

interface Props extends Pick<Writer, 'image'> {
  size?: ProfileSize;
  variant?: ProfileVariant;
}
type ProfileSize = 'sm' | 'md' | 'lg';
type ProfileVariant = 'default' | 'outlined';

export default function Profile({
  image,
  size = 'md',
  variant = 'default',
}: Props) {
  const profileContent = image ? (
    <Image fill src={image} alt={'프로필 이미지'} className='object-cover' />
  ) : (
    <ProfileIcon className={'h-full w-full'} />
  );

  const profileClass = twMerge(
    styleByVariant[variant],
    styleBySize[size],
    'relative shrink-0 cursor-pointer overflow-hidden rounded-full'
  );
  return <div className={profileClass}>{profileContent}</div>;
}

const styleBySize: Record<ProfileSize, string> = {
  sm: 'h-16 w-16 xl:h-24 xl:w-24',
  md: 'h-48 w-48',
  lg: 'h-80 w-80 x;:h-120 xl:w-120 xl:h-120',
};

const styleByVariant: Record<ProfileVariant, string> = {
  default: '',
  outlined: 'border-2 border-solid border-blue-300 bg-white',
};
