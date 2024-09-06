import { useRouter } from 'next/dist/client/router';

const menuItems = [
  { title: '피드', link: '/feed' },
  { title: '검색', link: '/search' },
];

export default function NavMenu() {
  const router = useRouter();
  const handleItemClick = (link: string) => {
    alert(router.pathname);
    if (router.pathname === link) return;
    router.push(link);
  };

  return (
    <div className='hidden gap-24 md:flex'>
      {menuItems.map(item => (
        <p
          key={item.title}
          className='cursor-pointer font-[Pretendard] text-14 font-semibold leading-24 xl:text-16 xl:leading-26'
          onClick={() => handleItemClick(item.link)}
        >
          {item.title}
        </p>
      ))}
    </div>
  );
}
