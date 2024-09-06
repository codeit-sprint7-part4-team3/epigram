import { useRouter } from 'next/router';

import HeaderForCommon from './components/HeaderForCommon';
import HeaderForLanding from './components/HeaderForLanding';
import HeaderForSign from './components/HeaderForSign';

const headerByPage: Record<string, JSX.Element> = {
  '/': <HeaderForLanding />,
  '/signin': <HeaderForSign />,
  '/signup': <HeaderForSign />,
  etc: <HeaderForCommon />,
};

export default function Header() {
  const router = useRouter();
  const { pathname } = router;
  const selectedHeader = headerByPage[pathname] || headerByPage.etc;

  return (
    <header className='fixed inset-0 flex justify-between items-center w-full h-52 md:h-60 xl:h-80 px-24 md:px-72 xl:px-120 bg-white border-1 border-solid border-gray-100'>
      {selectedHeader}
    </header>
  );
}
