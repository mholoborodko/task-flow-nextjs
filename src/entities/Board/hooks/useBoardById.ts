'use client';

import { useQuery } from '@tanstack/react-query';

import { QueryKeys } from '@/constants';
import { fetchBoardById } from '@/entities/Board';

export function useBoardById(boardId: string) {
  return useQuery({
    queryKey: [QueryKeys.BOARD, boardId],
    queryFn: () => {
      if (!boardId) return Promise.reject(new Error('Board ID is required'));
      return fetchBoardById(boardId);
    },
    enabled: !!boardId,
  });
}
