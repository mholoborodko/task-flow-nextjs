'use client';

import clsx from 'clsx';
import { useEffect, useState } from 'react';
import ReactModal from 'react-modal';

import { Icon } from '@/components/shared/Icon';

export interface ModalProps {
  title: string;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  title,
  className,
  isOpen,
  onClose,
  children,
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const appElement = document.getElementById('__next');
    if (appElement) {
      ReactModal.setAppElement(appElement);
    }
  }, []);

  if (!isClient) return null;

  return (
    <ReactModal
      shouldCloseOnEsc
      shouldCloseOnOverlayClick
      ariaHideApp={false}
      className={clsx(
        'relative bg-white p-7 rounded-lg shadow-lg min-w-[400px] mx-auto',
        className
      )}
      isOpen={isOpen}
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onRequestClose={onClose}
    >
      <h2 className="text-lg font-semibold mb-3">{title}</h2>
      <button
        className="absolute top-1 right-2 p-1 rounded-full hover:opacity-80"
        onClick={onClose}
      >
        <Icon name="close" size={24} />
      </button>

      {children}
    </ReactModal>
  );
};
