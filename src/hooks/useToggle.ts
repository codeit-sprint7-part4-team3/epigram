import { useState } from 'react';

export default function useToggle(
  initialState: boolean = false
): [boolean, () => void] {
  const [isOpen, setIsOpen] = useState(initialState);

  const toggle = () => {
    setIsOpen(prev => !prev);
  };

  return [isOpen, toggle];
}
