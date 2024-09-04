import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='ko'>
      <Head>
        <link
          rel='preload'
          as='font'
          href='https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css'
        />
        <link
          rel='stylesheet'
          as='style'
          href='https://cdn.jsdelivr.net/font-iropke-batang/1.2/font-iropke-batang.css'
        />
      </Head>
      <body className='font-primary'>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
