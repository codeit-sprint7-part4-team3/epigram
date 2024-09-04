import IconClose from '@/assets/icons/ic-close.svg';
import SideMenuItem from '@/components/SideMenu/components/SideMenuItem';

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
      className={`fixed left-0 top-0 h-screen w-full bg-black-950 bg-opacity-60 transition-opacity duration-500 md:hidden ${
        isOpen
          ? 'pointer-events-auto opacity-100'
          : 'pointer-events-none opacity-0'
      }`}
      onClick={onCloseClick}
    >
      <div
        className={`fixed h-screen w-[220px] transform bg-blue-100 transition-transform duration-500 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        onClick={event => event.stopPropagation()}
      >
        <div className='flex items-center justify-end border-1 border-solid border-line-100 px-16 py-15'>
          <IconClose
            className='h-24 w-24 cursor-pointer rounded hover:bg-gray-100 active:bg-gray-200'
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
