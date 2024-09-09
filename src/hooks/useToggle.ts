import { useState } from 'react';

export default function useToggle(): [boolean, () => void] {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(prev => !prev);
  };

  return [isOpen, toggle];
}
