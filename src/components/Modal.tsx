import Portal from '@/components/Portal';
import useModalStore from '@/lib/store/useModalStore';
import { useEffect } from 'react';

export default function Modal() {
  const { isOpen, content, closeModal } = useModalStore();
  useEffect(() => {
    if (isOpen) {
    } else {
    }

    // 컴포넌트가 언마운트될 때도 스크롤 복구
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';

      const handleEsc = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          closeModal();
        }
      };
      window.addEventListener('keydown', handleEsc);
      return () => {
        window.removeEventListener('keydown', handleEsc);
      };
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, closeModal]);

  if (!isOpen) return null;

  return (
    <Portal>
      <div
        className={`fixed inset-0 flex h-screen w-screen items-center justify-center bg-black-default bg-opacity-60 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={closeModal}
      >
        <div onClick={e => e.stopPropagation()}>{content}</div>
      </div>
    </Portal>
  );
}
