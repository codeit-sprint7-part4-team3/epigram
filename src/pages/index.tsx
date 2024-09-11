import DownIcon from '@/assets/icons/ic-down-chevron-double.svg';
import Landing01lg from '@/assets/images/img-landing-01-lg.png';
import Landing01md from '@/assets/images/img-landing-01-md.png';
import Landing01sm from '@/assets/images/img-landing-01-sm.png';
import Landing02lg from '@/assets/images/img-landing-02-lg.png';
import Landing02md from '@/assets/images/img-landing-02-md.png';
import Landing02sm from '@/assets/images/img-landing-02-sm.png';
import Landing03lg from '@/assets/images/img-landing-03-lg.png';
import Landing03md from '@/assets/images/img-landing-03-md.png';
import Landing03sm from '@/assets/images/img-landing-03-sm.png';
import Landing04lg from '@/assets/images/img-landing-04-lg.png';
import Landing04md from '@/assets/images/img-landing-04-md.png';
import Landing04sm from '@/assets/images/img-landing-04-sm.png';
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
      <section className='zigzag-bottom flex h-744 w-full flex-col items-center xl:h-screen'>
        <div className='flex flex-col items-center'>
          <h1 className='pt-200 text-center font-secondary text-24 font-normal md:text-32 xl:pt-300 xl:text-40'>
            나만 갖고 있기엔
            <br />
            아까운 글이 있지 않나요?
          </h1>
          <p className='pb-24 pt-8 text-center font-secondary text-14 font-normal md:pb-32 md:pt-24 md:text-20 xl:pb-48 xl:pt-40'>
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

      <section
        id='scrollPoint'
        className='h-full w-full bg-background-100 font-primary'
      >
        <div className='py-124 md:px-180 xl:py-240'>
          <div className='flex-center mb-380 flex-col gap-x-80 xl:flex-row'>
            <Image
              className='hidden max-w-744 xl:block'
              src={Landing01lg}
              alt='랜딩페이지 이미지 01 lg'
            />
            <Image
              src={Landing01md}
              alt='랜딩페이지 이미지 01 md'
              className='hidden md:block xl:hidden'
              width={384}
            />
            <Image
              src={Landing01sm}
              alt='랜딩페이지 이미지 01 sm'
              className='block md:hidden xl:hidden'
              width={312}
            />
            <div className='mt-auto pt-40'>
              <p className='break-keep pb-20 text-24 font-bold xl:pb-40 xl:text-32'>
                명언이나 글귀,
                <br />
                토막 상식들을 공유해 보세요.
              </p>
              <p className='break-keep text-16 font-normal text-blue-500 xl:text-24 xl:font-medium'>
                나만 알던 소중한 글들을
                <br className='block md:hidden xl:block' />
                다른 사람들에게 전파하세요.
              </p>
            </div>
          </div>
          <div className='flex-center mb-380 flex-col gap-x-80 xl:flex-row'>
            <div className='mt-auto text-right'>
              <Image
                src={Landing02md}
                alt='랜딩페이지 이미지 01 md'
                className='hidden md:block xl:hidden'
                width={384}
              />
              <Image
                src={Landing02sm}
                alt='랜딩페이지 이미지 01 sm'
                className='block md:hidden xl:hidden'
                width={312}
              />
              <p className='break-keep pb-40 text-24 font-bold xl:text-32'>
                감정 상태에 따라,
                <br />
                알맞은 위로를 받을 수 있어요.
              </p>
              <p className='break-keep text-16 font-normal text-blue-500 xl:text-24 xl:font-medium'>
                태그를 통해 글을 모아 볼 수 있어요.
              </p>
            </div>
            <Image
              className='hidden max-w-744 xl:block'
              src={Landing02lg}
              alt='랜딩페이지 이미지 01 lg'
            />
          </div>
          <div className='flex-center mb-210 flex-col gap-x-80 xl:flex-row'>
            <Image
              className='hidden max-w-744 xl:block'
              src={Landing03lg}
              alt='랜딩페이지 이미지 01 lg'
            />
            <Image
              src={Landing03md}
              alt='랜딩페이지 이미지 01 md'
              className='hidden md:block xl:hidden'
              width={384}
            />
            <Image
              src={Landing03sm}
              alt='랜딩페이지 이미지 01 sm'
              className='block md:hidden xl:hidden'
              width={312}
            />
            <div className='mt-auto'>
              <p className='break-keep pb-40 text-24 font-bold xl:text-32'>
                내가 요즘 어떤 감정 상태인지
                <br />
                통계로 한눈에 볼 수 있어요.
              </p>
              <p className='break-keep text-16 font-normal text-blue-500 xl:text-24 xl:font-medium'>
                감정 달력으로
                <br className='block md:hidden xl:block' />내 마음에 담긴 감정을
                확인해보세요
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className='flex flex-col items-center bg-background-100'>
        <p className='pb-100 text-center font-primary text-32 font-bold'>
          사용자들이 직접
          <br />
          인용한 에피그램들
        </p>
        <Image
          className='hidden max-w-744 xl:block'
          src={Landing04lg}
          alt='랜딩페이지 이미지 01 lg'
        />
        <Image
          src={Landing04md}
          alt='랜딩페이지 이미지 01 md'
          className='hidden md:block xl:hidden'
          width={384}
        />
        <Image
          src={Landing04sm}
          alt='랜딩페이지 이미지 01 sm'
          className='block md:hidden xl:hidden'
          width={312}
        />
      </section>
      <section className='zigzag-top'>
        <div className='flex h-screen flex-col items-center justify-center gap-y-48'>
          <EpigramLogo />
          <Button>시작하기</Button>
        </div>
      </section>
    </main>
  );
}
