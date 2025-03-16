import { useRouter } from 'next/navigation';

import {
  ConfirmActionModal,
  ExpandableDescription,
  Icon,
} from '@/components/shared';
import { Dropdown, DropdownOption } from '@/components/shared/Dropdown';
import { Board } from '@/entities/Board';
import { useRemoveBoard } from '@/entities/Board/hooks/useDeleteBoard';
import { CreateOrUpdateBoardModal } from '@/features/CreateOrUpdateBoard';
import { useToggle } from '@/hooks';

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
    <div className="relative p-5 rounded-xl shadow-md flex flex-col gap-4 border border-gray-200 bg-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Icon
            className="text-blue-600 hover:scale-110 transition-transform duration-200"
            name="board"
            size={28}
          />
          <button
            className="text-xl font-bold text-gray-900 cursor-pointer transition-colors hover:text-blue-600 hover:underline"
            onClick={() => router.push(`/board/${board.id}`)}
          >
            {board.title}
          </button>
        </div>
        <div className="relative dropdown-container">
          <Dropdown options={options}>
            {() => (
              <button className="flex-center p-1.5 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors">
                <Icon name="more" size={20} />
              </button>
            )}
          </Dropdown>
        </div>
      </div>
      {board.description && <ExpandableDescription text={board.description} />}
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
