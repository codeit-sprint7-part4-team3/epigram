import Header from '@/shared/Headers/Header';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <main className='pt-52 md:pt-60 xl:pt-80'>
        <Component {...pageProps} />
      </main>
    </>
  );
}
