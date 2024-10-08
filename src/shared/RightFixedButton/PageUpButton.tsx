import Up from '@/assets/icons/ic-down-chevron.svg';
import Button from '@/components/Button';

const handlePageUp = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

export default function PageUpButton() {
  return (
    <Button onClick={handlePageUp} color='blue' variant='round'>
      <Up className='h-24 w-24 rotate-180' />
    </Button>
  );
}
