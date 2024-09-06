import LogoLarge from '@/assets/logos/logo-epigram-symbol-lg.svg';
import LogoSmall from '@/assets/logos/logo-epigram-symbol-sm.svg';
import LogoXLarge from '@/assets/logos/logo-epigram-symbol-xl.svg';
import { useRouter } from 'next/dist/client/router';

interface LogoProps {
  size: 'sm' | 'lg' | 'xl';
  className?: string;
}

const logosBySize = {
  sm: <LogoSmall />,
  lg: <LogoLarge />,
  xl: <LogoXLarge />,
};

export default function Logo({ size, className }: LogoProps) {
  const router = useRouter();
  const handleLogoClick = () => {
    router.push('/');
  };

  return (
    <div
      className={`cursor-pointer m-auto ${className}`}
      onClick={handleLogoClick}
    >
      {logosBySize[size]}
    </div>
  );
}
