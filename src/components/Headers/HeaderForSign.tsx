import LogoLarge from '@/assets/logos/logo-epigram-symbol-lg.svg';
import LogoSmall from '@/assets/logos/logo-epigram-symbol-sm.svg';
import { useRouter } from 'next/router';

export default function HeaderForSign() {
  const router = useRouter();
  const handleLogoClick = () => {
    router.push('/');
  };

  return (
    <header className='fixed inset-0 flex items-center w-full h-52 md:h-60 xl:h-80 bg-white border-1 border-solid border-gray-100'>
      <div className='cursor-pointer m-auto' onClick={handleLogoClick}>
        <LogoSmall className='xl:hidden' />
        <LogoLarge className='hidden xl:block' />
      </div>
    </header>
  );
}
