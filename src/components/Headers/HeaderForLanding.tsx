import IconSearch from '@/assets/icons/ic-search.svg';
import IconUser from '@/assets/icons/ic-user.svg';
import { useRouter } from 'next/router';

import Logo from './components/Logo';

export default function HeaderForLanding() {
  const router = useRouter();

  const handleSearchClick = () => {
    router.push('/search');
  };

  const handleUserClick = () => {
    router.push('/signin');
  };

  return (
    <header className='fixed inset-0 flex items-center w-full h-52 md:h-60 xl:h-80 px-24 md:px-72 xl:px-120 bg-white border-1 border-solid border-gray-100'>
      <IconSearch
        className='w-20 xl:w-36 h-20 xl:h-36 cursor-pointer'
        onClick={handleSearchClick}
      />
      <Logo />
      <IconUser
        className='w-20 xl:w-36 h-20 xl:h-36 cursor-pointer'
        onClick={handleUserClick}
      />
    </header>
  );
}
