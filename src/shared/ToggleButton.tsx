import Button from '@/components/Button';
import useToggle from '@/hooks/useToggle';
import clsx from 'clsx';

export default function ToggleButton() {
  const [isOpen, toggle] = useToggle();

  const toggleButtonClass = clsx(
    'h-16 w-32 justify-start p-3 transition-all md:h-16 md:w-32 xl:h-24 xl:w-42 xl:p-4',
    { 'bg-gray-300': !isOpen },
    { '': isOpen }
  );
  const toggleKnobClass = clsx(
    'h-10 w-10 rounded-full bg-blue-100 transition-all xl:h-16 xl:w-16',
    { '': !isOpen },
    { 'translate-x-16 xl:translate-x-18': isOpen }
  );
  return (
    <Button onClick={toggle} className={toggleButtonClass}>
      <div className={toggleKnobClass}></div>
    </Button>
  );
}
