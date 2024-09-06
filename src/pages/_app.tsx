import Header from '@/components/Headers/Header';
import HeaderForLanding from '@/components/Headers/HeaderForLanding';
import HeaderForSign from '@/components/Headers/HeaderForSign';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

const headerMatching: Record<string, JSX.Element> = {
  '/': <HeaderForLanding />,
  '/signin': <HeaderForSign />,
  '/signup': <HeaderForSign />,
};

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { pathname } = router;

  return (
    <>
      {headerMatching[pathname] || <Header />}
      <main className='pt-52 md:pt-60 xl:pt-80'>
        <Component {...pageProps} />
      </main>
    </>
  );
}
