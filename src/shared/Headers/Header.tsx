import { useRouter } from 'next/router';

import HeaderForCommon from './components/HeaderForCommon';
import HeaderForLanding from './components/HeaderForLanding';
import HeaderForSign from './components/HeaderForSign';

const headerByPage: Record<string, JSX.Element> = {
  '/epigrams': <HeaderForLanding />,
  '/signin': <HeaderForSign />,
  '/signup': <HeaderForSign />,
  etc: <HeaderForCommon />,
};

export default function Header() {
  const router = useRouter();
  const { pathname } = router;
  const selectedHeader = headerByPage[pathname] || headerByPage.etc;

  return (
    <header className='fixed inset-0 flex h-52 w-full items-center justify-between border-1 border-solid border-gray-100 bg-white px-24 md:h-60 md:px-72 xl:h-80 xl:px-120'>
      {selectedHeader}
    </header>
  );
}
