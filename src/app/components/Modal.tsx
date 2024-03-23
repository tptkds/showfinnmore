import { useEffect, useRef } from 'react';

interface ModalProps {
  children: React.ReactNode;
  isModalOpen: boolean;
  toggleModal: () => void;
}
const Modal: React.FC<ModalProps> = ({
  children,
  isModalOpen,
  toggleModal,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const body: HTMLBodyElement | null = document.querySelector('body');
    if (body) {
      isModalOpen
        ? (body.style.overflow = 'hidden')
        : (body.style.overflow = '');
    }
  }, [isModalOpen]);

  const closeModal = (e: React.MouseEvent) => {
    if (e.target === modalRef.current) {
      toggleModal();
    }
  };

  return (
    <div
      ref={modalRef}
      className={`bg-black bg-opacity-30 w-full h-full fixed top-0 left-0 z-50 ${
        isModalOpen ? '' : 'hidden'
      } dark:bg-white dark:bg-opacity-30`}
      onClick={closeModal}
    >
      {children}
    </div>
  );
};

export default Modal;
