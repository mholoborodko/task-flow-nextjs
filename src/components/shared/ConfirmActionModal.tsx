import React, { FC } from 'react';

import { Modal, Button } from '@/components/shared';

interface ConfirmActionModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  actionMessage: string;
}

export const ConfirmActionModal: FC<ConfirmActionModalProps> = ({
  title,
  isOpen,
  onClose,
  onConfirm,
  actionMessage,
}) => {
  return (
    <Modal isOpen={isOpen} title={title} onClose={onClose}>
      <div className="text-center">
        <p className="mb-4 text-lg">{actionMessage}</p>
        <div className="flex justify-center gap-4">
          <Button
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-md transition duration-200"
            label="Yes"
            onClick={onConfirm}
          />
          <Button
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-md transition duration-200"
            label="No"
            onClick={onClose}
          />
        </div>
      </div>
    </Modal>
  );
};
