import { useState } from 'react';

import { useBoardStore } from '@/store/useBoardStore';

import { Button, ButtonVariant } from '../shared/Button';
import { Modal } from '../shared/Modal';
import { TextInput } from '../shared/TextInput';

export const AddBoardButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const addBoard = useBoardStore(state => state.addBoard);

  const handleSubmit = () => {
    if (!title.trim()) return;
    addBoard({ id: Date.now().toString(), title });
    setTitle('');
    setIsOpen(false);
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Add board</Button>
      <Modal
        isOpen={isOpen}
        title="Create new board"
        onClose={() => setIsOpen(false)}
      >
        <TextInput
          placeholder="Board name"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <div className="flex justify-end mt-4">
          <Button
            variant={ButtonVariant.SECONDARY}
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button className="ml-2" onClick={handleSubmit}>
            Create
          </Button>
        </div>
      </Modal>
    </>
  );
};
