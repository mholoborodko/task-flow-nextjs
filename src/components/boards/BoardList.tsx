import React from 'react';

import { useBoardStore } from '@/store/useBoardStore';

import { EmptyState } from '../shared';

import { BoardCard } from './BoardCard';

export const BoardList: React.FC = () => {
  const { boards } = useBoardStore();

  return (
    <>
      {!boards.length && (
        <div className="flex-center h-full">
          <EmptyState message="No boards here yet" />
        </div>
      )}
      {!!boards.length && (
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {boards.map(board => (
            <BoardCard key={board.id} board={board} />
          ))}
        </div>
      )}
    </>
  );
};
