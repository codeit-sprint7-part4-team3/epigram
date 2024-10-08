import Plus from '@/assets/icons/ic-plus.svg';
import Button from '@/components/Button';
import { useRouter } from 'next/router';

export default function AddEpigramButton() {
  const router = useRouter();

  const handleAddEpigramButtonClick = () => {
    if (router.pathname === '/addepigram') return;
    router.push('/addepigram');
  };

  return (
    <Button
      variant='round'
      onClick={handleAddEpigramButtonClick}
      color='blue'
      className='mb-8'
    >
      <Plus className='mr-8 h-24 w-24' viewBox='0 1 24 24' />
      에피그램 만들기
    </Button>
  );
}
