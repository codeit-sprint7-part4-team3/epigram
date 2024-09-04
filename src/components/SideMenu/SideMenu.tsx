import IconClose from '@/assets/icons/ic-close.svg';

import SideMenuItem from './components/SideMenuItem';

interface SideMenuProps {
  isOpen: boolean;
  onCloseClick: () => void;
}
const menuItems = [
  { title: '피드', link: '/feed' },
  { title: '검색', link: '/search' },
];

export default function SideMenu({ isOpen, onCloseClick }: SideMenuProps) {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-screen bg-black-950 bg-opacity-60 duration-500 transition-opacity ${
        isOpen
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
      }`}
      onClick={onCloseClick}
    >
      <div
        className={`fixed w-[220px] h-screen bg-blue-100 transform transition-transform duration-500 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className='flex justify-end items-center px-16 py-15 border-1 border-solid border-line-100'>
          <IconClose
            className='w-24 h-24 cursor-pointer'
            onClick={onCloseClick}
          />
        </div>
        {menuItems.map(item => (
          <SideMenuItem key={item.title} title={item.title} link={item.link} />
        ))}
      </div>
    </div>
  );
}
