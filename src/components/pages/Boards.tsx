'use client';

import React from 'react';

import { Button, EmptyState, LoaderContainer } from '@/components/shared';
import { BoardCard, BoardListSkeleton, useBoards } from '@/entities/Board';
import { CreateOrUpdateBoardModal } from '@/features/CreateOrUpdateBoard';
import { useToggle } from '@/hooks';

export const Boards = () => {
  const { data: boards, isLoading: isLoadingBoards } = useBoards();

  const createOrUpdateBoardModalSwitcher = useToggle(false);

  return (
    <div className="flex flex-col h-full p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-4 text-blue-950">Boards</h1>
        <Button
          disabled={isLoadingBoards}
          label="Add board"
          onClick={createOrUpdateBoardModalSwitcher.on}
        />
      </div>
      <LoaderContainer
        customLoader={<BoardListSkeleton />}
        emptyStateComponent={
          <div className="flex-center h-full">
            <EmptyState message="No boards here yet" />
          </div>
        }
        isEmpty={!boards?.length}
        isLoading={isLoadingBoards}
      >
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {boards?.map(board => <BoardCard key={board.id} board={board} />)}
        </div>
      </LoaderContainer>
      <CreateOrUpdateBoardModal
        isOpen={createOrUpdateBoardModalSwitcher.value}
        onClose={createOrUpdateBoardModalSwitcher.off}
      />
    </div>
  );
};
