import LogoLarge from '@/assets/logos/logo-epigram-symbol-lg.svg';
import LogoSmall from '@/assets/logos/logo-epigram-symbol-sm.svg';
import { useRouter } from 'next/dist/client/router';

export default function Logo() {
  const router = useRouter();
  const handleLogoClick = () => {
    router.push('/');
  };

  return (
    <div className='cursor-pointer m-auto' onClick={handleLogoClick}>
      <LogoSmall className='xl:hidden' />
      <LogoLarge className='hidden xl:block' />
    </div>
  );
}
