import HamburgerMenu from '@/assets/icons/ic-hamburger-menu.svg';
import User from '@/assets/icons/ic-user.svg';
import Button from '@/components/Button';
import { signoutUser } from '@/lib/api/auth';
import { getUserInfo } from '@/lib/api/user';
import { useUserStore } from '@/lib/store/useUserStore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import SideMenu from '../../SideMenu/SideMenu';
import LogoForHeader from './LogoForHeader';
import NavMenu from './NavMenu';
import UserInfo from './UserInfo';

export default function HeaderForCommon() {
  const { user: userData, setUser: setUserData } = useUserStore();
  const { data, isLoading, isError, error } = useQuery('myData', getUserInfo, {
    staleTime: 300000,
  });

  useEffect(() => {
    setUserData(data);
  }, [data, setUserData]);

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

  const handleSignOut = async () => {
    try {
      await signoutUser();
      window.location.href = '/';
    } catch (error) {
      console.error(error);
    }
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
      {userData ? (
        <div className='flex items-center gap-16'>
          <UserInfo
            image={userData.image}
            nickname={userData.nickname}
            onClick={handleUserClick}
          />
          <Button
            onClick={handleSignOut}
            className='w-max md:w-max xl:w-max'
            color='white'
            size='sm'
          >
            로그아웃
          </Button>
        </div>
      ) : (
        <User
          className={'h-20 w-20 xl:h-36 xl:w-36'}
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
