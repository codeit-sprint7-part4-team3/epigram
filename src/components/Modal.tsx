import Portal from '@/components/Portal';
import { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <Portal>
      <div
        className={
          'bg-black-default fixed inset-0 flex h-screen w-screen items-center justify-center bg-opacity-60'
        }
        onClick={onClose}
      >
        {children}
      </div>
    </Portal>
  );
}
