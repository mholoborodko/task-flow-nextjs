import { useRouter } from 'next/navigation';

import { Dropdown, DropdownOption } from '@/components/shared/Dropdown';
import { Board } from '@/entities/Board';
import { useRemoveBoard } from '@/entities/Board/hooks/useDeleteBoard';
import { CreateOrUpdateBoardModal } from '@/features/CreateOrUpdateBoard';
import { useToggle } from '@/hooks';

import { ConfirmActionModal, Icon } from '../shared';

interface BoardCardProps {
  board: Board;
}

export const BoardCard: React.FC<BoardCardProps> = ({ board }) => {
  const router = useRouter();
  const createOrUpdateBoardModalSwitcher = useToggle(false);
  const deleteBoardModalSwitcher = useToggle(false);

  const { mutate: removeBoard } = useRemoveBoard();

  const options: DropdownOption[] = [
    {
      label: 'Edit',
      onSelect: createOrUpdateBoardModalSwitcher.on,
    },
    {
      label: 'Delete',
      className: 'text-red-500',
      onSelect: deleteBoardModalSwitcher.on,
    },
  ];

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 cursor-pointer flex justify-between items-center">
      <h2
        className="text-lg font-semibold"
        onClick={() => router.push(`/board/${board.id}`)}
      >
        {board.title}
      </h2>
      <Dropdown options={options}>
        {() => (
          <button className="flex-center">
            <Icon name="more" size={20} />
          </button>
        )}
      </Dropdown>
      <CreateOrUpdateBoardModal
        boardId={board.id}
        isOpen={createOrUpdateBoardModalSwitcher.value}
        onClose={createOrUpdateBoardModalSwitcher.off}
      />
      <ConfirmActionModal
        actionMessage="Are you sure you want to delete this board?"
        isOpen={deleteBoardModalSwitcher.value}
        title="Delete board"
        onClose={deleteBoardModalSwitcher.off}
        onConfirm={() => removeBoard(board.id)}
      />
    </div>
  );
};
