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
import LogoMd from '@/assets/logos/logo-epigram-wordmark-lg.svg';
import LogoLg from '@/assets/logos/logo-epigram-wordmark-xl.svg';
import Button from '@/components/Button';
import { signoutUser } from '@/lib/api/auth';
import useModalStore from '@/lib/store/useModalStore';
import DeleteAlertModalContent from '@/shared/Modal/DeleteAlertModalContent';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Home() {
  const { openModal } = useModalStore();
  const router = useRouter();

  const handleStartClick = () => {
    // 로그인 여부는 미들웨어에서 처리
    router.push('/epigrams');
  };

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
      <section className='transition-animation zigzag-bottom flex h-744 w-full flex-col items-center xl:h-screen'>
        <div className='flex flex-col items-center'>
          <h1 className='transition-animation pt-200 text-center font-secondary text-24 font-normal md:text-32 xl:pt-300 xl:text-40'>
            나만 갖고 있기엔
            <br />
            아까운 글이 있지 않나요?
          </h1>
          <p className='pb-24 pt-8 text-center font-secondary text-14 font-normal md:pb-32 md:pt-24 md:text-20 xl:pb-48 xl:pt-40'>
            다른 사람들과 감정을 공유해 보세요
          </p>
          <Button onClick={handleStartClick}>시작하기</Button>
          <Button
            onClick={() => {
              // signoutUser();
              openModal(
                <DeleteAlertModalContent
                  deleteTargetLabel={'게시물'}
                  onDelete={() => {}}
                />
              );
            }}
          >
            로그아웃
          </Button>
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
        <motion.div></motion.div>
        <div className='flex-center flex-col pb-280 pt-124 md:px-180 xl:pb-480 xl:pt-240'>
          <motion.div
            style={{ display: 'inline-block' }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.3,
              ease: 'easeOut',
            }}
          >
            <div className='flex-center flex-col gap-x-80 xl:flex-row'>
              <Image
                className='hidden xl:block'
                src={Landing01lg}
                alt='랜딩페이지 이미지 01 lg'
                width={744}
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
              <div className='mr-auto mt-auto'>
                <p className='transition-animation break-keep pb-16 pt-40 text-24 font-bold md:pb-20 xl:pb-40 xl:text-32'>
                  명언이나 글귀,
                  <br />
                  토막 상식들을 공유해 보세요.
                </p>
                <p className='transition-animation break-keep text-16 font-normal text-blue-500 xl:text-24 xl:font-medium'>
                  나만 알던 소중한 글들을
                  <br className='block md:hidden xl:block' />
                  다른 사람들에게 전파하세요.
                </p>
              </div>
            </div>
          </motion.div>
          <motion.div
            style={{ display: 'inline-block' }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.3,
              ease: 'easeOut',
            }}
          >
            <div className='flex-center flex-col gap-x-80 py-196 md:py-220 xl:flex-row xl:py-380'>
              <div className='mt-auto text-right'>
                <Image
                  src={Landing02md}
                  alt='랜딩페이지 이미지 02 md'
                  className='hidden md:block xl:hidden'
                  width={384}
                />
                <Image
                  src={Landing02sm}
                  alt='랜딩페이지 이미지 02 sm'
                  className='block md:hidden xl:hidden'
                  width={312}
                />
                <p className='transition-animation break-keep pb-16 pt-40 text-24 font-bold md:pb-20 xl:pb-40 xl:text-32'>
                  감정 상태에 따라,
                  <br />
                  알맞은 위로를 받을 수 있어요.
                </p>
                <p className='transition-animation break-keep text-16 font-normal text-blue-500 xl:text-24 xl:font-medium'>
                  태그를 통해 글을 모아 볼 수 있어요.
                </p>
              </div>
              <Image
                src={Landing02lg}
                alt='랜딩페이지 이미지 02 lg'
                className='hidden md:hidden xl:block'
                width={744}
              />
            </div>
          </motion.div>
          <motion.div
            style={{ display: 'inline-block' }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.3,
              ease: 'easeOut',
            }}
          >
            <div className='flex-center flex-col gap-x-80 xl:flex-row'>
              <Image
                className='hidden xl:block'
                src={Landing03lg}
                alt='랜딩페이지 이미지 03 lg'
                width={744}
              />
              <Image
                src={Landing03md}
                alt='랜딩페이지 이미지 03 md'
                className='hidden md:block xl:hidden'
                width={384}
              />
              <Image
                src={Landing03sm}
                alt='랜딩페이지 이미지 03 sm'
                className='block md:hidden xl:hidden'
                width={312}
              />
              <div className='mr-auto mt-auto'>
                <p className='transition-animation break-keep pb-16 pt-40 text-24 font-bold md:pb-20 xl:pb-40 xl:text-32'>
                  내가 요즘 어떤 감정 상태인지
                  <br />
                  통계로 한눈에 볼 수 있어요.
                </p>
                <p className='transition-animation break-keep text-16 font-normal text-blue-500 xl:text-24 xl:font-medium'>
                  감정 달력으로
                  <br className='block md:hidden xl:block' />내 마음에 담긴
                  감정을 확인해보세요
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <section className='transition-animation flex w-full flex-col items-center bg-background-100 pb-35 md:pb-45 xl:pb-75'>
        <motion.div
          style={{ display: 'inline-block' }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.3,
            ease: 'easeOut',
          }}
        >
          <p className='transition-animation pb-40 text-center font-primary text-32 font-bold xl:pb-100'>
            사용자들이 직접
            <br />
            인용한 에피그램들
          </p>
          <Image
            className='hidden xl:block'
            src={Landing04lg}
            alt='랜딩페이지 이미지 04 lg'
            width={640}
          />
          <Image
            src={Landing04md}
            alt='랜딩페이지 이미지 04 md'
            className='hidden md:block xl:hidden'
            width={384}
          />
          <Image
            src={Landing04sm}
            alt='랜딩페이지 이미지 04 sm'
            className='block md:hidden xl:hidden'
            width={312}
          />
        </motion.div>
      </section>
      <section className='zigzag-top'>
        <div className='transition-animation flex-center h-600 flex-col gap-y-48 md:h-528 xl:h-screen'>
          <LogoLg className='hidden xl:block' />
          <LogoMd className='block xl:hidden' />
          <Button onClick={handleStartClick}>시작하기</Button>
        </div>
      </section>
    </main>
  );
}
