import { useRouter } from 'next/navigation';

import { Board } from '@/entities/Board';

interface BoardCardProps {
  board: Board;
}

export const BoardCard: React.FC<BoardCardProps> = ({ board }) => {
  const router = useRouter();

  return (
    <div
      className="p-4 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 cursor-pointer"
      onClick={() => router.push(`/board/${board.id}`)}
    >
      <h2 className="text-lg font-semibold">{board.title}</h2>
    </div>
  );
};
