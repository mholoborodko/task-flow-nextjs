'use client';

import React, { useEffect } from 'react';

import { BoardList } from '@/components/boards';
import { Button, Loader } from '@/components/shared';
import { CreateOrUpdateBoardModal } from '@/features/CreateOrUpdateBoard';
import { useToggle } from '@/hooks';
import { useBoardStore } from '@/store/useBoardStore';

export default function HomePage() {
  const { fetchBoards, isLoading } = useBoardStore();
  const createOrUpdateBoardModalSwitcher = useToggle(false);

  useEffect(() => {
    fetchBoards();
  }, [fetchBoards]);

  return (
    <div className="flex flex-col h-full p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-4 text-blue-950">Boards</h1>
        <Button onClick={createOrUpdateBoardModalSwitcher.on}>Add board</Button>
      </div>
      {isLoading ? (
        <div className="flex-center h-full">
          <Loader size={50} />
        </div>
      ) : (
        <BoardList />
      )}
      <CreateOrUpdateBoardModal
        isOpen={createOrUpdateBoardModalSwitcher.value}
        onClose={createOrUpdateBoardModalSwitcher.off}
      />
    </div>
  );
}
