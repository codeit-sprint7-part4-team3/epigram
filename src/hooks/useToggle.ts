import { useState } from 'react';

interface Toggle {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
  open: () => void;
}

export default function useToggle(initialState: boolean): Toggle {
  const [isOpen, setIsOpen] = useState(initialState);

  const toggle = () => {
    setIsOpen(prev => !prev);
  };

  const close = () => {
    setIsOpen(() => false);
  };

  const open = () => {
    setIsOpen(() => true);
  };

  return { isOpen, toggle, close, open };
}
