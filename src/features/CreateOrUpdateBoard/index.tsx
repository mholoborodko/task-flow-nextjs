import { FC } from 'react';

import { Button, TextAreaField, TextInput } from '@/components/shared';
import { Modal, ModalProps } from '@/components/shared/Modal';

import { useBoardForm } from './hooks/useBoardForm';

interface CreateOrUpdateBoardModalProps
  extends Pick<ModalProps, 'isOpen' | 'onClose'> {
  boardId?: string;
}

export const CreateOrUpdateBoardModal: FC<CreateOrUpdateBoardModalProps> = ({
  isOpen,
  onClose,
  boardId,
}) => {
  const { form, handleSubmit, isLoading } = useBoardForm({
    boardId: boardId || '',
    closeModal: onClose,
  });

  return (
    <Modal
      className="w-[500px]"
      isOpen={isOpen}
      title={!boardId ? 'Create new board' : 'Edit board'}
      onAfterClose={form.reset}
      onClose={onClose}
    >
      <div className="flex flex-col gap-2">
        <TextInput control={form.control} label="Name" name="title" />
        <TextAreaField
          control={form.control}
          label="Description"
          maxLength={500}
          name="description"
        />
        <div className="flex justify-end mt-8">
          <Button
            isLoading={isLoading}
            label={!boardId ? 'Create' : 'Save changes'}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </Modal>
  );
};
