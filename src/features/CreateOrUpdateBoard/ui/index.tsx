import { FC } from 'react';

import { Button, Modal, TextInput } from '@/components/shared';
import { ButtonVariant } from '@/components/shared/Button';
import { ModalProps } from '@/components/shared/Modal';

import { useBoard } from '../hooks/useBoardForm';

interface CreateOrUpdateBoardModalProps
  extends Pick<ModalProps, 'isOpen' | 'onClose'> {}

export const CreateOrUpdateBoardModal: FC<CreateOrUpdateBoardModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { form, handleSubmit } = useBoard({ closeModal: onClose });

  return (
    <Modal
      isOpen={isOpen}
      title="Create new board"
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
        <Button variant={ButtonVariant.SECONDARY} onClick={onClose}>
          Cancel
        </Button>
        <Button
          className="ml-2"
          isLoading={form.formState.isSubmitting}
          onClick={handleSubmit}
        >
          Create
        </Button>
      </div>
    </Modal>
  );
};
