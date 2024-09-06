import { useRouter } from 'next/dist/client/router';

interface SideMenuItemProps {
  title: string;
  link: string;
}

export default function SideMenuItem({ title, link }: SideMenuItemProps) {
  const router = useRouter();

  const handleItemClick = () => {
    if (router.pathname === link) return;
    router.push(link);
  };

  return (
    <div className='h-74 w-full cursor-pointer px-20 py-24 transition-colors duration-300 ease-in-out hover:bg-gray-100 active:bg-gray-200'>
      <p
        className='font-[Pretendard] text-16 font-semibold leading-26'
        onClick={handleItemClick}
      >
        {title}
      </p>
    </div>
  );
}
