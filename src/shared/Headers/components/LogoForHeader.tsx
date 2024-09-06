import Logo from '@/components/Logo';

export default function LogoForHeader() {
  return (
    <>
      <Logo size='sm' className='xl:hidden' />
      <Logo size='lg' className='hidden xl:block' />
    </>
  );
}
