'use client';

import { useRouter } from 'next/navigation';

import { AddBoardButton } from '@/components/boards';
import { EmptyState } from '@/components/shared';
import { useBoardStore } from '@/store/useBoardStore';

export default function HomePage() {
  const { boards } = useBoardStore();
  const router = useRouter();

  return (
    <div className="flex flex-col h-full p-6 ">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-4 text-blue-950">Boards</h1>
        <AddBoardButton />
      </div>
      {!boards.length && (
        <div className="flex-center h-full">
          <EmptyState message="No boards here yet" />
        </div>
      )}
      {!!boards.length && (
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {boards.map(board => (
            <div
              key={board.id}
              className="p-4 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-300 transition"
              role="button"
              onClick={() => router.push(`/board/${board.id}`)}
            >
              {board.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
