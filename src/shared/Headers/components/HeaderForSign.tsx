import LogoLarge from '@/assets/logos/logo-epigram-symbol-lg.svg';
import LogoSmall from '@/assets/logos/logo-epigram-symbol-sm.svg';
import { useRouter } from 'next/router';

import LogoForHeader from './LogoForHeader';

export default function HeaderForSign() {
  const router = useRouter();
  const handleLogoClick = () => {
    router.push('/');
  };

  return (
    <>
      <LogoForHeader />
    </>
  );
}
