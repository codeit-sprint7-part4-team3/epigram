import HamburgerMenu from '@/assets/icons/ic-hamburger-menu.svg';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import SideMenu from '../../SideMenu/SideMenu';
import LogoForHeader from './LogoForHeader';
import NavMenu from './NavMenu';
import UserInfo from './UserInfo';

export default function HeaderForCommon() {
  const [userData, setUserData] = useState<UserWithEmail | null>(null);

  useEffect(() => {
    const storedData = sessionStorage.getItem('userData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setUserData(parsedData);
    } else {
    }
  }, []);

  const [sideMenuToggle, setSideMenuToggle] = useState(false);
  const router = useRouter();
  const handleHamburgerClick = () => {
    setSideMenuToggle(true);
  };

  const handleSideMenuCloseClick = () => {
    setSideMenuToggle(false);
  };

  const handleUserClick = () => {
    if (router.pathname === '/mypage') return;
    router.push('/mypage');
  };

  return (
    <>
      <div className='flex items-center justify-between gap-12 md:gap-24'>
        <HamburgerMenu
          className='h-24 w-24 cursor-pointer rounded text-gray-200 transition-colors duration-300 ease-in-out hover:bg-gray-100 active:bg-gray-200 md:hidden'
          onClick={handleHamburgerClick}
        />
        <LogoForHeader />
        <NavMenu />
      </div>
      {userData && (
        <UserInfo
          image={userData.image}
          nickname={userData.nickname}
          onClick={handleUserClick}
        />
      )}
      <SideMenu
        isOpen={sideMenuToggle}
        onCloseClick={handleSideMenuCloseClick}
      />
    </>
  );
}
