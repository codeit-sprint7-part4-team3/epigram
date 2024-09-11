import { useState } from 'react';

export default function useToggle(
  initialState: boolean = false
): [boolean, () => void, () => void, () => void] {
  const [isOpen, setIsOpen] = useState(initialState);

  const toggle = () => {
    setIsOpen(prev => !prev);
  };

  const close = () => {
    setIsOpen(prev => false);
  };

  const open = () => {
    setIsOpen(prev => true);
  };

  return [isOpen, toggle, close, open];
}
