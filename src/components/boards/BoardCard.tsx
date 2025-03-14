import { useRouter } from 'next/navigation';

import { Dropdown, DropdownOption } from '@/components/shared/Dropdown';
import { Board } from '@/entities/Board';

import { Icon } from '../shared';

interface BoardCardProps {
  board: Board;
}

export const BoardCard: React.FC<BoardCardProps> = ({ board }) => {
  const router = useRouter();

  const options: DropdownOption[] = [
    {
      label: 'Edit',
    },
    {
      label: 'Delete',
      className: 'text-red-500',
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
    </div>
  );
};
