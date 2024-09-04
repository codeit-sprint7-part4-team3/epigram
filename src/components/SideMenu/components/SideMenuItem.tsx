import { useRouter } from 'next/dist/client/router';

interface SideMenuItemProps {
  title: string;
  link: string;
}

export default function SideMenuItem({ title, link }: SideMenuItemProps) {
  const router = useRouter();
  const handleItemClick = () => {
    router.push(link);
  };

  return (
    <div className='w-full h-74 px-20 py-24 cursor-pointer hover:bg-gray-100 active:bg-gray-200'>
      <p
        className='font-[Pretendard] text-16 font-semibold leading-26'
        onClick={handleItemClick}
      >
        {title}
      </p>
    </div>
  );
}
