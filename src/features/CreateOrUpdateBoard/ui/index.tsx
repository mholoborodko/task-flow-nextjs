import { FC } from 'react';

import { Button, Modal, TextInput } from '@/components/shared';
import { ModalProps } from '@/components/shared/Modal';

import { useBoard } from '../hooks/useBoardForm';

interface CreateOrUpdateBoardModalProps
  extends Pick<ModalProps, 'isOpen' | 'onClose'> {
  boardId?: string;
}

export const CreateOrUpdateBoardModal: FC<CreateOrUpdateBoardModalProps> = ({
  isOpen,
  onClose,
  boardId,
}) => {
  const { form, handleSubmit, isLoading } = useBoard({
    boardId: boardId || '',
    closeModal: onClose,
  });

  return (
    <Modal
      isOpen={isOpen}
      title={!boardId ? 'Create new board' : 'Edit board'}
      onAfterClose={form.reset}
      onClose={onClose}
    >
      <TextInput
        control={form.control}
        label="Name"
        name="title"
        placeholder="Board name"
      />
      <div className="flex justify-end mt-4">
        <Button
          className="ml-2"
          isLoading={isLoading}
          label={!boardId ? 'Create' : 'Save changes'}
          onClick={handleSubmit}
        />
      </div>
    </Modal>
  );
};
