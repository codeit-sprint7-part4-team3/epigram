import DownIcon from '@/assets/icons/ic-down-chevron-double.svg';
import LandingImg01 from '@/assets/images/img-landing-01-lg.png';
import LandingImg02 from '@/assets/images/img-landing-02-md.png';
import LandingImg03 from '@/assets/images/img-landing-03-md.png';
import LandingImg04 from '@/assets/images/img-landing-04-lg.png';
import EpigramLogo from '@/assets/logos/logo-epigram-wordmark-xl.svg';
import Button from '@/components/Button';
import Image from 'next/image';

export default function Home() {
  const handlePageScroll = () => {
    const element = document.getElementById('scrollPoint');
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth',
      });
    }
  };
  return (
    <main>
      <section className='bg-stripe-pattern bg-stripe-size flex h-744 w-full flex-col items-center xl:h-screen'>
        <div className='flex flex-col items-center'>
          <h1 className='pt-200 text-center font-secondary text-40 font-normal xl:pt-300'>
            나만 갖고 있기엔
            <br />
            아까운 글이 있지 않나요?
          </h1>
          <p className='pb-48 pt-40 text-center font-secondary text-20 font-normal'>
            다른 사람들과 감정을 공유해 보세요
          </p>
          <Button>시작하기</Button>
        </div>
        <button
          onClick={handlePageScroll}
          className='mx-auto mt-auto animate-bounce'
        >
          <p className='font-primary text-16 font-semibold text-blue-400'>
            더 알아보기
          </p>
          <DownIcon className='mx-auto h-24 w-24 text-blue-400' />
        </button>
      </section>
      <div className='bg-zigzag-pattern h-30 w-full'></div>
      <section
        id='scrollPoint'
        className='h-full w-full bg-background-100 font-primary'
      >
        <div className='px-24 py-124 md:px-180 xl:px-300 xl:py-240'>
          <div className='mb-380 flex items-center justify-center gap-x-80'>
            <Image
              className='hidden xl:block'
              src={LandingImg01}
              alt='랜딩페이지 이미지 01'
              width={744}
            />
            <div className='mt-auto'>
              <p className='break-keep pb-40 text-32 font-bold'>
                명언이나 글귀,
                <br />
                토막 상식들을 공유해 보세요.
              </p>
              <p className='break-keep text-24 text-blue-500'>
                나만 알던 소중한 글들을
                <br />
                다른 사람들에게 전파하세요.
              </p>
            </div>
          </div>
          <div className='mb-380 flex items-center justify-center gap-x-80'>
            <div className='mt-auto text-right'>
              <p className='break-keep pb-40 text-32 font-bold'>
                감정 상태에 따라,
                <br />
                알맞은 위로를 받을 수 있어요.
              </p>
              <p className='break-keep text-24 text-blue-500'>
                태그를 통해 글을 모아 볼 수 있어요.
              </p>
            </div>
            <Image
              className='hidden xl:block'
              src={LandingImg02}
              alt='랜딩페이지 이미지 02'
              width={744}
            />
          </div>
          <div className='mb-210 flex items-center justify-center gap-x-80'>
            <Image
              className='hidden xl:block'
              src={LandingImg03}
              alt='랜딩페이지 이미지 03'
              width={744}
            />
            <div className='mt-auto'>
              <p className='break-keep pb-40 text-32 font-bold'>
                내가 요즘 어떤 감정 상태인지
                <br />
                통계로 한눈에 볼 수 있어요.
              </p>
              <p className='break-keep text-24 text-blue-500'>
                감정 달력으로
                <br />내 마음에 담긴 감정을 확인해보세요
              </p>
            </div>
          </div>
          <div></div>
        </div>
      </section>
      <section className='flex flex-col items-center bg-background-100'>
        <p className='pb-100 text-center font-primary text-32 font-bold'>
          사용자들이 직접
          <br />
          인용한 에피그램들
        </p>
        <Image
          className='pb-60'
          src={LandingImg04}
          alt='에피그램 예시'
          width={640}
        />
      </section>
      <section className='bg-stripe-pattern bg-stripe-size flex h-screen flex-col items-center justify-center gap-y-48'>
        <EpigramLogo />
        <Button>시작하기</Button>
      </section>
    </main>
  );
}
