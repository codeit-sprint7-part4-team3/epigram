import IconSearch from '@/assets/icons/ic-search.svg';
import IconUser from '@/assets/icons/ic-user.svg';
import { useRouter } from 'next/router';

import LogoForHeader from './LogoForHeader';

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
    <>
      <IconSearch
        className='h-20 w-20 cursor-pointer xl:h-36 xl:w-36'
        onClick={handleSearchClick}
      />
      <LogoForHeader />
      <IconUser
        className='h-20 w-20 cursor-pointer xl:h-36 xl:w-36'
        onClick={handleUserClick}
      />
    </>
  );
}
