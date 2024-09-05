import { useRouter } from 'next/router';

const menuItems = [
  { title: '피드', link: '/feed' },
  { title: '검색', link: '/search' },
];

export default function NavMenu() {
  const router = useRouter();
  const handleItemClick = (link: string) => {
    if (router.pathname === link) return;
    router.push(link);
  };

  return (
    <div className='hidden md:flex gap-24'>
      {menuItems.map(item => (
        <p
          key={item.title}
          className='font-primary text-14 xl:text-16 font-semibold leading-24 xl:leading-26 cursor-pointer'
          onClick={() => handleItemClick(item.link)}
        >
          {item.title}
        </p>
      ))}
    </div>
  );
}
