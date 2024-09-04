import IconSearch from '@/assets/icons/ic-search.svg';
import IconUser from '@/assets/icons/ic-user.svg';
import { useRouter } from 'next/router';

import Logo from './components/Logo';

export default function HeaderForLanding() {
  const router = useRouter();

  const handleSearchClick = () => {
    if (router.pathname === '/search') return;
    router.push('/search');
  };

  const handleUserClick = () => {
    if (router.pathname === '/signin') return;
    router.push('/signin');
  };

  return (
    <header className='fixed inset-0 flex h-52 w-full items-center border-1 border-solid border-gray-100 bg-white px-24 md:h-60 md:px-72 xl:h-80 xl:px-120'>
      <IconSearch
        className='h-20 w-20 cursor-pointer xl:h-36 xl:w-36'
        onClick={handleSearchClick}
      />
      <Logo />
      <IconUser
        className='h-20 w-20 cursor-pointer xl:h-36 xl:w-36'
        onClick={handleUserClick}
      />
    </header>
  );
}
